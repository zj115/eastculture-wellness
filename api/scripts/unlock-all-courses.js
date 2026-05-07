// Script to unlock all courses for an existing user
// Run with: node scripts/unlock-all-courses.js <email>

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function unlockAllCourses(email) {
  if (!email) {
    console.error('❌ Please provide an email address');
    console.log('Usage: node scripts/unlock-all-courses.js <email>');
    process.exit(1);
  }

  console.log('🔧 Unlocking all courses for:', email);
  console.log('');

  try {
    // 1. Find user by email
    const { data: users, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email);

    if (userError || !users || users.length === 0) {
      console.error('❌ User not found:', email);
      console.log('Please register this account on the website first.');
      process.exit(1);
    }

    const userId = users[0].id;
    console.log('✅ Found user:', userId);

    // 2. Delete existing purchases for this user
    await supabase
      .from('user_purchases')
      .delete()
      .eq('user_id', userId);

    console.log('🗑️  Cleared existing purchases');

    // 3. Add all course purchases
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
    console.log('🎉 All Courses Unlocked Successfully!');
    console.log('═══════════════════════════════════════');
    console.log('📧 Email:    ', email);
    console.log('🎓 Courses:   All courses unlocked');
    console.log('═══════════════════════════════════════');
    console.log('');
    console.log('✅ You can now log in and access all courses!');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  }
}

const email = process.argv[2];
unlockAllCourses(email);
