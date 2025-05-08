// دالة مساعدة لإظهار قسم معين بانتقال سلس
function showSection(sectionId) {
    // إخفاء جميع الأقسام أولاً بانتقال
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        if (!section.classList.contains('hidden')) {
             // أضف الكلاس 'hidden' لإخفاء القسم بانتقال
             section.classList.add('hidden');

             // اختياري: إذا كان القسم المختفي يحتوي على رسالة خطأ مرئية، قم بإخفائها
             const errorElement = section.querySelector('.error-message');
             if (errorElement && errorElement.classList.contains('visible')) {
                 errorElement.classList.remove('visible');
             }
        }
    });

    // البحث عن القسم المستهدف
    const targetSection = document.getElementById(sectionId);

     // إضافة تأخير بسيط للسماح للقسم السابق بالاختفاء قبل إظهار الجديد
    // مدة التأخير يجب أن تكون مساوية أو أكبر قليلاً من مدة الانتقال في CSS
    const transitionDuration = 700; // ملّي ثانية (توافق مع transition: opacity 0.7s)
    setTimeout(() => {
        // قم بإزالة الكلاس 'hidden' لإظهار القسم بانتقال
        targetSection.classList.remove('hidden');

        // اختياري: التركيز على حقل الإدخال إذا كان موجوداً في القسم الجديد
        const inputElement = targetSection.querySelector('input');
        if (inputElement) {
            inputElement.focus();
        }

    }, transitionDuration);
}

// دالة مساعدة لإظهار رسالة خطأ
function showErrorMessage(errorElementId, message) {
    const errorElement = document.getElementById(errorElementId);
    errorElement.textContent = message;
    // استخدم الكلاس 'visible' لإظهار الرسالة بانتقال الشفافية
    errorElement.classList.add('visible');
}

// دالة مساعدة لإخفاء رسالة خطأ
function hideErrorMessage(errorElementId) {
    const errorElement = document.getElementById(errorElementId);
     // قم بإزالة الكلاس 'visible' لإخفاء الرسالة بانتقال الشفافية
    errorElement.classList.remove('visible');
    // يمكنك مسح النص بعد انتهاء الانتقال إذا أردت:
    // setTimeout(() => { errorElement.textContent = ''; }, 300); // مدة الانتقال في CSS للأخطاء
}


// الدالة التي تبدأ الرحلة عند الضغط على الزر الأولي
function startJourney() {
    showSection('password-section');
}

// الدالة للتحقق من كلمة السر
function checkPassword() {
    const correctPassword = '1987'; // كلمة السر الصحيحة
    const passwordInput = document.getElementById('password-input');
    const passwordValue = passwordInput.value.trim(); // إزالة المسافات البيضاء

    if (passwordValue === '') {
         showErrorMessage('password-error', 'الرجاء إدخال كلمة السر.');
         passwordInput.value = '';
         return; // توقف الدالة هنا إذا كان الحقل فارغاً
    }

    if (passwordValue === correctPassword) {
        // كلمة السر صحيحة: أظهِر قسم العمر
        hideErrorMessage('password-error'); // إخفاء رسالة الخطأ إذا كانت ظاهرة
        showSection('age-section');
        passwordInput.value = ''; // مسح حقل كلمة السر لأسباب أمنية وجمالية
    } else {
        // كلمة السر خاطئة: أظهِر رسالة الخطأ
        showErrorMessage('password-error', 'كلمة السر خاطئة. يرجى المحاولة مرة أخرى.');
        passwordInput.value = ''; // مسح الحقل ليحاول المستخدم مرة أخرى
    }
}

// الدالة للتحقق من العمر
function checkAge() {
    const correctAge = '37'; // العمر الصحيح (تم وضعه ك string للمقارنة المباشرة)
    const ageInput = document.getElementById('age-input');
    const ageValue = ageInput.value.trim(); // إزالة المسافات البيضاء

     if (ageValue === '') {
         showErrorMessage('age-error', 'الرجاء إدخال العمر.');
         ageInput.value = '';
         return; // توقف الدالة هنا إذا كان الحقل فارغاً
    }

    // قيمة حقل الإدخال تكون عادةً سلسلة نصية (string) حتى لو كان نوعه number
    if (ageValue === correctAge) {
        // العمر صحيح: أظهِر رسالة التهنئة
        hideErrorMessage('age-error'); // إخفاء رسالة الخطأ إذا كانت ظاهرة
        showSection('message-section');
    } else {
        // العمر خاطئ: أظهِر رسالة الخطأ
        showErrorMessage('age-error', 'هذا ليس العمر الصحيح. حاولي التفكير مرة أخرى!');
        ageInput.value = ''; // مسح الحقل ليحاول المستخدم مرة أخرى
    }
}

// عند تحميل الصفحة بالكامل، أظهر القسم الأولي بانتقال
document.addEventListener('DOMContentLoaded', () => {
    showSection('intro-screen');
    // رسائل الخطأ مخفية مبدئياً بواسطة CSS باستخدام الكلاس 'error-message'
    // لا نحتاج لإخفائها هنا بالـ JS إلا إذا أردنا إخفاء كلاس 'visible' المضاف
});
