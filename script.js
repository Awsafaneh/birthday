document.addEventListener('DOMContentLoaded', () => {
    const passwordSection = document.getElementById('password-section');
    const ageSection = document.getElementById('age-section');
    const greetingSection = document.getElementById('greeting-section');
    const container = document.querySelector('.container');

    const passwordInput = document.getElementById('password-input');
    const passwordError = document.getElementById('password-error');
    const passwordButton = passwordSection.querySelector('button'); // استهداف الزر بشكل أدق

    const ageInput = document.getElementById('age-input');
    const ageError = document.getElementById('age-error');
    const ageButton = ageSection.querySelector('button'); // استهداف الزر بشكل أدق

    const greetingTitle = document.getElementById('greeting-title');
    const greetingMessage = document.getElementById('greeting-message');
    const birthdateMessage = document.getElementById('birthdate-message');

    const CORRECT_PASSWORD = "1987";
    const CORRECT_AGE = 37;
    const MOTHER_NAME = "آلاء نوفل";
    const BIRTH_DATE = "9/5/1987";

    // تطبيق أنيميشن الدخول على الكونتينر
    if (container) {
        container.classList.add('container-enter');
    }

    function showSection(sectionToShow) {
        // إخفاء جميع الأقسام
        [passwordSection, ageSection, greetingSection].forEach(section => {
            if (section) section.classList.remove('active');
        });

        // إظهار القسم المطلوب
        if (sectionToShow) {
            sectionToShow.classList.add('active');
        }
    }

    function triggerInputErrorAnimation(inputElement, errorMessageElement, message) {
        if (errorMessageElement) errorMessageElement.textContent = message;
        if (inputElement) {
            inputElement.value = ""; // مسح الحقل
            inputElement.classList.add('input-error-shake');
            setTimeout(() => {
                inputElement.classList.remove('input-error-shake');
            }, 500);
        }
    }

    function checkPassword() {
        console.log("checkPassword function called"); // للتأكد من استدعاء الدالة
        const enteredPassword = passwordInput.value.trim();
        if (enteredPassword === CORRECT_PASSWORD) {
            if (passwordError) passwordError.textContent = "";
            showSection(ageSection);
        } else {
            triggerInputErrorAnimation(passwordInput, passwordError, "كلمة المرور غير صحيحة. حاولي مرة أخرى!");
        }
    }

    function checkAge() {
        const enteredAge = parseInt(ageInput.value);
        if (enteredAge === CORRECT_AGE) {
            if (ageError) ageError.textContent = "";
            showGreeting();
            showSection(greetingSection);
        } else {
            triggerInputErrorAnimation(ageInput, ageError, `ليس هذا هو عمري :) حاولي مرة أخرى!`);
        }
    }

    function showGreeting() {
        if (greetingTitle) greetingTitle.textContent = `🎉 عيد ميلاد سعيد يا أغلى أم! 🎉`;
        if (greetingMessage) greetingMessage.textContent = `كل عام وأنتِ بألف ألف خير وصحة وسعادة يا ${MOTHER_NAME}. أتمنى لكِ يومًا رائعًا وسنة مليئة بالبهجة والحب وكل الأشياء الجميلة التي تستحقينها. أحبك جدًا!`;
        if (birthdateMessage) birthdateMessage.textContent = `تاريخ الميلاد: ${BIRTH_DATE}`;
        startConfetti();
    }

    // ربط الأحداث بعد تحميل DOM
    if (passwordButton) {
        passwordButton.onclick = checkPassword;
         // السماح بالإرسال عند الضغط على Enter في حقل كلمة المرور
        passwordInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // منع السلوك الافتراضي لـ Enter
                checkPassword();
            }
        });
    }
    if (ageButton) {
        ageButton.onclick = checkAge;
        // السماح بالإرسال عند الضغط على Enter في حقل العمر
        ageInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                checkAge();
            }
        });
    }


    // إضافة CSS للأنيميشن الخاص بالخطأ في الإدخال
    const dynamicStyles = `
    .input-error-shake {
        animation: horizontal-shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        border-color: #e74c3c !important; /* لضمان ظهور لون الخطأ */
    }
    @keyframes horizontal-shake {
        10%, 90% { transform: translateX(-1px); }
        20%, 80% { transform: translateX(2px); }
        30%, 50%, 70% { transform: translateX(-4px); }
        40%, 60% { transform: translateX(4px); }
    }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = dynamicStyles;
    document.head.appendChild(styleSheet);


    // ----- بداية كود قصاصات الورق (Confetti) المحدث -----
    function startConfetti() {
        const colors = ['#667eea', '#764ba2', '#f7cac9', '#92a8d1', '#fbc2eb']; // ألوان متناسقة
        const confettiCount = 100; // تقليل العدد قليلاً لأداء أفضل
        const confettiContainer = document.body; // استخدام body مباشرة

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti-piece'); // اسم كلاس جديد لتجنب التعارض
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 1 + 's'; // تأخير عشوائي بسيط
            confetti.style.animationDuration = Math.random() * 2 + 3 + 's';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.opacity = Math.random() * 0.7 + 0.3; // ضمان أن القصاصات مرئية
            confetti.style.transform = `scale(${Math.random() * 0.8 + 0.5}) rotate(${Math.random() * 360}deg)`; // دوران وحجم عشوائي أولي

            confettiContainer.appendChild(confetti);

            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    }

    const confettiCSS = `
    .confetti-piece {
        position: fixed;
        top: -20px;
        width: 10px; /* حجم متناسق */
        height: 10px;
        border-radius: 50%; /* دوائر */
        animation-name: fallConfetti;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        z-index: 10000;
    }

    @keyframes fallConfetti {
        0% {
            transform: translateY(-20px) rotateZ(0deg);
        }
        100% {
            transform: translateY(105vh) rotateZ(720deg);
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
});
