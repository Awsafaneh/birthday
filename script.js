// الحصول على العناصر الأساسية
const openGiftButton = document.getElementById('open-gift-button');
const passwordSection = document.getElementById('password-section');
const passwordInput = document.getElementById('password-input');
const passwordError = document.getElementById('password-error');
const messageBox = document.getElementById('message-box');
const heartsContainer = document.getElementById('hearts-container');

// كلمة السر الصحيحة
const correctPassword = '1987';

// دالة إظهار رسالة خطأ
function showErrorMessage(element, message) {
    element.textContent = message;
    element.classList.add('visible'); // استخدم كلاس لإظهارها بالشفافية
}

// دالة إخفاء رسالة خطأ
function hideErrorMessage(element) {
    element.classList.remove('visible'); // إخفاء بالشفافية
    // يمكن مسح النص بعد انتهاء الانتقال إذا لزم الأمر
    setTimeout(() => { element.textContent = ''; }, 400); // 400ms هي مدة الانتقال في CSS
}

// دالة إظهار قسم كلمة السر
function showPasswordSection() {
    openGiftButton.style.display = 'none'; // إخفاء زر الفتح
    passwordSection.classList.remove('hidden'); // إظهار قسم كلمة السر
    passwordInput.focus(); // تركيز المؤشر على حقل الإدخال
}

// دالة التحقق من كلمة السر
function checkPassword() {
    const passwordValue = passwordInput.value.trim();

    if (passwordValue === '') {
        showErrorMessage(passwordError, 'الرجاء إدخال كلمة السر.');
        passwordInput.focus();
        return;
    }

    if (passwordValue === correctPassword) {
        hideErrorMessage(passwordError); // إخفاء رسالة الخطأ إذا كانت ظاهرة
        passwordSection.classList.add('hidden'); // إخفاء قسم كلمة السر
        showMessageBox(); // إظهار صندوق الهدية والرسالة
        startHearts(); // بدء تأثير القلوب
        passwordInput.value = ''; // مسح كلمة السر
    } else {
        showErrorMessage(passwordError, 'كلمة السر غير صحيحة. حاولي مرة أخرى يا أمي ❤️');
        passwordInput.value = ''; // مسح الحقل للمحاولة مجدداً
        passwordInput.focus();
    }
}

// دالة إظهار صندوق الهدية والرسالة
function showMessageBox() {
    messageBox.classList.remove('hidden');
    // لا نحتاج لتأخير هنا لأن أنيميشن الصندوق نفسه له تأخير في CSS
}

// دالة بدء تأثير القلوب
function startHearts() {
    const numberOfHearts = 60; // زيادة عدد القلوب
    const duration = 7000; // زيادة مدة أنيميشن القلب الواحد بالمللي ثانية (7 ثواني)

    for (let i = 0; i < numberOfHearts; i++) {
        let heart = document.createElement('div');
        heart.classList.add('heart');

        // تحديد موقع عشوائي أفقي
        heart.style.left = Math.random() * 100 + "vw";
        // تحديد حجم عشوائي بسيط
        const size = Math.random() * 15 + 20; // حجم بين 20 و 35 بكسل
        heart.style.setProperty('--pseudo-element-size', `${size}px`);
        heart.style.setProperty('--pseudo-element-half-size', `${size / 2}px`);


        // تحديد مدة أنيميشن عشوائية وتأخير بسيط للبدء
        heart.style.animationDuration = (Math.random() * 5 + 5) + "s"; // مدة بين 5 و 10 ثواني
        heart.style.animationDelay = (Math.random() * 4) + "s"; // تأخير بدء بين 0 و 4 ثواني
         // تحديد نقطة بداية عمودية عشوائية قليلاً أسفل الشاشة
        heart.style.bottom = `${Math.random() * 50 - 50}px`; // بين -50 و 0 بكسل

        heartsContainer.appendChild(heart);

        // إزالة القلب بعد انتهاء أنيميشنه لتجنب تراكم العناصر
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }
     // استدعاء الدالة مرة أخرى لإنشاء دفعة جديدة من القلوب بعد فترة لتأثير مستمر
     // يتم تحديد الوقت لتبدأ الدفعة التالية قبل اختفاء كل القلوب من الدفعة الحالية
     setTimeout(startHearts, duration / 3);
}


// إضافة معالجات الأحداث
openGiftButton.addEventListener('click', showPasswordSection);

// إضافة إمكانية الضغط على Enter في حقل كلمة السر لتأكيد الإدخال
passwordInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // منع الإجراء الافتراضي (مثل إرسال نموذج)
        checkPassword();
    }
});


// عند تحميل الصفحة بالكامل، تأكد من إخفاء الأقسام وابدأ أنيميشن الحاوية
document.addEventListener('DOMContentLoaded', () => {
    passwordSection.classList.add('hidden');
    messageBox.classList.add('hidden');
    // رسائل الخطأ مخفية مبدئياً بواسطة CSS
});
