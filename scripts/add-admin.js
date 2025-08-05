const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'ultimate-ecommerce';

async function addAdminUser() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    const usersCollection = db.collection('users');
    
    // Get command line arguments
    const args = process.argv.slice(2);
    if (args.length < 3) {
      console.log('Usage: node add-admin.js <email> <password> <firstName> [lastName] [role]');
      console.log('Example: node add-admin.js admin@example.com password123 "John" "Doe" "admin"');
      process.exit(1);
    }
    
    const [email, password, firstName, lastName = '', role = 'admin'] = args;
    
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
    
    // Create user object
    const newUser = {
      id: userId,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role, // user, admin, super-admin
      avatar: '👤',
      isActive: true,
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Insert user
    const result = await usersCollection.insertOne(newUser);
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', email);
    console.log('🔑 Password:', password);
    console.log('👤 Role:', role);
    console.log('🆔 User ID:', userId);
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await client.close();
  }
}

addAdminUser(); 