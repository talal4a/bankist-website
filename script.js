// const button1 = document.querySelector("div");
// button1.classList.add("cookie-message");
// button1.innerHTML =
//   'we use this cookies for updating data and get data from user.<button class="btn--show-modall">got it<button>';
// header.prepend(message);
// const allheader = document.querySelector(".header");
// console.log(allheader);
// const allsection = document.querySelectorAll(".section");
// console.log(allsection);
// const allbutton = document.getElementsByTagName("button");
// console.log(allbutton);
// document
//   .querySelector(".btn--show-modall")
//   .addEventListener("click", function () {
//     this.parentElement.remove("button");
//   });
// button1.style.height = "120%";
// console.log(getComputedStyle(button1).height);
// button1.style.height =
//   Number.parseFloat(getComputedStyle(button1).height, 10) - 10000 + "px";
// document.documentElement.style.setProperty("--color-primary", "orangered");
//const h1 = document.querySelector("h1");
// const ad = h1.addEventListener("mouseenter", function (e) {
//   alert("You are reading the heading..");
// });
// window.addEventListener("scroll", function () {
//   console.log(window.scrollY);
//   if (window.scrollY > intialcord.top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });
const buttonscrollto = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav");
const intialcord = section1.getBoundingClientRect();
const tabcontainer = document.querySelector(".operations__tab-container");
const tabcontent = document.querySelectorAll(".operations__content");
const tab = document.querySelectorAll(".operations__tab");
const allsection = document.querySelectorAll(".section");
const imagetarget = document.querySelectorAll("img[data-src]");
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnleft = document.querySelector(".slider__btn--left");
const btnright = document.querySelector(".slider__btn--right");
const dot = document.querySelector(".dots");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
buttonscrollto.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});
const openmodel = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const closemodel = function (e) {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openmodel));
btnCloseModal.addEventListener("click", closemodel);
overlay.addEventListener("click", closemodel);
document.querySelectorAll(".nav__link").forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});
const handlehover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const sibling = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    sibling.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};
tabcontainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  if (!clicked) return;
  tab.forEach((t) => t.classList.remove("operations__tab--active"));
  tabcontent.forEach((c) => c.classList.remove("operations__content--active"));
  clicked.classList.add("operations__tab--active");
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});
nav.addEventListener("mouseover", handlehover.bind(0.5));
nav.addEventListener("mouseout", handlehover.bind(1));
const header = document.querySelector(".header");
const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};
const headerobserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: "-90px",
});
headerobserver.observe(header);
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    return;
  } else {
    entry.target.classList.remove("section--hidden");
    sectionobserver.observe(entry.target);
  }
};
const sectionobserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allsection.forEach(function (section) {
  sectionobserver.observe(section);
  section.classList.add("section--hidden");
});
const loadimage = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
};
const imageobserver = new IntersectionObserver(loadimage, {
  root: null,
  threshold: 0,
});
imagetarget.forEach(function (images) {
  imageobserver.observe(images);
});
let curslide = 0;
const maxslide = slides.length;
const gotoslide = function (slideIndex) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slideIndex)}%)`)
  );
};
const createdot = function () {
  slides.forEach(function (_, i) {
    dot.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot"data-slide="${i}"></button>`
    );
  });
};
createdot();
gotoslide(0);
const nextslides = function () {
  if (curslide === maxslide - 1) {
    curslide = 0;
  } else {
    curslide++;
  }
  gotoslide(curslide);
  activateslides(curslide);
};
const prevslides = function () {
  if (curslide === 0) {
    curslide = maxslide - 1;
  } else {
    curslide--;
  }
  gotoslide(curslide);
  activateslides(curslide);
};
btnright.addEventListener("click", nextslides);
btnleft.addEventListener("click", prevslides);
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") prevslides();
  e.key === "ArrowRight" && nextslides();
});
dot.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    gotoslide(Number(slide));
    activateslides(Number(slide));
  }
});

const activateslides = function (slide1) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dots) => dots.classList.remove("dots__dot--active"));
  const activeDot = document.querySelector(
    `.dots__dot[data-slide="${slide1}"]`
  );
  if (activeDot) {
    activeDot.classList.add("dots__dot--active");
  }
};
