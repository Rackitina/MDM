document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");
    
    // Если формы нет на странице, прекращаем выполнение
    if (!form) return;

    const loginInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");
    const rememberCheckbox = document.getElementById("rememberMe");

    const loginError = document.getElementById("loginError");
    const passwordError = document.getElementById("passwordError");
    const message = document.getElementById("loginMessage");

    // Восстановление сохранённого логина
    const savedLogin = localStorage.getItem("garderob_login");

    if (savedLogin) {
        loginInput.value = savedLogin;
        rememberCheckbox.checked = true;
    }

    // Очистка ошибок при вводе
    loginInput.addEventListener("input", () => {
        loginInput.classList.remove("invalid");
        loginError.textContent = "";
        if (message) message.textContent = "";
    });

    passwordInput.addEventListener("input", () => {
        passwordInput.classList.remove("invalid");
        passwordError.textContent = "";
        if (message) message.textContent = "";
    });

    // Обработка отправки формы
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const login = loginInput.value.trim();
        const password = passwordInput.value;

        loginError.textContent = "";
        passwordError.textContent = "";

        loginInput.classList.remove("invalid");
        passwordInput.classList.remove("invalid");

        let valid = true;

        if (!login) {
            loginError.textContent = "Введите логин";
            loginInput.classList.add("invalid");
            valid = false;
        }

        if (!password) {
            passwordError.textContent = "Введите пароль";
            passwordInput.classList.add("invalid");
            valid = false;
        } else if (password.length < 6) {
            // Проверка длины пароля
            passwordError.textContent = "Пароль должен быть не менее 6 символов";
            passwordInput.classList.add("invalid");
            valid = false;
        }

        if (!valid) return;

        // ДЕМОНСТРАЦИОННАЯ УЧЁТНАЯ ЗАПИСЬ
        // Пароль изменён на Admin123 (6 символов), чтобы обойти ограничение
        if (login === "Admin" && password === "Admin123") {

            if (rememberCheckbox.checked) {
                localStorage.setItem("garderob_login", login);
            } else {
                localStorage.removeItem("garderob_login");
            }

            sessionStorage.setItem("garderob_user", JSON.stringify({
                login: "Admin",
                name: "Admin",
                role: "admin"
            }));

            window.location.href = "admin/dashboard.html";
            return;
        }

        // Если логин/пароль не совпали
        loginError.textContent = "Неверный логин или пароль";
        passwordInput.classList.add("invalid");
    });

});