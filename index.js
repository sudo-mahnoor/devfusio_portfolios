
// -------------------- Toggle icon navbar -----------
document.getElementById('menu-icon').addEventListener('click', function() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('show');
    // Toggle the 'fa-times' class on the menu icon to indicate open/close
    this.classList.toggle('fa-times');
});

// ------------------- Scroll section active link ---------------------
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let menuIcon = document.getElementById('menu-icon');
let navbar = document.querySelector('.navbar');

window.onscroll = () => {
    let top = window.scrollY;
    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // Remove active class from all navLinks
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            // Add active class to the link that corresponds to the section in view
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        }
    });

    // ------------- Sticky navbar -----------
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Hide the navbar when scrolling (close it if it's open)
    if (window.innerWidth <= 768) {
        navbar.classList.remove('show');
        menuIcon.classList.remove('fa-times');
    }
};

// ------------------- Close navbar when clicking on a link ---------------------
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navbar.classList.remove('show'); // Hide navbar on link click
            menuIcon.classList.remove('fa-times'); // Reset the menu icon to the default state
        }
    });
});


// ===================scroll reveal===============
ScrollReveal({ 
    distance:'80px',
    duration:2000,
    delay:200,
 });

 ScrollReveal().reveal('.home-content, heading', { origin: 'top' });
  ScrollReveal().reveal('.home-img, .services-container, .portfolio-box,.contact-form', { origin: 'bottom' }); 
  ScrollReveal().reveal('.home-contact h1, .about-img', { origin: 'left' });
   ScrollReveal().reveal('.home-contact p, about-content', { origin: 'right' });

  // Scroll animation
  ScrollReveal({
    distance: '60px',
    duration: 1500,
    delay: 200,
    reset: false
  }).reveal('.skills-box', { origin: 'bottom', interval: 100 });

  

ScrollReveal({
  distance: '60px',
  duration: 1500,
  delay: 300,
  reset: true,
});

//   
// script.js

// Example: future feature like filtering or opening project modals
document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio section ready!");

  // Placeholder for interactivity like modal previews or filters
});

// skillsssssss
const filterBtns = document.querySelectorAll('.filter-btn');
const skillBoxes = document.querySelectorAll('.skills-box');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show/Hide skills
        skillBoxes.forEach(box => {
            if (filter === 'all' || box.classList.contains(filter)) {
                box.style.display = 'flex'; // Show
            } else {
                box.style.display = 'none'; // Hide
            }
        });
    });
});

// contact form
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission to handle via AJAX

    const formData = new FormData(this);
    const successMessage = document.getElementById('success-message');

    // Show loading message while form is being submitted
    successMessage.innerHTML = 'Sending...';
    successMessage.style.display = 'block'; // Make the success message container visible
    successMessage.style.color = 'orange'; // Set the color to indicate loading

    // Make the API call to Web3Forms
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Check if the form submission is successful
        if (data.success) {
            successMessage.innerHTML = 'Message sent successfully!';
            successMessage.style.color = '#28a745'; // Green for success
            successMessage.classList.remove('error');
        } else {
            successMessage.innerHTML = 'Error: ' + data.message;
            successMessage.style.color = '#dc3545'; // Red for error
            successMessage.classList.add('error');
        }

        // Make the message appear with smooth fade-in
        successMessage.style.opacity = 1;

        // Hide the pop-up after 5 seconds
        setTimeout(() => {
            successMessage.style.opacity = 0;
            setTimeout(() => {
                successMessage.style.display = 'none'; // Hide after fade-out
            }, 500); // Wait for fade-out transition
        }, 5000); // Show the pop-up for 5 seconds
    })
    .catch(error => {
        // Handle any network or other errors
        successMessage.innerHTML = 'An error occurred. Please try again later.';
        successMessage.style.color = '#dc3545'; // Red for errors
        successMessage.classList.add('error');
        successMessage.style.opacity = 1;

        // Hide the pop-up after 5 seconds
        setTimeout(() => {
            successMessage.style.opacity = 0;
            setTimeout(() => {
                successMessage.style.display = 'none'; // Hide after fade-out
            }, 500); // Wait for fade-out transition
        }, 5000); // Show the pop-up for 5 seconds
    });
});
// banner

    document.addEventListener("DOMContentLoaded", function () {
        const text = "Zahra Khaliq"; // The text to be typed
        let i = 0;
        const speed = 100; // Typing speed in milliseconds
        const element = document.querySelector(".typing-effect"); // Target the element

        function typeWriter() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i); // Add one character at a time
                i++;
                setTimeout(typeWriter, speed); // Call the function again after the speed
            }
        }

        typeWriter(); // Start typing when page loads
    });
// aos
 AOS.init({
    duration: 1000,
    once: true
  });
  document.addEventListener("DOMContentLoaded", function () {
    const timeline = document.querySelector('.timeline');
    const timelineLine = document.querySelector('.timeline-line');
    const items = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');

          // Calculate the position to extend the timeline line
          const itemBottom = entry.target.offsetTop + entry.target.offsetHeight / 2;
          if (itemBottom > timelineLine.offsetHeight) {
            timelineLine.style.height = `${itemBottom}px`;
          }
        }
      });
    }, {
      threshold: 0.1
    });

    items.forEach(item => {
      observer.observe(item);
    });
  });
//   bubbles
document.addEventListener('DOMContentLoaded', () => {
  const bubbleContainer = document.querySelector('.bubbles');
  const numberOfBubbles = 30;

  for (let i = 0; i < numberOfBubbles; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.left = `${Math.random() * 100}vw`;
    bubble.style.animationDuration = `${Math.random() * 5 + 5}s`;
    bubble.style.animationDelay = `${Math.random() * 5}s`;
    bubbleContainer.appendChild(bubble);
  }
});


// 
document.querySelectorAll('header nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Get the target section ID
        const targetSection = document.querySelector(this.getAttribute('href'));

        // Scroll to the target section with offset for the fixed header
        window.scrollTo({
            top: targetSection.offsetTop - 80, // Adjust '80' based on your header's height
            behavior: 'smooth'
        });
    });
});
// loader

// kura
//  document.querySelectorAll('.service-line').forEach(line => {
//     line.addEventListener('click', () => {
//       const targetId = line.getAttribute('data-target');
//       document.querySelectorAll('.inner-content').forEach(el => el.classList.remove('active'));
//       document.getElementById(targetId).classList.add('active');
//     });
//   });

  // Close button
//   document.querySelectorAll('.close-btn').forEach(btn => {
//     btn.addEventListener('click', () => {
//       btn.parentElement.classList.remove('active');
//     });
//   });


  const serviceLines = document.querySelectorAll('.service-line');
  const overlay = document.getElementById('overlay');
  const contents = document.querySelectorAll('.inner-content');

  serviceLines.forEach(line => {
    line.addEventListener('click', () => {
      const targetId = line.getAttribute('data-target');
      const content = document.getElementById(targetId);

      // Hide all inner content elements
      contents.forEach(c => c.style.display = 'none');

      // Position and display the clicked content
      content.style.display = 'block';

      // Show overlay
      overlay.style.display = 'block';

      // Close overlay and content on click outside
      overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
        content.style.display = 'none';
      });

      // Close content on close button click
      const closeBtn = content.querySelector('.close-btn');
      closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
        content.style.display = 'none';
      });
    });
  });

