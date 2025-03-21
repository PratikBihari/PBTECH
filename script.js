// Fix SVG rendering issues
document.addEventListener('DOMContentLoaded', function() {
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage) {
        // Add loading event listener to ensure SVG loads properly
        heroImage.addEventListener('load', function() {
            console.log('Hero image loaded successfully');
            this.style.opacity = '1';
        });
        
        // Handle error if SVG fails to load
        heroImage.addEventListener('error', function() {
            console.error('Error loading hero image');
            // Try to reload the image
            this.src = this.src + '?t=' + new Date().getTime();
        });
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav item
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 79, // Account for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation menu based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// Portfolio Filtering
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length && portfolioItems.length) {
        // Function to ensure the layout is redrawn correctly
        const updateLayout = () => {
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 300);
        };
        
        // Initialize with staggered animation
        portfolioItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 + index * 50);
        });
        
        // Apply initial transform to ensure smooth animations later
        setTimeout(() => {
            portfolioItems.forEach(item => {
                item.style.transform = 'translateY(0)';
            });
            updateLayout();
        }, 800);
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to current button
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                // Counter for staggered animation
                let visibleIndex = 0;
                
                portfolioItems.forEach(item => {
                    // Reset any lingering 3D transforms
                    item.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
                    
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        // First hide all items
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px) scale(0.95)';
                        
                        // Make items visible but not displayed yet
                        item.style.display = 'block';
                        
                        // Then show them with staggered animation
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0) scale(1)';
                        }, 50 + visibleIndex * 70);
                        
                        visibleIndex++;
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px) scale(0.95)';
                        
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
                
                updateLayout();
            });
        });
        
        // Add portfolio item hover effects with proper cleanup
        portfolioItems.forEach(item => {
            // Variables to track hover state
            let isHovering = false;
            
            // Portfolio link animation
            const handleMouseEnter = () => {
                isHovering = true;
                const link = item.querySelector('.portfolio-link');
                if (link) {
                    link.style.opacity = '1';
                    link.style.transform = 'scale(1)';
                }
            };
            
            const handleMouseLeave = () => {
                isHovering = false;
                const link = item.querySelector('.portfolio-link');
                if (link) {
                    link.style.opacity = '0';
                    link.style.transform = 'scale(0.8)';
                }
                
                // Reset any 3D transforms when mouse leaves
                item.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            };
            
            // 3D tilt effect with bounds checking
            const handleMouseMove = (e) => {
                if (!isHovering) return;
                
                const rect = item.getBoundingClientRect();
                const x = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
                const y = Math.min(Math.max(0, e.clientY - rect.top), rect.height);
                
                const xPercent = (x / rect.width - 0.5) * 2; // -1 to 1
                const yPercent = (y / rect.height - 0.5) * 2; // -1 to 1
                
                // Apply transform with limited angle
                item.style.transform = `translateY(-10px) rotateX(${yPercent * -3}deg) rotateY(${xPercent * 3}deg)`;
            };
            
            // Add event listeners
            item.addEventListener('mouseenter', handleMouseEnter);
            item.addEventListener('mouseleave', handleMouseLeave);
            item.addEventListener('mousemove', handleMouseMove);
        });
    }
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 50) {
            element.classList.add('animate');
        }
    });
};

// Add animation classes to elements
window.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.about-stats .stat').forEach((stat, index) => {
        stat.classList.add('animate-on-scroll');
        stat.style.animationDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.about-features .feature').forEach((feature, index) => {
        feature.classList.add('animate-on-scroll');
        feature.style.animationDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.contact-info .info-item').forEach((item, index) => {
        item.classList.add('animate-on-scroll');
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Initial check for elements in viewport
    animateOnScroll();
    
    // Check for elements in viewport on scroll
    window.addEventListener('scroll', animateOnScroll);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Form Submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData.entries());
        
        // Simple validation
        let isValid = true;
        for (const key in formValues) {
            if (!formValues[key].trim()) {
                isValid = false;
                break;
            }
        }
        
        if (isValid) {
            // Show a success message (in a real app, you'd send the data to a server)
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            button.textContent = 'Sending...';
            button.disabled = true;
            
            // Simulate sending data
            setTimeout(() => {
                button.textContent = 'Message Sent!';
                button.style.backgroundColor = 'var(--success-color)';
                
                // Reset form
                this.reset();
                
                // Reset button after a delay
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.backgroundColor = '';
                    button.disabled = false;
                }, 3000);
            }, 1500);
        } else {
            alert('Please fill in all fields');
        }
    });
}

// Create a placeholder client avatar
document.addEventListener('DOMContentLoaded', function() {
    const clientAvatar = document.querySelector('.testimonial-author img');
    if (clientAvatar) {
        // Create SVG avatar if image doesn't exist
        clientAvatar.onerror = function() {
            const avatarContainer = this.parentElement;
            
            // Create SVG
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("width", "60");
            svg.setAttribute("height", "60");
            svg.setAttribute("viewBox", "0 0 60 60");
            svg.style.borderRadius = "50%";
            svg.style.background = "linear-gradient(45deg, var(--primary-color), var(--secondary-color))";
            
            // Create text
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", "50%");
            text.setAttribute("y", "50%");
            text.setAttribute("dominant-baseline", "middle");
            text.setAttribute("text-anchor", "middle");
            text.style.fill = "white";
            text.style.fontWeight = "bold";
            text.style.fontSize = "22px";
            text.textContent = "SJ";
            
            svg.appendChild(text);
            
            // Replace img with SVG
            avatarContainer.replaceChild(svg, this);
        };
    }
});

// Add scroll-based navbar effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
}); 