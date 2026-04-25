/* ====================================
   المنشاوي — Menu Page JavaScript
   ==================================== */

document.addEventListener('DOMContentLoaded', function () {

    var tabBtns    = document.querySelectorAll('.tab-btn');
    var tabContent = document.querySelectorAll('.tab-content');

    function activateTab(tabId) {
        tabBtns.forEach(function (btn) {
            btn.classList.remove('active');
        });

        tabContent.forEach(function (content) {
            content.classList.remove('active');
        });

        var targetBtn = document.querySelector('[data-tab="' + tabId + '"]');
        var targetContent = document.getElementById(tabId);

        if (targetBtn)     targetBtn.classList.add('active');
        if (targetContent) targetContent.classList.add('active');

        /* re-trigger scroll animations inside the new tab */
        if (targetContent) {
            var animEls = targetContent.querySelectorAll(
                '.animate-fadeInUp, .animate-fadeInLeft, .animate-fadeInRight'
            );
            animEls.forEach(function (el) {
                el.classList.remove('animated');
                setTimeout(function () {
                    el.classList.add('animated');
                }, 50);
            });
        }
    }

    tabBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            activateTab(this.dataset.tab);
        });
    });

    /* Support direct anchor links: menu.html#koshary */
    var hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        activateTab(hash);
        setTimeout(function () {
            var el = document.getElementById(hash);
            if (el) {
                var offset = 100;
                var top = el.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        }, 300);
    }

});
