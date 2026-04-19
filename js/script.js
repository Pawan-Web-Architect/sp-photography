// Wait for the entire website to load before running any animations or scripts
document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. MOBILE HAMBURGER MENU MAGIC
       ========================================= */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    // Only run this if the hamburger menu actually exists on the screen
    if (hamburger) {
        // Toggle the drop-down menu when the hamburger icon is clicked
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Automatically close the menu when a user clicks a link to go to a section
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    /* =========================================
       2. SCROLL REVEAL "ALIVE" ANIMATIONS
       ========================================= */
    // Grab all the premium elements we want to animate
    const animateElements = document.querySelectorAll('.glass-card, .masonry-item, .section-heading');
    
    // Add the 'reveal-item' class to hide them initially (pushed down and invisible)
    animateElements.forEach(el => el.classList.add('reveal-item'));

    // Create the Intersection Observer (The trigger that watches the screen)
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the user scrolls down and the element enters the screen...
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // Slide it up and fade it in!
                observer.unobserve(entry.target); // Stop watching it so it only animates once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Triggers when 15% of the item becomes visible
        rootMargin: "0px 0px -50px 0px" // Triggers just before it hits the bottom edge
    });

    // Tell the observer to start watching all of our selected elements
    animateElements.forEach(el => revealObserver.observe(el));
    /* =========================================
       3. CUSTOM CURSOR TRACKING
       ========================================= */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const interactables = document.querySelectorAll('a, button, .masonry-item');

    // Make the cursor follow the mouse
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline trails slightly behind for a smooth fluid effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Make the cursor expand when hovering over links, buttons, and gallery images
    interactables.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '70px';
            cursorOutline.style.height = '70px';
            cursorOutline.style.backgroundColor = 'rgba(181, 149, 81, 0.1)'; // Soft gold glow inside
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });

        link.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
    /* =========================================
       4. PORTFOLIO FILTERING LOGIC
       ========================================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const masonryItems = document.querySelectorAll('.masonry-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove 'active' from all buttons, add to the clicked one
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Show or hide items based on the category
            masonryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    /* =========================================
       5. CINEMATIC LIGHTBOX LOGIC
       ========================================= */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    // When a masonry item is clicked, open the lightbox
    masonryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').getAttribute('src');
            lightboxImg.setAttribute('src', imgSrc);
            lightbox.classList.add('active');
            
            // Optional: Hide custom cursor while in lightbox
            document.querySelector('.cursor-dot').style.display = 'none';
            document.querySelector('.cursor-outline').style.display = 'none';
        });
    });

    // Function to close the lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.querySelector('.cursor-dot').style.display = 'block';
        document.querySelector('.cursor-outline').style.display = 'block';
    };

    // Close when clicking the 'X' or anywhere in the dark background
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            closeLightbox();
        }
    });

});