// Browser Console Script to Test PayPal Order Creation
// Copy and paste this into your browser console on the checkout page

console.log('🚀 Testing PayPal Order Creation...');

// Test product data
const testProduct = {
  id: "prod-1754262546549-11aemjk0t",
  name: "Apple Watch Series 9",
  price: 399.99,
  image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=600&fit=crop",
  quantity: 2
};

// Add to cart
function addToCart() {
  // Get existing cart or create new one
  let cart = JSON.parse(localStorage.getItem('ultimate-ecommerce-cart') || '[]');
  
  // Add test product
  const existingItem = cart.find(item => item.id === testProduct.id);
  if (existingItem) {
    existingItem.quantity += testProduct.quantity;
  } else {
    cart.push(testProduct);
  }
  
  // Save to localStorage
  localStorage.setItem('ultimate-ecommerce-cart', JSON.stringify(cart));
  
  console.log('✅ Added test product to cart:', testProduct);
  console.log('📦 Current cart:', cart);
  
  // Reload the page to see the cart
  window.location.reload();
}

// Test PayPal order creation
function testPayPalOrder() {
  console.log('🧪 Testing PayPal order creation...');
  
  // Check if PayPal button exists
  const paypalButton = document.querySelector('[data-paypal-button]');
  if (paypalButton) {
    console.log('✅ PayPal button found');
    
    // Simulate clicking the PayPal button
    paypalButton.click();
    console.log('🖱️ Clicked PayPal button');
  } else {
    console.log('❌ PayPal button not found');
    console.log('Make sure you have items in cart and completed step 1');
  }
}

// Run the test
console.log('📋 Available functions:');
console.log('- addToCart() - Add test product to cart');
console.log('- testPayPalOrder() - Test PayPal order creation');

// Auto-add to cart if cart is empty
const currentCart = JSON.parse(localStorage.getItem('ultimate-ecommerce-cart') || '[]');
if (currentCart.length === 0) {
  console.log('🛒 Cart is empty, adding test product...');
  addToCart();
} else {
  console.log('📦 Cart already has items:', currentCart);
} 