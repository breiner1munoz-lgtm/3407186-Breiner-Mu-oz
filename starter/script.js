/* ============================================
   PROYECTO SEMANA 01
   Dominio: Musical Instrument Store
============================================ */

// ============================================
// 1️⃣ Datos del dominio
// ============================================

const entityData = {
  name: 'Musical Instrument Store',
  title: 'Specialized Music Equipment Retailer',
  location: 'Bogotá, Colombia',
  bio: 'Tienda especializada en instrumentos musicales, accesorios y equipos de audio para músicos principiantes y profesionales.',
  email: 'contacto@tiendamusical.com',
  phone: '+57 300 121 3454',
  avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',

  skills: [
    { name: 'Guitars', level: 85, category: 'String' },
    { name: 'Keyboards', level: 70, category: 'Keyboard' },
    { name: 'Drums', level: 65, category: 'Percussion' },
    { name: 'Accessories', level: 90, category: 'Complement' },
    { name: 'Microphones', level: 75, category: 'Audio' },
    { name: 'Amplifiers', level: 80, category: 'Audio' }
  ],

  social: [
    { platform: 'Website', url: 'https://www.tiendamusical.com' }
  ],

  stats: {
    totalProducts: 250,
    availableProducts: 230,
    rating: 4.7,
    yearsExperience: 15
  }
};


// ============================================
// 2️⃣ Referencias DOM
// ============================================

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');

const userName = document.getElementById('userName');
const userTitle = document.getElementById('userTitle');
const userLocation = document.getElementById('userLocation');
const userBio = document.getElementById('userBio');
const userEmail = document.getElementById('userEmail');
const userPhone = document.getElementById('userPhone');
const avatarImg = document.getElementById('avatarImg');

const skillsList = document.getElementById('skillsList');
const toggleSkillsBtn = document.getElementById('toggleSkills');
const socialLinks = document.getElementById('socialLinks');
const statsContainer = document.getElementById('stats');

const copyEmailBtn = document.getElementById('copyEmailBtn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');


// ============================================
// 3️⃣ Render Información Básica
// ============================================

const renderBasicInfo = () => {
  const { name, title, location, bio, email, phone, avatar } = entityData;

  userName.textContent = name;
  userTitle.textContent = title;
  userLocation.textContent = `📍 ${location}`;
  userBio.textContent = bio;
  userEmail.textContent = email;
  userPhone.textContent = phone;
  avatarImg.src = avatar;
};


// ============================================
// 4️⃣ Render Skills (map + slice)
// ============================================

let showingAll = false;

const renderSkills = (showAll = false) => {
  const { skills } = entityData;

  const skillsToShow = showAll ? skills : skills.slice(0, 4);

  const skillsHTML = skillsToShow
    .map(({ name, level, category }) => `
      <div class="skill-item">
        <div class="skill-header">
          <span>${name}</span>
          <span>${level}%</span>
        </div>
        <div class="skill-bar">
          <div class="skill-fill" style="width: ${level}%"></div>
        </div>
        <small>${category}</small>
      </div>
    `)
    .join('');

  skillsList.innerHTML = skillsHTML;
};

const handleToggleSkills = () => {
  showingAll = !showingAll;
  renderSkills(showingAll);
  toggleSkillsBtn.textContent = showingAll ? 'Show Less' : 'Show More';
};


// ============================================
// 5️⃣ Render Social Links
// ============================================

const renderSocial = () => {
  const { social } = entityData;

  const socialHTML = social
    .map(({ platform, url }) => `
      <a href="${url}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
        ${platform}
      </a>
    `)
    .join('');

  socialLinks.innerHTML = socialHTML;
};


// ============================================
// 6️⃣ Render Statistics (reduce incluido)
// ============================================

const renderStats = () => {
  const { stats, skills } = entityData;

  const averageLevel =
    skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length;

  const statsArray = [
    { label: 'Total Products', value: stats.totalProducts },
    { label: 'Available', value: stats.availableProducts },
    { label: 'Rating', value: stats.rating },
    { label: 'Years Experience', value: stats.yearsExperience },
    { label: 'Avg. Stock Level', value: `${averageLevel.toFixed(1)}%` }
  ];

  const statsHTML = statsArray
    .map(({ label, value }) => `
      <div class="stat-card">
        <span class="stat-value">${value}</span>
        <span class="stat-label">${label}</span>
      </div>
    `)
    .join('');

  statsContainer.innerHTML = statsHTML;
};


// ============================================
// 7️⃣ Toggle Theme + localStorage
// ============================================

const toggleTheme = () => {
  const currentTheme = document.documentElement.dataset.theme ?? 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.dataset.theme = newTheme;
  themeIcon.textContent = newTheme === 'dark' ? '🎸' : '🎻';

  localStorage.setItem('theme', newTheme);
};

const loadTheme = () => {
  const savedTheme = localStorage.getItem('theme') ?? 'light';
  document.documentElement.dataset.theme = savedTheme;
  themeIcon.textContent = savedTheme === 'dark' ? '🎸' : '🎻';
};


// ============================================
// 8️⃣ Copy Email
// ============================================

const copyEmail = () => {
  const { email } = entityData;

  navigator.clipboard.writeText(email);
  showToast('Email copied to clipboard!');
};

const showToast = message => {
  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};


// ============================================
// 9️⃣ Event Listeners
// ============================================

themeToggle.addEventListener('click', toggleTheme);
toggleSkillsBtn.addEventListener('click', handleToggleSkills);
copyEmailBtn.addEventListener('click', copyEmail);


// ============================================
// 🔟 Init
// ============================================

const init = () => {
  loadTheme();
  renderBasicInfo();
  renderSkills();
  renderSocial();
  renderStats();

  console.log('✅ Musical Instrument Store Card Initialized');
};

init();
