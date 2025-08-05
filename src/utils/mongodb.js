import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "ultimate-ecommerce";
let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const client = new MongoClient(uri, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      connectTimeoutMS: 10000, // 10 second timeout
    });

    await client.connect();
    console.log("✅ Connected to MongoDB successfully!");

    const db = client.db(dbName);
    cachedClient = client;
    cachedDb = db;

    return db;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    console.log("💡 Using fallback data. To connect to a real database:");
    console.log("   1. Install MongoDB locally: https://docs.mongodb.com/manual/installation/");
    console.log("   2. Or use MongoDB Atlas: https://www.mongodb.com/atlas");
    console.log("   3. Update your .env.local file with the connection string");
    throw error;
  }
}

export async function getProductsCollection() {
  try {
    const db = await connectToDatabase();
    return db.collection("products");
  } catch (error) {
    console.log("📦 Products collection unavailable, using fallback data");
    throw error;
  }
}

export async function getCategoriesCollection() {
  try {
    const db = await connectToDatabase();
    return db.collection("categories");
  } catch (error) {
    console.log("📂 Categories collection unavailable, using fallback data");
    throw error;
  }
}

export async function getDealsCollection() {
  try {
    const db = await connectToDatabase();
    return db.collection("deals");
  } catch (error) {
    console.log("🎯 Deals collection unavailable, using fallback data");
    throw error;
  }
}

export async function getOrdersCollection() {
  try {
    const db = await connectToDatabase();
    return db.collection("orders");
  } catch (error) {
    console.log("📋 Orders collection unavailable");
    throw error;
  }
}

export async function getUsersCollection() {
  try {
    const db = await connectToDatabase();
    return db.collection("users");
  } catch (error) {
    console.log("👥 Users collection unavailable");
    throw error;
  }
} 