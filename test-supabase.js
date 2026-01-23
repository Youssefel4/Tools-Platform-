
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

console.log('Testing Supabase Connection...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    try {
        const { data, error } = await supabase.from('notes').select('*').limit(1);
        if (error) {
            console.error('Error connecting to Supabase:', JSON.stringify(error, null, 2));
        } else {
            console.log('Successfully connected to Supabase!');
        }
    } catch (err) {
        console.error('Unexpected error:', err.message);
    }
}

testConnection();
