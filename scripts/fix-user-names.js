const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'ultimate-ecommerce';

async function fixUserNames() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    const usersCollection = db.collection('users');
    
    // Find users without a name field or with null/undefined name
    const usersToFix = await usersCollection.find({
      $or: [
        { name: { $exists: false } },
        { name: null },
        { name: '' }
      ]
    }).toArray();
    
    console.log(`Found ${usersToFix.length} users to fix`);
    
    for (const user of usersToFix) {
      let name = '';
      
      // Try to construct name from firstName and lastName
      if (user.firstName && user.lastName) {
        name = `${user.firstName} ${user.lastName}`.trim();
      } else if (user.firstName) {
        name = user.firstName;
      } else if (user.lastName) {
        name = user.lastName;
      } else if (user.email) {
        // Use email prefix as name
        name = user.email.split('@')[0];
      } else {
        name = 'User';
      }
      
      // Update the user with the name field
      await usersCollection.updateOne(
        { _id: user._id },
        { $set: { name: name } }
      );
      
      console.log(`✅ Fixed user ${user.email}: ${name}`);
    }
    
    console.log('✅ All users fixed successfully!');
    
  } catch (error) {
    console.error('Error fixing users:', error);
  } finally {
    await client.close();
  }
}

fixUserNames(); 