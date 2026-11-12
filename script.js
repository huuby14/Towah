/*
 * Portfolio details are kept here so links and contact information are
 * straightforward to personalize without searching through the markup.
 */
const portfolioConfig = {
  contactEmail: "joshuamacavinta00@gmail.com",
  contactPhone: "+63 XXX XXX XXXX",
  facebook: "https://www.facebook.com/your-profile",
  linkedin: "https://www.linkedin.com/in/your-username/",
  github: "https://github.com/your-username",
  academicYear: "[Add academic year]"
};

const projectDetails = {
  robot: {
    category: "Robotics · 01 / 03",
    title: "Arduino Line-Following Robot",
    description: "A robotics project that uses infrared sensors to detect and follow a black line. The illustrated preview represents the project rather than a photograph of the actual build.",
    contributions: [
      "Programmed the robot's movements.",
      "Configured infrared sensor readings.",
      "Adjusted motor speed and direction.",
      "Troubleshot movement and sensor problems."
    ],
    technologies: ["Arduino", "Infrared sensors", "Motor control"]
  },
  java: {
    category: "Programming · 02 / 03",
    title: "Java Programming Projects",
    description: "A collection of Java programming activities and applications developed during my studies. These projects provided practice with core programming concepts and working with data.",
    contributions: [
      "Applied programming logic, loops, and conditional statements.",
      "Practiced working with arrays and HashMaps.",
      "Handled user input and basic data processing."
    ],
    technologies: ["Java", "Arrays", "HashMaps", "Control flow"]
  },
  csharp: {
    category: "Desktop applications · 03 / 03",
    title: "C# Windows Forms Projects",
    description: "Desktop application projects developed using C# and Windows Forms, with an emphasis on arranging interface elements and responding to user actions.",
    contributions: [
      "Built and arranged graphical user interfaces.",
      "Designed forms and connected button events.",
      "Practiced basic calculations and programming logic."
    ],
    technologies: ["C#", "Windows Forms", "GUI development"]
  }
};

const setContactDetails = () => {
  document.querySelectorAll('[data-social="facebook"]').forEach((link) => {
    link.href = portfolioConfig.facebook;
  });
  document.querySelectorAll('[data-social="linkedin"]').forEach((link) => {
    link.href = portfolioConfig.linkedin;
  });
  document.querySelectorAll('[data-social="github"]').forEach((link) => {
    link.href = portfolioConfig.github;
  });

  document.querySelectorAll('[data-contact="email"]').forEach((link) => {
    link.href = "mailto:" + portfolioConfig.contactEmail;
    link.textContent = portfolioConfig.contactEmail;
    const arrow = document.createElement("span");
    arrow.textContent = "↗";
    arrow.setAttribute("aria-hidden", "true");
    link.append(arrow);
  });

  document.querySelectorAll('[data-contact="phone"]').forEach((link) => {
    link.href = "tel:" + portfolioConfig.contactPhone.replace(/[^\d+]/g, "");
    link.textContent = portfolioConfig.contactPhone;
  });

  const academicYear = document.querySelector(".education-date span");
  if (academicYear) academicYear.textContent = portfolioConfig.academicYear;
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
};

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

if (menuToggle && primaryNav) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    primaryNav.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    primaryNav.classList.toggle("is-open", !isOpen);
  });

  primaryNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const projectDialog = document.querySelector("#project-dialog");
const dialogPreview = document.querySelector("#dialog-preview");
const dialogCategory = document.querySelector("#dialog-category");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector("#dialog-description");
const dialogContributions = document.querySelector("#dialog-contributions");
const dialogTech = document.querySelector("#dialog-tech");
let lastProjectTrigger = null;

document.querySelectorAll("[data-project]").forEach((card) => {
  card.addEventListener("click", () => {
    const detail = projectDetails[card.dataset.project];
    if (!detail || !projectDialog) return;
    lastProjectTrigger = card;
    dialogCategory.textContent = detail.category;
    dialogTitle.textContent = detail.title;
    dialogDescription.textContent = detail.description;
    dialogContributions.replaceChildren(...detail.contributions.map((contribution) => {
      const item = document.createElement("li");
      item.textContent = contribution;
      return item;
    }));
    dialogTech.replaceChildren(...detail.technologies.map((technology) => {
      const tag = document.createElement("span");
      tag.textContent = technology;
      return tag;
    }));
    const preview = card.querySelector(".project-preview");
    dialogPreview.replaceChildren(preview.cloneNode(true));
    projectDialog.showModal();
    document.body.classList.add("dialog-open");
    projectDialog.querySelector(".dialog-close").focus();
  });
});

if (projectDialog) {
  const closeDialog = () => projectDialog.close();
  projectDialog.querySelector(".dialog-close").addEventListener("click", closeDialog);
  projectDialog.addEventListener("click", (event) => {
    if (event.target === projectDialog) closeDialog();
  });
  projectDialog.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
    if (lastProjectTrigger) lastProjectTrigger.focus();
  });
}

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const isPlaceholder = /your\.email@example\.com|^$|example\./i.test(portfolioConfig.contactEmail);
    if (isPlaceholder) {
      formStatus.textContent = "Add your real email address in script.js to enable message delivery.";
      return;
    }

    const formData = new FormData(contactForm);
    const subject = encodeURIComponent(formData.get("subject").toString());
    const body = encodeURIComponent(
      "From: " + formData.get("name") + "\nReply to: " + formData.get("email") + "\n\n" + formData.get("message")
    );
    formStatus.textContent = "Opening your email app with the message ready to send.";
    window.location.href = "mailto:" + portfolioConfig.contactEmail + "?subject=" + subject + "&body=" + body;
  });
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll(
  ".about-section, .skill-card, .projects-heading, .project-card, .education-entry, .personal-heading, .trait-grid, .contact-copy, .contact-form"
);

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealTargets.forEach((item) => item.classList.add("is-visible"));
} else {
  revealTargets.forEach((item) => item.classList.add("reveal"));
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((item) => revealObserver.observe(item));
}

setContactDetails();
