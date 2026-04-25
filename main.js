/* ====================================
   المنشاوي — Modern Main JS
   ==================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* ====================================
       Page Loader
       ==================================== */
    var loader = document.querySelector('.page-loader');
    if (loader) {
        window.addEventListener('load', function () {
            setTimeout(function () {
                loader.classList.add('hidden');
            }, 1200);
        });
    }

    /* ====================================
       Scroll Progress Bar
       ==================================== */
    var progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', function () {
            var scrollTop = window.scrollY;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            var progress  = docHeight > 0 ? scrollTop / docHeight : 0;
            progressBar.style.transform = 'scaleX(' + progress + ')';
        }, { passive: true });
    }

    /* ====================================
       Navbar — Scroll & Hamburger
       ==================================== */
    var navbar    = document.getElementById('navbar');
    var hamburger = document.getElementById('hamburger');
    var navLinks  = document.getElementById('navLinks');

    window.addEventListener('scroll', function () {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 60);
        }
    }, { passive: true });

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }

    /* ====================================
       Scroll Reveal (Intersection Observer)
       ==================================== */
    var reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0 && 'IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        reveals.forEach(function (el) { revealObserver.observe(el); });
    }

    /* ====================================
       Counter Animation
       ==================================== */
    function animateCounter(el) {
        var target   = parseInt(el.getAttribute('data-count'), 10);
        var suffix   = el.getAttribute('data-suffix') || '';
        var duration = 1800;
        var start    = performance.now();

        function step(timestamp) {
            var elapsed  = timestamp - start;
            var progress = Math.min(elapsed / duration, 1);
            var ease     = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(ease * target).toLocaleString('ar-EG') + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    var counters = document.querySelectorAll('[data-count]');
    if (counters.length > 0 && 'IntersectionObserver' in window) {
        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function (c) { counterObserver.observe(c); });
    }

    /* ====================================
       Particles / Hero Canvas
       ==================================== */
    var canvas = document.getElementById('heroCanvas');
    if (canvas) {
        var ctx = canvas.getContext('2d');
        var particles = [];
        var W, H;

        function resize() {
            W = canvas.width  = canvas.parentElement.offsetWidth;
            H = canvas.height = canvas.parentElement.offsetHeight;
        }

        resize();
        window.addEventListener('resize', resize, { passive: true });

        for (var i = 0; i < 60; i++) {
            particles.push({
                x:  Math.random() * 1200,
                y:  Math.random() * 800,
                r:  Math.random() * 1.5 + 0.4,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                o:  Math.random() * 0.5 + 0.1
            });
        }

        function drawParticles() {
            ctx.clearRect(0, 0, W, H);
            particles.forEach(function (p) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,255,255,' + p.o + ')';
                ctx.fill();
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = W;
                if (p.x > W) p.x = 0;
                if (p.y < 0) p.y = H;
                if (p.y > H) p.y = 0;
            });
            requestAnimationFrame(drawParticles);
        }

        drawParticles();
    }

    /* ====================================
       Smooth Anchor Scroll
       ==================================== */
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                var top = target.getBoundingClientRect().top + window.pageYOffset - 90;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    /* ====================================
       Active Nav Link — current page
       ==================================== */
    var page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('href') === page);
    });

    /* ====================================
       Tilt effect on dish cards
       ==================================== */
    document.querySelectorAll('.dish-card').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var rect   = card.getBoundingClientRect();
            var x      = e.clientX - rect.left;
            var y      = e.clientY - rect.top;
            var cx     = rect.width / 2;
            var cy     = rect.height / 2;
            var rotX   = ((y - cy) / cy) * -5;
            var rotY   = ((x - cx) / cx) * 5;
            card.style.transform = 'translateY(-8px) perspective(600px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)';
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
        });
    });

    /* ====================================
       Page fade-in
       ==================================== */
    document.body.classList.add('page-fade-in');

});
