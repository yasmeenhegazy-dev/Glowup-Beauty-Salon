document.addEventListener('DOMContentLoaded', () => {
    const stylists = [
        {
            "id": 1,
            "name": "Sarah",
            "specialty": "Nail technician",
            "bio": "Sarah is an expert in modern nail art and prdicures",
            "image": "assests/images/stylist1.jpg"
        },
        {
            "id": 2,
            "name": "Emily",
            "specialty": "hair stylists",
            "bio": "Emily specializes in modern hair trends and classic styles.",
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

    const container = document.querySelector('.stylist-cards-container');
    stylists.forEach(stylist => {
        const stylistCard = document.createElement('div');
        stylistCard.classList.add('stylist-card');
        stylistCard.innerHTML = `
            <img src="${stylist.image}" alt="${stylist.name}">
            <h3>${stylist.name}</h3>
            <p>${stylist.specialty}</p>
            <button class="view-bio-btn" data-stylist-id="${stylist.id}">View Bio</button>
        `;
        container.appendChild(stylistCard);
    });

    // Modal functionality
    const modal = document.createElement('div');
    modal.classList.add('stylist-modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <img id="modal-stylist-image" src="" alt="">
            <h2 id="modal-stylist-name"></h2>
            <h3 id="modal-stylist-specialty"></h3>
            <p id="modal-stylist-bio"></p>
        </div>
    `;
    document.body.appendChild(modal);

    document.querySelectorAll('.view-bio-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const stylistId = event.target.dataset.stylistId;
            const stylist = stylists.find(s => s.id == stylistId);
            if (stylist) {
                document.getElementById('modal-stylist-image').src = stylist.image;
                document.getElementById('modal-stylist-image').alt = stylist.name;
                document.getElementById('modal-stylist-name').textContent = stylist.name;
                document.getElementById('modal-stylist-specialty').textContent = stylist.specialty;
                document.getElementById('modal-stylist-bio').textContent = stylist.bio;
                modal.classList.add('active'); 
            }
        });
    });

    document.querySelector('.close-button').addEventListener('click', () => {
        modal.classList.remove('active'); 
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.classList.remove('active'); 
        }
    });
});
