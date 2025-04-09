document.addEventListener('DOMContentLoaded', function() {
     // Set current year and last modified date
     const currentYear = new Date().getFullYear();
     document.getElementById('current-year').textContent = currentYear;
     
     const lastModified = document.lastModified;
     document.getElementById('last-modified').textContent = lastModified;
    // Event data
    const events = [
        {
            id: 'coastal-morning',
            trailId: 'coastal',
            date: '2023-06-15',
            time: '08:00',
            guide: 'Sarah Johnson',
            spots: 12,
            price: 45
        },
        {
            id: 'coastal-sunset',
            trailId: 'coastal',
            date: '2023-06-17',
            time: '17:30',
            guide: 'Michael Chen',
            spots: 8,
            price: 55
        },
        {
            id: 'eagle-weekend',
            trailId: 'eagle-peak',
            date: '2023-06-18',
            time: '07:00',
            guide: 'Emma Wilson',
            spots: 6,
            price: 65
        },
        {
            id: 'falls-explorer',
            trailId: 'hidden-falls',
            date: '2023-06-22',
            time: '06:30',
            guide: 'David Rodriguez',
            spots: 5,
            price: 75
        }
    ];
    
    // Trail data (simplified)
    const trails = {
        'coastal': 'Coastal Bluff Trail',
        'eagle-peak': 'Eagle Peak Summit',
        'hidden-falls': 'Hidden Falls Loop'
    };
    
    // Display events
    const eventsContainer = document.querySelector('.events-container');
    
    if (eventsContainer) {
        events.forEach(event => {
            const eventDate = new Date(`${event.date}T${event.time}`);
            const formattedDate = eventDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
            
            const formattedTime = eventDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
            
            const eventHTML = `
                <div class="event-card" data-event-id="${event.id}">
                    <h3>${trails[event.trailId]}</h3>
                    <div class="event-details">
                        <p><strong>Date:</strong> ${formattedDate}</p>
                        <p><strong>Time:</strong> ${formattedTime}</p>
                        <p><strong>Guide:</strong> ${event.guide}</p>
                        <p><strong>Spots Available:</strong> ${event.spots}</p>
                        <p><strong>Price:</strong> $${event.price}</p>
                    </div>
                    <button class="btn btn-primary signup-btn" data-event-id="${event.id}">Sign Up</button>
                </div>
            `;
            
            eventsContainer.innerHTML += eventHTML;
        });
    }
    
    // Event signup form
    const signupButtons = document.querySelectorAll('.signup-btn');
    const signupModal = document.querySelector('.signup-modal');
    const closeModal = document.querySelector('.close-modal');
    const signupForm = document.getElementById('signup-form');
    
    signupButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventId = this.dataset.eventId;
            const event = events.find(e => e.id === eventId);
            
            if (event) {
                document.getElementById('event-name').textContent = trails[event.trailId];
                document.getElementById('event-date').textContent = new Date(`${event.date}T${event.time}`).toLocaleDateString();
                document.getElementById('event-time').textContent = new Date(`${event.date}T${event.time}`).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                document.getElementById('event-price').textContent = `$${event.price}`;
                signupForm.dataset.eventId = eventId;
                
                signupModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    closeModal.addEventListener('click', function() {
        signupModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === signupModal) {
            signupModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const eventId = this.dataset.eventId;
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const participants = document.getElementById('signup-participants').value;
        
        // Simple validation
        if (!name || !email || !participants) {
            alert('Please fill out all fields.');
            return;
        }
        
        // Save registration to localStorage
        let registrations = JSON.parse(localStorage.getItem('eventRegistrations') || []);
        
        registrations.push({
            eventId,
            name,
            email,
            participants: parseInt(participants),
            date: new Date().toISOString()
        });
        
        localStorage.setItem('eventRegistrations', JSON.stringify(registrations));
        
        // Show confirmation
        alert('Thank you for your registration! We will send you a confirmation email shortly.');
        
        // Reset form and close modal
        signupForm.reset();
        signupModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Initialize event spots based on registrations
    function updateEventSpots() {
        const registrations = JSON.parse(localStorage.getItem('eventRegistrations') || []);
        
        events.forEach(event => {
            const eventRegistrations = registrations.filter(r => r.eventId === event.id);
            const spotsTaken = eventRegistrations.reduce((sum, reg) => sum + reg.participants, 0);
            const spotsAvailable = event.spots - spotsTaken;
            
            const eventCard = document.querySelector(`.event-card[data-event-id="${event.id}"]`);
            if (eventCard) {
                const spotsElement = eventCard.querySelector('p:nth-of-type(4)');
                if (spotsElement) {
                    spotsElement.innerHTML = `<strong>Spots Available:</strong> ${spotsAvailable}`;
                    
                    const signupButton = eventCard.querySelector('.signup-btn');
                    if (spotsAvailable <= 0) {
                        signupButton.textContent = 'Sold Out';
                        signupButton.disabled = true;
                        signupButton.classList.remove('btn-primary');
                        signupButton.classList.add('btn-disabled');
                    }
                }
            }
        });
    }
    
    updateEventSpots();
});