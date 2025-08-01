const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "ultimate-ecommerce";

const products = [
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    price: 1299.99,
    originalPrice: 1499.99,
    category: "smartphones",
    image: "📱",
    description: "The most advanced iPhone ever with A17 Pro chip, titanium design, and 5x optical zoom.",
    rating: 4.9,
    reviews: 1247,
    badge: "New",
    stock: 50
  },
  {
    id: "macbook-pro-14-m3",
    name: "MacBook Pro 14\" M3 Pro",
    price: 1999.99,
    originalPrice: 2199.99,
    category: "laptops",
    image: "💻",
    description: "Next-generation performance with M3 Pro chip for professionals.",
    rating: 4.8,
    reviews: 892,
    badge: "Best Seller",
    stock: 30
  },
  {
    id: "sony-wh-1000xm5",
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: 399.99,
    originalPrice: 449.99,
    category: "headphones",
    image: "🎧",
    description: "Industry-leading noise canceling with Dual Noise Sensor technology.",
    rating: 4.7,
    reviews: 1567,
    badge: "Popular",
    stock: 75
  }
];

async function populateDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db(dbName);

    // Clear existing products
    await db.collection("products").deleteMany({});

    // Insert products
    const productsResult = await db.collection("products").insertMany(products);
    console.log(`Inserted ${productsResult.insertedCount} products`);

    console.log("Database populated successfully!");

  } catch (error) {
    console.error("Error populating database:", error);
  } finally {
    await client.close();
  }
}

populateDatabase(); 