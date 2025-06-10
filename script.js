// DOM Elements
const header = document.querySelector("header")
const hamburger = document.querySelector(".hamburger")
const nav = document.querySelector("nav")
const navLinks = document.querySelectorAll("nav ul li a")
const themeToggle = document.querySelector(".theme-toggle")
const backToTop = document.querySelector(".back-to-top")
const progressBars = document.querySelectorAll(".progress-bar")
const filterBtns = document.querySelectorAll(".filter-btn")
const projectItems = document.querySelectorAll(".project-item")
const contactForm = document.getElementById("contactForm")
const sections = document.querySelectorAll("section")
const skillItems = document.querySelectorAll(".skill-item")
const aboutImage = document.querySelector(".about-image")
const aboutText = document.querySelector(".about-text")
const contactInfo = document.querySelector(".contact-info")
const contactFormSection = document.querySelector(".contact-form")
const skillsGrids = document.querySelectorAll(".skills-grid")

// Preloader
window.addEventListener("load", () => {
  // Add animated background elements
  addAnimatedBackgrounds()

  // Initialize animations
  initializeAnimations()

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode")
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  }

  // Set initial active nav link
  setActiveNavLink()

  // Initialize skills sliders
  initSkillsSliders()
})

// Initialize skills sliders
function initSkillsSliders() {
  const skillCategories = document.querySelectorAll(".skill-category")

  skillCategories.forEach((category, index) => {
    const skillsGrid = category.querySelector(".skills-grid")
    const skillItems = skillsGrid.querySelectorAll(".skill-item")

    // Create navigation
    const skillsNav = document.createElement("div")
    skillsNav.className = "skills-nav"

    const prevBtn = document.createElement("div")
    prevBtn.className = "skills-nav-btn prev"
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>'

    const nextBtn = document.createElement("div")
    nextBtn.className = "skills-nav-btn next"
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>'

    skillsNav.appendChild(prevBtn)
    skillsNav.appendChild(nextBtn)

    category.appendChild(skillsNav)

    // Create pagination
    const pagination = document.createElement("div")
    pagination.className = "skills-pagination"

    const totalDots = Math.ceil(skillItems.length - 2)
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("div")
      dot.className = "skills-pagination-dot"
      if (i === 0) dot.classList.add("active")

      dot.addEventListener("click", () => {
        const scrollPosition = i * skillItems[0].offsetWidth
        skillsGrid.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        })
      })

      pagination.appendChild(dot)
    }

    category.appendChild(pagination)

    // Handle navigation clicks
    prevBtn.addEventListener("click", () => {
      skillsGrid.scrollBy({
        left: -skillItems[0].offsetWidth,
        behavior: "smooth",
      })
    })

    nextBtn.addEventListener("click", () => {
      skillsGrid.scrollBy({
        left: skillItems[0].offsetWidth,
        behavior: "smooth",
      })
    })

    // Update pagination and nav buttons on scroll
    skillsGrid.addEventListener("scroll", () => {
      updateSkillsNavigation(skillsGrid, prevBtn, nextBtn, pagination)
    })

    // Initial update
    updateSkillsNavigation(skillsGrid, prevBtn, nextBtn, pagination)

    // Add touch swiping for mobile
    let startX, scrollLeft

    skillsGrid.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].pageX - skillsGrid.offsetLeft
        scrollLeft = skillsGrid.scrollLeft
      },
      { passive: true },
    )

    skillsGrid.addEventListener(
      "touchmove",
      (e) => {
        if (!startX) return
        const x = e.touches[0].pageX - skillsGrid.offsetLeft
        const walk = (x - startX) * 2
        skillsGrid.scrollLeft = scrollLeft - walk
      },
      { passive: true },
    )

    skillsGrid.addEventListener("touchend", () => {
      startX = null
    })
  })
}

