// ===============================
// MOBILE MENU TOGGLE
// ===============================
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

if (hamburger && mobileNav) {
  hamburger.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
  });

  document.querySelectorAll("#mobileNav a").forEach(link => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
    });
  });
}

// Scroll reveal animation
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach(el => revealObserver.observe(el));

// ===============================
// THEME TOGGLE (LIGHT / DARK)
// ===============================
// const themeToggle = document.getElementById("themeToggle");

// if (themeToggle) {
//   const savedTheme = localStorage.getItem("theme");

//   if (savedTheme === "light") {
//     document.body.classList.add("light");
//     themeToggle.textContent = "☀️";
//   } else {
//     themeToggle.textContent = "🌙";
//   }

//   themeToggle.addEventListener("click", () => {
//     document.body.classList.toggle("light");

//     const isLight = document.body.classList.contains("light");
//     themeToggle.textContent = isLight ? "☀️" : "🌙";
//     localStorage.setItem("theme", isLight ? "light" : "dark");
//   });
// }
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach(el => observer.observe(el));
});


// ===============================
// GLOBAL NETWORK BACKGROUND
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("bg-network");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.2;
      this.vy = (Math.random() - 0.5) * 0.2;
      this.radius = 1.3;
    }

    move() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 0, 0, 0.9)";

      ctx.fill();
    }
  }

  function connect() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
        ctx.strokeStyle = `rgba(255, 0, 0, ${(1 - dist / 140)})`;

          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.move();
      p.draw();
    });
    connect();
    requestAnimationFrame(animate);
  }

  particles = Array.from({ length: 70 }, () => new Particle());
  animate();
});
