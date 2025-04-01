
<template>
    <header class="header">
        <div class="container header-container">
            <div class="logo">
                <RouterLink to="/">AINow</RouterLink>
            </div>

            <nav class="nav-desktop">
                <ul class="nav-links">
                    <li><RouterLink to="/">Home</RouterLink></li>
                    <li><RouterLink to="/editor">AI Editor</RouterLink></li>
                    <li><RouterLink to="/explore">AI Trends</RouterLink></li>
                    <li><RouterLink to="/pricing">Pricing</RouterLink></li>
                    <li class="dropdown">
                        <a href="#" @click.prevent="toggleDropdown('about')">
                            About Us
                            <span class="dropdown-icon" :class="{ 'active': activeDropdown == 'about' }">▼</span>
                        </a>
                        <ul class="dropdown-menu" v-show="activeDropdown === 'about'">
                            <li><RouterLink to="/tutorials">Tutorials</RouterLink></li>
                            <li><RouterLink to="/about">About Us</RouterLink></li>
                            <li><RouterLink to="/support">Support</RouterLink></li>
                        </ul>
                    </li>
                    <li><RouterLink to="/community">Community</RouterLink></li>
                </ul>
            </nav>

            <div v-if="user" :class="`user-profile`">
                <div class="user-avatar" v-if="user.avatar">
                    <img :src="user.avatar" alt="User avatar" />
                </div>
                <a href="/my-profile"><span class="user-name">{{ user.fullName }}</span></a>
                <button class="btn btn-outline btn-sm" @click="handleSignOut">Sign Out</button>
            </div>
            <div v-else class="gmail-login">
                <button class="btn btn-gmail" @click="handleCustomSignIn">
                    <img src="/src/assets/images/gmail-icon.jpg" alt="Gmail" class="gmail-icon" />
                    <span>Sign In with Gmail</span>
                </button>
            </div>

            <button class="menu-toggle" @click="toggleMobileMenu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>

        <div class="mobile-menu" :class="{ 'active': mobileMenuOpen }">
            <ul class="mobile-nav-links">
                <li><RouterLink to="/" @click="closeMobileMenu">Home</RouterLink></li>
                <li><RouterLink to="/editor" @click="closeMobileMenu">AI Editor</RouterLink></li>
                <li><RouterLink to="/templates" @click="closeMobileMenu">Explore</RouterLink></li>
                <li>
                    <div class="mobile-dropdown" @click="toggleMobileSubmenu('tools')">
                        <span>Tutorials</span>
                        <span class="mobile-dropdown-icon" :class="{ 'active': mobileSubmenu === 'tools' }">▼</span>
                    </div>
                    <ul class="mobile-submenu" :class="{ 'active': mobileSubmenu === 'tools' }">
                        <!-- <li><RouterLink to="/utilities" @click="closeMobileMenu">Tools</RouterLink></li> -->
                        <li><RouterLink to="/tutorials" @click="closeMobileMenu">Tutorials</RouterLink></li>
                    </ul>
                </li>
                <li><RouterLink to="/my-gallery" @click="closeMobileMenu">Contact Us</RouterLink></li>
                <li>
                    <div class="mobile-dropdown" @click="toggleMobileSubmenu('about')">
                        <span>About Us</span>
                        <span class="mobile-dropdown-icon" :class="{ 'active': mobileSubmenu === 'about' }">▼</span>
                    </div>
                    <ul class="mobile-submenu" :class="{ 'active': mobileSubmenu === 'about' }">
                        <li><RouterLink to="/about" @click="closeMobileMenu">About Us</RouterLink></li>
                        <li><RouterLink to="/support" @click="closeMobileMenu">Support</RouterLink></li>
                        <li><RouterLink to="/community" @click="closeMobileMenu">Community</RouterLink></li>
                    </ul>
                </li>
                <li><RouterLink to="/pricing" @click="closeMobileMenu">Pricing</RouterLink></li>
                <li>
                    <div v-if="user" :class="`user-profile`">
                        <div class="user-avatar" v-if="user.avatar">
                            <img :src="user.avatar" alt="User avatar" />
                        </div>
                        <a href="/me"><span class="user-name">{{ user.fullName }}</span></a>
                        <button class="btn btn-outline btn-sm" @click="handleSignOut">Sign Out</button>
                    </div>
                    <button v-else class="btn btn-gmail mobile-gmail-btn" @click="handleCustomSignIn">
                        <img src="/src/assets/images/gmail-icon.jpg" alt="Gmail" class="gmail-icon" />
                        <span>Sign In with Gmail</span>
                    </button>
                </li>
            </ul>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue'
import request from '@/utils/request'
import { RouterLink, useRouter } from 'vue-router'
import { googleTokenLogin } from 'vue3-google-login'
import { onMounted, onUnmounted } from 'vue'

