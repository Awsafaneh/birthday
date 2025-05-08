// العناصر من الـ HTML
const passwordSection = document.getElementById('password-section');
const ageSection = document.getElementById('age-section');
const greetingSection = document.getElementById('greeting-section');

const passwordInput = document.getElementById('password-input');
const passwordError = document.getElementById('password-error');

const ageInput = document.getElementById('age-input');
const ageError = document.getElementById('age-error');

const greetingTitle = document.getElementById('greeting-title');
const greetingMessage = document.getElementById('greeting-message');
const birthdateMessage = document.getElementById('birthdate-message');

// كلمة المرور والعمر الصحيحين
const CORRECT_PASSWORD = "1987";
const CORRECT_AGE = 37;
const MOTHER_NAME = "آلاء نوفل";
const BIRTH_DATE = "9/5/1987";

function showSection(sectionToShow) {
    // إخفاء جميع الأقسام
    passwordSection.classList.remove('active');
    ageSection.classList.remove('active');
    greetingSection.classList.remove('active');

    // إظهار القسم المطلوب
    sectionToShow.classList.add('active');
}

function checkPassword() {
    const enteredPassword = passwordInput.value;
    if (enteredPassword === CORRECT_PASSWORD) {
        passwordError.textContent = "";
        showSection(ageSection);
    } else {
        passwordError.textContent = "كلمة المرور غير صحيحة. حاولي مرة أخرى!";
        passwordInput.value = ""; // مسح حقل الإدخال
        triggerShake(passwordInput);
    }
}

function checkAge() {
    const enteredAge = parseInt(ageInput.value); // تحويل القيمة إلى رقم
    if (enteredAge === CORRECT_AGE) {
        ageError.textContent = "";
        showGreeting();
        showSection(greetingSection);
    } else {
        ageError.textContent = `ليس هذا هو عمري :) حاولي مرة أخرى!`;
        ageInput.value = ""; // مسح حقل الإدخال
        triggerShake(ageInput);
    }
}

function showGreeting() {
    greetingTitle.textContent = `🎉 عيد ميلاد سعيد يا أغلى أم! 🎉`;
    greetingMessage.textContent = `كل عام وأنتِ بألف ألف خير وصحة وسعادة يا ${MOTHER_NAME}. أتمنى لكِ يومًا رائعًا وسنة مليئة بالبهجة والحب وكل الأشياء الجميلة التي تستحقينها. أحبك جدًا!`;
    birthdateMessage.textContent = `تاريخ الميلاد: ${BIRTH_DATE}`;

    // يمكنك إضافة المزيد من الأنيميشن أو التأثيرات هنا عند عرض التهنئة
    startConfetti(); // مثال: بدء تأثير قصاصات الورق
}

function triggerShake(element) {
    element.classList.add('shake-input');
    setTimeout(() => {
        element.classList.remove('shake-input');
    }, 500);
}

// إضافة تأثير اهتزاز بسيط لحقول الإدخال عند الخطأ
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
.shake-input {
    animation: shakeHorizontal 0.4s;
}
@keyframes shakeHorizontal {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
}`;
document.head.appendChild(styleSheet);


// ----- بداية كود قصاصات الورق (Confetti) -----
// يمكنك استخدام مكتبة جاهزة أو هذا الكود البسيط
function startConfetti() {
    const confettiContainer = document.querySelector('.container'); // أو body
    const colors = ['#f6d365', '#fda085', '#e74c3c', '#2ecc71', '#3498db'];
    for (let i = 0; i < 150; i++) { // عدد القصاصات
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's'; // مدة الأنيميشن
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.opacity = Math.random();
        confetti.style.transform = `scale(${Math.random() * 0.5 + 0.5})`; // أحجام مختلفة
        document.body.appendChild(confetti); // إضافة القصاصة إلى body مباشرة لتغطية الشاشة

        // إزالة القصاصة بعد انتهاء الأنيميشن لتجنب تراكم العناصر
        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }
}

// إضافة الـ CSS الخاص بالـ confetti
const confettiCSS = `
.confetti {
    position: fixed; /* لتغطية الشاشة بالكامل */
    top: -10px; /* تبدأ من خارج الشاشة قليلاً */
    width: 10px;
    height: 10px;
    border-radius: 50%;
    animation: fall linear infinite;
    z-index: 9999; /* فوق كل شيء */
}

@keyframes fall {
    to {
        transform: translateY(105vh) rotate(720deg); /* سقوط مع دوران */
        opacity: 0;
    }
}
`;
const confettiStyleSheet = document.createElement("style");
confettiStyleSheet.type = "text/css";
confettiStyleSheet.innerText = confettiCSS;
document.head.appendChild(confettiStyleSheet);
// ----- نهاية كود قصاصات الورق (Confetti) -----


// إظهار قسم كلمة المرور عند تحميل الصفحة
showSection(passwordSection);
