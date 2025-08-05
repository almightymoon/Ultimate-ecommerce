// Mock data store that persists across API requests
// In a real application, this would be replaced with a database

let mockOrders = [
  {
    _id: 'order_001',
    userId: 'user_123',
    items: [
      {
        productId: 'prod_001',
        name: 'Premium Wireless Headphones',
        price: 299.99,
        quantity: 1,
        image: '/images/headphones.jpg'
      },
      {
        productId: 'prod_002',
        name: 'Smart Watch Pro',
        price: 199.99,
        quantity: 2,
        image: '/images/smartwatch.jpg'
      }
    ],
    total: 699.97,
    status: 'delivered',
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    paymentMethod: 'paypal',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-18T14:20:00Z'
  },
  {
    _id: 'order_002',
    userId: 'user_456',
    items: [
      {
        productId: 'prod_003',
        name: 'Laptop Stand',
        price: 49.99,
        quantity: 1,
        image: '/images/laptop-stand.jpg'
      }
    ],
    total: 49.99,
    status: 'shipped',
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    paymentMethod: 'credit_card',
    createdAt: '2024-01-16T09:15:00Z',
    updatedAt: '2024-01-17T11:45:00Z'
  },
  {
    _id: 'order_003',
    userId: 'user_789',
    items: [
      {
        productId: 'prod_004',
        name: 'Wireless Mouse',
        price: 29.99,
        quantity: 3,
        image: '/images/mouse.jpg'
      },
      {
        productId: 'prod_005',
        name: 'Mechanical Keyboard',
        price: 129.99,
        quantity: 1,
        image: '/images/keyboard.jpg'
      }
    ],
    total: 219.96,
    status: 'processing',
    shippingAddress: {
      street: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    },
    paymentMethod: 'paypal',
    createdAt: '2024-01-17T16:20:00Z',
    updatedAt: '2024-01-17T16:20:00Z'
  },
  {
    _id: 'order_004',
    userId: 'user_101',
    items: [
      {
        productId: 'prod_006',
        name: 'USB-C Cable',
        price: 12.99,
        quantity: 5,
        image: '/images/cable.jpg'
      }
    ],
    total: 64.95,
    status: 'pending',
    shippingAddress: {
      street: '101 Tech Blvd',
      city: 'Austin',
      state: 'TX',
      zipCode: '73301',
      country: 'USA'
    },
    paymentMethod: 'paypal',
    createdAt: '2024-01-18T08:45:00Z',
    updatedAt: '2024-01-18T08:45:00Z'
  },
  {
    _id: 'order_005',
    userId: 'user_202',
    items: [
      {
        productId: 'prod_007',
        name: 'Gaming Monitor',
        price: 399.99,
        quantity: 1,
        image: '/images/monitor.jpg'
      }
    ],
    total: 399.99,
    status: 'cancelled',
    shippingAddress: {
      street: '202 Game St',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'USA'
    },
    paymentMethod: 'credit_card',
    createdAt: '2024-01-14T12:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  }
];

// Helper functions to manage the mock data
export const getOrders = () => [...mockOrders];

export const getOrderById = (id) => mockOrders.find(order => order._id === id);

export const updateOrder = (id, updateData) => {
  const orderIndex = mockOrders.findIndex(order => order._id === id);
  if (orderIndex === -1) return null;
  
  mockOrders[orderIndex] = {
    ...mockOrders[orderIndex],
    ...updateData,
    updatedAt: new Date().toISOString()
  };
  
  return mockOrders[orderIndex];
};

export const deleteOrder = (id) => {
  const orderIndex = mockOrders.findIndex(order => order._id === id);
  if (orderIndex === -1) return false;
  
  mockOrders.splice(orderIndex, 1);
  return true;
};

export const deleteOrders = (ids) => {
  const initialLength = mockOrders.length;
  mockOrders = mockOrders.filter(order => !ids.includes(order._id));
  return initialLength - mockOrders.length;
};

export const createOrder = (orderData) => {
  const newOrder = {
    _id: `order_${Date.now()}`,
    ...orderData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  mockOrders.push(newOrder);
  return newOrder;
}; 