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

// Temple Data and Filtering
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/sao-paulo-brazil/400x250/sao-paulo-brazil-temple-lds-246609-wallpaper.jpg"
  },
  {
    templeName: "São Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "1978, October, 30",
    area: 59250,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/sao-paulo-brazil/400x250/sao-paulo-brazil-temple-lds-187030-wallpaper.jpg"
  },
  {
    templeName: "Recife Brazil",
    location: "Recife, Brazil",
    dedicated: "2000, December, 15",
    area: 10700,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/recife-brazil/400x250/recife-brazil-temple-lds-700226-wallpaper.jpg"
  },
  {
    templeName: "Porto Alegre Brazil",
    location: "Porto Alegre, Brazil",
    dedicated: "2000, December, 17",
    area: 10000,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/porto-alegre-brazil/400x250/porto-alegre-brazil-temple-lds-83426-high-res-print.jpg"
  }
];

// Function to create temple card HTML
function createTempleCard(temple) {
  return `
    <div class="temple-card">
      <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
      <div class="temple-info">
        <h3>${temple.templeName}</h3>
        <p><strong>Location:</strong> ${temple.location}</p>
        <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
        <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
      </div>
    </div>
  `;
}

// Function to display temples based on filter
function displayTemples(filter) {
  const templeContainer = document.getElementById('temple-cards');
  templeContainer.innerHTML = '';

  let filteredTemples = temples;

  switch(filter) {
    case 'old':
      filteredTemples = temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(',')[0]);
        return year < 1900;
      });
      break;
    case 'new':
      filteredTemples = temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(',')[0]);
        return year > 2000;
      });
      break;
    case 'large':
      filteredTemples = temples.filter(temple => temple.area > 90000);
      break;
    case 'small':
      filteredTemples = temples.filter(temple => temple.area < 10000);
      break;
    // 'all' or default shows all temples
  }

  filteredTemples.forEach(temple => {
    templeContainer.innerHTML += createTempleCard(temple);
  });
}

// Initial display of all temples
document.addEventListener('DOMContentLoaded', () => {
  displayTemples('all');
});

// Add event listeners to nav links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const filter = e.target.dataset.filter;
    displayTemples(filter);
    
    // Close mobile menu if open
    navMenu.classList.remove('active');
  });
});