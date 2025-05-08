// الحصول على العناصر الأساسية
const container = document.querySelector('.container');
const introScreen = document.getElementById('intro-screen');
const passwordSection = document.getElementById('password-section');
const passwordInput = document.getElementById('password-input');
const passwordError = document.getElementById('password-error');
const ageSection = document.getElementById('age-section');
const ageInput = document.getElementById('age-input');
const ageError = document.getElementById('age-error');
const messageSection = document.getElementById('message-section');
const overlayEffects = document.getElementById('overlay-effects'); // عنصر تأثيرات الأوفرلاي

// القيم الصحيحة
const correctPassword = '1987';
const correctAge = '37';

// مدة الانتقال بين الأقسام (يجب أن تتوافق مع مدة الانتقال في CSS)
const sectionTransitionDuration = 800; // مللي ثانية (0.8s)


// دالة لإخفاء رسالة خطأ
function hideErrorMessage(element) {
    element.classList.remove('visible');
    // يمكن مسح النص بعد انتهاء الانتقال
    setTimeout(() => { element.textContent = ''; }, 400);
}

// دالة إظهار رسالة خطأ
function showErrorMessage(element, message) {
    element.textContent = message;
    element.classList.add('visible');
}

// دالة للانتقال بين الأقسام
function goToSection(currentSection, nextSectionId) {
    // إخفاء رسالة الخطأ في القسم الحالي إذا كانت ظاهرة
    const currentErrorElement = currentSection.querySelector('.error-message');
    if (currentErrorElement) {
        hideErrorMessage(currentErrorElement);
    }

    // إضافة الكلاس 'hidden' للقسم الحالي لبدء الانتقال الخارجي
    currentSection.classList.add('hidden');
    currentSection.classList.remove('active'); // إزالة الكلاس active


    // البحث عن القسم التالي المستهدف
    const nextSection = document.getElementById(nextSectionId);

    // بعد انتهاء انتقال القسم الحالي (أو جزء منه)، أظهر القسم التالي
    // استخدام setTimeout لضمان وجود فاصل زمني بين إخفاء القسم الحالي وظهور التالي
    setTimeout(() => {
        // إزالة الكلاس 'hidden' وإضافة 'active' للقسم التالي لبدء الانتقال الداخلي
        nextSection.classList.remove('hidden');
        nextSection.classList.add('active');


        // تركيز المؤشر على حقل الإدخال في القسم الجديد إذا كان موجوداً
        const nextInput = nextSection.querySelector('input');
        if (nextInput) {
            nextInput.focus();
        }

        // تشغيل التأثيرات الخاصة بالقسم النهائي إذا وصلنا إليه
        if (nextSectionId === 'message-section') {
            startCelebrationEffects();
        }

    }, sectionTransitionDuration / 2); // يمكن ضبط التأخير ليتناسب مع شكل الانتقال المطلوب (هنا: نبدأ إظهار التالي في منتصف مدة اختفاء الحالي)

}


// دالة بدء التحدي (من القسم الأولي)
function startChallenge() {
    goToSection(introScreen, 'password-section');
}


// دالة التحقق من كلمة السر
function checkPassword() {
    const passwordValue = passwordInput.value.trim();

    if (passwordValue === '') {
        showErrorMessage(passwordError, 'هذا الحقل لا يمكن تركه فارغاً.');
        passwordInput.focus();
        return;
    }

    if (passwordValue === correctPassword) {
        hideErrorMessage(passwordError);
        passwordInput.value = ''; // مسح كلمة السر
        goToSection(passwordSection, 'age-section'); // انتقل إلى قسم العمر
    } else {
        showErrorMessage(passwordError, 'المفتاح غير صحيح. يرجى المحاولة مرة أخرى.');
        passwordInput.value = '';
        passwordInput.focus();
    }
}

