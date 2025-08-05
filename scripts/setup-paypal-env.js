#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 PayPal Environment Setup Script');
console.log('=====================================\n');

const envPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), '.env.local.example');

// Check if .env.local already exists
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env.local file already exists!');
  console.log('Please check if you have the following PayPal variables set:');
  console.log('- NEXT_PUBLIC_PAYPAL_CLIENT_ID');
  console.log('- PAYPAL_CLIENT_SECRET');
  console.log('- PAYPAL_ENV\n');
  
  const currentEnv = fs.readFileSync(envPath, 'utf8');
  const hasPayPalClientId = currentEnv.includes('NEXT_PUBLIC_PAYPAL_CLIENT_ID=');
  const hasPayPalSecret = currentEnv.includes('PAYPAL_CLIENT_SECRET=');
  
  if (!hasPayPalClientId || !hasPayPalSecret) {
    console.log('❌ Missing PayPal environment variables detected!');
    console.log('Please add the missing variables to your .env.local file.\n');
  } else {
    console.log('✅ PayPal environment variables appear to be configured.\n');
  }
} else {
  console.log('📝 Creating .env.local file...');
  
  const envContent = `# PayPal Configuration
# Get these from https://developer.paypal.com/

# PayPal Client ID (public - used in frontend)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id_here

# PayPal Client Secret (private - used only in server-side API routes)
PAYPAL_CLIENT_SECRET=your_paypal_client_secret_here

# PayPal Environment (sandbox for testing, live for production)
PAYPAL_ENV=sandbox

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/ultimate-ecommerce
DB_NAME=ultimate-ecommerce

# JWT Secret (change this in production)
JWT_SECRET=your-secret-key-change-in-production

# Cloudinary Configuration (optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local file created successfully!');
  console.log('📋 Please edit .env.local and add your actual PayPal credentials.\n');
}

console.log('📚 Setup Instructions:');
console.log('1. Go to https://developer.paypal.com/');
console.log('2. Sign in with your PayPal account');
console.log('3. Navigate to "My Apps & Credentials"');
console.log('4. Create a new app or use an existing one');
console.log('5. Copy the Client ID and Client Secret');
console.log('6. Add them to your .env.local file');
console.log('7. Restart your development server: npm run dev\n');

console.log('🔍 For more details, see:');
console.log('- PAYPAL_ENV_SETUP.md');
console.log('- PAYPAL_SETUP.md\n');

console.log('🚀 After setting up your credentials, test the integration:');
console.log('1. Start your dev server: npm run dev');
console.log('2. Add items to cart');
console.log('3. Go to checkout');
console.log('4. Test PayPal payment flow'); 