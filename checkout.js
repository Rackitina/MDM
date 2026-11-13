
document.addEventListener("DOMContentLoaded", function () {

    // ======================================
    // 1. ПОЛУЧЕНИЕ ДАННЫХ ЗАКАЗА
    // ======================================

    const order = JSON.parse(
        sessionStorage.getItem("garderobCheckout") || "null"
    );

    const form = document.getElementById("checkoutForm");

    const today = new Date();

    function formatPrice(value) {
        return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
    }

    function formatDate(value) {
        if (!value) return "—";

        const parts = value.split("-");

        return `${parts[2]}.${parts[1]}.${parts[0]}`;
    }

    // Данные по умолчанию, если страница открыта напрямую

    const data = order || {
        productName: "Платье «Сумерки»",
        designer: "Анна Лебедева",
        size: "44",
        inventory: "ГК-0124",
        price: 2500,
        deposit: 20000,
        days: 2,
        start: "",
        end: "",
        color: "#d5cff3",
        productId: "sumерки"
    };


    // ======================================
    // 2. ЗАПОЛНЕНИЕ ИНФОРМАЦИИ О ТОВАРЕ
    // ======================================

    document.getElementById("summaryName").textContent =
        data.productName;

    document.getElementById("summaryDesigner").textContent =
        `${data.designer} · р. ${data.size}`;

    document.getElementById("summaryInventory").textContent =
        data.inventory;

    document.getElementById("summaryImage").style.backgroundColor =
        data.color || "#d5cff3";

    document.getElementById("summaryStart").textContent =
        formatDate(data.start);

    document.getElementById("summaryEnd").textContent =
        formatDate(data.end);

    const rentalPrice = Number(data.price) *
        (Number(data.days) === 7 ? 5 : Number(data.days));

    const deposit = Number(data.deposit);

    const total = rentalPrice + deposit;

    document.getElementById("summaryRentalLabel").textContent =
        `Аренда, ${data.days} ${Number(data.days) === 1 ? "сутки" : "суток"} × ${formatPrice(data.price)}`;

    document.getElementById("summaryRental").textContent =
        formatPrice(rentalPrice);

    document.getElementById("summaryDeposit").textContent =
        formatPrice(deposit);

    document.getElementById("summaryTotal").textContent =
        formatPrice(total);


    // ======================================
    // 3. ССЫЛКА НАЗАД
    // ======================================

    const backLink = document.getElementById("backLink");

    backLink.href =
        `product.html?id=${encodeURIComponent(data.productId || "sumерки")}`;

    document.getElementById("cancelOrder").addEventListener("click", function () {
        window.location.href = backLink.href;
    });


    // ======================================
    // 4. ДАТА И ВРЕМЯ
    // ======================================

    const pickupTime = document.getElementById("pickupTime");

    function toLocalDateTime(date) {

        const offset = date.getTimezoneOffset();

        const local = new Date(date.getTime() - offset * 60000);

        return local.toISOString().slice(0, 16);

    }

    const minimumTime = toLocalDateTime(today);

    pickupTime.min = minimumTime;

    const defaultPickup = data.start
        ? `${data.start}T10:00`
        : minimumTime;

    pickupTime.value = defaultPickup;

    if (pickupTime.value < minimumTime) {
        pickupTime.value = minimumTime;
    }


    // ======================================
    // 5. МАСКА ТЕЛЕФОНА
    // ======================================

    const phoneInput = document.getElementById("clientPhone");

    phoneInput.addEventListener("input", function () {

        let digits = this.value.replace(/\D/g, "");

        if (digits.startsWith("8")) {
            digits = "7" + digits.slice(1);
        }

        if (!digits.startsWith("7")) {
            digits = "7" + digits;
        }

        digits = digits.slice(0, 11);

        let result = "+7";

        if (digits.length > 1) {
            result += " (" + digits.slice(1, 4);
        }

        if (digits.length >= 4) {
            result += ") " + digits.slice(4, 7);
        }

        if (digits.length >= 7) {
            result += "-" + digits.slice(7, 9);
        }

        if (digits.length >= 9) {
            result += "-" + digits.slice(9, 11);
        }

        this.value = result;

        validateField(this);

    });


    // ======================================
    // 6. ПРОВЕРКА ПОЛЕЙ
    // ======================================

    function validateField(field) {

        const error = field
            .closest(".form-field")
            ?.querySelector(".field-error");

        let message = "";

        if (field.required && !field.value.trim()) {
            message = "Это поле обязательно для заполнения.";
        }

        else if (!field.checkValidity()) {

            if (field.type === "email") {
                message = "Введите корректный адрес электронной почты.";
            }

            else if (field.type === "tel") {
                message = "Формат: +7 (900) 000-00-00.";
            }

            else if (field.type === "datetime-local") {
                message = "Выберите корректную дату и время.";
            }

            else if (field.id === "clientName") {
                message = "Введите фамилию, имя и отчество или два имени.";
            }

            else {
                message = "Проверьте правильность заполнения.";
            }

        }

        else if (
            field.id === "pickupTime" &&
            field.value < minimumTime
        ) {
            message = "Нельзя выбрать прошедшее время.";
        }

        if (error) {
            error.textContent = message;
        }

        field.classList.toggle("invalid", Boolean(message));

        field.classList.toggle(
            "valid",
            !message && field.value.trim() !== ""
        );

        return !message;

    }


    const fields = form.querySelectorAll(
        "input:not([type=checkbox]), select, textarea"
    );

    fields.forEach(function (field) {

        field.addEventListener("blur", function () {
            validateField(field);
        });

        field.addEventListener("change", function () {
            validateField(field);
        });

    });


    // ======================================
    // 7. ПРОВЕРКА СОГЛАСИЙ
    // ======================================

    function validateAgreements() {

        const checkboxes = [
            document.getElementById("termsAgreement"),
            document.getElementById("fineAgreement"),
            document.getElementById("personalAgreement")
        ];

        const valid = checkboxes.every(item => item.checked);

        document.getElementById("agreementError").textContent =
            valid ? "" : "Необходимо принять все условия.";

        return valid;

    }


    // ======================================
    // 8. ОТПРАВКА ЗАЯВКИ
    // ======================================

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        let valid = true;

        fields.forEach(function (field) {

            if (!validateField(field)) {
                valid = false;
            }

        });

        if (!validateAgreements()) {
            valid = false;
        }

        if (!valid) {

            const firstInvalid = form.querySelector(
                ".invalid, .agreement-error:not(:empty)"
            );

            firstInvalid?.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            return;

        }


        const request = {

            requestId: "GK-" + Date.now(),

            createdAt: new Date().toISOString(),

            product: {
                id: data.productId,
                name: data.productName,
                designer: data.designer,
                inventory: data.inventory,
                size: data.size
            },

            rental: {
                start: data.start,
                end: data.end,
                days: data.days,
                price: rentalPrice,
                deposit: deposit,
                total: total
            },

            client: {
                name: document.getElementById("clientName").value.trim(),
                phone: phoneInput.value,
                email: document.getElementById("clientEmail").value.trim(),
                organization: document.getElementById("organization").value.trim()
            },

            project: {
                eventType: document.getElementById("eventType").value,
                name: document.getElementById("projectName").value.trim(),
                delivery: document.getElementById("deliveryMethod").value,
                pickupTime: pickupTime.value,
                comment: document.getElementById("comment").value.trim()
            },

            status: "Новая заявка"

        };


        // Демонстрационное сохранение

        const requests = JSON.parse(
            localStorage.getItem("garderobRequests") || "[]"
        );

        requests.push(request);

        localStorage.setItem(
            "garderobRequests",
            JSON.stringify(requests)
        );


        sessionStorage.setItem(
            "lastGarderobRequest",
            JSON.stringify(request)
        );


        // Переход на страницу подтверждения

        window.location.href = "success.html";

    });

});
