'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const faqData: FAQItem[] = [
    // Account & Orders
    {
      id: '1',
      question: 'How do I create an account?',
      answer: 'You can create an account by clicking the "Sign Up" button in the top navigation. Fill in your details including name, email, and password. You can also sign up using Google or Facebook for a faster process.',
      category: 'Account & Orders',
      tags: ['account', 'signup', 'registration']
    },
    {
      id: '2',
      question: 'How do I track my order?',
      answer: 'You can track your order by logging into your account and visiting the "My Orders" section. You\'ll also receive email updates with tracking information once your order ships.',
      category: 'Account & Orders',
      tags: ['tracking', 'orders', 'shipping']
    },
    {
      id: '3',
      question: 'Can I cancel or modify my order?',
      answer: 'You can modify or cancel your order within 1 hour of placement by contacting our customer service team. After that, orders are processed and cannot be changed.',
      category: 'Account & Orders',
      tags: ['cancel', 'modify', 'orders']
    },
    {
      id: '4',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Products must be in original condition with all packaging intact. Some items like electronics may have different return terms.',
      category: 'Account & Orders',
      tags: ['returns', 'refunds', 'policy']
    },
    // Payment & Billing
    {
      id: '5',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers for business accounts.',
      category: 'Payment & Billing',
      tags: ['payment', 'credit cards', 'paypal']
    },
    {
      id: '6',
      question: 'Is my payment information secure?',
      answer: 'Absolutely! We use industry-standard SSL encryption and never store your payment information on our servers. All transactions are processed through secure payment gateways.',
      category: 'Payment & Billing',
      tags: ['security', 'encryption', 'payment']
    },
    {
      id: '7',
      question: 'Do you offer installment payments?',
      answer: 'Yes, we offer installment payment options through Klarna and Afterpay for eligible purchases. You can select this option during checkout.',
      category: 'Payment & Billing',
      tags: ['installments', 'klarna', 'afterpay']
    },
    // Shipping & Delivery
    {
      id: '8',
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days. Express shipping (1-2 business days) and overnight shipping are also available for an additional fee.',
      category: 'Shipping & Delivery',
      tags: ['shipping', 'delivery', 'timing']
    },
    {
      id: '9',
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can check shipping rates during checkout.',
      category: 'Shipping & Delivery',
      tags: ['international', 'shipping', 'countries']
    },
    {
      id: '10',
      question: 'Is shipping free?',
      answer: 'Free shipping is available on orders over $50. For orders under $50, standard shipping costs $5.99. Premium members get free shipping on all orders.',
      category: 'Shipping & Delivery',
      tags: ['free shipping', 'costs', 'premium']
    },
    // Products & Inventory
    {
      id: '11',
      question: 'Are your products authentic?',
      answer: 'Yes, all our products are 100% authentic and sourced directly from authorized manufacturers and distributors. We never sell counterfeit or replica items.',
      category: 'Products & Inventory',
      tags: ['authentic', 'genuine', 'quality']
    },
    {
      id: '12',
      question: 'What if an item is out of stock?',
      answer: 'If an item is out of stock, you can join the waitlist to be notified when it becomes available. We also offer similar alternatives and restock popular items regularly.',
      category: 'Products & Inventory',
      tags: ['out of stock', 'waitlist', 'restock']
    },
    {
      id: '13',
      question: 'Do you offer product warranties?',
      answer: 'Most products come with manufacturer warranties. Electronics typically have 1-2 year warranties. We also offer extended warranty options for additional protection.',
      category: 'Products & Inventory',
      tags: ['warranty', 'protection', 'electronics']
    },
    // Technical Support
    {
      id: '14',
      question: 'How do I contact customer support?',
      answer: 'You can contact us through our contact form, email at support@ultimateecommerce.com, or call us at +1 (555) 123-4567. We also offer live chat support during business hours.',
      category: 'Technical Support',
      tags: ['support', 'contact', 'help']
    },
    {
      id: '15',
      question: 'What are your customer service hours?',
      answer: 'Our customer service team is available Monday-Friday 9:00 AM - 6:00 PM EST, Saturday 10:00 AM - 4:00 PM EST. We\'re closed on Sundays and major holidays.',
      category: 'Technical Support',
      tags: ['hours', 'availability', 'service']
    },
    {
      id: '16',
      question: 'Can I get help with product setup?',
      answer: 'Yes, we offer product setup assistance for complex items. You can schedule a video call with our technical support team or access our detailed setup guides.',
      category: 'Technical Support',
      tags: ['setup', 'installation', 'technical']
    }
  ];

  const categories = ['all', 'Account & Orders', 'Payment & Billing', 'Shipping & Delivery', 'Products & Inventory', 'Technical Support'];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '8px'
            }}>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>U</span>
            </div>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#22c55e' }}>UltimateEcommerce</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/" style={{ padding: '8px 16px', color: '#374151', textDecoration: 'none' }}>← Back to Home</Link>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '700', color: '#111827', marginBottom: '1rem' }}>
            Frequently Asked <span style={{
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Questions</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Find quick answers to common questions about our products, services, and policies.
          </p>
        </div>

        {/* Search and Filter */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', marginBottom: '3rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'end' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                Search FAQ
              </label>
              <input
                type="text"
                placeholder="Search for questions, answers, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: 'white',
                  minWidth: '200px'
                }}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: '#6b7280', fontSize: '1rem' }}>
            Showing {filteredFAQs.length} of {faqData.length} questions
          </p>
        </div>

        {/* FAQ Items */}
        <div style={{ marginBottom: '3rem' }}>
          {filteredFAQs.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredFAQs.map((faq) => (
                <div key={faq.id} style={{
                  background: 'white',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <button
                    onClick={() => toggleItem(faq.id)}
                    style={{
                      width: '100%',
                      padding: '1.5rem',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                        {faq.question}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{
                          background: '#f3f4f6',
                          color: '#374151',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: '500'
                        }}>
                          {faq.category}
                        </span>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          {faq.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} style={{
                              background: '#dcfce7',
                              color: '#15803d',
                              padding: '0.125rem 0.375rem',
                              borderRadius: '4px',
                              fontSize: '0.75rem'
                            }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span style={{
                      fontSize: '1.5rem',
                      color: '#6b7280',
                      transition: 'transform 0.3s ease',
                      transform: expandedItems.has(faq.id) ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}>
                      ▼
                    </span>
                  </button>
                  {expandedItems.has(faq.id) && (
                    <div style={{
                      padding: '0 1.5rem 1.5rem',
                      borderTop: '1px solid #f3f4f6'
                    }}>
                      <p style={{ color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', background: 'white', borderRadius: '16px', padding: '4rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
                No questions found
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                Try adjusting your search terms or category filter to find what you&apos;re looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#22c55e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Contact Support Section */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '3rem', marginBottom: '3rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#111827', marginBottom: '1rem' }}>
              Still Need Help?
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto' }}>
              Our customer support team is here to help you with any questions not covered in our FAQ.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/contact" style={{
                padding: '1rem 2rem',
                backgroundColor: '#22c55e',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.125rem',
                fontWeight: '600',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-block'
              }}>
                Contact Support
              </a>
              <a href="mailto:support@ultimateecommerce.com" style={{
                padding: '1rem 2rem',
                backgroundColor: 'transparent',
                color: '#22c55e',
                border: '2px solid #22c55e',
                borderRadius: '12px',
                fontSize: '1.125rem',
                fontWeight: '600',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-block'
              }}>
                Send Email
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '1.5rem', textAlign: 'center' }}>
            Quick Links
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { title: 'Order Tracking', href: '/orders', icon: '📦' },
              { title: 'Return Policy', href: '/returns', icon: '🔄' },
              { title: 'Shipping Info', href: '/shipping', icon: '🚚' },
              { title: 'Payment Methods', href: '/payment', icon: '💳' },
              { title: 'Contact Us', href: '/contact', icon: '📞' },
              { title: 'About Us', href: '/about', icon: 'ℹ️' }
            ].map((link, index) => (
              <a key={index} href={link.href} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                background: '#f9fafb',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#374151',
                transition: 'all 0.2s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f3f4f6';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f9fafb';
              }}>
                <span style={{ fontSize: '1.25rem' }}>{link.icon}</span>
                <span style={{ fontWeight: '500' }}>{link.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 