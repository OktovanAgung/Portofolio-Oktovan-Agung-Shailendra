"use strict";

// Element toggle function
const elementToggleFunc = function (elem) {
    elem.classList.toggle("active");
};

// Function to load HTML content dynamically
function loadContent(page, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(page + '-content').innerHTML = data;
            if (page === 'portofolio') {
                initializeportofolioFilters(); // Reinitialize portfolio filters
            }
        });
}

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

// Memuat konten setiap halaman
loadContent('about', './assets/html/about.html');
/*loadContent('testimonial', './assets/html/testimonial_clients.html');*/
loadContent('resume', './assets/html/resume.html');
loadContent('portofolio', './assets/html/portofolio.html');
loadContent('blog', './assets/html/blog.html');
loadContent('contact', './assets/html/contact.html');   

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



//popup modal
