"use strict";

// Element toggle function
const elementToggleFunc = function (elem) {
    elem.classList.toggle("active");
};


// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
});

// Function to handle page transitions
function switchPage(pageName) {
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => page.classList.remove('active'));

    const activePage = document.querySelector(`#${pageName}-page`);
    if (activePage) {
        activePage.classList.add('active');
    }
}

// Navbar mobile and default page setup
document.addEventListener('DOMContentLoaded', function () {
    const defaultPage = 'about'; // Default page to display
    const defaultButton = document.querySelector(`[data-page="${defaultPage}"]`);
    if (defaultButton) {
        defaultButton.classList.add('active');
    }

    document.querySelectorAll('.navbar-link').forEach(button => {
        button.addEventListener('click', function (event) {
            const targetPage = event.target.getAttribute('data-page');
            switchPage(targetPage);

            // Update navbar link active class
            document.querySelectorAll('.navbar-link').forEach(link => link.classList.remove('active'));
            event.target.classList.add('active');
        });
    });
});


// Initialize portfolio filters
function initializeportofolioFilters() {
    const filterBtns = document.querySelectorAll('[data-filter-btn]');
    const selectItems = document.querySelectorAll('[data-select-item]');
    const projectItems = document.querySelectorAll('.project-item');
    const filterSelect = document.querySelector('.filter-select');
    const selectList = document.querySelector('.select-list');

    // Filter projects by category
    function filterProjects(category) {
        projectItems.forEach(project => {
            const projectCategory = project.getAttribute('data-category');
            if (category === 'all' || projectCategory === category) {
                project.classList.add('active');
            } else {
                project.classList.remove('active');
            }
        });
    }

    // Desktop filter buttons
    filterBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            const selectedCategory = e.target.textContent.trim().toLowerCase();
            filterBtns.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            filterProjects(selectedCategory);
        });
    });

    // Mobile dropdown filter
    selectItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const selectedCategory = e.target.textContent.trim().toLowerCase();
            filterProjects(selectedCategory);
            closeDropdown();
        });
    });

    function closeDropdown() {
        filterSelect.classList.remove('active');
        selectList.classList.remove('active');
    }

    filterSelect.addEventListener('click', () => {
        filterSelect.classList.toggle('active');
        selectList.classList.toggle('active');
    });

    // Initialize with all projects
    filterProjects('all');
}

document.addEventListener('DOMContentLoaded', initializeportofolioFilters);

document.addEventListener("DOMContentLoaded", () => {
    // Ambil semua project item
    const projectItems = document.querySelectorAll(".project-item");

    projectItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            event.preventDefault();

            const projectId = item.getAttribute("data-project-id");
            const popupModal = document.querySelector(`#popup-project-${projectId}`);
            if (popupModal) {
                popupModal.classList.add("active");
                initPopupGallery(popupModal);
            }
        });
    });

    const closeButtons = document.querySelectorAll(".popup-close");
    closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const popupModal = button.closest(".popup-modal");
            if (popupModal) {
                // Pause semua video dalam popup sebelum menutupnya
                const videos = popupModal.querySelectorAll("video");
                videos.forEach((video) => {
                    video.pause(); // Jeda video
                    video.currentTime = 0; // Reset waktu video ke awal
                });

                popupModal.classList.remove("active");
            }
        });
    });

    function initPopupGallery(popupModal) {
        const imagesContainer = popupModal.querySelector(".popup-images");
        const images = imagesContainer.querySelectorAll("img");
        let currentIndex = 0;

        // Tampilkan gambar pertama
        const updateSlide = () => {
            images.forEach((img, index) => {
                img.style.display = index === currentIndex ? "block" : "none";
            });
        };
        updateSlide();

        // Tombol prev dan next
        const prevButton = popupModal.querySelector(".popup-prev");
        const nextButton = popupModal.querySelector(".popup-next");

        prevButton.onclick = () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateSlide();
        };

        nextButton.onclick = () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateSlide();
        };

        // Swipe gesture handling
        let startX = 0;
        let endX = 0;

        imagesContainer.addEventListener("touchstart", (event) => {
            startX = event.touches[0].clientX;
        });

        imagesContainer.addEventListener("touchmove", (event) => {
            endX = event.touches[0].clientX;
        });

        imagesContainer.addEventListener("touchend", () => {
            if (startX > endX + 50) {
                // Geser ke kiri (next)
                currentIndex = (currentIndex + 1) % images.length;
                updateSlide();
            } else if (startX < endX - 50) {
                // Geser ke kanan (prev)
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateSlide();
            }
        });
    }
});

function initPopupGallery(popupModal) {
    const imagesContainer = popupModal.querySelector(".popup-images");
    const images = imagesContainer.querySelectorAll("img");
    const totalImages = images.length;
    let currentIndex = 0;

    // Fungsi untuk memperbarui posisi gambar dengan animasi
    const updateSlide = () => {
        const offset = -currentIndex * 100; // Hitung posisi berdasarkan index
        imagesContainer.style.transform = `translateX(${offset}%)`;
    };

    // Tombol prev dan next
    const prevButton = popupModal.querySelector(".popup-prev");
    const nextButton = popupModal.querySelector(".popup-next");

    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateSlide();
    });

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % totalImages;
        updateSlide();
    });

    // Swipe gesture handling untuk perangkat mobile
    let startX = 0;
    let endX = 0;

    imagesContainer.addEventListener("touchstart", (event) => {
        startX = event.touches[0].clientX;
    });

    imagesContainer.addEventListener("touchmove", (event) => {
        endX = event.touches[0].clientX;
    });

    imagesContainer.addEventListener("touchend", () => {
        if (startX > endX + 50) {
            // Geser ke kiri (next)
            currentIndex = (currentIndex + 1) % totalImages;
            updateSlide();
        } else if (startX < endX - 50) {
            // Geser ke kanan (prev)
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateSlide();
        }
    });
}




function handleSubmit(event) {
    event.preventDefault(); // Mencegah form diarahkan ke action URL

    const form = event.target;
    const formData = new FormData(form);

    // Validasi: Pastikan semua kolom terisi
    if (!formData.get('fullname') || !formData.get('email') || !formData.get('message')) {
        showPopup('error-popup');
        return;
    }

    // Kirim data ke Formspree menggunakan Fetch API
    fetch('https://formspree.io/f/mgvvpzno', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
    })
        .then(response => {
            if (response.ok) {
                showPopup('success-popup'); // Tampilkan popup sukses
                form.reset(); // Reset form setelah berhasil
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error(error);
            showPopup('error-popup'); // Tampilkan popup error jika gagal
        });
}

// Fungsi untuk menampilkan popup
function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.add('active');
    }
}

// Fungsi untuk menutup popup
function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.remove('active');
    }
}
