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
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => page.classList.remove('active'));

    const activePage = document.querySelector(`#${pageName}-page`);
    if (activePage) {
        activePage.classList.add('active');
    }

    // Re-bind form submission and popup logic after page switch
    if (pageName === "contact") {
        const form = document.querySelector("[data-form]");
        const popupSuccess = document.getElementById("popup-success");
        const closePopupButton = document.getElementById("close-popup");
        if (form) {
            form.addEventListener("submit", async (event) => {
                event.preventDefault();
                const formData = new FormData(form);
                try {
                    const response = await fetch(form.action, {
                        method: form.method,
                        headers: { Accept: "application/json" },
                        body: formData,
                    });
                    if (response.ok) {
                        popupSuccess.style.display = "flex";
                        form.reset();
                    } else {
                        alert("Oops! Something went wrong.");
                    }
                } catch (error) {
                    alert("There was an error submitting the form.");
                }
            });
        }
        if (closePopupButton) {
            closePopupButton.addEventListener("click", () => {
                popupSuccess.style.display = "none";
            });
        }
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
    const popup = document.getElementById("portfolio-popup");
    const closePopupButton = document.querySelector(".close-popup");
    const projectItems = document.querySelectorAll(".project-item");
    const sliderContainer = document.querySelector(".slider-container");

    if (!popup || !closePopupButton || !sliderContainer) return;

    let currentIndex = 0;

    // Show popup on project item click
    projectItems.forEach((item) => {
        item.addEventListener("click", () => {
            popup.classList.remove("hidden");
            popup.style.opacity = "1";
            popup.style.visibility = "visible";
        });
    });

    // Close popup
    closePopupButton.addEventListener("click", () => {
        popup.classList.add("hidden");
        popup.style.opacity = "0";
        popup.style.visibility = "hidden";
    });

    // Slider functionality
    document.addEventListener("keydown", (e) => {
        const images = sliderContainer.children;
        if (e.key === "ArrowRight") {
            currentIndex = (currentIndex + 1) % images.length;
        } else if (e.key === "ArrowLeft") {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
        }
        sliderContainer.style.transform = `translateX(-${currentIndex * images[0].offsetWidth}px)`;
    });
});


// Function to load HTML content dynamically
// Fungsi untuk memuat konten
function loadContent(page, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(page + '-content').innerHTML = data;
            if (page === 'portofolio') {
                // Panggil ulang kode filter kategori setelah portofolio dimuat
                initializeportofolioFilters();
            }
        });
}

// Menangani filter kategori (desktop dan mobile)
function initializeportofolioFilters() {
    const filterBtns = document.querySelectorAll('[data-filter-btn]');
    const selectItems = document.querySelectorAll('[data-select-item]');
    const projectItems = document.querySelectorAll('.project-item');
    const filterSelect = document.querySelector('.filter-select');
    const selectList = document.querySelector('.select-list');
    
    // Fungsi untuk menyaring proyek berdasarkan kategori
    function filterProjects(category) {
        projectItems.forEach(project => {
            const projectCategory = project.getAttribute('data-category');
            // Menampilkan proyek jika kategori cocok atau 'All' dipilih
            if (category === 'all' || projectCategory === category) {
                project.classList.add('active');
            } else {
                project.classList.remove('active');
            }
        });
    }

    // Event listener untuk tombol filter kategori (desktop)
    filterBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            const selectedCategory = e.target.textContent.trim().toLowerCase();
            filterBtns.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            filterProjects(selectedCategory);
        });
    });

    // Event listener untuk item dropdown kategori (mobile)
    selectItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const selectedCategory = e.target.textContent.trim().toLowerCase();
            filterProjects(selectedCategory); // Menyaring proyek berdasarkan kategori
            closeDropdown(); // Menutup dropdown setelah kategori dipilih
        });
    });
    
    function closeDropdown() {
        const filterSelect = document.querySelector('.filter-select');
        const selectList = document.querySelector('.select-list');
        filterSelect.classList.remove('active');  // Hapus class 'active' untuk menutup dropdown
        selectList.classList.remove('active');   // Hapus class 'active' untuk menutup dropdown
    }
    

    // Fungsi untuk membuka/menutup dropdown saat tombol filter dipilih
    filterSelect.addEventListener('click', () => {
        filterSelect.classList.toggle('active'); // Menambahkan/menanggalkan class 'active'
        selectList.classList.toggle('active'); // Menampilkan/menyembunyikan daftar dropdown
    });

    // Menyaring proyek berdasarkan kategori awal (All)
    filterProjects('all');
}



// Inisialisasi filter ketika halaman dimuat
document.addEventListener('DOMContentLoaded', initializeportofolioFilters);

// Fungsi untuk menutup dropdown (jika diperlukan)
function closeDropdown() {
    const dropdown = document.querySelector('.dropdown'); // Sesuaikan dengan class atau ID dropdown kamu
    if (dropdown) {
        dropdown.classList.remove('open'); // Menutup dropdown
    }
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

select.addEventListener("click", function () {
    elementToggleFunc(this);
});

// Select form and popup elements
const form = document.querySelector("[data-form]");
const popupSuccess = document.getElementById("popup-success");
const closePopupButton = document.getElementById("close-popup");

// Handle form submission
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission

const formData = new FormData(form);

try {
    const response = await fetch(form.action, {
    method: form.method,
    headers: { Accept: "application/json" },
    body: formData,
    });

    if (response.ok) {
      // Show success popup
    popupSuccess.style.display = "flex";
      form.reset(); // Reset form fields
    } else {
    alert("Oops! Something went wrong. Please try again.");
    }
} catch (error) {
    alert("There was a problem submitting the form. Please try again later.");
}
});

// Handle popup close button
closePopupButton.addEventListener("click", () => {
popupSuccess.style.display = "none";
});


document.addEventListener("DOMContentLoaded", function () {
    // Variabel form dan popup
    const form = document.querySelector("[data-form]");
    const popupSuccess = document.getElementById("popup-success");
    const closePopupButton = document.getElementById("close-popup");

    if (form) {
        // Handle form submission
        form.addEventListener("submit", async (event) => {
            event.preventDefault(); // Prevent default form submission
            
            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    headers: { Accept: "application/json" },
                    body: formData,
                });

                if (response.ok) {
                    // Tampilkan popup sukses
                    popupSuccess.style.display = "flex";
                    form.reset(); // Reset form fields
                } else {
                    alert("Oops! Something went wrong. Please try again.");
                }
            } catch (error) {
                alert("There was a problem submitting the form. Please try again later.");
            }
        });
    }

    // Handle popup close button
    if (closePopupButton) {
        closePopupButton.addEventListener("click", () => {
            popupSuccess.style.display = "none";
        });
    }
});

// popup portofolio