// Update skills navigation state
function updateSkillsNavigation(skillsGrid, prevBtn, nextBtn, pagination) {
  const scrollPosition = skillsGrid.scrollLeft
  const maxScroll = skillsGrid.scrollWidth - skillsGrid.clientWidth

  // Update navigation buttons
  if (scrollPosition <= 10) {
    prevBtn.classList.add("disabled")
  } else {
    prevBtn.classList.remove("disabled")
  }

  if (scrollPosition >= maxScroll - 10) {
    nextBtn.classList.add("disabled")
  } else {
    nextBtn.classList.remove("disabled")
  }

  // Update pagination
  const itemWidth = skillsGrid.querySelector(".skill-item").offsetWidth
  const activeDotIndex = Math.round(scrollPosition / itemWidth)

  const dots = pagination.querySelectorAll(".skills-pagination-dot")
  dots.forEach((dot, index) => {
    if (index === activeDotIndex) {
      dot.classList.add("active")
    } else {
      dot.classList.remove("active")
    }
  })
}

// Add animated background elements
function addAnimatedBackgrounds() {
  // Add animated backgrounds to sections
  sections.forEach((section, index) => {
    if (index % 2 === 0) {
      const bgElement1 = document.createElement("div")
      bgElement1.className = "animated-bg primary sm top-left"
      section.appendChild(bgElement1)

      const bgElement2 = document.createElement("div")
      bgElement2.className = "animated-bg secondary md bottom-right"
      section.appendChild(bgElement2)
    } else {
      const bgElement1 = document.createElement("div")
      bgElement1.className = "animated-bg secondary sm top-right"
      section.appendChild(bgElement1)

      const bgElement2 = document.createElement("div")
      bgElement2.className = "animated-bg primary md bottom-left"
      section.appendChild(bgElement2)
    }
  })
}

// Initialize animations
function initializeAnimations() {
  // Animate skill bars
  animateSkillBars()

  // Set initial active nav link
  setActiveNavLink()

  // Add typing animation to hero heading
  const heroHeading = document.querySelector(".hero-text h1 span")
  if (heroHeading) {
    heroHeading.classList.add("typing-text")
  }
}

// Sticky Header
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("sticky")
    backToTop.classList.add("active")
  } else {
    header.classList.remove("sticky")
    backToTop.classList.remove("active")
  }

  // Check for elements in viewport and animate them
  checkElementsInViewport()

  // Set active nav link based on scroll position
  setActiveNavLink()
})

// Check if elements are in viewport and animate them
function checkElementsInViewport() {
  // Animate skill bars when in viewport
  animateSkillBars()

  // Animate skill items when in viewport
  skillItems.forEach((item) => {
    if (isInViewport(item) && !item.classList.contains("animated")) {
      item.classList.add("animated")
    }
  })

  // Animate project items when in viewport
  projectItems.forEach((item) => {
    if (isInViewport(item) && !item.classList.contains("animated")) {
      item.classList.add("animated")
    }
  })

  // Animate about section when in viewport
  if (isInViewport(aboutImage) && !aboutImage.classList.contains("animated")) {
    aboutImage.classList.add("animated")
  }

  if (isInViewport(aboutText) && !aboutText.classList.contains("animated")) {
    aboutText.classList.add("animated")
  }

  // Animate contact section when in viewport
  if (isInViewport(contactInfo) && !contactInfo.classList.contains("animated")) {
    contactInfo.classList.add("animated")
  }

  if (isInViewport(contactFormSection) && !contactFormSection.classList.contains("animated")) {
    contactFormSection.classList.add("animated")
  }
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect()
  return rect.top <= window.innerHeight - 100 && rect.bottom >= 0
}

// Mobile Menu Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  nav.classList.toggle("active")

  // Animate hamburger lines
  const lines = hamburger.querySelectorAll(".line")
  if (hamburger.classList.contains("active")) {
    lines[0].style.transform = "rotate(45deg) translate(5px, 5px)"
    lines[1].style.opacity = "0"
    lines[2].style.transform = "rotate(-45deg) translate(5px, -5px)"
  } else {
    lines[0].style.transform = "none"
    lines[1].style.opacity = "1"
    lines[2].style.transform = "none"
  }
})

// Close mobile menu when clicking a nav link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    nav.classList.remove("active")

    // Reset hamburger lines
    const lines = hamburger.querySelectorAll(".line")
    lines[0].style.transform = "none"
    lines[1].style.opacity = "1"
    lines[2].style.transform = "none"
  })
})

// Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode")

  // Change icon based on theme
  if (document.body.classList.contains("dark-mode")) {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
    localStorage.setItem("theme", "dark")
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
    localStorage.setItem("theme", "light")
  }
})

// Animate skill bars when in viewport
function animateSkillBars() {
  progressBars.forEach((bar) => {
    if (isInViewport(bar.parentElement)) {
      const percent = bar.getAttribute("data-percent")
      bar.style.width = `${percent}%`
    }
  })
}

// Project Filtering with animation
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Set active button
    filterBtns.forEach((filterBtn) => filterBtn.classList.remove("active"))
    btn.classList.add("active")

    const filterValue = btn.getAttribute("data-filter")

    projectItems.forEach((item) => {
      if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
        item.style.display = "block"
        setTimeout(() => {
          item.style.opacity = "1"
          item.style.transform = "scale(1)"
        }, 200)
      } else {
        item.style.opacity = "0"
        item.style.transform = "scale(0.8)"
        setTimeout(() => {
          item.style.display = "none"
        }, 500)
      }
    })
  })
})

// Form Validation with enhanced feedback
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  let isValid = true

  // Validate Name
  const name = document.getElementById("name")
  if (name.value.trim() === "") {
    showError(name, "Name is required")
    isValid = false
  } else {
    clearError(name)
    showSuccess(name)
  }

  // Validate Email
  const email = document.getElementById("email")
  if (email.value.trim() === "") {
    showError(email, "Email is required")
    isValid = false
  } else if (!isValidEmail(email.value)) {
    showError(email, "Please enter a valid email")
    isValid = false
  } else {
    clearError(email)
    showSuccess(email)
  }

  // Validate Subject
  const subject = document.getElementById("subject")
  if (subject.value.trim() === "") {
    showError(subject, "Subject is required")
    isValid = false
  } else {
    clearError(subject)
    showSuccess(subject)
  }

  // Validate Message
  const message = document.getElementById("message")
  if (message.value.trim() === "") {
    showError(message, "Message is required")
    isValid = false
  } else {
    clearError(message)
    showSuccess(message)
  }

  // If form is valid, submit it (in a real scenario, you would send data to a server)
  if (isValid) {
    // Show success message with animation
    const formSuccess = document.createElement("div")
    formSuccess.className = "form-success"
    formSuccess.innerHTML = `
      <div style="background-color: var(--success-color); color: #155724; padding: 20px; border-radius: 12px; margin-bottom: 20px; transform: translateY(20px); opacity: 0; transition: all 0.5s ease;">
        <i class="fas fa-check-circle" style="margin-right: 10px;"></i>
        Your message has been sent successfully!
      </div>
    `

    contactForm.parentNode.insertBefore(formSuccess, contactForm)
    contactForm.reset()

    // Animate success message
    setTimeout(() => {
      const successMessage = document.querySelector(".form-success div")
      successMessage.style.transform = "translateY(0)"
      successMessage.style.opacity = "1"
    }, 100)

    // Remove success message after 5 seconds
    setTimeout(() => {
      const successMessage = document.querySelector(".form-success div")
      successMessage.style.transform = "translateY(-20px)"
      successMessage.style.opacity = "0"

      setTimeout(() => {
        formSuccess.remove()
      }, 500)
    }, 5000)
  }
})

// Helper function to show error message
function showError(input, message) {
  const formGroup = input.parentElement
  const errorMessage = formGroup.querySelector(".error-message")

  input.style.borderColor = "var(--danger-color)"
  input.style.animation = "shake 0.5s ease-in-out"
  errorMessage.textContent = message

  // Remove animation after it completes
  setTimeout(() => {
    input.style.animation = ""
  }, 500)
}

// Helper function to show success state
function showSuccess(input) {
  input.style.borderColor = "var(--success-color)"
}

// Helper function to clear error message
function clearError(input) {
  const formGroup = input.parentElement
  const errorMessage = formGroup.querySelector(".error-message")

  input.style.borderColor = ""
  errorMessage.textContent = ""
}

// Helper function to validate email format
function isValidEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

// Set active nav link based on scroll position
function setActiveNavLink() {
  const scrollPosition = window.scrollY

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      })
    }
  })
})

