
function filterEvents() {
    var searchVal = "";
    var categoryVal = "";
    var dateVal = "";

    if (document.getElementById("searchInput")) {
        searchVal = document.getElementById("searchInput").value.toLowerCase();
    }
    if (document.getElementById("categoryFilter")) {
        categoryVal = document.getElementById("categoryFilter").value;
    }
    if (document.getElementById("dateFilter")) {
        dateVal = document.getElementById("dateFilter").value;
    }

    var cards = document.getElementsByClassName("event-card-wrapper");

    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        var title = "";
        var category = card.getAttribute("data-category") || "";
        var date = card.getAttribute("data-date") || "";

        var titleEl = card.getElementsByClassName("card-title")[0];
        if (titleEl) {
            title = titleEl.textContent.toLowerCase();
        }

        var matchSearch = (searchVal === "" || title.indexOf(searchVal) !== -1);
        var matchCategory = (categoryVal === "" || category === categoryVal);
        var matchDate = (dateVal === "" || date === dateVal);

        if (matchSearch && matchCategory && matchDate) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    }
}

function resetFilter() {
    if (document.getElementById("searchInput")) {
        document.getElementById("searchInput").value = "";
    }
    if (document.getElementById("categoryFilter")) {
        document.getElementById("categoryFilter").value = "";
    }
    if (document.getElementById("dateFilter")) {
        document.getElementById("dateFilter").value = "";
    }
    filterEvents();
}


function submitContactForm() {
    var name = document.getElementById("userName").value;
    var email = document.getElementById("userEmail").value;
    var message = document.getElementById("userMessage").value;

    var successAlert = document.getElementById("successAlert");
    var errorAlert = document.getElementById("errorAlert");
    successAlert.style.display = "none";
    errorAlert.style.display = "none";

    name = name.replace(/^\s+|\s+$/g, ""); 

    if (name.length < 3) {
        errorAlert.textContent = "يرجى إدخال اسم صحيح (3 أحرف على الأقل)";
        errorAlert.style.display = "block";
        return;
    }

    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.search(emailPattern) === -1) {
        errorAlert.textContent = "يرجى إدخال بريد إلكتروني صحيح (مثال: name@domain.com)";
        errorAlert.style.display = "block";
        return;
    }

    message = message.replace(/^\s+|\s+$/g, "");
    if (message.length < 10) {
        errorAlert.textContent = "يرجى كتابة رسالة لا تقل عن 10 أحرف";
        errorAlert.style.display = "block";
        return;
    }

    successAlert.textContent = "شكراً " + name + "! تم إرسال رسالتك بنجاح. سنتواصل معك على " + email + " قريباً ✅";
    successAlert.style.display = "block";

    document.getElementById("userName").value = "";
    document.getElementById("userEmail").value = "";
    document.getElementById("userMessage").value = "";
}


window.onload = function() {
    var searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.onkeyup = function() {
            filterEvents();
        };
    }

    var currentPage = window.location.pathname.split("/").pop();
    var navLinks = document.getElementsByClassName("nav-link");
    for (var i = 0; i < navLinks.length; i++) {
        var href = navLinks[i].getAttribute("href");
        if (href === currentPage || (currentPage === "" && href === "index.html")) {
            navLinks[i].className += " active";
        }
    }
};

function shareEvent(title) {
    var shareMsg = "تمت مشاركة فعالية: " + title + "\nالرابط: " + window.location.href;
    alert(shareMsg);
}

function confirmBooking(eventName) {
    var result = confirm("هل تريد حجز مكان في فعالية: " + eventName + "؟");
    if (result === true) {
        alert("تم تسجيل حجزك بنجاح في فعالية: " + eventName + "\nسيتم التواصل معك قريباً.");
    }
}

function scrollToTop() {
    window.scrollTo(0, 0);
}

window.onscroll = function() {
    var scrollBtn = document.getElementById("scrollTopBtn");
    if (scrollBtn) {
        if (document.documentElement.scrollTop > 300) {
            scrollBtn.style.display = "block";
        } else {
            scrollBtn.style.display = "none";
        }
    }
};


const themeToggler = document.getElementById('themeToggler');
const themeIcon = document.getElementById('themeIcon');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-bs-theme', savedTheme);
updateIcon(savedTheme);

themeToggler.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
    } else {
        themeIcon.classList.replace('bi-sun-fill', 'bi-moon-fill');
    }
}
