const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    if (entry.isIntersecting) {
      updateActiveLink(id);
    }
  });
}, { threshold: 0.6 });
sections.forEach(section => observer.observe(section));

function updateActiveLink(activeId) {
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href').substring(1) === activeId);
  });
}

navLinks.forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = anchor.getAttribute('href').substring(1);
    document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
  });
});

const yearSpan = document.createElement('span');
yearSpan.textContent = new Date().getFullYear();
document.querySelector('footer p:last-child').appendChild(yearSpan);

const lazyImages = document.querySelectorAll("img[data-src]");
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      entry.target.classList.add('fade-in');
      imageObserver.unobserve(entry.target);
    }
  });
});
lazyImages.forEach(image => imageObserver.observe(image));

const darkModeToggle = document.createElement('button');
darkModeToggle.textContent = '🌙';
darkModeToggle.className = 'dark-mode-toggle';
document.body.appendChild(darkModeToggle);
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') navigateSection(1);
  else if (e.key === 'ArrowUp') navigateSection(-1);
});
function navigateSection(direction) {
  const visibleSection = Array.from(sections).find(section => section.getBoundingClientRect().top >= 0);
  const index = Array.from(sections).indexOf(visibleSection);
  const targetIndex = Math.min(Math.max(index + direction, 0), sections.length - 1);
  sections[targetIndex].scrollIntoView({ behavior: 'smooth' });
}

const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '⬆️';
backToTopButton.className = 'back-to-top';
document.body.appendChild(backToTopButton);
window.addEventListener('scroll', () => {
  backToTopButton.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function validateForm(event) {
  event.preventDefault();
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  if (!name.value.trim()) return alert('Please enter your name.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) return alert('Please enter a valid email address.');
  if (!message.value.trim()) return alert('Please enter a message.');
  alert('Form submitted successfully!');
  fetch('https://your-production-api.com/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name.value, email: email.value, message: message.value })
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // If the contact section exists in HTML, no need to inject dynamically.
});