// دالة التحقق من العمر
function checkAge() {
    const ageValue = ageInput.value.trim();

     if (ageValue === '') {
         showErrorMessage(ageError, 'الرجاء إدخال الرقم السحري.');
         ageInput.focus();
         return;
    }

    // قيمة حقل الإدخال تكون عادةً سلسلة نصية (string) حتى لو كان نوعه number
    if (ageValue === correctAge) {
        hideErrorMessage(ageError);
        ageInput.value = ''; // مسح العمر
        goToSection(ageSection, 'message-section'); // انتقل إلى قسم الرسالة النهائية
    } else {
        showErrorMessage(ageError, 'هذا ليس الرقم الصحيح. فكري قليلاً يا أمي.');
        ageInput.value = '';
        ageInput.focus();
    }
}

// دالة بدء التأثيرات الاحتفالية (عند الوصول للرسالة النهائية)
function startCelebrationEffects() {
    // يمكنك إضافة أنواع مختلفة من التأثيرات هنا
    startHeartAnimation(); // بدء تأثير القلوب
    // يمكنك إضافة دوال أخرى لتأثيرات مثل قصاصات الورق، الألعاب النارية الخ.
}


// دالة بدء أنيميشن القلوب (تم تحسينها وتكييفها مع الهيكل الجديد)
function startHeartAnimation() {
    const numberOfHearts = 80; // عدد القلوب
    const baseDuration = 6000; // المدة الأساسية لأنيميشن القلب

    // مسح القلوب الموجودة قبل بدء أنيميشن جديد (إذا كنت تريدها أن تتوقف وتبدأ مجدداً)
    overlayEffects.innerHTML = '';

    for (let i = 0; i < numberOfHearts; i++) {
        let heart = document.createElement('div');
        heart.classList.add('heart');

        // حجم وموضع عشوائي
        const size = Math.random() * 15 + 20; // حجم بين 20 و 35 بكسل
        heart.style.setProperty('--pseudo-element-size', `${size}px`);
        heart.style.setProperty('--pseudo-element-half-size', `${size / 2}px`);
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.bottom = `${Math.random() * 50 - 70}px`; // تبدأ من أسفل الشاشة أو تحتها بقليل

        // مدة وتأخير أنيميشن عشوائي
        const duration = baseDuration + Math.random() * 3000; // مدة بين 6 و 9 ثواني
        const delay = Math.random() * 5; // تأخير بين 0 و 5 ثواني
        heart.style.setProperty('--heart-duration', `${duration}ms`);
        heart.style.animationDelay = `${delay}s`;


        overlayEffects.appendChild(heart);

        // إزالة القلب بعد انتهاء أنيميشنه لتجنب تراكم العناصر
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

     // يمكنك هنا استدعاء startHeartAnimation مجدداً بعد فترة إذا أردت تأثير مستمر للقلوب
     // مثال: استدعاء دفعة جديدة كل بضع ثوانٍ
      setTimeout(startHeartAnimation, 3000); // تطلق دفعة جديدة كل 3 ثواني
}


// إضافة معالجات الأحداث للأزرار
// نستخدم data-target على زر البداية لتحديد الوجهة
document.querySelector('.cta-button[data-target]').addEventListener('click', function() {
    const targetSectionId = this.dataset.target;
    goToSection(introScreen, targetSectionId);
});


// إضافة إمكانية الضغط على Enter في حقول الإدخال
passwordInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        checkPassword();
    }
});

ageInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        checkAge();
    }
});


// عند تحميل الصفحة، تأكد من إعداد الحالة الأولية
document.addEventListener('DOMContentLoaded', () => {
    // إخفاء جميع الأقسام ما عدا الأول مبدئياً
    passwordSection.classList.add('hidden');
    ageSection.classList.add('hidden');
    messageSection.classList.add('hidden');

    // التأكد من أن القسم الأول هو النشط مبدئياً
    introScreen.classList.add('active');

    // إخفاء رسائل الخطأ مبدئياً
    passwordError.classList.remove('visible');
    ageError.classList.remove('visible');
});
