const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'ultimate-ecommerce';

async function createUser() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    const usersCollection = db.collection('users');
    
    // Get command line arguments
    const args = process.argv.slice(2);
    if (args.length < 3) {
      console.log('Usage: node create-user.js <email> <password> <firstName> [lastName]');
      console.log('Example: node create-user.js john@example.com password123 "John" "Doe"');
      process.exit(1);
    }
    
    const [email, password, firstName, lastName = ''] = args;
    
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      console.log('User with this email already exists!');
      process.exit(1);
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Generate user ID
    const userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create user object (default role: user)
    const newUser = {
      id: userId,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`.trim(), // Add name field for login API
      role: 'user', // Default role - can be changed to admin later
      avatar: '👤',
      isActive: true,
      emailVerified: false,
      preferences: {
        theme: 'light',
        notifications: true,
        marketing: false
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Insert user
    const result = await usersCollection.insertOne(newUser);
    
    console.log('✅ User created successfully!');
    console.log('📧 Email:', email);
    console.log('🔑 Password:', password);
    console.log('👤 Role:', 'user (can be changed to admin)');
    console.log('🆔 User ID:', userId);
    console.log('\n💡 To make this user an admin:');
    console.log('1. Go to /admin/users in your admin panel');
    console.log('2. Find this user and click "Change Role"');
    console.log('3. Select "admin" or "super-admin"');
    console.log('\nOr use the API directly:');
    console.log(`curl -X POST http://localhost:3000/api/admin/users/change-role \\`);
    console.log(`  -H "Content-Type: application/json" \\`);
    console.log(`  -d '{"userId":"${email}","newRole":"admin"}'`);
    
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await client.close();
  }
}

createUser(); 