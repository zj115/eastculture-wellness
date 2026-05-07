// Script to create a test user with all courses unlocked
// Run with: node scripts/create-test-user.js

const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTestUser() {
  const testEmail = 'test@eastculture.com';
  const testPassword = 'Test123456!';

  console.log('🔧 Creating test user...');
  console.log('📧 Email:', testEmail);
  console.log('🔑 Password:', testPassword);
  console.log('');

  try {
    // 1. Check if user already exists
    const { data: existingUsers } = await supabase
      .from('users')
      .select('*')
      .eq('email', testEmail);

    let userId;

    if (existingUsers && existingUsers.length > 0) {
      console.log('✅ Test user already exists');
      userId = existingUsers[0].id;
    } else {
      // 2. Create user in users table
      const { data: newUser, error: userError } = await supabase
        .from('users')
        .insert({
          username: 'testuser',
          email: testEmail,
          password_hash: 'test-hash-not-used', // We'll use Supabase Auth
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (userError) {
        console.error('❌ Error creating user:', userError);
        process.exit(1);
      }

      userId = newUser.id;
      console.log('✅ Created test user:', userId);
    }

    // 3. Delete existing purchases for this user
    await supabase
      .from('user_purchases')
      .delete()
      .eq('user_id', userId);

    console.log('🗑️  Cleared existing purchases');

    // 4. Add all course purchases
    const allCourses = [
      { course_id: 'jiujiu', course_name: '9.9 Quick Relief Course' },
      { course_id: 'qigong', course_name: 'Acupressure Masterclass' },
      { course_id: 'qimen', course_name: 'Tai Chi System Course' },
      { course_id: 'taichi', course_name: 'Tai Chi System Course' },
      { course_id: 'guasha', course_name: 'Facial Gua Sha Course' },
      { course_id: 'wingchun', course_name: 'Wing Chun Foundations' },
      { course_id: 'faceyoga', course_name: 'Face Yoga Masterclass' },
    ];

    const purchases = allCourses.map(course => ({
      user_id: userId,
      purchase_type: 'course',
      course_id: course.course_id,
      video_key: null,
      status: 'active',
      expires_at: null, // Lifetime access
      created_at: new Date().toISOString(),
    }));

    const { error: purchaseError } = await supabase
      .from('user_purchases')
      .insert(purchases);

    if (purchaseError) {
      console.error('❌ Error adding purchases:', purchaseError);
      process.exit(1);
    }

    console.log('✅ Added all course purchases');
    console.log('');
    console.log('═══════════════════════════════════════');
    console.log('🎉 Test Account Created Successfully!');
    console.log('═══════════════════════════════════════');
    console.log('📧 Email:    ', testEmail);
    console.log('🔑 Password: ', testPassword);
    console.log('🎓 Courses:   All courses unlocked');
    console.log('═══════════════════════════════════════');
    console.log('');
    console.log('⚠️  Note: You need to register this account on the website first,');
    console.log('   then the purchases will be automatically available.');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  }
}

createTestUser();
