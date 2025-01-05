"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
    elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
});

// Fungsi untuk menangani transisi antar halaman
function switchPage(pageName) {
    // Ambil semua elemen artikel dengan kelas 'page'
    const allPages = document.querySelectorAll('.page');

    // Hapus kelas 'active' dari semua halaman
    allPages.forEach(page => {
        page.classList.remove('active');
    });

    // Tampilkan halaman yang sesuai dengan pageName
    const activePage = document.querySelector(`#${pageName}-page`);
    if (activePage) {
        activePage.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Menambahkan kelas 'active' pada navbar-link sesuai dengan halaman pertama yang dimuat
    const defaultPage = 'about'; // Sesuaikan dengan halaman pertama yang ingin ditampilkan
    const defaultButton = document.querySelector(`[data-page="${defaultPage}"]`);
    if (defaultButton) {
        defaultButton.classList.add('active');
    }

    // Menambahkan event listener untuk navbar link
    document.querySelectorAll('.navbar-link').forEach(button => {
        button.addEventListener('click', function(event) {
            const targetPage = event.target.getAttribute('data-page');
            switchPage(targetPage);

            // Menghapus kelas 'active' dari semua tombol navbar
            document.querySelectorAll('.navbar-link').forEach(link => {
                link.classList.remove('active');
            });

            // Menambahkan kelas 'active' pada tombol yang diklik
            event.target.classList.add('active');
        });
    });
});



// Function to load HTML content dynamically
// Fungsi untuk memuat konten
function loadContent(page, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
        document.getElementById(page + '-content').innerHTML = data;
    });
}

// Memuat konten setiap halaman
loadContent('about', './assets/html/about.html');
/*loadContent('testimonial', './assets/html/testimonial_clients.html');*/
loadContent('resume', './assets/html/resume.html');
loadContent('portofolio', './assets/html/portofolio.html');
loadContent('blog', './assets/html/blog.html');
loadContent('contact', './assets/html/contact.html');  




// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
        modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
        modalTitle.innerHTML = this.querySelector(
            "[data-testimonials-title]"
        ).innerHTML;
        modalText.innerHTML = this.querySelector(
            "[data-testimonials-text]"
        ).innerHTML;

        testimonialsModalFunc();
    });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
    elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);
    });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
    for (let i = 0; i < filterItems.length; i++) {
        if (selectedValue === "all") {
            filterItems[i].classList.add("active");
        } else if (selectedValue === filterItems[i].dataset.category) {
            filterItems[i].classList.add("active");
        } else {
            filterItems[i].classList.remove("active");
        }
    }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
    });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
        // check form validation
        if (form.checkValidity()) {
            formBtn.removeAttribute("disabled");
        } else {
            formBtn.setAttribute("disabled", "");
        }
    });
}
