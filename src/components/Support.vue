<template>
    <div class="support-page">
      <div class="container">
        <h1 class="page-title">Support Center</h1>
        <p class="page-subtitle">Get help with our AI Image Editor and find answers to common questions</p>
  
        <div class="support-container">
          <!-- Search Section -->
          <section class="search-section">
            <div class="search-box">
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Search for help with features, account, billing..." 
                @keyup.enter="handleSearch"
              />
              <button class="search-button" @click="handleSearch">
                <span>Search</span>
              </button>
            </div>
          </section>
  
          <!-- Quick Help Boxes -->
          <section class="quick-help-section">
            <h2 class="section-title">How can we help you today?</h2>
            
            <div class="help-boxes">
              <div class="help-box" @click="activeCategory = 'getting-started'">
                <div class="help-icon get-started-icon">🚀</div>
                <h3>Getting Started</h3>
                <p>Learn the basics and get up and running quickly</p>
              </div>
              
              <div class="help-box" @click="activeCategory = 'tools'">
                <div class="help-icon tools-icon">🛠️</div>
                <h3>AI Tools</h3>
                <p>Learn how to use our powerful AI editing tools</p>
              </div>
              
              <div class="help-box" @click="activeCategory = 'accounts'">
                <div class="help-icon account-icon">👤</div>
                <h3>Account & Billing</h3>
                <p>Manage your account, subscriptions, and payments</p>
              </div>
              
              <div class="help-box" @click="activeCategory = 'troubleshooting'">
                <div class="help-icon troubleshoot-icon">🔧</div>
                <h3>Troubleshooting</h3>
                <p>Solutions for common issues and error messages</p>
              </div>
            </div>
          </section>
  
          <!-- FAQ Section -->
          <section class="faq-section">
            <h2 class="section-title">Frequently Asked Questions</h2>
            
            <div class="category-tabs">
              <button 
                v-for="category in categories" 
                :key="category.id"
                class="category-tab"
                :class="{ active: activeCategory === category.id }"
                @click="activeCategory = category.id"
              >
                {{ category.name }}
              </button>
            </div>
            
            <div class="faq-container">
              <div class="faq-list">
                <div 
                  v-for="(faq, index) in filteredFaqs" 
                  :key="index" 
                  class="faq-item"
                  :class="{ expanded: expandedFaq === index }"
                >
                  <div class="faq-question" @click="toggleFaq(index)">
                    <h3>{{ faq.question }}</h3>
                    <div class="faq-icon">{{ expandedFaq === index ? '−' : '+' }}</div>
                  </div>
                  <div class="faq-answer" v-show="expandedFaq === index">
                    <p v-html="faq.answer"></p>
                  </div>
                </div>
              </div>
            </div>
          </section>
  
          <!-- Contact Support Section -->
          <section class="contact-support-section">
            <div class="contact-card">
              <div class="contact-content">
                <h2>Still need help?</h2>
                <p>Our support team is ready to assist you with any questions or issues you might have.</p>
                
                <div class="contact-methods">
                  <div class="contact-method">
                    <div class="contact-method-icon">✉️</div>
                    <div>
                      <h4>Email Support</h4>
                      <p>For general inquiries and support requests</p>
                      <a href="mailto:support@aiimageeditor.com" class="contact-link">support@aiimageeditor.com</a>
                    </div>
                  </div>
                  
                  <div class="contact-method">
                    <div class="contact-method-icon">💬</div>
                    <div>
                      <h4>Live Chat</h4>
                      <p>Available Monday to Friday, 9 AM - 6 PM EST</p>
                      <button class="chat-button" @click="openLiveChat">Start a Chat</button>
                    </div>
                  </div>
                  
                  <div class="contact-method">
                    <div class="contact-method-icon">📚</div>
                    <div>
                      <h4>Documentation</h4>
                      <p>Browse our comprehensive documentation</p>
                      <a href="#" class="contact-link">View Documentation</a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="contact-image">
                <img src="https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/63f59ad81f9e28b327a95d59_Top%20generative%20AI%20tools_Blog%20hero.webp" alt="Customer support">
              </div>
            </div>
          </section>
        </div>
  
        <!-- Resource Links -->
        <section class="resources-section">
          <h2 class="section-title">Additional Resources</h2>
          
          <div class="resources-grid">
            <a href="#" class="resource-card">
              <div class="resource-icon">📝</div>
              <h3>Tutorials</h3>
              <p>Step-by-step guides on using various features</p>
            </a>
            
            <a href="#" class="resource-card">
              <div class="resource-icon">🎬</div>
              <h3>Video Guides</h3>
              <p>Visual instructions for complex editing tasks</p>
            </a>
            
            <a href="#" class="resource-card">
              <div class="resource-icon">🔄</div>
              <h3>Updates</h3>
              <p>Latest features and improvements</p>
            </a>
            
            <a href="#" class="resource-card">
              <div class="resource-icon">💡</div>
              <h3>Tips & Tricks</h3>
              <p>Advanced techniques to get the most from our tools</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // State
  const searchQuery = ref('');
  const activeCategory = ref('getting-started');
  const expandedFaq = ref(null);
  
  // Categories
  const categories = [
    { id: 'getting-started', name: 'Getting Started' },
    { id: 'tools', name: 'AI Tools' },
    { id: 'accounts', name: 'Account & Billing' },
    { id: 'troubleshooting', name: 'Troubleshooting' }
  ];
  
  // FAQ Data
  const faqs = [
    // Getting Started FAQs
    {
      category: 'getting-started',
      question: 'How do I upload an image to edit?',
      answer: 'To upload an image, simply click on the "Upload" button in the main editor or drag and drop your image into the designated area. We support JPG, PNG, and WEBP formats with a maximum file size of 10MB.'
    },
    {
      category: 'getting-started',
      question: 'Can I edit images on my mobile device?',
      answer: 'Yes! Our AI Image Editor is fully responsive and works on smartphones and tablets. Simply visit our website on your mobile browser to access all editing features.'
    },
    {
      category: 'getting-started',
      question: 'Is there a limit to how many images I can edit?',
      answer: 'Free accounts can edit up to 5 images per day. Premium subscribers get unlimited edits. You can view your usage and limits in your account dashboard.'
    },
    {
      category: 'getting-started',
      question: 'How do I save my edited images?',
      answer: 'After completing your edits, click the "Save" button in the lower right corner. You can choose to save in JPG, PNG, or WEBP formats and select the desired quality level.'
    },
    
    // AI Tools FAQs
    {
      category: 'tools',
      question: 'How does the background removal tool work?',
      answer: 'Our background removal tool uses advanced AI to identify and separate subjects from their backgrounds. Simply select the "Remove Background" tool, and our AI will automatically process your image. You can refine the results using the brush tools if needed.'
    },
    {
      category: 'tools',
      question: 'What is the "Enhance Image" tool?',
      answer: 'The "Enhance Image" tool uses AI to automatically improve image quality by adjusting lighting, contrast, and sharpness. It can fix underexposed photos, enhance colors, and improve overall clarity with a single click.'
    },
    {
      category: 'tools',
      question: 'How accurate is the AI face enhancement?',
      answer: 'Our face enhancement tool uses specialized AI models trained on millions of facial images. It can improve skin texture, enhance facial features, and fix minor imperfections while maintaining a natural look. The technology is constantly improving with each update.'
    },
    {
      category: 'tools',
      question: 'Can I upscale low-resolution images?',
      answer: 'Yes, our "Increase Resolution" tool can upscale images up to 4x their original size while preserving quality. The AI adds realistic details rather than simply stretching pixels, resulting in sharper, clearer enlarged images.'
    },
    
    // Account & Billing FAQs
    {
      category: 'accounts',
      question: 'How do I upgrade to a premium account?',
      answer: 'To upgrade, go to your Account Settings and select "Subscription Plans." Choose the plan that best fits your needs and follow the payment instructions. Your account will be upgraded immediately after successful payment.'
    },
    {
      category: 'accounts',
      question: 'Can I cancel my subscription at any time?',
      answer: 'Yes, you can cancel your subscription anytime from your Account Settings under the "Subscription" tab. You\'ll continue to have access to premium features until the end of your current billing period.'
    },
    {
      category: 'accounts',
      question: 'Do you offer refunds?',
      answer: 'We offer a 7-day money-back guarantee for new subscribers. If you\'re not satisfied with our service, contact our support team within 7 days of your purchase for a full refund. Please note that refunds for subscriptions active longer than 7 days are reviewed on a case-by-case basis.'
    },
    {
      category: 'accounts',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All payment information is securely processed and encrypted.'
    },
    
    // Troubleshooting FAQs
    {
      category: 'troubleshooting',
      question: 'Why is my image taking a long time to process?',
      answer: 'Processing time depends on several factors including image size, selected AI tools, and current server load. Large images or complex edits may take longer. If processing doesn\'t complete within 5 minutes, try refreshing the page or uploading a smaller version of your image.'
    },
    {
      category: 'troubleshooting',
      question: 'The editor isn\'t loading properly. What should I do?',
      answer: 'First, try refreshing your browser. If issues persist, clear your browser cache and cookies. Our editor works best on updated versions of Chrome, Firefox, Safari, and Edge. If you\'re still experiencing problems, please contact our support team with details about your browser and device.'
    },
    {
      category: 'troubleshooting',
      question: 'Why is the AI giving unexpected results?',
      answer: 'AI performance can vary depending on the image quality and content. For best results:<br><br>- Use clear, well-lit images<br>- Ensure the subject is clearly visible<br>- Try different AI settings if available<br>- For very specific edits, use the chat feature to describe exactly what you want'
    },
    {
      category: 'troubleshooting',
      question: 'My saved image quality looks low. How can I improve it?',
      answer: 'To ensure the highest quality output:<br><br>- Select PNG format for maximum quality<br>- If using JPG, set quality to 100%<br>- Start with higher resolution source images when possible<br>- Use the "Increase Resolution" tool before other edits<br>- Avoid multiple saving and re-editing cycles which can degrade quality'
    }
  ];
  
  // Filtered FAQs based on active category
  const filteredFaqs = computed(() => {
    return faqs.filter(faq => faq.category === activeCategory.value);
  });
  
  // Methods
  const toggleFaq = (index) => {
    if (expandedFaq.value === index) {
      expandedFaq.value = null;
    } else {
      expandedFaq.value = index;
    }
  };
  
  const handleSearch = () => {
    if (!searchQuery.value) return;
    
    console.log('Searching for:', searchQuery.value);
    // In a real implementation, this would filter FAQs or redirect to search results
    // For now, just reset the search
    searchQuery.value = '';
  };
  
  const openLiveChat = () => {
    // This would typically launch your live chat widget
    alert('Live chat would open here. This is a placeholder for the actual live chat integration.');
  };
  </script>
  
  <style scoped>
  /* Support Page Styles */
  .support-page {
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
  
  .support-container {
    background-color: white;
    border-radius: 24px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    border: 1px solid rgba(229, 231, 235, 0.8);
    padding: 40px;
    margin-bottom: 50px;
  }
  
  .section-title {
    font-size: L.6rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 24px;
    margin-top: 0;
  }
  
  /* Search Section */
  .search-section {
    margin-bottom: 40px;
  }
  
  .search-box {
    display: flex;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border: a2px solid #e2e8f0;
  }
  
  .search-box input {
    flex: 1;
    padding: 18px 24px;
    border: none;
    font-size: 1rem;
    outline: none;
    background-color: #fff;
  }
  
  .search-button {
    background: linear-gradient(to right, #6366f1, #4f46e5);
    color: white;
    border: none;
    padding: 0 30px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .search-button:hover {
    background: linear-gradient(to right, #4f46e5, #4338ca);
  }
  
  /* Quick Help Section */
  .quick-help-section {
    margin-bottom: 50px;
  }
  
  .help-boxes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
  }
  
  .help-box {
    background-color: #f8fafc;
    border-radius: 16px;
    padding: 24px;
    transition: all 0.3s ease;
    cursor: pointer;
    border: 1px solid #e2e8f0;
  }
  
  .help-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.05);
    border-color: #cbd5e1;
  }
  
  .help-icon {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    border-radius: 16px;
    margin-bottom: 16px;
  }
  
  .get-started-icon {
    background: linear-gradient(135deg, #c7d2fe, #818cf8);
    color: #4338ca;
  }
  
  .tools-icon {
    background: linear-gradient(135deg, #bae6fd, #38bdf8);
    color: #0369a1;
  }
  
  .account-icon {
    background: linear-gradient(135deg, #fde68a, #fbbf24);
    color: #b45309;
  }
  
  .troubleshoot-icon {
    background: linear-gradient(135deg, #fecaca, #f87171);
    color: #b91c1c;
  }
  
  .help-box h3 {
    margin: 0 0 8px;
    font-size: 1.2rem;
    font-weight: 600;
    color: #1e293b;
  }
  
  .help-box p {
    margin: 0;
    color: #64748b;
    font-size: 0.95rem;
  }
  
  /* FAQ Section */
  .faq-section {
    margin-bottom: 50px;
  }
  
  .category-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 24px;
  }
  
  .category-tab {
    padding: 10px 20px;
    background-color: #f1f5f9;
    border: 1px solid #e2e8f0;
    border-radius: 30px;
    font-size: 0.95rem;
    color: #475569;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
  }
  
  .category-tab.active {
    background-color: #6366f1;
    color: white;
    border-color: #4f46e5;
  }
  
  .category-tab:hover:not(.active) {
    background-color: #e2e8f0;
  }
  
  .faq-container {
    background-color: #f8fafc;
    border-radius: 16px;
    overflow: hidden;
  }
  
  .faq-item {
    border-bottom: 1px solid #e2e8f0;
  }
  
  .faq-item:last-child {
    border-bottom: none;
  }
  
  .faq-question {
    padding: 20px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .faq-question:hover {
    background-color: #f1f5f9;
  }
  
  .faq-item.expanded .faq-question {
    background-color: #f1f5f9;
  }
  
  .faq-question h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #1e293b;
  }
  
  .faq-icon {
    font-size: 1.5rem;
    color: #6366f1;
    font-weight: 300;
  }
  
  .faq-answer {
    padding: 0 24px 20px;
    color: #475569;
    line-height: 1.6;
  }
  
  .faq-answer p {
    margin: 0;
  }
  
  /* Contact Support Section */
  .contact-support-section {
    margin-bottom: 20px;
  }
  
  .contact-card {
    display: grid;
    grid-template-columns: 1fr 300px;
    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
    border-radius: 16px;
    overflow: hidden;
  }
  
  .contact-content {
    padding: 30px;
  }
  
  .contact-content h2 {
    margin: 0 0 16px;
    font-size: 1.8rem;
    font-weight: 700;
    color: #1e293b;
  }
  
  .contact-content > p {
    margin-bottom: 24px;
    color: #475569;
    line-height: 1.6;
  }
  
  .contact-methods {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .contact-method {
    display: flex;
    gap: 16px;
  }
  
  .contact-method-icon {
    width: 40px;
    height: 40px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
  }
  
  .contact-method h4 {
    margin: 0 0 4px;
    font-size: 1.1rem;
    font-weight: 600;
    color: #1e293b;
  }
  
  .contact-method p {
    margin: 0 0 8px;
    color: #475569;
    font-size: 0.95rem;
  }
  
  .contact-link {
    color: #6366f1;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }
  
  .contact-link:hover {
    color: #4f46e5;
    text-decoration: underline;
  }
  
  .chat-button {
    background-color: #6366f1;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .chat-button:hover {
    background-color: #4f46e5;
  }
  
  .contact-image {
    height: 100%;
    overflow: hidden;
  }
  
  .contact-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* Resources Section */
  .resources-section {
    margin-bottom: 60px;
  }
  
  .resources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .resource-card {
    background-color: white;
    border-radius: 16px;
    padding: 24px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: all 0.3s;
    border: 1px solid #e2e8f0;
    text-decoration: none;
  }
  
  .resource-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.08);
    border-color: #cbd5e1;
  }
  
  .resource-icon {
    font-size: 2rem;
    margin-bottom: 16px;
  }
  
  .resource-card h3 {
    margin: 0 0 8px;
    font-size: 1.2rem;
    font-weight: 600;
    color: #1e293b;
  }
  
  .resource-card p {
    margin: 0;
    color: #64748b;
    font-size: 0.95rem;
  }
  
  /* Responsive Styles */
  @media (max-width: 1024px) {
    .support-container {
      padding: 30px;
    }
    
    .contact-card {
      grid-template-columns: 1fr;
    }
    
    .contact-image {
      display: none;
    }
  }
  
  @media (max-width: 768px) {
    .page-title {
      font-size: 2rem;
    }
    
    .page-subtitle {
      font-size: 1rem;
    }
    
    .support-container {
      padding: 20px;
    }
    
    .help-boxes {
      grid-template-columns: 1fr;
    }
    
    .faq-question h3 {
      font-size: 1rem;
    }
    
    .resource-card {
      padding: 20px;
    }
  }
  </style>