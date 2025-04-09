document.addEventListener('DOMContentLoaded', function() {

    // Set current year and last modified date
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
    
    const lastModified = document.lastModified;
    document.getElementById('last-modified').textContent = lastModified;
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    const contactMessage = document.getElementById('contact-message');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message-text').value;
        
        // Simple validation
        if (!name || !email || !message) {
            contactMessage.textContent = 'Please fill out all fields.';
            contactMessage.classList.add('error');
            contactMessage.classList.remove('success');
            contactMessage.style.display = 'block';
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            contactMessage.textContent = 'Please enter a valid email address.';
            contactMessage.classList.add('error');
            contactMessage.classList.remove('success');
            contactMessage.style.display = 'block';
            return;
        }
        
        // Save contact message to localStorage
        let contactMessages = JSON.parse(localStorage.getItem('contactMessages') || []);
        
        contactMessages.push({
            name,
            email,
            message,
            date: new Date().toISOString()
        });
        
        localStorage.setItem('contactMessages', JSON.stringify(contactMessages));
        
        // Show success message
        contactMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        contactMessage.classList.add('success');
        contactMessage.classList.remove('error');
        contactMessage.style.display = 'block';
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            contactMessage.style.display = 'none';
        }, 5000);
    });
    
    // Initialize Google Map
    const mapElement = document.getElementById('map');
    
    if (mapElement) {
        // This would be replaced with actual Google Maps API code
        mapElement.innerHTML = `
            <div style="width: 100%; height: 100%; background-color: #f0f0f0; display: flex; justify-content: center; align-items: center;">
                <p><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3202.123794484178!2d-121.91659200000001!3d36.6234067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808de14f031aeefd%3A0x5d9a4819f5f2738f!2s123%20Forest%20Ave%2C%20Pacific%20Grove%2C%20CA%2093950%2C%20EUA!5e0!3m2!1spt-BR!2sbr!4v1744204205334!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></p>
            </div>
        `;
    }
});