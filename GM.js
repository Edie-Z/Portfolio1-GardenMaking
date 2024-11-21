document.addEventListener('DOMContentLoaded', function () {
    var navLinks = document.querySelectorAll('.nav-link');
    var sections = document.querySelectorAll('section');
    var body = document.body;
    var container = document.querySelector('.container');
    var isScrolling = false;

    var updateNavigation = function () {
        var containerHeight = window.innerHeight;

        sections.forEach(function (section, index) {
            var rect = section.getBoundingClientRect();

            if (rect.top >= 0 && rect.top < containerHeight / 2) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                });
                navLinks[index].classList.add('active');

                if (section.id === 'BackGround' || section.id === 'MindMap') {
                    body.style.backgroundImage = "url('BG2.png')";
                } else {
                    body.style.backgroundImage = "url('BG1.png')";
                }
            }
        });
    };

    var scrollToSection = function (index) {
        var targetSection = sections[index];
        if (!targetSection || isScrolling) return;

        isScrolling = true;

        var offsetTop = targetSection.offsetTop;

        container.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });

        setTimeout(function () {
            isScrolling = false;
            updateNavigation();
        }, 800);
    };

    navLinks.forEach(function (link, index) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            scrollToSection(index);
        });
    });

    container.addEventListener('wheel', function (e) {
        var deltaY = e.deltaY;
        var currentScroll = container.scrollTop;
        var viewportHeight = window.innerHeight;

        var nextScroll = deltaY > 0
            ? Math.ceil(currentScroll / viewportHeight) * viewportHeight
            : Math.floor(currentScroll / viewportHeight) * viewportHeight;

        if (!isScrolling) {
            isScrolling = true;
            container.scrollTo({
                top: nextScroll,
                behavior: 'smooth'
            });

            setTimeout(function () {
                isScrolling = false;
                updateNavigation();
            }, 800);
        }
    });

    container.addEventListener('scroll', updateNavigation);

    updateNavigation();
});