// Parallax effect for hero section
window.addEventListener("mousemove", (e) => {
  const heroSection = document.querySelector(".hero")
  if (heroSection) {
    const mouseX = e.clientX / window.innerWidth
    const mouseY = e.clientY / window.innerHeight

    const heroImage = document.querySelector(".hero-image img")
    if (heroImage) {
      heroImage.style.transform = `translate(${mouseX * 20 - 10}px, ${mouseY * 20 - 10}px) rotate(${mouseX * 5 - 2.5}deg)`
    }

    const heroBg = document.querySelectorAll(".hero .animated-bg")
    heroBg.forEach((bg) => {
      bg.style.transform = `translate(${mouseX * 30 - 15}px, ${mouseY * 30 - 15}px)`
    })
  }
})

// Add particle effect to hero section
function createParticles() {
  const heroSection = document.querySelector(".hero")
  if (heroSection) {
    const particlesContainer = document.createElement("div")
    particlesContainer.className = "particles-container"
    particlesContainer.style.position = "absolute"
    particlesContainer.style.top = "0"
    particlesContainer.style.left = "0"
    particlesContainer.style.width = "100%"
    particlesContainer.style.height = "100%"
    particlesContainer.style.overflow = "hidden"
    particlesContainer.style.zIndex = "0"

    heroSection.appendChild(particlesContainer)

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.position = "absolute"
      particle.style.width = `${Math.random() * 10 + 3}px`
      particle.style.height = particle.style.width
      particle.style.background = i % 2 === 0 ? "rgba(79, 70, 229, 0.2)" : "rgba(244, 63, 94, 0.2)"
      particle.style.borderRadius = "50%"
      particle.style.top = `${Math.random() * 100}%`
      particle.style.left = `${Math.random() * 100}%`
      particle.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`
      particle.style.opacity = Math.random() * 0.5 + 0.3
      particle.style.transform = `scale(${Math.random() * 0.8 + 0.2})`

      particlesContainer.appendChild(particle)
    }
  }
}

// Create particles on load
window.addEventListener("load", createParticles)

// Add 3D tilt effect to project cards
document.querySelectorAll(".project-item").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const cardRect = card.getBoundingClientRect()
    const cardCenterX = cardRect.left + cardRect.width / 2
    const cardCenterY = cardRect.top + cardRect.height / 2
    const mouseX = e.clientX - cardCenterX
    const mouseY = e.clientY - cardCenterY

    // Calculate rotation based on mouse position
    const rotateY = mouseX / 10
    const rotateX = -mouseY / 10

    // Apply the transform
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    card.style.transition = "transform 0.1s ease"

    // Add highlight effect
    const img = card.querySelector("img")
    if (img) {
      img.style.transform = `translateX(${mouseX / 20}px) translateY(${mouseY / 20}px)`
    }
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
    card.style.transition = "transform 0.5s ease"

    const img = card.querySelector("img")
    if (img) {
      img.style.transform = "translateX(0) translateY(0)"
      img.style.transition = "transform 0.5s ease"
    }
  })
})

// Add counter animation to skill percentages
function animateCounters() {
  document.querySelectorAll(".skill-percent").forEach((counter) => {
    const skillItem = counter.closest(".skill-item")
    const progressBar = skillItem.querySelector(".progress-bar")
    const targetValue = Number.parseInt(progressBar.getAttribute("data-percent"))

    if (isInViewport(skillItem) && !counter.classList.contains("counted")) {
      counter.classList.add("counted")

      let currentValue = 0
      const increment = targetValue / 50 // Divide by steps
      const duration = 1500 // Animation duration in ms
      const steps = 50 // Number of steps
      const stepTime = duration / steps

      const timer = setInterval(() => {
        currentValue += increment
        if (currentValue >= targetValue) {
          clearInterval(timer)
          currentValue = targetValue
        }
        counter.textContent = Math.round(currentValue) + "%"
      }, stepTime)
    }
  })
}

// Call animate counters on scroll
window.addEventListener("scroll", animateCounters)
// Call once on load
window.addEventListener("load", animateCounters)

// Add reveal animation to section headers
function revealSectionHeaders() {
  document.querySelectorAll(".section-header").forEach((header) => {
    if (isInViewport(header) && !header.classList.contains("revealed")) {
      header.classList.add("revealed")
      header.querySelector("h2").style.animation = "fadeInUp 0.8s ease forwards"
      header.querySelector(".underline").style.animation = "expandWidth 0.8s ease 0.3s forwards"
    }
  })
}

// Call reveal section headers on scroll
window.addEventListener("scroll", revealSectionHeaders)
// Call once on load
window.addEventListener("load", revealSectionHeaders)

// Handle window resize for skills slider
window.addEventListener("resize", () => {
  // Reinitialize skills sliders on window resize
  const skillCategories = document.querySelectorAll(".skill-category")

  skillCategories.forEach((category) => {
    const skillsGrid = category.querySelector(".skills-grid")
    const prevBtn = category.querySelector(".skills-nav-btn.prev")
    const nextBtn = category.querySelector(".skills-nav-btn.next")
    const pagination = category.querySelector(".skills-pagination")

    if (skillsGrid && prevBtn && nextBtn && pagination) {
      updateSkillsNavigation(skillsGrid, prevBtn, nextBtn, pagination)
    }
  })

  // Check if we need to adjust the hero section height on small screens
  adjustHeroHeight()
})

// Add responsive handling for skills slider
function updateSkillsNavigationResponsive() {
  const skillCategories = document.querySelectorAll(".skill-category")

  // Check if we're on a small screen
  const isSmallScreen = window.innerWidth <= 768

  skillCategories.forEach((category) => {
    const skillsGrid = category.querySelector(".skills-grid")
    const skillItems = skillsGrid.querySelectorAll(".skill-item")

    // Adjust scroll behavior based on screen size
    if (isSmallScreen) {
      // For small screens, make sure we can see at least 1.5 items
      if (skillItems.length > 0) {
        const itemWidth = skillItems[0].offsetWidth
        const scrollAmount = itemWidth + 16 // 16px is the gap

        // Update navigation buttons click handlers
        const prevBtn = category.querySelector(".skills-nav-btn.prev")
        const nextBtn = category.querySelector(".skills-nav-btn.next")

        if (prevBtn && nextBtn) {
          prevBtn.onclick = () => {
            skillsGrid.scrollBy({
              left: -scrollAmount,
              behavior: "smooth",
            })
          }

          nextBtn.onclick = () => {
            skillsGrid.scrollBy({
              left: scrollAmount,
              behavior: "smooth",
            })
          }
        }
      }
    }
  })
}

// Call this function on load and resize
window.addEventListener("load", updateSkillsNavigationResponsive)
window.addEventListener("resize", updateSkillsNavigationResponsive)

// Function to adjust hero height on small screens
function adjustHeroHeight() {
  const hero = document.querySelector(".hero")
  if (hero) {
    if (window.innerWidth <= 992) {
      // On small screens, don't force 100vh height
      hero.style.height = "auto"
    } else {
      // On larger screens, use 100vh
      hero.style.height = "100vh"
    }
  }
}

// Call on load
window.addEventListener("load", adjustHeroHeight)

// Improve mobile menu behavior
if (hamburger && nav) {
  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("active") && !nav.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove("active")
      nav.classList.remove("active")

      // Reset hamburger lines
      const lines = hamburger.querySelectorAll(".line")
      if (lines.length) {
        lines[0].style.transform = "none"
        lines[1].style.opacity = "1"
        lines[2].style.transform = "none"
      }
    }
  })
}

// Optimize animations for performance on mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

if (isMobile) {
  // Reduce animation complexity on mobile
  document.querySelectorAll(".floating, .floating-slow, .floating-fast").forEach((el) => {
    el.style.animation = "none"
  })

  // Simplify parallax effect on mobile
  const heroParallax = (e) => {
    // Do nothing on mobile to save performance
  }

  window.removeEventListener("mousemove", heroParallax)

  // Reduce particle count on mobile
  const particlesContainer = document.querySelector(".particles-container")
  if (particlesContainer) {
    const particles = particlesContainer.querySelectorAll(".particle")
    // Keep only half of the particles on mobile
    particles.forEach((particle, index) => {
      if (index % 2 === 0) {
        particle.remove()
      }
    })
  }
}
