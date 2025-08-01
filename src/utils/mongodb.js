import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "ultimate-ecommerce";
let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = new MongoClient(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  });

  await client.connect();
  console.log("Connected to MongoDB!");

  const db = client.db(dbName);
  cachedClient = client;
  cachedDb = db;

  return db;
}

export async function getProductsCollection() {
  const db = await connectToDatabase();
  return db.collection("products");
}

export async function getCategoriesCollection() {
  const db = await connectToDatabase();
  return db.collection("categories");
}

export async function getDealsCollection() {
  const db = await connectToDatabase();
  return db.collection("deals");
}

export async function getOrdersCollection() {
  const db = await connectToDatabase();
  return db.collection("orders");
}

export async function getUsersCollection() {
  const db = await connectToDatabase();
  return db.collection("users");
} 