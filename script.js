document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. ЦВЕТА ФОТОГРАФИЙ В НОВОМ КАТАЛОГЕ
    // ==========================================

    const imageColors = {
        "image-purple": "#d5cff3",
        "image-pink": "#eed1d7",
        "image-gray": "#d9dde3",
        "image-beige": "#eddfce",
        "image-green": "#dce0d1",
        "image-mint": "#cde1d9",
        "image-lilac": "#d2cddc",
        "image-sand": "#eddfce"
    };

    const productImages = document.querySelectorAll(
        ".product-image"
    );

    productImages.forEach(function (image) {

        for (const className in imageColors) {

            if (image.classList.contains(className)) {

                // Восстанавливаем цвет заглушки
                image.style.backgroundColor =
                    imageColors[className];

                // Полосатый узор
                image.style.backgroundImage =
                    "repeating-linear-gradient(" +
                    "135deg, " +
                    "rgba(255,255,255,0.4) 0px, " +
                    "rgba(255,255,255,0.4) 7px, " +
                    "transparent 7px, " +
                    "transparent 15px)";

                break;
            }

        }

    });


    // ==========================================
    // 2. ПЕРЕХОД НА СТРАНИЦУ ТОВАРА
    // ==========================================

    document.addEventListener("click", function (event) {

        const card = event.target.closest(
            ".product-card[data-product-id]"
        );

        if (!card) return;

        // Не перехватываем отдельные ссылки и кнопки
        if (event.target.closest("a, button")) return;

        const productId = card.dataset.productId;

        if (!productId) return;

        window.location.href =
            "product.html?id=" +
            encodeURIComponent(productId);

    });


    // ==========================================
    // 3. КУРСОР ДЛЯ КАРТОЧЕК
    // ==========================================

    document.querySelectorAll(
        ".product-card[data-product-id]"
    ).forEach(function (card) {

        card.style.cursor = "pointer";

    });


    // ==========================================
    // 4. КНОПКА «СМОТРЕТЬ КАТАЛОГ»
    // ==========================================

    const catalogButtons = document.querySelectorAll(
        ".catalog-main-button, .hero-catalog-button"
    );

    catalogButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            window.location.href = "catalog.html";

        });

    });


    // ==========================================
    // 5. КНОПКА «ВЕСЬ КАТАЛОГ»
    // ==========================================

    const allCatalogButtons = document.querySelectorAll(
        ".all-catalog-button"
    );

    allCatalogButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            window.location.href = "catalog.html";

        });

    });

});