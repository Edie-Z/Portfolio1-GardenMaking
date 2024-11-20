document.addEventListener('DOMContentLoaded', function () {
    var navLinks = document.querySelectorAll('.nav-link');
    var sections = document.querySelectorAll('section');
    var body = document.body;
    var container = document.querySelector('.container');
    var isScrolling = false;

    var updateNavigation = function () {
        var scrollPosition = container.scrollTop;

        sections.forEach(function (section, index) {
            var offsetTop = section.offsetTop;
            var offsetHeight = section.offsetHeight;

            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
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

    var scrollToSection = function (deltaY) {
        if (isScrolling) return;

        var currentScroll = container.scrollTop;
        var viewportHeight = window.innerHeight;

        var nextScroll = deltaY > 0 
            ? Math.ceil(currentScroll / viewportHeight) * viewportHeight
            : Math.floor(currentScroll / viewportHeight) * viewportHeight;

        isScrolling = true;

        container.scrollTo({
            top: nextScroll,
            behavior: 'smooth'
        });

        setTimeout(function () {
            isScrolling = false;
        }, 800);
    };

    container.addEventListener('wheel', function (e) {
        scrollToSection(e.deltaY);
    });

    container.addEventListener('scroll', updateNavigation);
});
