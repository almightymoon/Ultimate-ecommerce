#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Creating properly formatted .env.local file...');

const envPath = path.join(process.cwd(), '.env.local');

// Create the properly formatted content
const envContent = `MONGODB_URI=mongodb+srv://moon:947131@cluster0.gvga3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
DB_NAME=Ultimate-ecommerce
JWT_SECRET=gd78fgfd8gdfsgds8fg678g6dsg7s
NEXT_PUBLIC_APP_NAME=Ultimate-ecommerce
NEXT_PUBLIC_BASE_URL=http://localhost:4000

STRIPE_SECRET_KEY=sk_test_51PO0O71Lmdm8PDfxJ0Q4mAheaD9hpIOFgEetoC9Q4VYd6ZN6dXGTubkInl3L1VpLnNu30210Qgm1O4XCK7xFkMzT00WTBzG2Pg
STRIPE_PUBLISHABLE_KEY=pk_test_51PO0O71Lmdm8PDfxVhohp7HTiqZXWkS6roFSohUrdguSu7kc90q5xvTplojjbu7DdXpLGBaYC2qvBem7x8pvc9jg00XyAMcFw5

CLOUDINARY_CLOUD_NAME=dytsuek4h
CLOUDINARY_API_KEY=116785848947978
CLOUDINARY_API_SECRET=kkcudnKMxBvdhf-6dgmPihQh4jw

NEXT_PUBLIC_PAYPAL_CLIENT_ID=Ac3OrLFIor_JZu9J1hYkn73XEDY2CRX7qy_rACf0vmtC36u2kWJcckfriyTEIa3rRgxtu_Kr_r9NJJgD
PAYPAL_CLIENT_SECRET=ECx8Vne53CEhravWhNcAmju19eD0VR8H-DtQPcfJ7691GgieSa420e-jx5t7C3-M4KRmp5t38WlXm_Cb
PAYPAL_ENV=sandbox
`;

// Write the fixed content
fs.writeFileSync(envPath, envContent);

console.log('✅ .env.local file created successfully!');

// Verify the fix
const newContent = fs.readFileSync(envPath, 'utf8');
console.log('\n📋 PayPal environment variables:');
console.log('NEXT_PUBLIC_PAYPAL_CLIENT_ID:', newContent.includes('NEXT_PUBLIC_PAYPAL_CLIENT_ID=') ? 'SET' : 'NOT SET');
console.log('PAYPAL_CLIENT_SECRET:', newContent.includes('PAYPAL_CLIENT_SECRET=') ? 'SET' : 'NOT SET');
console.log('PAYPAL_ENV:', newContent.includes('PAYPAL_ENV=sandbox') ? 'SET' : 'NOT SET');

const hasPayPalClientId = newContent.includes('NEXT_PUBLIC_PAYPAL_CLIENT_ID=');
const hasPayPalSecret = newContent.includes('PAYPAL_CLIENT_SECRET=');
const hasPayPalEnv = newContent.includes('PAYPAL_ENV=sandbox');

if (hasPayPalClientId && hasPayPalSecret && hasPayPalEnv) {
  console.log('\n✅ PayPal environment variables are now properly formatted!');
} else {
  console.log('\n❌ Some PayPal variables may still be missing or malformed.');
}

console.log('\n🚀 Please restart your development server to load the fixed environment variables:');
console.log('npm run dev'); 