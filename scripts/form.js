// Product data
const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averaging: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averaging: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averaging: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averaging: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averaging: 5.0
    }
];

// Populate product dropdown
document.addEventListener('DOMContentLoaded', function() {
    const productSelect = document.getElementById('productName');
    
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
    
    // Set current year in footer
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    
    // Set last modified date
    document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
});