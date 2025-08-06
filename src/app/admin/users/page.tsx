'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Shield, 
  Crown, 
  User, 
  Search, 
  Edit3, 
  Trash2,
  Check,
  X,
  Grid3X3,
  List,
  AlertTriangle
} from 'lucide-react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin' | 'super-admin';
  isActive: boolean;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [newRole, setNewRole] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const response = await fetch('/api/admin/users/change-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, newRole }),
      });

      const data = await response.json();

      if (data.success) {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, role: newRole as 'user' | 'admin' | 'super-admin' } : user
        ));
        setEditingUser(null);
        setShowSuccess(true);
        setSuccessMessage(data.message);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Error updating user role');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      setDeleting(true);
      console.log('Attempting to delete user:', userId);
      
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      console.log('Delete response:', data);

      if (data.success) {
        setUsers(users.filter(user => user.id !== userId));
        setShowDeleteConfirm(null);
        setShowSuccess(true);
        setSuccessMessage('User deleted successfully');
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        console.error('Delete failed:', data.message);
        alert(`Failed to delete user: ${data.message}\n\nPlease check the console for more details.`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user. Please check the console for details.');
    } finally {
      setDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    try {
      setDeleting(true);
      console.log('Attempting to bulk delete users:', selectedUsers);
      
      const response = await fetch('/api/admin/users/bulk-delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userIds: selectedUsers }),
      });

      const data = await response.json();
      console.log('Bulk delete response:', data);

      if (data.success) {
        setUsers(users.filter(user => !selectedUsers.includes(user.id)));
        setSelectedUsers([]);
        setShowBulkDeleteConfirm(false);
        setShowSuccess(true);
        setSuccessMessage(`${selectedUsers.length} users deleted successfully`);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        console.error('Bulk delete failed:', data.message);
        alert(`Failed to delete users: ${data.message}`);
      }
    } catch (error) {
      console.error('Error bulk deleting users:', error);
      alert('Error deleting users. Please check the console for details.');
    } finally {
      setDeleting(false);
    }
  };

  const handleSelectAll = () => {
    const allFilteredUserIds = filteredUsers.map(user => user.id);
    const allSelected = allFilteredUserIds.every(id => selectedUsers.includes(id));
    
    if (allSelected) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(allFilteredUserIds);
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super-admin':
        return <Crown className="w-4 h-4 text-yellow-500" />;
      case 'admin':
        return <Shield className="w-4 h-4 text-blue-500" />;
      default:
        return <User className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super-admin':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'admin':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          </div>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>

        {/* Search and Controls */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users by email, name, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Selection Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handleSelectAll}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                {filteredUsers.length > 0 && filteredUsers.every(user => selectedUsers.includes(user.id)) 
                  ? 'Deselect All' 
                  : 'Select All'
                }
              </button>
              {selectedUsers.length > 0 && (
                <span className="text-sm text-gray-600">
                  {selectedUsers.length} of {filteredUsers.length} selected
                </span>
              )}
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-blue-900">
                  {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedUsers([])}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-600 flex items-center gap-2"
                  disabled={deleting}
                >
                  <X className="w-4 h-4" />
                  Clear Selection
                </button>
                <button
                  onClick={() => setShowBulkDeleteConfirm(true)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 flex items-center gap-2"
                  disabled={deleting}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Selected
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Success Message */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
          >
            {successMessage}
          </motion.div>
        )}

        {/* Users Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                {/* User Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.firstName?.[0] || user.email[0].toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {user.firstName && user.lastName 
                          ? `${user.firstName} ${user.lastName}`
                          : user.email
                        }
                      </h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  {getRoleIcon(user.role)}
                </div>

                {/* Role Badge */}
                <div className="mb-4">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                    {getRoleIcon(user.role)}
                    {user.role}
                  </span>
                </div>

                {/* User Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Status:</span>
                    <span className={user.isActive ? 'text-green-600' : 'text-red-600'}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Joined:</span>
                    <span className="text-gray-900">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  {editingUser === user.id ? (
                    <div className="space-y-3">
                                                    <select
                                value={newRole}
                                onChange={(e) => setNewRole(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option key="grid-select" value="">Select role...</option>
                                <option key="grid-user" value="user">User</option>
                                <option key="grid-admin" value="admin">Admin</option>
                                <option key="grid-super-admin" value="super-admin">Super Admin</option>
                              </select>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRoleChange(user.id, newRole)}
                          disabled={!newRole}
                          className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingUser(null);
                            setNewRole('');
                          }}
                          className="flex-1 bg-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-400 flex items-center justify-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingUser(user.id);
                          setNewRole(user.role);
                        }}
                        className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 flex items-center justify-center gap-2"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit Role
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(user.id)}
                        className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-200 flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Select</span>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleSelectUser(user.id)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                            {user.firstName?.[0] || user.email[0].toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {user.firstName && user.lastName 
                                ? `${user.firstName} ${user.lastName}`
                                : user.email
                              }
                            </div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                          {getRoleIcon(user.role)}
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={user.isActive ? 'text-green-600' : 'text-red-600'}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          {editingUser === user.id ? (
                            <>
                              <select
                                value={newRole}
                                onChange={(e) => setNewRole(e.target.value)}
                                className="p-1 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option key="list-select" value="">Select role...</option>
                                <option key="list-user" value="user">User</option>
                                <option key="list-admin" value="admin">Admin</option>
                                <option key="list-super-admin" value="super-admin">Super Admin</option>
                              </select>
                              <button
                                onClick={() => handleRoleChange(user.id, newRole)}
                                disabled={!newRole}
                                className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => {
                                  setEditingUser(null);
                                  setNewRole('');
                                }}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  setEditingUser(user.id);
                                  setNewRole(user.role);
                                }}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Edit Role
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(user.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Try adjusting your search terms.' : 'No users in the system yet.'}
            </p>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <h3 className="text-lg font-medium text-gray-900">Delete User</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this user? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-400"
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteUser(showDeleteConfirm)}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 flex items-center justify-center gap-2"
                  disabled={deleting}
                >
                  {deleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Delete Confirmation Modal */}
        {showBulkDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <h3 className="text-lg font-medium text-gray-900">Delete Users</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''}? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowBulkDeleteConfirm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-400"
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 flex items-center justify-center gap-2"
                  disabled={deleting}
                >
                  {deleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete {selectedUsers.length} User{selectedUsers.length !== 1 ? 's' : ''}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 