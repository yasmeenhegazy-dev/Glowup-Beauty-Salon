document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');
    const serviceSelect = document.getElementById('service');
    const stylistSelect = document.getElementById('stylist');

    const services = [
        {
            "id": 1,
            "name": "Haircut & Styling",
            "category": "hair",
            "description": "Professional haircut and personalized styling to suit your look.",
            "price": "300 LE",
            "image": "assests/images/hair.jpg"
        },
        {
            "id": 2,
            "name": "Full Color",
            "category": "hair",
            "description": "Achieve a vibrant new look with a full hair color application.",
            "price": "700 LE",
            "image": "assests/images/hair2.jpg"
        },
        {
            "id": 3,
            "name": "Manicure",
            "category": "nails",
            "description": "Classic manicure including nail shaping, cuticle care, and polish application.",
            "price": "150 LE",
            "image": "assests/images/nails.jpg"
        },
        {
            "id": 4,
            "name": "Pedicure",
            "description": "Relaxing pedicure with foot soak, exfoliation, massage, and polish.",
            "price": "250 LE",
            "image": "assests/images/nails2.jpg"
        },
        {
            "id": 5,
            "name": "Deep Cleansing Facial",
            "category": "facial",
            "description": "Purifying facial to cleanse, exfoliate, and hydrate your skin.",
            "price": "450 LE",
            "image": "assests/images/facial.jpg"
        },
        {
            "id": 6,
            "name": "Anti-Aging Facial",
            "category": "facial",
            "description": "Rejuvenating facial designed to reduce signs of aging and improve skin elasticity.",
            "price": "550 LE",
            "image": "assests/images/facial2.jpg"
        }
    ];

    const stylists = [
        {
            "id": 1,
            "name": "Sarah",
            "specialty": "Hair Stylist",
            "bio": "Sarah is an expert in modern hair trends and classic styles, with over 10 years of experience.",
            "image": "assests/images/stylist1.jpg"
        },
        {
            "id": 2,
            "name": "Emily",
            "specialty": "Nail Technician",
            "bio": "Emily specializes in intricate nail art and long-lasting manicures and pedicures.",
            "image": "assests/images/stylists2.jpg"
        },
        {
            "id": 3,
            "name": "Jessica",
            "specialty": "Esthetician",
            "bio": "Jessica provides exceptional skincare treatments, facials, and waxing services.",
            "image": "assests/images/stylist3.jpg"
        }
    ];

    //services dropdown
    services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.name;
        option.textContent = `${service.name} - ${service.price}`;
        serviceSelect.appendChild(option);
    });

    //stylists dropdown
    stylists.forEach(stylist => {
        const option = document.createElement('option');
        option.value = stylist.name;
        option.textContent = stylist.name;
        stylistSelect.appendChild(option);
    });

    
    function validateField(inputElement, errorElementId, errorMessage, validationFn = (value) => value.trim() !== '') {
        const errorElement = document.getElementById(errorElementId);
        if (!validationFn(inputElement.value)) {
            errorElement.textContent = errorMessage;
            return false;
        } else {
            errorElement.textContent = ''; 
            return true;
        }
    }

    // Form Validation
    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        let isValid = true;

        
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
        const dateInput = document.getElementById('date');
        const timeInput = document.getElementById('time');

        // Name
        isValid = validateField(nameInput, 'name-error', 'Name is required.') && isValid;

        // Phone
        const phonePattern = /^\(\+20\)\s[0-9]{10}$/;
        isValid = validateField(phoneInput, 'phone-error', 'Please enter a valid phone number in the format (+20) 1234567890.', (value) => phonePattern.test(value.trim())) && isValid;

        //  Service
        isValid = validateField(serviceSelect, 'service-error', 'Please select a service.', (value) => value !== '') && isValid;

        // Stylist
        isValid = validateField(stylistSelect, 'stylist-error', 'Please select a stylist.', (value) => value !== '') && isValid;

        // Date
        const selectedDate = new Date(dateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        let dateIsValid = true;
        if (dateInput.value.trim() === '') {
            document.getElementById('date-error').textContent = 'Date is required.';
            dateIsValid = false;
        } else if (selectedDate < today) {
            document.getElementById('date-error').textContent = 'Cannot book appointments in the past.';
            dateIsValid = false;
        } else {
            document.getElementById('date-error').textContent = '';
        }
        isValid = dateIsValid && isValid;


        // Time
        isValid = validateField(timeInput, 'time-error', 'Time is required.') && isValid;

        if (isValid) {
            // saving to LocalStorage
            const bookingData = {
                name: nameInput.value,
                phone: phoneInput.value,
                service: serviceSelect.value,
                stylist: stylistSelect.value,
                date: dateInput.value,
                time: timeInput.value
            };
            localStorage.setItem('latestBooking', JSON.stringify(bookingData));
            window.location.href = 'thankyou.html';
        } else {
            alert('Please correct the errors in the form.');
        }
    });
});
