// Enhanced overflow animations
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        observer.observe(item);
    });

    // Smooth filter animations with overflow handling
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Animate items out first
            galleryItems.forEach((item, index) => {
                setTimeout(() => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.classList.remove('filter-hidden');
                        item.classList.add('filter-visible');
                    } else {
                        item.classList.remove('filter-visible');
                        item.classList.add('filter-hidden');
                    }
                }, index * 50);
            });
        });
    });

    // Parallax scroll effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.gallery-item');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index % 3) * 0.1;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
});
