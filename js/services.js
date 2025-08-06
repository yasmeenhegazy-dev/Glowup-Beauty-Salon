document.addEventListener('DOMContentLoaded', () => {
    const services = [
        {
            "id": 1,
            "name": "Hairmask",
            "category": "hair",
            "description": "Hairmask and personalized styling to suit your look.",
            "price": "250 LE",
            "image": "assests/images/hair.jpg"
        },
        {
            "id": 2,
            "name": "Full Color",
            "category": "hair",
            "description": "Achieve a new look with a full hair color application.",
            "price": "500 LE",
            "image": "assests/images/hair2.jpg"
        },
        {
            "id": 3,
            "name": "Manicure",
            "category": "nails",
            "description": "Classic manicure including nail shaping and polish application.",
            "price": "200 LE",
            "image": "assests/images/nails.jpg"
        },
        {
            "id": 4,
            "name": "Pedicure",
            "category": "nails",
            "description": "Relaxing pedicure with polish.",
            "price": "250 LE",
            "image": "assests/images/nails2.jpg"
        },
        {
            "id": 5,
            "name": "Deep Cleansing Facial",
            "category": "facial",
            "description": " hydrate your skin.",
            "price": "600 LE",
            "image": "assests/images/facial.jpg"
        },
        {
            "id": 6,
            "name": "Anti-Aging Facial",
            "category": "facial",
            "description": "Reducing signs of aging and improving skin elasticity.",
            "price": "750 LE ",
            "image": "assests/images/facial2.jpg"
        }
    ];

    const container = document.querySelector('.service-cards-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const categoryImageContainer = document.querySelector('.category-image-container');

    const categoryImages = {
        hair: 'assests/images/hair.jpg',
        nails: 'assests/images/nails.jpg',
        facial: 'assests/images/facial.jpg'
    };


    const renderCategoryImages = (filterCategory) => {
        categoryImageContainer.innerHTML = ''; 

        if (filterCategory === 'all') {
            for (const category in categoryImages) {
                const img = document.createElement('img');
                img.src = categoryImages[category];
                img.alt = `${category} category image`;
                img.classList.add('category-main-image');
                categoryImageContainer.appendChild(img);
            }
        } else if (categoryImages[filterCategory]) {
            const img = document.createElement('img');
            img.src = categoryImages[filterCategory];
            img.alt = `${filterCategory} category image`;
            img.classList.add('category-main-image');
            categoryImageContainer.appendChild(img);
        }
    };

    const renderServices = (filterCategory) => {
        container.innerHTML = ''; 
        renderCategoryImages(filterCategory); 

        services.forEach(service => {
            if (filterCategory === 'all' || service.category === filterCategory) {
                const serviceCard = document.createElement('div');
                serviceCard.classList.add('service-card');
                serviceCard.innerHTML = `
                    <img src="${service.image}" alt="${service.name}">
                    <h3>${service.name}</h3>
                    <p class="category">${service.category}</p>
                    <p>${service.description}</p>
                    <p class="price">${service.price}</p>
                `;
                container.appendChild(serviceCard);
            }
        });
    };

    // Initial render
    renderServices('all');

    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            const category = event.target.dataset.category;
            renderServices(category);
        });
    });
});