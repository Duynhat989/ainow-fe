<template>
    <div class="profile-page">
      <div class="container">
        <h1 class="page-title">My Profile</h1>
        <p class="page-subtitle">Manage your personal information and account settings</p>
  
        <div class="profile-container">
          <!-- Profile Sidebar -->
          <div class="profile-sidebar">
            <div class="profile-avatar-section">
              <div class="profile-avatar">
                <img :src="user.avatar || '/images/default-avatar.png'" alt="Profile Picture">
                <div class="avatar-overlay" @click="triggerFileInput">
                  <span>Change Photo</span>
                </div>
                <input 
                  type="file" 
                  ref="fileInput" 
                  class="avatar-file-input" 
                  accept="image/*" 
                  @change="handleAvatarChange" 
                />
              </div>
              <h2 class="profile-name">{{ user.fullName }}</h2>
              <p class="profile-role">{{ formatRole(user.role) }}</p>
            </div>
  
            <div class="profile-menu">
              <button 
                class="menu-item" 
                :class="{ active: activeSection === 'personal' }"
                @click="activeSection = 'personal'"
              >
                <span class="menu-icon">👤</span>
                <span>Personal Information</span>
              </button>
              
              <button 
                class="menu-item" 
                :class="{ active: activeSection === 'security' }"
                @click="activeSection = 'security'"
              >
                <span class="menu-icon">🔒</span>
                <span>Security</span>
              </button>
              
              <button 
                class="menu-item" 
                :class="{ active: activeSection === 'preferences' }"
                @click="activeSection = 'preferences'"
              >
                <span class="menu-icon">⚙️</span>
                <span>Preferences</span>
              </button>
              
              <button 
                class="menu-item" 
                :class="{ active: activeSection === 'billing' }"
                @click="activeSection = 'billing'"
              >
                <span class="menu-icon">💳</span>
                <span>Billing & Plans</span>
              </button>
            </div>
  
            <div class="account-status">
              <div class="status-indicator" :class="{ active: user.isActive }"></div>
              <span>Account Status: {{ user.isActive ? 'Active' : 'Inactive' }}</span>
            </div>
          </div>
  
          <!-- Profile Content -->
          <div class="profile-content">
            <!-- Personal Information Section -->
            <div v-if="activeSection === 'personal'" class="profile-section">
              <div class="section-header">
                <h3>Personal Information</h3>
                <p>Manage your personal details and contact information</p>
              </div>
              
              <form @submit.prevent="savePersonalInfo" class="profile-form">
                <div class="form-group">
                  <label for="fullName">Full Name</label>
                  <input 
                    type="text" 
                    id="fullName" 
                    v-model="formData.fullName" 
                    required
                  />
                </div>
                
                <div class="form-group">
                  <label for="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="formData.email" 
                    required
                  />
                </div>
                
                <div class="form-group">
                  <label for="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    v-model="formData.phone"
                  />
                </div>
                
                <div class="form-group">
                  <label for="address">Address</label>
                  <textarea 
                    id="address" 
                    v-model="formData.address" 
                    rows="3"
                  ></textarea>
                </div>
                
                <div class="form-actions">
                  <button 
                    type="button" 
                    class="btn-secondary" 
                    @click="resetForm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    class="btn-primary"
                    :disabled="!formChanged"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
  
            <!-- Security Section -->
            <div v-if="activeSection === 'security'" class="profile-section">
              <div class="section-header">
                <h3>Security Settings</h3>
                <p>Manage your password and account security preferences</p>
              </div>
              
              <div class="security-options">
                <div class="security-card">
                  <div class="card-header">
                    <h4>Change Password</h4>
                    <p>Update your password to keep your account secure</p>
                  </div>
                  
                  <form @submit.prevent="changePassword" class="password-form">
                    <div class="form-group">
                      <label for="currentPassword">Current Password</label>
                      <input 
                        type="password" 
                        id="currentPassword" 
                        v-model="passwordData.currentPassword" 
                        required
                      />
                    </div>
                    
                    <div class="form-group">
                      <label for="newPassword">New Password</label>
                      <input 
                        type="password" 
                        id="newPassword" 
                        v-model="passwordData.newPassword" 
                        required
                      />
                    </div>
                    
                    <div class="form-group">
                      <label for="confirmPassword">Confirm New Password</label>
                      <input 
                        type="password" 
                        id="confirmPassword" 
                        v-model="passwordData.confirmPassword" 
                        required
                      />
                    </div>
                    
                    <button type="submit" class="btn-primary">Update Password</button>
                  </form>
                </div>
                
                <div class="security-card">
                  <div class="card-header">
                    <h4>Connected Accounts</h4>
                    <p>Manage third-party services connected to your account</p>
                  </div>
                  
                  <div class="connected-account">
                    <div class="account-info">
                      <div class="account-icon google">G</div>
                      <div class="account-details">
                        <h5>Google</h5>
                        <p>{{ user.googleId ? 'Connected' : 'Not connected' }}</p>
                      </div>
                    </div>
                    
                    <button 
                      class="btn-link" 
                      @click="toggleGoogleConnection"
                    >
                      {{ user.googleId ? 'Disconnect' : 'Connect' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Preferences Section -->
            <div v-if="activeSection === 'preferences'" class="profile-section">
              <div class="section-header">
                <h3>Preferences</h3>
                <p>Customize your experience with our platform</p>
              </div>
              
              <div class="preferences-form">
                <div class="preference-item">
                  <div class="preference-info">
                    <h4>Email Notifications</h4>
                    <p>Receive updates, tips, and promotional offers via email</p>
                  </div>
                  
                  <label class="toggle-switch">
                    <input type="checkbox" v-model="preferences.emailNotifications">
                    <span class="toggle-slider"></span>
                  </label>
                </div>
                
                <div class="preference-item">
                  <div class="preference-info">
                    <h4>Automatic Image Saving</h4>
                    <p>Automatically save edited images to your account</p>
                  </div>
                  
                  <label class="toggle-switch">
                    <input type="checkbox" v-model="preferences.autoSaveImages">
                    <span class="toggle-slider"></span>
                  </label>
                </div>
                
                <div class="preference-item">
                  <div class="preference-info">
                    <h4>Public Profile</h4>
                    <p>Make your profile and edits visible to other users</p>
                  </div>
                  
                  <label class="toggle-switch">
                    <input type="checkbox" v-model="preferences.publicProfile">
                    <span class="toggle-slider"></span>
                  </label>
                </div>
                
                <div class="preference-item">
                  <div class="preference-info">
                    <h4>Dark Mode</h4>
                    <p>Switch between light and dark interface themes</p>
                  </div>
                  
                  <label class="toggle-switch">
                    <input type="checkbox" v-model="preferences.darkMode">
                    <span class="toggle-slider"></span>
                  </label>
                </div>
                
                <div class="form-actions">
                  <button class="btn-primary" @click="savePreferences">Save Preferences</button>
                </div>
              </div>
            </div>
  
            <!-- Billing & Plans Section -->
            <div v-if="activeSection === 'billing'" class="profile-section">
              <div class="section-header">
                <h3>Billing & Plans</h3>
                <p>Manage your subscription plans and payment information</p>
              </div>
              
              <div class="current-plan">
                <div class="plan-card">
                  <div class="plan-header">
                    <h4>Current Plan</h4>
                    <span class="plan-badge">Premium</span>
                  </div>
                  
                  <div class="plan-details">
                    <p class="plan-price">$12.99 <span class="price-period">/month</span></p>
                    <p>Your next billing date is <strong>April 15, 2025</strong></p>
                    
                    <ul class="plan-features">
                      <li>Unlimited image edits</li>
                      <li>All AI tools access</li>
                      <li>4K image export</li>
                      <li>Priority support</li>
                    </ul>
                  </div>
                  
                  <div class="plan-actions">
                    <button class="btn-outline">Change Plan</button>
                    <button class="btn-text danger">Cancel Subscription</button>
                  </div>
                </div>
              </div>
              
              <div class="payment-methods">
                <h4 class="payment-title">Payment Methods</h4>
                
                <div class="payment-card">
                  <div class="card-info">
                    <div class="card-icon visa"></div>
                    <div class="card-details">
                      <p class="card-number">•••• •••• •••• 4242</p>
                      <p class="card-expiry">Expires 06/2027</p>
                    </div>
                  </div>
                  
                  <div class="card-actions">
                    <span class="default-badge">Default</span>
                    <button class="btn-text">Remove</button>
                  </div>
                </div>
                
                <button class="btn-secondary add-payment">Add Payment Method</button>
              </div>
              
              <div class="billing-history">
                <h4 class="billing-title">Billing History</h4>
                
                <div class="billing-table">
                  <div class="table-header">
                    <div class="header-cell date">Date</div>
                    <div class="header-cell desc">Description</div>
                    <div class="header-cell amount">Amount</div>
                    <div class="header-cell status">Status</div>
                    <div class="header-cell invoice">Invoice</div>
                  </div>
                  
                  <div class="table-row">
                    <div class="cell date">Mar 15, 2025</div>
                    <div class="cell desc">Premium Plan - Monthly</div>
                    <div class="cell amount">$12.99</div>
                    <div class="cell status"><span class="status-paid">Paid</span></div>
                    <div class="cell invoice"><button class="btn-text">Download</button></div>
                  </div>
                  
                  <div class="table-row">
                    <div class="cell date">Feb 15, 2025</div>
                    <div class="cell desc">Premium Plan - Monthly</div>
                    <div class="cell amount">$12.99</div>
                    <div class="cell status"><span class="status-paid">Paid</span></div>
                    <div class="cell invoice"><button class="btn-text">Download</button></div>
                  </div>
                  
                  <div class="table-row">
                    <div class="cell date">Jan 15, 2025</div>
                    <div class="cell desc">Premium Plan - Monthly</div>
                    <div class="cell amount">$12.99</div>
                    <div class="cell status"><span class="status-paid">Paid</span></div>
                    <div class="cell invoice"><button class="btn-text">Download</button></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed, onMounted } from 'vue';
  
  // Mock user data (in a real app, this would come from your API)
  const user = ref({
    id: 'a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67890',
    email: 'user@example.com',
    fullName: 'Alex Johnson',
    avatar: 'https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/63f59ad81f9e28b327a95d59_Top%20generative%20AI%20tools_Blog%20hero.webp',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Apt 4B\nNew York, NY 10001',
    googleId: 'google123456',
    role: 'customer',
    isActive: true
  });
  
  // Active section state
  const activeSection = ref('personal');
  
  // File input reference for avatar upload
  const fileInput = ref(null);
  
  // Form data for personal information
  const formData = reactive({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });
  
  // Password change form data
  const passwordData = reactive({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // User preferences
  const preferences = reactive({
    emailNotifications: true,
    autoSaveImages: true,
    publicProfile: false,
    darkMode: false
  });
  
  // Track if form has changed
  const formChanged = computed(() => {
    return formData.fullName !== user.value.fullName ||
           formData.email !== user.value.email ||
           formData.phone !== user.value.phone ||
           formData.address !== user.value.address;
  });
  
  // Initialize form with user data
  onMounted(() => {
    resetForm();
  });
  
  // Format role for display
  const formatRole = (role) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };
  
  // Handle avatar change
  const triggerFileInput = () => {
    fileInput.value.click();
  };
  
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // In a real app, you would upload the file to your server here
    // For now, we'll just create a local URL to display the image
    const reader = new FileReader();
    reader.onload = (e) => {
      user.value.avatar = e.target.result;
    };
    
    reader.readAsDataURL(file);
  };
  
  // Reset form to current user data
  const resetForm = () => {
    formData.fullName = user.value.fullName;
    formData.email = user.value.email;
    formData.phone = user.value.phone || '';
    formData.address = user.value.address || '';
  };
  
  // Save personal information
  const savePersonalInfo = () => {
    // In a real app, you would send the updated data to your API here
    user.value.fullName = formData.fullName;
    user.value.email = formData.email;
    user.value.phone = formData.phone;
    user.value.address = formData.address;
    
    // Show success message (implement your own notification system)
    alert('Personal information updated successfully!');
  };
  
  // Change password
  const changePassword = () => {
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    // In a real app, you would send the password change request to your API here
    
    // Reset form and show success message
    passwordData.currentPassword = '';
    passwordData.newPassword = '';
    passwordData.confirmPassword = '';
    
    alert('Password changed successfully!');
  };
  
  // Toggle Google connection
  const toggleGoogleConnection = () => {
    // In a real app, you would connect/disconnect from Google here
    user.value.googleId = user.value.googleId ? null : 'google123456';
    
    alert(user.value.googleId 
      ? 'Successfully connected to Google' 
      : 'Successfully disconnected from Google');
  };
  
  // Save preferences
  const savePreferences = () => {
    // In a real app, you would save these preferences to your backend
    alert('Preferences saved successfully!');
  };
  </script>
  
  <style scoped>
  /* My Profile Page Styles */
  .profile-page {
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 40px 0;
    background-color: #f5f7fa;
    background-image: linear-gradient(135deg, #f5f7fa 0%, #e6edf5 100%);
    min-height: 100vh;
    color: #334155;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .page-title {
    text-align: center;
    margin-bottom: 10px;
    color: #1e293b;
    font-size: 2.75rem;
    font-weight: 800;
    letter-spacing: -0.5px;
    background: linear-gradient(90deg, #4338ca, #6366f1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .page-subtitle {
    text-align: center;
    color: #64748b;
    margin-bottom: 40px;
    font-size: 1.2rem;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }
  
  .profile-container {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 30px;
    margin-bottom: 50px;
  }
  
  /* Profile Sidebar */
  .profile-sidebar {
    background-color: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    height: fit-content;
  }
  
  .profile-avatar-section {
    padding: 30px;
    text-align: center;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .profile-avatar {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin: 0 auto 16px;
    overflow: hidden;
  }
  
  .profile-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .avatar-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.9rem;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.3s;
    cursor: pointer;
  }
  
  .profile-avatar:hover .avatar-overlay {
    opacity: 1;
  }
  
  .avatar-file-input {
    display: none;
  }
  
  .profile-name {
    margin: 0 0 5px;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e293b;
  }
  
  .profile-role {
    margin: 0;
    color: #6366f1;
    font-size: 0.95rem;
    font-weight: 500;
  }
  
  .profile-menu {
    padding: 16px 0;
  }
  
  .menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 12px 24px;
    background: none;
    border: none;
    text-align: left;
    color: #475569;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .menu-item:hover {
    background-color: #f8fafc;
    color: #1e293b;
  }
  
  .menu-item.active {
    background-color: #f0f9ff;
    color: #0369a1;
    border-left: 3px solid #0ea5e9;
  }
  
  .menu-icon {
    font-size: 1.2rem;
  }
  
  .account-status {
    padding: 20px 24px;
    border-top: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #64748b;
    font-size: 0.9rem;
  }
  
  .status-indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #cbd5e1;
  }
  
  .status-indicator.active {
    background-color: #10b981;
  }
  
  /* Profile Content */
  .profile-content {
    background-color: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    min-height: 600px;
  }
  
  .profile-section {
    padding: 30px;
  }
  
  .section-header {
    margin-bottom: 30px;
  }
  
  .section-header h3 {
    margin: 0 0 8px;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e293b;
  }
  
  .section-header p {
    margin: 0;
    color: #64748b;
    max-width: 600px;
  }
  
  /* Form Styles */
  .profile-form {
    max-width: 600px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #475569;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    color: #1e293b;
    transition: all 0.2s;
  }
  
  .form-group textarea {
    resize: vertical;
    min-height: 100px;
    font-family: inherit;
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }
  
  .form-actions {
    display: flex;
    gap: 16px;
    margin-top: 30px;
  }
  
  /* Button Styles */
  .btn-primary {
    padding: 12px 24px;
    background: linear-gradient(to right, #6366f1, #4f46e5);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .btn-primary:hover {
    background: linear-gradient(to right, #4f46e5, #4338ca);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
  }
  
  .btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  .btn-secondary {
    padding: 12px 24px;
    background-color: white;
    color: #475569;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .btn-secondary:hover {
    background-color: #f8fafc;
    color: #1e293b;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  
  .btn-outline {
    padding: 10px 20px;
    background-color: transparent;
    color: #6366f1;
    border: 1px solid #6366f1;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn-outline:hover {
    background-color: #f5f3ff;
    transform: translateY(-1px);
  }
  
  .btn-text {
    background: none;
    border: none;
    color: #6366f1;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: color 0.2s;
    padding: 0;
  }
  
  .btn-text:hover {
    color: #4f46e5;
    text-decoration: underline;
  }
  
  .btn-text.danger {
    color: #ef4444;
  }
  
  .btn-text.danger:hover {
    color: #dc2626;
  }
  
  .btn-link {
    background: none;
    border: none;
    color: #6366f1;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: color 0.2s;
  }
  
  .btn-link:hover {
    color: #4f46e5;
    text-decoration: underline;
  }
  
  /* Security Styles */
  .security-options {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .security-card {
    background-color: #f8fafc;
    border-radius: 12px;
    padding: 24px;
    border: 1px solid #e2e8f0;
  }
  
  .card-header {
    margin-bottom: 20px;
  }
  
  .card-header h4 {
    margin: 0 0 6px;
    font-size: 1.2rem;
    font-weight: 600;
    color: #1e293b;
  }
  
  .card-header p {
    margin: 0;
    color: #64748b;
    font-size: 0.95rem;
  }
  
  .password-form {
    max-width: 400px;
  }
  
  .connected-account {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #e2e8f0;
    padding-top: 16px;
  }
  
  .account-info {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  .account-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: white;
  }
  
  .account-icon.google {
    background-color: #ea4335;
  }
  
  .account-details h5 {
    margin: 0 0 4px;
    font-size: 1rem;
    font-weight: 600;
    color: #1e293b;
  }
  
  .account-details p {
    margin: 0;
    font-size: 0.9rem;
    color: #64748b;
  }
  
  /* Preferences Styles */
  .preferences-form {
    max-width: 600px;
  }
  
  .preference-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .preference-item:last-child {
    border-bottom: none;
    margin-bottom: 30px;
  }
  
  .preference-info h4 {
    margin: 0 0 4px;
    font-size: 1.1rem;
    font-weight: 600;
    color: #1e293b;
  }
  
  .preference-info p {
    margin: 0;
    color: #64748b;
    font-size: 0.9rem;
    max-width: 400px;
  }
  
  /* Toggle Switch */
  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 46px;
    height: 24px;
  }
  
  .toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cbd5e1;
  transition: .4s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #6366f1;
}

input:checked + .toggle-slider:before {
  transform: translateX(22px);
}

/* Billing & Plans Styles */
.plan-card {
  background-color: #f8fafc;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  margin-bottom: 40px;
}

.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.plan-header h4 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;
}

.plan-badge {
  padding: 4px 12px;
  background-color: #818cf8;
  color: white;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 600;
}

.plan-details {
  margin-bottom: 24px;
}

.plan-price {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
}

.price-period {
  font-size: 1rem;
  font-weight: 400;
  color: #64748b;
}

.plan-features {
  list-style-type: none;
  padding: 0;
  margin: 16px 0 0;
}

.plan-features li {
  position: relative;
  padding-left: 24px;
  margin-bottom: 8px;
  color: #475569;
}

.plan-features li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: 700;
}

.plan-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.payment-title, 
.billing-title {
  margin: 0 0 16px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;
}

.payment-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  margin-bottom: 16px;
}