const mobileMenuOpen = ref(false)
const activeDropdown = ref(null)
const mobileSubmenu = ref(null)
const user = ref(null)
const router = useRouter()

const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value
    // Đóng submenu khi đóng menu chính
    if (!mobileMenuOpen.value) {
        mobileSubmenu.value = null
    }
}

const closeMobileMenu = () => {
    mobileMenuOpen.value = false
    mobileSubmenu.value = null
}

const toggleDropdown = (name) => {
    if (activeDropdown.value === name) {
        activeDropdown.value = null
    } else {
        activeDropdown.value = name
    }
}

const toggleMobileSubmenu = (name) => {
    if (mobileSubmenu.value === name) {
        mobileSubmenu.value = null
    } else {
        mobileSubmenu.value = name
    }
}

// Đóng dropdown khi click ra ngoài
const handleClickOutside = (event) => {
    if (activeDropdown.value && !event.target.closest('.dropdown')) {
        activeDropdown.value = null
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    
    // Kiểm tra người dùng đã đăng nhập chưa
    const storedUser = localStorage.getItem('ainow_user')
    if (storedUser) {
        try {
            user.value = JSON.parse(storedUser)
        } catch (error) {
            console.error('Failed to parse user data:', error)
        }
    }
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})

const handleSignInWithGoogle = async (response) => {
    // response.credential contains the ID token
    if (response.access_token) {
        // Gọi Google API để lấy thông tin người dùng
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${response.access_token}`
            }
        });

        if (userInfoResponse.ok) {
            const userInfo = await userInfoResponse.json();
            // console.log('User info from Google API:', userInfo);
            try {
                const apiResponse = await request.post('/api/auth/google-login', {
                    googleId: userInfo.sub,
                    email: userInfo.email,
                    fullName: userInfo.name,
                    picture: userInfo.picture,
                    access_token: response.access_token
                })
                // console.log('apiResponse:', apiResponse)
                if (apiResponse.success) {
                    // Store user data
                    user.value = apiResponse.data
                    localStorage.setItem('ainow_user', JSON.stringify(apiResponse.data))
                    localStorage.setItem('ainow_token', apiResponse.data.token)
                    router.push('/')
                }
            } catch (error) {
                console.error('Google login error:', error)
                // Show error message to user
            }
        } else {
            console.error('Failed to fetch user info:', await userInfoResponse.text());
        }
    } else {
        console.error('No access token found in response');
    }
}

const handleCustomSignIn = async () => {
    try {
        const response = await googleTokenLogin({
            prompt: 'select_account', // Hiển thị lựa chọn tài khoản
            scope: "email profile https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email", // Yêu cầu thêm thông tin
            popup: true, // Mở popup thay vì chuyển hướng
        })
        handleSignInWithGoogle(response)
    } catch (error) {
        console.error('Google login error:', error)
    }
}

// Hàm đăng xuất
function handleSignOut() {
    user.value = null
    localStorage.removeItem('ainow_user')
    localStorage.removeItem('ainow_token')
    console.log('Đã đăng xuất')
}

</script>

<style scoped>
/* Base header styles */
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    z-index: 1000;
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 0 2rem;
    max-width: 1280px;
    margin: 0 auto;
}

/* Logo styles */
.logo {
    font-size: 1.75rem;
    font-weight: 800;
}

.logo a {
    color: #4f46e5;
    text-decoration: none;
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.3s ease;
}

.logo a:hover {
    opacity: 0.9;
    transform: scale(1.02);
}

/* Main navigation styles */
.nav-desktop {
    display: flex;
    align-items: center;
    height: 100%;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 0; /* Remove gap to ensure consistent sizing */
    margin: 0;
    padding: 0;
    height: 100%;
}

.nav-links > li {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
}

.nav-links a {
    color: #07273d;
    font-weight: 500;
    font-size: 16px;
    text-decoration: none;
    padding: 0.5rem 1.25rem;
    height: 100%;
    display: flex;
    align-items: center;
    transition: color 0.3s ease;
    white-space: nowrap;
}

.nav-links a:hover,
.nav-links a.RouterLink-active {
    color: #4f46e5;
}

.nav-links > li > a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: #4f46e5;
    transition: width 0.3s ease;
}

.nav-links > li > a:hover::after,
.nav-links > li > a.RouterLink-active::after {
    width: 80%;
}

/* Dropdown styles */
.dropdown {
    position: static; /* Changed from relative */
    height: 100%;
}

.dropdown > a {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    height: 100%;
}

.dropdown-icon {
    font-size: 0.75rem;
    transition: transform 0.3s ease;
    margin-left: 0.25rem;
}

.dropdown-icon.active {
    transform: rotate(180deg);
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%; /* Match parent width */
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 0.5rem 0;
    margin-top: 0;
    z-index: 1100;
    list-style: none;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
    transform: translateY(10px) translateX(-50%);
}

.dropdown:hover .dropdown-menu,
.dropdown-menu.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0) translateX(-50%);
}

.dropdown-menu li {
    width: 100%;
}

.dropdown-menu a {
    display: flex;
    justify-content: center;
    padding: 0.75rem 1rem;
    font-weight: 500;
    transition: background-color 0.3s ease, color 0.3s ease;
    width: 100%;
    text-align: center;
}

.dropdown-menu a:hover {
    background-color: #f3f4f6;
    color: #4f46e5;
}

.dropdown-menu a::after {
    display: none;
}

/* User profile and login styles */
.user-profile {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
}

.user-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.user-name {
    font-weight: 600;
    color: #4b5563;
}

.btn {
    font-weight: 600;
    border-radius: 8px;
    transition: all 0.3s ease;
    cursor: pointer;
}

.btn-outline {
    background-color: transparent;
    border: 1px solid #4f46e5;
    color: #4f46e5;
}

.btn-outline:hover {
    background-color: #4f46e5;
    color: white;
}

.btn-sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
}

.btn-gmail {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    color: #4b5563;
    /* border: 1px solid #e5e7eb; */
    border-radius: 8px;
    padding: 10px 18px;
    font-weight: 600;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.btn-gmail:hover {
    background-color: #f9fafb;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
    border-color: #d1d5db;
}

.btn-gmail:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.gmail-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    transition: transform 0.3s ease;
}

.btn-gmail:hover .gmail-icon {
    transform: scale(1.1);
}

/* Mobile menu styles */
.menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 21px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10;
}

.menu-toggle span {
    display: block;
    height: 3px;
    width: 100%;
    background-color: #4f46e5;
    border-radius: 3px;
    transition: all 0.3s ease;
}

.mobile-menu {
    display: none;
    position: fixed;
    top: 80px;
    left: 0;
    width: 100%;
    height: calc(100vh - 80px);
    background-color: #ffffff;
    z-index: 999;
    transform: translateX(-100%);
    transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
    overflow-y: auto;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.mobile-menu.active {
    transform: translateX(0);
}

.mobile-nav-links {
    list-style: none;
    padding: 1.5rem;
    margin: 0;
}

.mobile-nav-links > li {
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #f3f4f6;
}

.mobile-nav-links > li:last-child {
    border-bottom: none;
}

.mobile-nav-links a {
    display: block;
    padding: 1rem 0.5rem;
    /* font-size: 1.1rem; */
    font-size: 16px;
    font-weight: 500;
    color: #4b5563;
    text-decoration: none;
    transition: color 0.3s ease;
}

.mobile-nav-links a:hover,
.mobile-nav-links a.RouterLink-active {
    color: #4f46e5;
}

.mobile-dropdown {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0.5rem;
    font-size: 16px;
    font-weight: 500;
    color: #4b5563;
    cursor: pointer;
    transition: color 0.3s ease;
}

.mobile-dropdown:hover {
    color: #4f46e5;
}

.mobile-dropdown-icon {
    font-size: 0.8rem;
    transition: transform 0.3s ease;
}

.mobile-dropdown-icon.active {
    transform: rotate(180deg);
}

.mobile-submenu {
    list-style: none;
    padding-left: 1.5rem;
    margin: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease;
}

.mobile-submenu.active {
    max-height: 300px;
}

.mobile-submenu li {
    margin-bottom: 0.5rem;
}

.mobile-submenu a {
    padding: 0.75rem 0.5rem;
    font-size: 1rem;
}

.mobile-gmail-btn {
    width: 100%;
    justify-content: center;
    margin-top: 1.5rem;
    padding: 1rem;
    border-radius: 8px;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
}

/* Media queries */
@media (max-width: 1024px) {
    .nav-desktop {
        display: none;
    }

    .menu-toggle {
        display: flex;
    }

    .mobile-menu {
        display: block;
    }

    .header-container {
        padding: 0 1.5rem;
    }
}

@media (max-width: 768px) {
    .gmail-login {
        margin-right: 1rem;
    }

    .header-container {
        height: 70px;
        padding: 0 1rem;
    }

    .mobile-menu {
        top: 70px;
        height: calc(100vh - 70px);
    }

    .logo {
        font-size: 1.5rem;
    }

    .btn-gmail {
        padding: 8px 12px;
        font-size: 0.9rem;
    }

    .gmail-icon {
        width: 18px;
        height: 18px;
        margin-right: 8px;
    }
}

@media (max-width: 480px) {
    .btn-gmail span {
        display: none;
    }

    .gmail-icon {
        margin-right: 0;
    }

    .btn-gmail {
        padding: 8px;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        justify-content: center;
    }
}
</style>