/* ====================================
   المنشاوي — Contact Form JavaScript
   ==================================== */

document.addEventListener('DOMContentLoaded', function () {

    var form        = document.getElementById('contactForm');
    var successMsg  = document.getElementById('formSuccess');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var name    = document.getElementById('name').value.trim();
        var phone   = document.getElementById('phone').value.trim();
        var message = document.getElementById('message').value.trim();

        if (!name || !phone) {
            alert('من فضلك ادخل اسمك ورقم موبايلك.');
            return;
        }

        var submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'جاري الإرسال...';

        setTimeout(function () {
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'إرسال الرسالة';

            if (successMsg) {
                successMsg.style.display = 'block';
                setTimeout(function () {
                    successMsg.style.display = 'none';
                }, 5000);
            }
        }, 800);
    });

});
