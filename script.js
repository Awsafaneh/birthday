// الدالة التي تبدأ الرحلة عند الضغط على الزر الأولي
function startJourney() {
    document.getElementById('intro-screen').style.display = 'none';
    document.getElementById('password-section').style.display = 'block';
}

// الدالة للتحقق من كلمة السر
function checkPassword() {
    const correctPassword = '1987'; // كلمة السر الصحيحة
    const passwordInput = document.getElementById('password-input');
    const passwordError = document.getElementById('password-error');

    if (passwordInput.value === correctPassword) {
        // كلمة السر صحيحة: أخفِ قسم كلمة السر وأظهِر قسم العمر
        document.getElementById('password-section').style.display = 'none';
        document.getElementById('age-section').style.display = 'block';
        passwordError.style.display = 'none'; // إخفاء أي رسالة خطأ سابقة
        passwordInput.value = ''; // مسح حقل كلمة السر لأسباب أمنية وجمالية
    } else {
        // كلمة السر خاطئة: أظهِر رسالة الخطأ
        passwordError.textContent = 'كلمة السر خاطئة. يرجى المحاولة مرة أخرى.';
        passwordError.style.display = 'block';
        passwordInput.value = ''; // مسح الحقل ليحاول المستخدم مرة أخرى
    }
}

// الدالة للتحقق من العمر
function checkAge() {
    const correctAge = '37'; // العمر الصحيح (تم وضعه ك string للمقارنة المباشرة مع قيمة input)
    const ageInput = document.getElementById('age-input');
    const ageError = document.getElementById('age-error');

    // قيمة حقل الإدخال تكون عادةً سلسلة نصية (string) حتى لو كان نوعه number
    if (ageInput.value === correctAge) {
        // العمر صحيح: أخفِ قسم العمر وأظهِر رسالة التهنئة
        document.getElementById('age-section').style.display = 'none';
        document.getElementById('message-section').style.display = 'block';
        ageError.style.display = 'none'; // إخفاء أي رسالة خطأ سابقة
    } else {
        // العمر خاطئ: أظهِر رسالة الخطأ
        ageError.textContent = 'هذا ليس العمر الصحيح. حاولي التفكير مرة أخرى!';
        ageError.style.display = 'block';
        ageInput.value = ''; // مسح الحقل ليحاول المستخدم مرة أخرى
    }
}
