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
    stock: 50,
    featured: true
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
    stock: 30,
    featured: true
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
    stock: 75,
    featured: true
  },
  {
    id: "apple-watch-series-9",
    name: "Apple Watch Series 9",
    price: 399.99,
    originalPrice: 449.99,
    category: "smartwatches",
    image: "⌚",
    description: "Advanced health monitoring with ECG and blood oxygen tracking.",
    rating: 4.6,
    reviews: 743,
    badge: "Trending",
    stock: 60,
    featured: false
  },
  {
    id: "canon-eos-r6-mark-ii",
    name: "Canon EOS R6 Mark II",
    price: 2499.99,
    originalPrice: 2799.99,
    category: "cameras",
    image: "📷",
    description: "Full-frame mirrorless camera with 4K video recording and advanced autofocus.",
    rating: 4.5,
    reviews: 234,
    badge: "Professional",
    stock: 25,
    featured: false
  },
  {
    id: "playstation-5",
    name: "PlayStation 5 Console",
    price: 499.99,
    originalPrice: 599.99,
    category: "gaming",
    image: "🎮",
    description: "Next-gen gaming with lightning-fast loading and ray tracing.",
    rating: 4.9,
    reviews: 2156,
    badge: "Hot Deal",
    stock: 40,
    featured: true
  }
];

const categories = [
  {
    id: "smartphones",
    name: "Smartphones",
    description: "Latest mobile devices and smartphones",
    image: "📱",
    productCount: 15,
    subcategories: ["iPhone", "Android", "Accessories"]
  },
  {
    id: "laptops",
    name: "Laptops",
    description: "Professional and gaming laptops",
    image: "💻",
    productCount: 12,
    subcategories: ["MacBook", "Windows", "Gaming", "Business"]
  },
  {
    id: "headphones",
    name: "Headphones",
    description: "Wireless and wired audio solutions",
    image: "🎧",
    productCount: 8,
    subcategories: ["Wireless", "Noise Cancelling", "Gaming", "Studio"]
  },
  {
    id: "smartwatches",
    name: "Smartwatches",
    description: "Fitness and health tracking devices",
    image: "⌚",
    productCount: 6,
    subcategories: ["Apple Watch", "Fitness", "Luxury", "Sports"]
  },
  {
    id: "cameras",
    name: "Cameras",
    description: "Professional and amateur photography equipment",
    image: "📷",
    productCount: 10,
    subcategories: ["DSLR", "Mirrorless", "Action", "Lenses"]
  },
  {
    id: "gaming",
    name: "Gaming",
    description: "Gaming consoles and accessories",
    image: "🎮",
    productCount: 7,
    subcategories: ["Consoles", "Controllers", "VR", "PC Gaming"]
  }
];

const deals = [
  {
    id: "summer-sale",
    title: "Summer Sale",
    description: "Up to 50% off on selected items",
    discount: 50,
    startDate: new Date('2024-06-01'),
    endDate: new Date('2025-12-31'),
    category: "all",
    image: "🌞",
    featured: true
  },
  {
    id: "tech-deals",
    title: "Tech Deals Week",
    description: "Special discounts on electronics",
    discount: 30,
    startDate: new Date('2024-07-01'),
    endDate: new Date('2025-12-31'),
    category: "smartphones",
    image: "📱",
    featured: true
  },
  {
    id: "gaming-weekend",
    title: "Gaming Weekend",
    description: "Gaming accessories at great prices",
    discount: 25,
    startDate: new Date('2024-07-15'),
    endDate: new Date('2025-12-31'),
    category: "gaming",
    image: "🎮",
    featured: false
  }
];

async function populateDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    const db = client.db(dbName);

    // Clear existing data
    await db.collection("products").deleteMany({});
    await db.collection("categories").deleteMany({});
    await db.collection("deals").deleteMany({});

    // Insert products
    const productsResult = await db.collection("products").insertMany(products);
    console.log(`📦 Inserted ${productsResult.insertedCount} products`);

    // Insert categories
    const categoriesResult = await db.collection("categories").insertMany(categories);
    console.log(`📂 Inserted ${categoriesResult.insertedCount} categories`);

    // Insert deals
    const dealsResult = await db.collection("deals").insertMany(deals);
    console.log(`🎯 Inserted ${dealsResult.insertedCount} deals`);

    console.log("🎉 Database populated successfully!");
    console.log("💡 Your e-commerce app is now ready with sample data!");

  } catch (error) {
    console.error("❌ Error populating database:", error);
  } finally {
    await client.close();
  }
}

populateDatabase(); 