.card-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.card-icon {
  width: 40px;
  height: 30px;
  border-radius: 4px;
}

.card-icon.visa {
  background-color: #1a1f71;
  position: relative;
}

.card-icon.visa:after {
  content: "VISA";
  position: absolute;
  color: white;
  font-size: 10px;
  font-weight: 700;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.card-details .card-number {
  margin: 0 0 4px;
  font-size: 0.95rem;
  color: #1e293b;
}

.card-details .card-expiry {
  margin: 0;
  font-size: 0.85rem;
  color: #64748b;
}

.card-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.default-badge {
  padding: 3px 10px;
  background-color: #e0f2fe;
  color: #0284c7;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.add-payment {
  margin-bottom: 40px;
}

.billing-table {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 600;
}

.header-cell {
  padding: 12px 16px;
  color: #475569;
  font-size: 0.9rem;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
  border-bottom: 1px solid #e2e8f0;
}

.table-row:last-child {
  border-bottom: none;
}

.cell {
  padding: 12px 16px;
  color: #1e293b;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
}

.status-paid {
  padding: 3px 10px;
  background-color: #dcfce7;
  color: #16a34a;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .profile-container {
    grid-template-columns: 250px 1fr;
  }
}

@media (max-width: 768px) {
  .profile-container {
    grid-template-columns: 1fr;
  }
  
  .profile-sidebar {
    position: sticky;
    top: 20px;
  }
  
  .profile-avatar-section {
    padding: 20px;
  }
  
  .profile-avatar {
    width: 100px;
    height: 100px;
  }
  
  .menu-item {
    padding: 10px 20px;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 1fr 2fr 1fr 1fr;
  }
  
  .header-cell.invoice,
  .cell.invoice {
    display: none;
  }
}

@media (max-width: 576px) {
  .page-title {
    font-size: 2rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
  
  .profile-section {
    padding: 20px;
  }
  
  .section-header h3 {
    font-size: 1.3rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .form-actions button {
    width: 100%;
  }
  
  .plan-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .plan-actions {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .plan-actions button {
    width: 100%;
  }
  
  .payment-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .card-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 1fr 1fr 1fr;
  }
  
  .header-cell.desc,
  .cell.desc {
    display: none;
  }
}
</style>