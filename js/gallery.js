document.addEventListener('DOMContentLoaded', () => {
    const images = [
        {
            "id": 1,
            "src": "assests/images/galleryhair1.jpg",
            "category": "hair",
            "alt": "Elegant hairstyle"
        },
        {
            "id": 2,
            "src": "assests/images/galleryhair2.jpg",
            "category": "hair",
            "alt": " hairstyle"
        },
        {
            "id": 3,
            "src": "assests/images/nails.jpg",
            "category": "nails",
            "alt": "Manicure with nail art"
        },
        {
            "id": 4,
            "src": "assests/images/nails2.jpg",
            "category": "nails",
            "alt": "pedicure with polish"
        },
        {
            "id": 5,
            "src": "assests/images/facial.jpg",
            "category": "facial",
            "alt": "Relaxing facial treatment"
        },
        {
            "id": 6,
            "src": "assests/images/facial2.jpg",
            "category": "facial",
            "alt": "Skin glowing after facial"
        }
    ];

    const container = document.querySelector('.gallery-container');
    const filterButtons = document.querySelectorAll('.filter-btn');

    const renderGallery = (filterCategory) => {
        container.innerHTML = ''; 
        images.forEach(image => {
            if (filterCategory === 'all' || image.category === filterCategory) {
                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');
                galleryItem.innerHTML = `
                    <img src="${image.src}" alt="${image.alt}" data-category="${image.category}">
                `;
                container.appendChild(galleryItem);
            }
        });

        
        document.querySelectorAll('.gallery-item img').forEach(img => {
            img.addEventListener('click', (event) => {
                openLightbox(event.target.src, event.target.alt);
            });
        });
    };


    renderGallery('all');

    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            const category = event.target.dataset.category;
            renderGallery(category);
        });
    });

    
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    
    const lightboxContent = document.createElement('div');
    lightboxContent.classList.add('lightbox-content');

    const closeLightboxButton = document.createElement('span');
    closeLightboxButton.classList.add('close-lightbox');
    closeLightboxButton.innerHTML = '&times;';
    lightboxContent.appendChild(closeLightboxButton);

    const lightboxImage = document.createElement('img');
    lightboxContent.appendChild(lightboxImage);

    lightbox.appendChild(lightboxContent);

    closeLightboxButton.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) { 
            lightbox.classList.remove('active');
        }
    });

    const openLightbox = (src, alt) => {
        lightboxImage.src = src;
        lightboxImage.alt = alt;
        lightbox.classList.add('active');
    };
});
