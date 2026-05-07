// Script to delete test user
// Run with: node scripts/delete-test-user.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function deleteTestUser() {
  const testEmail = 'test@eastculture.com';

  console.log('🗑️  Deleting test user:', testEmail);
  console.log('');

  try {
    // 1. Find user
    const { data: users } = await supabase
      .from('users')
      .select('*')
      .eq('email', testEmail);

    if (!users || users.length === 0) {
      console.log('✅ No test user found');
      return;
    }

    const userId = users[0].id;

    // 2. Delete purchases
    await supabase
      .from('user_purchases')
      .delete()
      .eq('user_id', userId);

    console.log('✅ Deleted purchases');

    // 3. Delete user
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    if (error) {
      console.error('❌ Error deleting user:', error);
      process.exit(1);
    }

    console.log('✅ Deleted user');
    console.log('');
    console.log('🎉 Test user deleted successfully!');
    console.log('You can now register a new account with:', testEmail);

  } catch (error) {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  }
}

deleteTestUser();
