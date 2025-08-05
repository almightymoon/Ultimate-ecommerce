'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle, AlertCircle, Github, Twitter, Shield } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      await register({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      router.push('/');
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const passwordStrength = () => {
    if (!formData.password) return { score: 0, text: '', color: '' };
    
    let score = 0;
    if (formData.password.length >= 8) score++;
    if (/[a-z]/.test(formData.password)) score++;
    if (/[A-Z]/.test(formData.password)) score++;
    if (/\d/.test(formData.password)) score++;
    if (/[^A-Za-z0-9]/.test(formData.password)) score++;

    if (score <= 2) return { score, text: 'Weak', color: 'text-red-500' };
    if (score <= 3) return { score, text: 'Fair', color: 'text-yellow-500' };
    if (score <= 4) return { score, text: 'Good', color: 'text-blue-500' };
    return { score, text: 'Strong', color: 'text-green-500' };
  };

  const strength = passwordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 pt-32">
      <div className="w-full max-w-lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg mx-auto">
                U
              </div>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Ultimate</h1>
            <p className="text-gray-600">Create your account and start shopping</p>
          </motion.div>

          {/* Social Signup Buttons */}
          <motion.div variants={itemVariants} className="space-y-3 mb-8">
            <button className="w-full bg-white border-2 border-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:border-purple-500 hover:text-purple-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-sm hover:shadow-md">
              <Github className="w-5 h-5" />
              Continue with GitHub
            </button>
            <button className="w-full bg-white border-2 border-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:border-purple-500 hover:text-purple-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-sm hover:shadow-md">
              <Twitter className="w-5 h-5" />
              Continue with Twitter
            </button>
          </motion.div>

          {/* Divider */}
          <motion.div variants={itemVariants} className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or sign up with email</span>
            </div>
          </motion.div>

          {/* Signup Form */}
          <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                  First name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                     <input
                     type="text"
                     id="firstName"
                     name="firstName"
                     value={formData.firstName}
                     onChange={handleInputChange}
                     className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 text-gray-900 placeholder-gray-500 ${
                       errors.firstName 
                         ? 'border-red-300 focus:border-red-500' 
                         : 'border-gray-200 focus:border-purple-500'
                     }`}
                     placeholder="John"
                   />
                </div>
                {errors.firstName && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1 mt-2 text-red-600 text-sm"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.firstName}
                  </motion.div>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Last name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                     <input
                     type="text"
                     id="lastName"
                     name="lastName"
                     value={formData.lastName}
                     onChange={handleInputChange}
                     className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 text-gray-900 placeholder-gray-500 ${
                       errors.lastName 
                         ? 'border-red-300 focus:border-red-500' 
                         : 'border-gray-200 focus:border-purple-500'
                     }`}
                     placeholder="Doe"
                   />
                </div>
                {errors.lastName && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1 mt-2 text-red-600 text-sm"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.lastName}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                 <input
                   type="email"
                   id="email"
                   name="email"
                   value={formData.email}
                   onChange={handleInputChange}
                   className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 text-gray-900 placeholder-gray-500 ${
                     errors.email 
                       ? 'border-red-300 focus:border-red-500' 
                       : 'border-gray-200 focus:border-purple-500'
                   }`}
                   placeholder="john@example.com"
                 />
                {errors.email && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1 mt-2 text-red-600 text-sm"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                 <input
                   type={showPassword ? 'text' : 'password'}
                   id="password"
                   name="password"
                   value={formData.password}
                   onChange={handleInputChange}
                   className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 text-gray-900 placeholder-gray-500 ${
                     errors.password 
                       ? 'border-red-300 focus:border-red-500' 
                       : 'border-gray-200 focus:border-purple-500'
                   }`}
                   placeholder="Create a strong password"
                 />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2"
                >
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Password strength:</span>
                    <span className={strength.color}>{strength.text}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        strength.score <= 2 ? 'bg-red-500' :
                        strength.score <= 3 ? 'bg-yellow-500' :
                        strength.score <= 4 ? 'bg-blue-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${(strength.score / 5) * 100}%` }}
                    ></div>
                  </div>
                </motion.div>
              )}

              {errors.password && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1 mt-2 text-red-600 text-sm"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </motion.div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                 <input
                   type={showConfirmPassword ? 'text' : 'password'}
                   id="confirmPassword"
                   name="confirmPassword"
                   value={formData.confirmPassword}
                   onChange={handleInputChange}
                   className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 text-gray-900 placeholder-gray-500 ${
                     errors.confirmPassword 
                       ? 'border-red-300 focus:border-red-500' 
                       : 'border-gray-200 focus:border-purple-500'
                   }`}
                   placeholder="Confirm your password"
                 />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {errors.confirmPassword && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1 mt-2 text-red-600 text-sm"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.confirmPassword}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-0.5"
                />
                <div className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="/terms" className="text-purple-600 hover:text-purple-700 font-medium">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-purple-600 hover:text-purple-700 font-medium">
                    Privacy Policy
                  </Link>
                </div>
              </label>
              {errors.agreeToTerms && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1 mt-2 text-red-600 text-sm"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.agreeToTerms}
                </motion.div>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Sign In Link */}
          <motion.div variants={itemVariants} className="text-center mt-8 pt-6 border-t border-gray-100">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div variants={itemVariants} className="mt-8 space-y-3">
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm font-semibold text-purple-800">Secure & Private</p>
                  <p className="text-xs text-purple-600">Your data is protected with bank-level security</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-semibold text-green-800">Free Forever</p>
                  <p className="text-xs text-green-600">No hidden fees, no credit card required</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 