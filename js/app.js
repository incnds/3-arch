let lines = document.querySelectorAll(".line");
const mainLineWidth = document.querySelector(".main-line").offsetWidth;
const linesLeft = [0.05, 0.125, 0.125, 0.5];
const linesWidth = [0.15, 0.23, 0.875, 0.5];

lines.forEach((line) => {
    line.style.left = `${mainLineWidth * linesLeft.shift()}px`;
    line.style.width = `${mainLineWidth * linesWidth.shift()}px`;
});

function setDisplayNoneNav() {
    nav.forEach((navEl) => {
        let navElNum =
            Array.prototype.indexOf.call(navEl.parentElement.children, navEl) +
            1;
        document.querySelector(`.arch-info-${navElNum}`).style.display = "none";
        navEl.classList.remove("cur-nav");
    });
}

function renderStyleSection(styleNum) {
    setDisplayNoneNav();
    document.querySelector(`.arch-info-${styleNum}`).style.display = "block";
    nav[styleNum - 1].classList.add("cur-nav");
}

let nav = document.querySelectorAll(".nav-btn");
renderStyleSection(1);

nav.forEach((navEl) => {
    navEl.addEventListener("click", (e) => {
        e.preventDefault;
        let styleNum =
            Array.prototype.indexOf.call(navEl.parentElement.children, navEl) +
            1;
        e.target.style.transform = "translateY(.2em)";
        renderStyleSection(styleNum);
    });
    navEl.addEventListener("mouseover", (e) => {
        if (!e.target.classList.contains("cur-nav")) {
            e.target.style.transform = "translateY(-.2em)";
        }
    });
    navEl.addEventListener("mouseout", (e) => {
        if (!e.target.classList.contains("cur-nav")) {
            e.target.style.transform = "translateY(.2em)";
        }
    });
});

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll(".header-el a");
navLinks[0].classList.add("active");

window.onscroll = () => {
    for (let i = 0; i < sections.length; i++) {
        let top = window.scrollY;
        let offset = sections[i].offsetTop;
        let height = sections[i].offsetHeight;
        if (top >= offset - 300 && top < offset + height - 300) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
            });
            navLinks[i].classList.add("active");
        }
    }
};
