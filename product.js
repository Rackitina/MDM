
document.addEventListener("DOMContentLoaded", () => {

    // ==================================
    // ДАННЫЕ ТОВАРОВ
    // ==================================

    const products = {

        "sumерки": {
            id: "sumерки",
            name: "Платье «Сумерки»",
            type: "Вечерний",
            designer: "Анна Лебедева",
            collection: "Вечер",
            year: "2026",
            inventory: "ГК-0124",
            price: 2500,
            deposit: 20000,
            evaluation: 40000,
            size: "44 (ОГ 88, ОТ 68, ОБ 94)",
            length: "132 см",
            material: "Шёлк 100%, подкладка — вискоза",
            color: "Лиловый",
            condition: "Отличное · осмотр 02.10.2026",
            care: "Только химчистка",
            theme: "#d5cff3",
            typeCode: "evening",
            available: true,
            history: [
                ["15.09 – 17.09.2026", "Съёмка лукбука, студия «Свет»", "Отличное", "АВ-0311"],
                ["02.08 – 03.08.2026", "Показ выпускников РГУ им. Косыгина", "Хорошее, нужна чистка", "АВ-0287"],
                ["10.07 – 16.07.2026", "Клип, режиссёр К. Иванов", "Отличное", "АВ-0254"]
            ]
        },

        "barokko": {
            id: "barokko",
            name: "Корсетное платье «Барокко»",
            type: "Арт-костюм",
            designer: "Мария Орлова",
            collection: "Арт",
            year: "2026",
            inventory: "ГК-0126",
            price: 4000,
            deposit: 30000,
            evaluation: 60000,
            size: "42 (ОГ 84, ОТ 64, ОБ 90)",
            length: "118 см",
            material: "Жаккард, вискоза",
            color: "Пудровый",
            condition: "Отличное · осмотр 05.10.2026",
            care: "Только химчистка",
            theme: "#eed1d7",
            typeCode: "art",
            available: false,
            history: [
                ["20.09 – 22.09.2026", "Театральная фотосессия", "Отличное", "АВ-0320"],
                ["05.08 – 07.08.2026", "Съёмка коллекции", "Отличное", "АВ-0290"]
            ]
        },

        "trapeziya": {
            id: "trapeziya",
            name: "Платье-трапеция «60-е»",
            type: "Вечерний",
            designer: "Анна Лебедева",
            collection: "Вечер",
            year: "2026",
            inventory: "ГК-0125",
            price: 2500,
            deposit: 18000,
            evaluation: 36000,
            size: "42",
            length: "105 см",
            material: "Креп",
            color: "Бежевый",
            condition: "Отличное",
            care: "Химчистка",
            theme: "#f0dfbd",
            typeCode: "evening",
            available: true,
            history: []
        },

        "grafika": {
            id: "grafika",
            name: "Платье-футляр «Графика»",
            type: "Вечерний",
            designer: "Дарья Соколова",
            collection: "Город",
            year: "2026",
            inventory: "ГК-0127",
            price: 2500,
            deposit: 20000,
            evaluation: 40000,
            size: "46",
            length: "110 см",
            material: "Шерсть",
            color: "Серый",
            condition: "Хорошее",
            care: "Химчистка",
            theme: "#d9dde3",
            typeCode: "evening",
            available: true,
            history: []
        },

        "metall": {
            id: "metall",
            name: "Комбинезон «Металл»",
            type: "Арт-костюм",
            designer: "Ева Миронова",
            collection: "Авангард",
            year: "2026",
            inventory: "ГК-0128",
            price: 4000,
            deposit: 25000,
            evaluation: 50000,
            size: "44",
            length: "145 см",
            material: "Лён",
            color: "Оливковый",
            condition: "Отличное",
            care: "Химчистка",
            theme: "#dce0d1",
            typeCode: "art",
            available: true,
            history: []
        },

        "sad": {
            id: "sad",
            name: "Платье-кимоно «Сад»",
            type: "Сценический",
            designer: "Мария Орлова",
            collection: "Природа",
            year: "2026",
            inventory: "ГК-0129",
            price: 3000,
            deposit: 20000,
            evaluation: 40000,
            size: "44",
            length: "125 см",
            material: "Шёлк",
            color: "Зелёный",
            condition: "Хорошее",
            care: "Химчистка",
            theme: "#cde1d9",
            typeCode: "stage",
            available: false,
            history: []
        },

        "nuar": {
            id: "nuar",
            name: "Платье «Нуар»",
            type: "Вечерний",
            designer: "Илья Ким",
            collection: "Вечер",
            year: "2026",
            inventory: "ГК-0130",
            price: 2500,
            deposit: 20000,
            evaluation: 40000,
            size: "46",
            length: "120 см",
            material: "Бархат",
            color: "Лиловый",
            condition: "Отличное",
            care: "Химчистка",
            theme: "#d2cddc",
            typeCode: "evening",
            available: true,
            history: []
        },

        "studiya": {
            id: "studiya",
            name: "Платье-рубашка «Студия»",
            type: "Повседневный",
            designer: "Дарья Соколова",
            collection: "Студия",
            year: "2026",
            inventory: "ГК-0131",
            price: 1500,
            deposit: 10000,
            evaluation: 20000,
            size: "42",
            length: "100 см",
            material: "Лён",
            color: "Бежевый",
            condition: "Отличное",
            care: "Деликатная стирка",
            theme: "#eddfce",
            typeCode: "everyday",
            available: true,
            history: []
        }

    };


    // ==================================
    // ЗАГРУЗКА ВЫБРАННОГО ТОВАРА
    // ==================================

    const params = new URLSearchParams(window.location.search);

    const productId = params.get("id") || "sumерки";

    const product = products[productId] || products["sumерки"];


    function setText(id, value) {

        const element = document.getElementById(id);

        if (element && value !== undefined) {
            element.textContent = value;
        }

    }


    // ==================================
    // ЗАПОЛНЕНИЕ ИНФОРМАЦИИ
    // ==================================

    function loadProduct() {

        document.title = product.name + " — Гардероб";

        setText("breadcrumbName", product.name);
        setText("productName", product.name);
        setText("productType", product.type);
        setText("productInventory", "Инв. № " + product.inventory);

        setText("designerName", product.designer);

        setText(
            "designerDescription",
            `Дизайнер · коллекция «${product.collection}», ${product.year}`
        );

        setText("productSize", product.size);
        setText("productLength", product.length);
        setText("productMaterial", product.material);
        setText("productColor", product.color);
        setText("productCondition", product.condition);
        setText("productCare", product.care);

        const status = document.getElementById("productStatus");

        status.textContent = product.available
            ? "Свободен"
            : "В аренде";

        status.classList.toggle(
            "unavailable",
            !product.available
        );

        document.querySelector(".main-photo").style.backgroundColor =
            product.theme;

        document.querySelectorAll(".thumbnail").forEach(button => {
            button.style.backgroundColor = product.theme;
        });

        setText("price1", formatPrice(product.price));

        setText("price2", formatPrice(product.price * 2));

        setText("price3", formatPrice(product.price * 3));

        setText("price7", formatPrice(product.price * 5));

        loadHistory();

    }


    // ==================================
    // ИСТОРИЯ ИСПОЛЬЗОВАНИЯ
    // ==================================

    function loadHistory() {

        const body = document.getElementById("historyBody");

        body.innerHTML = "";

        const history = product.history.length
            ? product.history
            : [
                ["—", "Новых проектов пока нет", "—", "—"]
            ];

        history.forEach(item => {

            const row = document.createElement("tr");

            item.forEach((value, index) => {

                const cell = document.createElement("td");

                if (index === 3 && value !== "—") {

                    const link = document.createElement("a");

                    link.href = "#";
                    link.textContent = value;

                    cell.appendChild(link);

                } else {

                    cell.textContent = value;

                }

                row.appendChild(cell);

            });

            body.appendChild(row);

        });

    }

    // ==================================
    // ГАЛЕРЕЯ ФОТОГРАФИЙ
    // ==================================

    const mainPhoto = document.getElementById("mainPhoto");

    const thumbnails = document.querySelectorAll(".thumbnail");

    const prevButton = document.getElementById("galleryPrev");

    const nextButton = document.getElementById("galleryNext");

    const photoCounter = document.getElementById("photoCounter");

    const photoCaption = document.getElementById("photoCaption");

    // Всего 6 фотографий

    const galleryPhotos = [
        {
            color: product.theme,
            caption: "Фото: общий вид спереди"
        },
        {
            color: product.theme,
            caption: "Фото: вид сзади"
        },
        {
            color: product.theme,
            caption: "Фото: вид сбоку"
        },
        {
            color: product.theme,
            caption: "Фото: детали изделия"
        },
        {
            color: product.theme,
            caption: "Фото: фактура материала"
        },
        {
            color: product.theme,
            caption: "Фото: дополнительный ракурс"
        }
    ];

    let currentPhoto = 0;


    // ==================================
    // ОТОБРАЖЕНИЕ ФОТОГРАФИИ
    // ==================================

    function showPhoto(index) {

        // Зацикливание галереи

        if (index < 0) {
            index = galleryPhotos.length - 1;
        }

        if (index >= galleryPhotos.length) {
            index = 0;
        }

        currentPhoto = index;

        const photo = galleryPhotos[currentPhoto];

        // Цвет изображения

        mainPhoto.style.backgroundColor = photo.color;

        // Подпись

        photoCaption.textContent = photo.caption;

        // Счётчик: 1 / 6, 2 / 6 и т.д.

        photoCounter.textContent =
            `${currentPhoto + 1} / ${galleryPhotos.length}`;

        // Активная миниатюра

        thumbnails.forEach((thumbnail, i) => {

            thumbnail.classList.toggle(
                "active",
                i === currentPhoto
            );

        });

        // На дополнительных фотографиях
        // сохраняем выделение кнопки +3 фото

        if (currentPhoto >= 3) {
            thumbnails[3].classList.add("active");
        }

    }


    // ==================================
    // ПРЕДЫДУЩАЯ ФОТОГРАФИЯ
    // ==================================

    prevButton.addEventListener("click", function (event) {

        event.stopPropagation();

        showPhoto(currentPhoto - 1);

    });


    // ==================================
    // СЛЕДУЮЩАЯ ФОТОГРАФИЯ
    // ==================================

    nextButton.addEventListener("click", function (event) {

        event.stopPropagation();

        showPhoto(currentPhoto + 1);

    });


    // ==================================
    // ПЕРЕКЛЮЧЕНИЕ МИНИАТЮР
    // ==================================

    thumbnails.forEach((thumbnail) => {

        thumbnail.addEventListener("click", function (event) {

            event.stopPropagation();

            const index = Number(thumbnail.dataset.photo);

            showPhoto(index);

        });

    });


    // ==================================
    // КЛАВИАТУРА
    // ==================================

    document.addEventListener("keydown", function (event) {

        if (event.target.matches("input, textarea, select")) {
            return;
        }

        if (event.key === "ArrowRight") {
            showPhoto(currentPhoto + 1);
        }

        if (event.key === "ArrowLeft") {
            showPhoto(currentPhoto - 1);
        }

    });


    // ==================================
    // ПЕРВАЯ ФОТОГРАФИЯ
    // ==================================

    showPhoto(0);


    // ==================================
    // СРОК АРЕНДЫ
    // ==================================

    let selectedDays = 2;

    const rentalButtons = document.querySelectorAll(".rental-option");

    const startInput = document.getElementById("rentalStart");

    const endInput = document.getElementById("rentalEnd");

    const today = new Date();

    function dateToLocalString(date) {

        const year = date.getFullYear();

        const month = String(date.getMonth() + 1).padStart(2, "0");

        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;

    }

    const initialDate = dateToLocalString(today);

    startInput.min = initialDate;
    endInput.min = initialDate;

    startInput.value = initialDate;

    function addDays(date, days) {

        const result = new Date(date + "T12:00:00");

        result.setDate(result.getDate() + days);

        return dateToLocalString(result);

    }

    function formatDate(date) {

        if (!date) return "—";

        return date.split("-").reverse().join(".");

    }

    endInput.value = addDays(initialDate, selectedDays);


    // ==================================
    // РАСЧЁТ СТОИМОСТИ
    // ==================================

    function formatPrice(value) {

        return new Intl.NumberFormat("ru-RU").format(value) + " ₽";

    }


    function calculatePrice() {

        let rentalPrice;

        if (selectedDays === 7) {
            rentalPrice = product.price * 5;
        } else {
            rentalPrice = product.price * selectedDays;
        }

        const deposit = product.deposit;

        const total = rentalPrice + deposit;

        setText(
            "rentalDescription",
            `Аренда · ${selectedDays} ${selectedDays === 1 ? "сутки" : "суток"}`
        );

        setText("rentalTotal", formatPrice(rentalPrice));

        setText("depositTotal", formatPrice(deposit));

        setText("grandTotal", formatPrice(total));

        setText(
            "depositDescription",
            `Залог (50% от оценки ${formatPrice(product.evaluation)}), возвратный`
        );

        setText(
            "modalSummary",
            `Получение: ${formatDate(startInput.value)}\n` +
            `Возврат: ${formatDate(endInput.value)}\n` +
            `Аренда: ${formatPrice(rentalPrice)}\n` +
            `Залог: ${formatPrice(deposit)}\n` +
            `Итого: ${formatPrice(total)}`
        );

    }


    rentalButtons.forEach(button => {

        button.addEventListener("click", () => {

            rentalButtons.forEach(item => {
                item.classList.remove("selected");
            });

            button.classList.add("selected");

            selectedDays = Number(button.dataset.days);

            if (startInput.value) {
                endInput.value = addDays(
                    startInput.value,
                    selectedDays
                );
            }

            calculatePrice();

        });

    });


    startInput.addEventListener("change", () => {

        if (!startInput.value) return;

        endInput.min = startInput.value;

        endInput.value = addDays(
            startInput.value,
            selectedDays
        );

        calculatePrice();

    });


    endInput.addEventListener("change", () => {

        if (
            !startInput.value ||
            !endInput.value ||
            endInput.value <= startInput.value
        ) {
            endInput.value = addDays(
                startInput.value,
                selectedDays
            );
        } else {

            const start = new Date(startInput.value + "T12:00:00");
            const end = new Date(endInput.value + "T12:00:00");

            selectedDays = Math.round(
                (end - start) / 86400000
            );

            rentalButtons.forEach(button => {

                button.classList.toggle(
                    "selected",
                    Number(button.dataset.days) === selectedDays
                );

            });

        }

        calculatePrice();

    });


    // ==================================
    // ПЕРЕХОД К ОФОРМЛЕНИЮ ЗАЯВКИ
    // ==================================

    document.getElementById("orderButton").addEventListener("click", function () {

        if (!product.available) {
            alert("Этот костюм пока недоступен для аренды.");
            return;
        }

        if (
            !startInput.value ||
            !endInput.value ||
            endInput.value <= startInput.value
        ) {
            alert("Пожалуйста, проверьте даты аренды.");
            return;
        }

        const rentalPrice = selectedDays === 7
            ? product.price * 5
            : product.price * selectedDays;

        const checkoutData = {

            productId: product.id,

            productName: product.name,

            designer: product.designer,

            inventory: product.inventory,

            size: product.size,

            price: product.price,

            deposit: product.deposit,

            days: selectedDays,

            start: startInput.value,

            end: endInput.value,

            rentalPrice: rentalPrice,

            total: rentalPrice + product.deposit,

            color: product.theme

        };

        sessionStorage.setItem(
            "garderobCheckout",
            JSON.stringify(checkoutData)
        );

        window.location.href = "checkout.html";

    });



    // ==================================
    // ЗАПУСК
    // ==================================

    loadProduct();

    calculatePrice();

});
