document.addEventListener("DOMContentLoaded", () => {
    
    const featuredProducts = [
        {
            name: "SkyVision X7",
            desc: "Our latest release, drone with the best camera for cinematography.",
            link: "../assets/skyvision-x7.png"
        },
        {
            name: "SkyVision X7 Pro",
            desc: "The better version, improved durability, film everything for 3 hours straight.",
            link: "../assets/skyvision-x7-pro.png"
        },
        {
            name: "Recox X2",
            desc: "The most reliable drone for reconnaissance and SAR, packed with thermal scanner.",
            link: "../assets/recox-x2.png"
        },
        {
            name: "Recox X2 Pro",
            desc: "The upgraded Recox X2, can last in the sky for a day, and packed with smoke grenades.",
            link: "../assets/recox-x2-pro.png"
        },
        {
            name: "Recox X1",
            desc: "The first recon and SAR drone that will search the sky with the sound of an owl.",
            link: "../assets/recox-x1.png"
        }
    ];

    const track = document.getElementById('featuredTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;

    function renderSlides() {
        featuredProducts.forEach((product, index) => {
            const slide = document.createElement('div');
            slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
            slide.setAttribute('data-index', index);
            
            slide.innerHTML = `
                <div class="slide-content-wrapper">
                    <img src="${product.link}" alt="${product.name}" class="featured-image">
                    <div class="featured-info">
                        <h3 class="featured-title">${product.name}</h3>
                        <p class="featured-desc">${product.desc}</p>
                        <div class="featured-buttons">
                            <a href="#" class="btn-card primary">
                                Learn More <span class="material-symbols-outlined">chevron_right</span>
                            </a>
                            <a href="#" class="btn-card secondary">
                                Order <span class="material-symbols-outlined">chevron_right</span>
                            </a>
                        </div>
                    </div>
                </div>
            `;
            
            track.appendChild(slide);
        });
    }

    function updateCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    nextBtn.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex >= featuredProducts.length) {
            currentIndex = 0;
        }
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = featuredProducts.length - 1;
        }
        updateCarousel();
    });

    renderSlides();
});