$(document).ready(function () {
    if (document.querySelector('.question-container')) handleFaq();
    if (document.querySelector('#menu')) handleMenu();
    if (document.querySelector('.navbar-custom')) handleNavbar();
});

function handleFaq() {
    document.querySelectorAll('.question-container').forEach(function (e) {
        e.querySelector('.answer-container').style.display = 'none';
        e.onclick = function () {
            if (e.classList.contains('expanded')) {
                e.classList.remove('expanded');
            } else {
                e.classList.add('expanded');
                document.querySelectorAll('.question-container').forEach(function (f) {
                    if (f != e) {
                        f.classList.remove('expanded');
                        $(f.querySelector('.answer-container')).slideUp();
                    }
                });
            }
            $(e.querySelector('.answer-container')).slideToggle();
        }
    })
}

function handleMenu() {
    var navbar = document.querySelector('.navbar-custom');
    document.querySelector('#menu-button').onclick = function () {
        if (navbar.classList.contains('expanded')) {
            navbar.classList.remove('expanded');
            MYAPP.enabled = true;
        } else {
            navbar.classList.add('expanded');
            MYAPP.enabled = false;
            if (navbar.style.position == 'absolute') {
                navbar.style.transition = 'none';
                var yOffset = window.pageYOffset || document.documentElement.scrollTop;
                navbar.style.top = -yOffset + 'px';
                setTimeout(function () {
                    navbar.style.transition = '';
                    navbar.style.top = ''
                }, 0);
            }
            navbar.style.position = 'fixed';
            navbar.classList.remove('minimize');
        }
    }

    document.querySelector('#about').onclick = function (e) {
        handleMenuItemClick(e, '.section-about');
    }

    document.querySelector('#service').onclick = function (e) {
        handleMenuItemClick(e, '.section-service');
    }

    document.querySelector('#space').onclick = function (e) {
        handleMenuItemClick(e, '.section-space');
    }

    document.querySelector('#amenities').onclick = function (e) {
        handleMenuItemClick(e, '.section-amenities');
    }

    document.querySelector('#qa').onclick = function (e) {
        handleMenuItemClick(e, '.section-qa');
    }

    document.querySelector('#store').onclick = function (e) {
        handleMenuItemClick(e, '.section-stores');
    }
}

function handleMenuItemClick(event, element) {
    if (document.querySelector(element) != null) {
        event.preventDefault();
        var navbar = document.querySelector('.navbar-custom');
        navbar.classList.remove('expanded');
        navbar.classList.add('minimize');
        MYAPP.lastYOffset = 0;
        MYAPP.enabled = false
        jumpSection(element, 0, 300)
        setTimeout(function () {
            var link = event.target;
            while(link.getAttribute("href") == null){
                link = link.parentElement;
            }
            window.location.href = link.getAttribute("href")
            MYAPP.enabled = true;
        }, 300);
    }
}
function handleNavbar() {
    var navbar = document.querySelector('.navbar-custom');
    window.addEventListener("scroll", function () {
        if (!MYAPP.enabled) return;
        var yOffset = window.pageYOffset || document.documentElement.scrollTop;
        if (yOffset > MYAPP.lastYOffset) {
            if (yOffset < 250) {
                if (navbar.style.position == 'fixed') {
                    navbar.style.transition = 'none';
                    navbar.style.top = yOffset + 'px';
                    setTimeout(function () {
                        navbar.style.transition = '';
                        navbar.style.top = ''
                    }, 0);
                }
                navbar.style.position = 'absolute';
            } else {
                if (navbar.style.position == 'absolute') {
                    navbar.style.transition = 'none';
                    navbar.style.position = 'fixed';
                    setTimeout(function () {
                        navbar.style.transition = '';
                    }, 0);
                }
                navbar.classList.add('minimize');
            }
        } else if (yOffset < MYAPP.lastYOffset) {
            if (navbar.style.position == 'absolute') {
                navbar.style.transition = 'none';
                navbar.style.top = -yOffset + 'px';
                setTimeout(function () {
                    navbar.style.transition = '';
                    navbar.style.top = ''
                }, 0);
            }
            navbar.style.position = 'fixed';
            navbar.classList.remove('minimize');
        }
        MYAPP.lastYOffset = (yOffset < 0) ? 0 : yOffset;
    }, false);
}