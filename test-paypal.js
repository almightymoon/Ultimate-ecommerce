// Test script to add items to cart and test PayPal order creation
const testProduct = {
  id: "prod-1754262546549-11aemjk0t",
  name: "Apple Watch Series 9",
  price: 399.99,
  image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=600&fit=crop",
  quantity: 2
};

// Add to cart
if (typeof window !== 'undefined') {
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
  
  console.log('Added test product to cart:', testProduct);
  console.log('Current cart:', cart);
  
  // Redirect to checkout
  window.location.href = '/checkout';
} else {
  console.log('This script should be run in the browser');
} 