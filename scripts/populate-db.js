import { MongoClient } from "mongodb";

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
    features: ["A17 Pro chip", "Titanium design", "5x optical zoom", "USB-C"],
    specifications: {
      screen: "6.7-inch Super Retina XDR",
      storage: "256GB",
      color: "Natural Titanium",
      battery: "Up to 29 hours"
    },
    images: ["iphone-15-pro-max-1.jpg", "iphone-15-pro-max-2.jpg"],
    createdAt: new Date(),
    updatedAt: new Date()
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
    features: ["M3 Pro chip", "14-inch Liquid Retina XDR", "Up to 22-core GPU", "Up to 96GB unified memory"],
    specifications: {
      processor: "M3 Pro chip",
      memory: "18GB unified memory",
      storage: "512GB SSD",
      display: "14-inch Liquid Retina XDR"
    },
    images: ["macbook-pro-14-1.jpg", "macbook-pro-14-2.jpg"],
    createdAt: new Date(),
    updatedAt: new Date()
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
    features: ["Industry-leading noise canceling", "30-hour battery life", "Quick Charge", "Multipoint connection"],
    specifications: {
      battery: "Up to 30 hours",
      weight: "250g",
      connectivity: "Bluetooth 5.2",
      codecs: "LDAC, AAC, SBC"
    },
    images: ["sony-wh-1000xm5-1.jpg", "sony-wh-1000xm5-2.jpg"],
    createdAt: new Date(),
    updatedAt: new Date()
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
    features: ["ECG monitoring", "Blood oxygen tracking", "Always-On Retina display", "Water resistant"],
    specifications: {
      display: "Always-On Retina display",
      battery: "Up to 18 hours",
      size: "45mm",
      material: "Aluminum"
    },
    images: ["apple-watch-9-1.jpg", "apple-watch-9-2.jpg"],
    createdAt: new Date(),
    updatedAt: new Date()
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
    features: ["Full-frame sensor", "4K video recording", "Dual card slots", "Weather sealed"],
    specifications: {
      sensor: "24.2MP Full-frame CMOS",
      video: "4K 60p",
      autofocus: "Dual Pixel CMOS AF II",
      connectivity: "Wi-Fi, Bluetooth"
    },
    images: ["canon-r6-ii-1.jpg", "canon-r6-ii-2.jpg"],
    createdAt: new Date(),
    updatedAt: new Date()
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
    features: ["4K gaming", "Ray tracing", "3D audio", "DualSense controller"],
    specifications: {
      storage: "825GB SSD",
      resolution: "Up to 4K",
      frameRate: "Up to 120fps",
      controller: "DualSense wireless controller"
    },
    images: ["ps5-1.jpg", "ps5-2.jpg"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "samsung-galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    price: 1199.99,
    originalPrice: 1399.99,
    category: "smartphones",
    image: "📱",
    description: "AI-powered smartphone with S Pen and 200MP camera.",
    rating: 4.8,
    reviews: 567,
    badge: "Premium",
    stock: 35,
    features: ["200MP camera", "S Pen", "AI features", "5G connectivity"],
    specifications: {
      display: "6.8-inch Dynamic AMOLED 2X",
      storage: "256GB",
      battery: "5000mAh",
      camera: "200MP main camera"
    },
    images: ["samsung-s24-ultra-1.jpg", "samsung-s24-ultra-2.jpg"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "airpods-pro-2nd-gen",
    name: "AirPods Pro (2nd generation)",
    price: 249.99,
    originalPrice: 299.99,
    category: "headphones",
    image: "🎧",
    description: "Active noise cancellation with spatial audio and sweat resistance.",
    rating: 4.7,
    reviews: 892,
    badge: "Best Seller",
    stock: 80,
    features: ["Active noise cancellation", "Spatial audio", "Sweat and water resistant", "MagSafe charging case"],
    specifications: {
      battery: "Up to 6 hours",
      case: "MagSafe charging case",
      connectivity: "Bluetooth 5.0",
      compatibility: "iPhone, iPad, Mac"
    },
    images: ["airpods-pro-1.jpg", "airpods-pro-2.jpg"],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const categories = [
  {
    id: "smartphones",
    name: "Smartphones",
    icon: "📱",
    count: 234,
    color: "#3b82f6",
    gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    description: "Latest smartphones with cutting-edge technology"
  },
  {
    id: "laptops",
    name: "Laptops",
    icon: "💻",
    count: 156,
    color: "#10b981",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    description: "Powerful laptops for work and gaming"
  },
  {
    id: "cameras",
    name: "Cameras",
    icon: "📷",
    count: 89,
    color: "#ef4444",
    gradient: "linear-gradient(135deg, #ef4444, #dc2626)",
    description: "Professional cameras and lenses"
  },
  {
    id: "headphones",
    name: "Headphones",
    icon: "🎧",
    count: 178,
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    description: "High-quality audio equipment"
  },
  {
    id: "smartwatches",
    name: "Smartwatches",
    icon: "⌚",
    count: 92,
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
    description: "Smart wearables for health and fitness"
  },
  {
    id: "gaming",
    name: "Gaming",
    icon: "🎮",
    count: 145,
    color: "#06b6d4",
    gradient: "linear-gradient(135deg, #06b6d4, #0891b2)",
    description: "Gaming consoles and accessories"
  }
];

const deals = [
  {
    id: "iphone-15-pro-max-deal",
    productId: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    originalPrice: 1499.99,
    salePrice: 1199.99,
    discount: 20,
    image: "📱",
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    description: "Limited time offer on the latest iPhone"
  },
  {
    id: "macbook-pro-deal",
    productId: "macbook-pro-14-m3",
    name: "MacBook Pro 14\" M3 Pro",
    originalPrice: 2199.99,
    salePrice: 1899.99,
    discount: 14,
    image: "💻",
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    description: "Professional laptop at unbeatable price"
  },
  {
    id: "sony-headphones-deal",
    productId: "sony-wh-1000xm5",
    name: "Sony WH-1000XM5 Wireless Headphones",
    originalPrice: 449.99,
    salePrice: 349.99,
    discount: 22,
    image: "🎧",
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    description: "Premium noise-canceling headphones"
  }
];

async function populateDatabase() {
  const client = new MongoClient(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db(dbName);

    // Clear existing collections
    await db.collection("products").deleteMany({});
    await db.collection("categories").deleteMany({});
    await db.collection("deals").deleteMany({});

    // Insert products
    const productsResult = await db.collection("products").insertMany(products);
    console.log(`Inserted ${productsResult.insertedCount} products`);

    // Insert categories
    const categoriesResult = await db.collection("categories").insertMany(categories);
    console.log(`Inserted ${categoriesResult.insertedCount} categories`);

    // Insert deals
    const dealsResult = await db.collection("deals").insertMany(deals);
    console.log(`Inserted ${dealsResult.insertedCount} deals`);

    console.log("Database populated successfully!");

  } catch (error) {
    console.error("Error populating database:", error);
  } finally {
    await client.close();
  }
}

populateDatabase(); 