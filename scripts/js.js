// Function to calculate wind chill
function calculateWindChill(temp, wind) {
    // Check if conditions are viable for wind chill calculation
    if (temp <= 10 && wind > 4.8) {
      // Wind chill formula for Celsius
      return (13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16)).toFixed(1) + " °C";
    } else {
      return "N/A";
    }
  }
  
  // Set footer year and last modified date
  document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
    
    // Set last modified date
    const lastModified = document.lastModified;
    document.getElementById('last-modified').textContent = `Last Modified: ${lastModified}`;
    
    // Calculate and display wind chill
    const temperature = 10; // °C
    const windSpeed = 5; // km/h
    
    const windChill = calculateWindChill(temperature, windSpeed);
    document.getElementById('windchill').textContent = windChill;
  });
  