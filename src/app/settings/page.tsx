'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  Bell, 
  Shield, 
  Eye, 
  EyeOff, 
  Lock, 
  User, 
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export default function SettingsPage() {
  const { state: authState, updateUser } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('account');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [accountSettings, setAccountSettings] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    language: 'en',
    timezone: 'UTC'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    pushNotifications: true,
    smsNotifications: false
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowAnalytics: true,
    allowMarketing: false
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (!authState.isAuthenticated) {
      router.push('/login');
      return;
    }

    if (authState.user) {
      const [firstName, ...lastNameParts] = (authState.user.name || '').split(' ');
      setAccountSettings({
        firstName: firstName || '',
        lastName: lastNameParts.join(' ') || '',
        email: authState.user.email || '',
        phone: '',
        language: 'en',
        timezone: 'UTC'
      });
    }
  }, [authState, router]);

  const handleAccountSave = async () => {
    setIsLoading(true);
    try {
      await       updateUser({
        name: `${accountSettings.firstName} ${accountSettings.lastName}`,
        email: accountSettings.email
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating account:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    try {
      // Here you would typically call an API to change password
      console.log('Password change requested');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error changing password:', error);
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

  if (!authState.isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600">Manage your account preferences and security</p>
          </motion.div>

          {/* Success Message */}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-800">Settings saved successfully!</span>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('account')}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                      activeTab === 'account' 
                        ? 'bg-purple-50 text-purple-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span>Account</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                      activeTab === 'notifications' 
                        ? 'bg-purple-50 text-purple-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Bell className="w-5 h-5" />
                    <span>Notifications</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('privacy')}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                      activeTab === 'privacy' 
                        ? 'bg-purple-50 text-purple-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Shield className="w-5 h-5" />
                    <span>Privacy</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                      activeTab === 'security' 
                        ? 'bg-purple-50 text-purple-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Lock className="w-5 h-5" />
                    <span>Security</span>
                  </button>
                </nav>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                {/* Account Settings */}
                {activeTab === 'account' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            value={accountSettings.firstName}
                            onChange={(e) => setAccountSettings(prev => ({ ...prev, firstName: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={accountSettings.lastName}
                            onChange={(e) => setAccountSettings(prev => ({ ...prev, lastName: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={accountSettings.email}
                            onChange={(e) => setAccountSettings(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={accountSettings.phone}
                            onChange={(e) => setAccountSettings(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Language
                          </label>
                          <select
                            value={accountSettings.language}
                            onChange={(e) => setAccountSettings(prev => ({ ...prev, language: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          >
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Timezone
                          </label>
                          <select
                            value={accountSettings.timezone}
                            onChange={(e) => setAccountSettings(prev => ({ ...prev, timezone: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          >
                            <option value="UTC">UTC</option>
                            <option value="EST">Eastern Time</option>
                            <option value="PST">Pacific Time</option>
                            <option value="GMT">GMT</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={handleAccountSave}
                          disabled={isLoading}
                          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                        >
                          {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h3 className="font-medium text-gray-900">Email Notifications</h3>
                            <p className="text-sm text-gray-600">Receive notifications via email</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notificationSettings.emailNotifications}
                              onChange={(e) => setNotificationSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h3 className="font-medium text-gray-900">Order Updates</h3>
                            <p className="text-sm text-gray-600">Get notified about order status changes</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notificationSettings.orderUpdates}
                              onChange={(e) => setNotificationSettings(prev => ({ ...prev, orderUpdates: e.target.checked }))}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h3 className="font-medium text-gray-900">Promotional Offers</h3>
                            <p className="text-sm text-gray-600">Receive special offers and discounts</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notificationSettings.promotions}
                              onChange={(e) => setNotificationSettings(prev => ({ ...prev, promotions: e.target.checked }))}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h3 className="font-medium text-gray-900">Newsletter</h3>
                            <p className="text-sm text-gray-600">Subscribe to our monthly newsletter</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notificationSettings.newsletter}
                              onChange={(e) => setNotificationSettings(prev => ({ ...prev, newsletter: e.target.checked }))}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => {
                            setShowSuccess(true);
                            setTimeout(() => setShowSuccess(false), 3000);
                          }}
                          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                        >
                          Save Preferences
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Privacy Settings */}
                {activeTab === 'privacy' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy Settings</h2>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Profile Visibility
                          </label>
                          <select
                            value={privacySettings.profileVisibility}
                            onChange={(e) => setPrivacySettings(prev => ({ ...prev, profileVisibility: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          >
                            <option value="public">Public</option>
                            <option value="friends">Friends Only</option>
                            <option value="private">Private</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h3 className="font-medium text-gray-900">Show Email Address</h3>
                            <p className="text-sm text-gray-600">Allow others to see your email address</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={privacySettings.showEmail}
                              onChange={(e) => setPrivacySettings(prev => ({ ...prev, showEmail: e.target.checked }))}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h3 className="font-medium text-gray-900">Analytics & Performance</h3>
                            <p className="text-sm text-gray-600">Help us improve by sharing usage data</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={privacySettings.allowAnalytics}
                              onChange={(e) => setPrivacySettings(prev => ({ ...prev, allowAnalytics: e.target.checked }))}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => {
                            setShowSuccess(true);
                            setTimeout(() => setShowSuccess(false), 3000);
                          }}
                          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                        >
                          Save Privacy Settings
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Settings */}
                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>
                    <div className="space-y-8">
                      {/* Change Password */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Current Password
                            </label>
                            <div className="relative">
                              <input
                                type={showCurrentPassword ? 'text' : 'password'}
                                value={passwordForm.currentPassword}
                                onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                              <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              New Password
                            </label>
                            <div className="relative">
                              <input
                                type={showNewPassword ? 'text' : 'password'}
                                value={passwordForm.newPassword}
                                onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                              <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Confirm New Password
                            </label>
                            <div className="relative">
                              <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={passwordForm.confirmPassword}
                                onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <button
                              onClick={handlePasswordChange}
                              disabled={isLoading}
                              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                            >
                              {isLoading ? 'Changing...' : 'Change Password'}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Two-Factor Authentication */}
                      <div className="border-t border-gray-200 pt-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-yellow-800">Enhanced Security</h4>
                              <p className="text-sm text-yellow-700 mt-1">
                                Two-factor authentication adds an extra layer of security to your account. 
                                This feature will be available in the next update.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 