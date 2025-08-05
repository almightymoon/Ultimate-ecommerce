#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing .env.local file formatting...');

const envPath = path.join(process.cwd(), '.env.local');
const backupPath = path.join(process.cwd(), '.env.local.backup');

// Read the current file
const content = fs.readFileSync(envPath, 'utf8');

// Fix the formatting issues
let fixedContent = content
  // Remove line breaks within values and join them
  .replace(/NEXT_PUBLIC_PAYPAL_CLIENT_ID=([^\n]+)\n([^\n]+)/g, 'NEXT_PUBLIC_PAYPAL_CLIENT_ID=$1$2')
  .replace(/NEXT_PUBLIC_PAYPAL_CLIENT_SECRET=([^\n]+)\n([^\n]+)/g, 'NEXT_PUBLIC_PAYPAL_CLIENT_SECRET=$1$2')
  .replace(/PAYPAL_ENV=([^\n]+)%/g, 'PAYPAL_ENV=$1')
  // Fix other line breaks in values
  .replace(/MONGODB_URI=([^\n]+)\n([^\n]+)/g, 'MONGODB_URI=$1$2')
  .replace(/STRIPE_SECRET_KEY=([^\n]+)\n([^\n]+)/g, 'STRIPE_SECRET_KEY=$1$2')
  .replace(/STRIPE_PUBLISHABLE_KEY=([^\n]+)\n([^\n]+)/g, 'STRIPE_PUBLISHABLE_KEY=$1$2')
  // Remove extra spaces
  .replace(/NEXT_PUBLIC_BASE_URL= /g, 'NEXT_PUBLIC_BASE_URL=');

// Write the fixed content
fs.writeFileSync(envPath, fixedContent);

console.log('✅ .env.local file fixed successfully!');
console.log('📋 Changes made:');
console.log('- Fixed line breaks in PayPal Client ID');
console.log('- Fixed line breaks in PayPal Client Secret');
console.log('- Removed trailing % from PAYPAL_ENV');
console.log('- Fixed line breaks in other environment variables');
console.log('- Removed extra spaces');

// Verify the fix
const newContent = fs.readFileSync(envPath, 'utf8');
const hasPayPalClientId = newContent.includes('NEXT_PUBLIC_PAYPAL_CLIENT_ID=');
const hasPayPalSecret = newContent.includes('PAYPAL_CLIENT_SECRET=');
const hasPayPalEnv = newContent.includes('PAYPAL_ENV=sandbox');

if (hasPayPalClientId && hasPayPalSecret && hasPayPalEnv) {
  console.log('✅ PayPal environment variables are now properly formatted!');
} else {
  console.log('❌ Some PayPal variables may still be missing or malformed.');
}

console.log('\n🚀 Please restart your development server to load the fixed environment variables:');
console.log('npm run dev'); 