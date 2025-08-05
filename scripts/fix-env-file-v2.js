#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing .env.local file formatting (v2)...');

const envPath = path.join(process.cwd(), '.env.local');

// Read the current file
const content = fs.readFileSync(envPath, 'utf8');

// Parse and fix the environment variables
const lines = content.split('\n');
const fixedLines = [];
let currentVar = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  if (!line || line.startsWith('#')) {
    // Skip empty lines and comments
    continue;
  }
  
  if (line.includes('=')) {
    // This is a complete environment variable
    const [key, ...valueParts] = line.split('=');
    let value = valueParts.join('=');
    
    // Clean up the value
    value = value.replace(/%$/, ''); // Remove trailing %
    
    // Handle specific variables that might be split
    if (key === 'NEXT_PUBLIC_PAYPAL_CLIENT_ID') {
      // Look ahead for continuation
      if (i + 1 < lines.length && !lines[i + 1].includes('=') && lines[i + 1].trim()) {
        value += lines[i + 1].trim();
        i++; // Skip the next line
      }
    } else if (key === 'PAYPAL_CLIENT_SECRET') {
      // Look ahead for continuation
      if (i + 1 < lines.length && !lines[i + 1].includes('=') && lines[i + 1].trim()) {
        value += lines[i + 1].trim();
        i++; // Skip the next line
      }
    } else if (key === 'MONGODB_URI') {
      // Look ahead for continuation
      if (i + 1 < lines.length && !lines[i + 1].includes('=') && lines[i + 1].trim()) {
        value += lines[i + 1].trim();
        i++; // Skip the next line
      }
    } else if (key === 'STRIPE_SECRET_KEY') {
      // Look ahead for continuation
      if (i + 1 < lines.length && !lines[i + 1].includes('=') && lines[i + 1].trim()) {
        value += lines[i + 1].trim();
        i++; // Skip the next line
      }
    } else if (key === 'STRIPE_PUBLISHABLE_KEY') {
      // Look ahead for continuation
      if (i + 1 < lines.length && !lines[i + 1].includes('=') && lines[i + 1].trim()) {
        value += lines[i + 1].trim();
        i++; // Skip the next line
      }
    }
    
    fixedLines.push(`${key}=${value}`);
  }
}

// Write the fixed content
const fixedContent = fixedLines.join('\n') + '\n';
fs.writeFileSync(envPath, fixedContent);

console.log('✅ .env.local file fixed successfully!');

// Verify the fix
const newContent = fs.readFileSync(envPath, 'utf8');
console.log('\n📋 Current PayPal environment variables:');
console.log(newContent.match(/NEXT_PUBLIC_PAYPAL_CLIENT_ID=.*/)?.[0] || 'NOT FOUND');
console.log(newContent.match(/PAYPAL_CLIENT_SECRET=.*/)?.[0] || 'NOT FOUND');
console.log(newContent.match(/PAYPAL_ENV=.*/)?.[0] || 'NOT FOUND');

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