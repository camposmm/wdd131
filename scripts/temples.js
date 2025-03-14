// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Dynamic Footer Content
const currentYear = new Date().getFullYear();
const lastModified = document.lastModified;

document.getElementById('current-year').textContent = currentYear;
document.getElementById('last-modified').textContent = lastModified;