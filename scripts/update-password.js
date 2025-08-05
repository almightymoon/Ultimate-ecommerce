const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'ultimate-ecommerce';

async function updatePassword() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    const usersCollection = db.collection('users');
    
    // Get command line arguments
    const args = process.argv.slice(2);
    if (args.length < 2) {
      console.log('Usage: node update-password.js <email> <new-password>');
      console.log('Example: node update-password.js almightymooon@gmail.com admin123');
      process.exit(1);
    }
    
    const [email, newPassword] = args;
    
    // Check if user exists
    const existingUser = await usersCollection.findOne({ email });
    if (!existingUser) {
      console.log('User not found!');
      process.exit(1);
    }
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update user password
    const result = await usersCollection.updateOne(
      { email },
      { $set: { password: hashedPassword, updatedAt: new Date() } }
    );
    
    if (result.matchedCount === 0) {
      console.log('User not found!');
      process.exit(1);
    }
    
    console.log('✅ Password updated successfully!');
    console.log('📧 Email:', email);
    console.log('🔑 New Password:', newPassword);
    
  } catch (error) {
    console.error('Error updating password:', error);
  } finally {
    await client.close();
  }
}

updatePassword(); 