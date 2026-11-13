
document.addEventListener("DOMContentLoaded", () => {

    const productsGrid = document.getElementById("productsGrid");
    const products = Array.from(
        productsGrid.querySelectorAll(".catalog-product")
    );

    const searchInput = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");
    const materialSelect = document.getElementById("materialSelect");
    const colorSelect = document.getElementById("colorSelect");
    const resetButton = document.getElementById("resetFilters");
    const resultsCount = document.getElementById("resultsCount");
    const pagination = document.getElementById("pagination");
    const chips = document.getElementById("activeFilters");

    let currentPage = 1;
    const perPage = 8;

    let selectedSizes = [];


    // ВЫБОР РАЗМЕРА

    document.querySelectorAll(".size-btn").forEach(button => {

        button.addEventListener("click", () => {

            const size = button.dataset.size;

            button.classList.toggle("selected");

            if (selectedSizes.includes(size)) {
                selectedSizes = selectedSizes.filter(
                    item => item !== size
                );
            } else {
                selectedSizes.push(size);
            }

            currentPage = 1;
            filterProducts();
        });

    });


    // ИЗМЕНЕНИЕ ФИЛЬТРОВ

    document.querySelectorAll(
        '.filters-sidebar input[type="checkbox"]'
    ).forEach(input => {

        input.addEventListener("change", () => {
            currentPage = 1;
            filterProducts();
        });

    });


    // ПОИСК

    searchInput.addEventListener("input", () => {
        currentPage = 1;
        filterProducts();
    });


    // СОРТИРОВКА

    sortSelect.addEventListener("change", () => {
        filterProducts();
    });


    // МАТЕРИАЛ И ЦВЕТ

    materialSelect.addEventListener("change", () => {
        currentPage = 1;
        filterProducts();
    });

    colorSelect.addEventListener("change", () => {
        currentPage = 1;
        filterProducts();
    });


    // СБРОС ФИЛЬТРОВ

    resetButton.addEventListener("click", resetFilters);


    function resetFilters() {

        document.querySelectorAll(
            '.filters-sidebar input[type="checkbox"]'
        ).forEach(input => {
            input.checked = false;
        });

        document.querySelectorAll(".size-btn").forEach(button => {
            button.classList.remove("selected");
        });

        selectedSizes = [];

        searchInput.value = "";
        materialSelect.value = "";
        colorSelect.value = "";
        sortSelect.value = "new";

        document.getElementById("dateFrom").value = "";
        document.getElementById("dateTo").value = "";

        chips.querySelectorAll(".filter-chip").forEach(chip => {
            chip.remove();
        });

        currentPage = 1;
        filterProducts();
    }


    // УДАЛЕНИЕ АКТИВНЫХ МЕТОК

    chips.querySelectorAll(".filter-chip").forEach(chip => {

        chip.addEventListener("click", () => {

            const filter = chip.dataset.filter;

            if (filter === "evening") {
                document.querySelectorAll(
                    'input[name="type"][value="evening"]'
                ).forEach(input => input.checked = false);
            }

            if (filter === "size") {
                selectedSizes = [];

                document.querySelectorAll(".size-btn").forEach(button => {
                    button.classList.remove("selected");
                });
            }

            if (filter === "dates") {
                document.getElementById("dateFrom").value = "";
                document.getElementById("dateTo").value = "";
            }

            chip.remove();
            currentPage = 1;
            filterProducts();

        });

    });


    // ПОЛУЧЕНИЕ ВЫБРАННЫХ ЗНАЧЕНИЙ

    function getCheckedValues(name) {

        return Array.from(
            document.querySelectorAll(
                `input[name="${name}"]:checked`
            )
        ).map(input => input.value);

    }


    // ФИЛЬТРАЦИЯ

    function filterProducts() {

        const search = searchInput.value.toLowerCase().trim();

        const types = getCheckedValues("type");
        const designers = getCheckedValues("designer");
        const conditions = getCheckedValues("condition");

        const material = materialSelect.value;
        const color = colorSelect.value;

        let filtered = products.filter(product => {

            const name = product.dataset.name.toLowerCase();
            const designer = product.dataset.designer.toLowerCase();

            const searchMatch =
                !search ||
                name.includes(search) ||
                designer.includes(search);

            const typeMatch =
                types.length === 0 ||
                types.includes(product.dataset.type);

            const sizeMatch =
                selectedSizes.length === 0 ||
                selectedSizes.includes(product.dataset.size);

            const designerMatch =
                designers.length === 0 ||
                designers.includes(product.dataset.designer);

            const materialMatch =
                !material ||
                product.dataset.material === material;

            const colorMatch =
                !color ||
                product.dataset.color === color;

            const conditionMatch =
                conditions.length === 0 ||
                conditions.includes(product.dataset.condition);

            return (
                searchMatch &&
                typeMatch &&
                sizeMatch &&
                designerMatch &&
                materialMatch &&
                colorMatch &&
                conditionMatch
            );

        });


        // СОРТИРОВКА

        const sort = sortSelect.value;

        if (sort === "price-asc") {
            filtered.sort((a, b) =>
                Number(a.dataset.price) - Number(b.dataset.price)
            );
        }

        if (sort === "price-desc") {
            filtered.sort((a, b) =>
                Number(b.dataset.price) - Number(a.dataset.price)
            );
        }

        if (sort === "name") {
            filtered.sort((a, b) =>
                a.dataset.name.localeCompare(
                    b.dataset.name,
                    "ru"
                )
            );
        }


        // ПАГИНАЦИЯ

        const totalPages = Math.ceil(filtered.length / perPage);

        if (currentPage > totalPages) {
            currentPage = Math.max(1, totalPages);
        }

        const start = (currentPage - 1) * perPage;
        const visibleProducts = filtered.slice(
            start,
            start + perPage
        );

        products.forEach(product => {
            product.style.display = "none";
        });

        visibleProducts.forEach(product => {
            product.style.display = "";
            productsGrid.appendChild(product);
        });


        // КОЛИЧЕСТВО НАЙДЕННЫХ ВЕЩЕЙ

        resultsCount.textContent =
            `Найдено: ${filtered.length} костюмов`;


        // ПУСТОЙ РЕЗУЛЬТАТ

        const oldMessage = productsGrid.querySelector(".empty-results");

        if (oldMessage) {
            oldMessage.remove();
        }

        if (filtered.length === 0) {

            const message = document.createElement("div");

            message.className = "empty-results";
            message.textContent =
                "К сожалению, по вашему запросу ничего не найдено.";

            productsGrid.appendChild(message);

        }


        // КНОПКИ СТРАНИЦ

        pagination.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {

            const button = document.createElement("button");

            button.className =
                "page-btn" + (i === currentPage ? " active" : "");

            button.textContent = i;

            button.addEventListener("click", () => {
                currentPage = i;
                filterProducts();

                document.querySelector(".catalog-content")
                    .scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
            });

            pagination.appendChild(button);
        }

    }


    // ПЕРВЫЙ ЗАПУСК

    filterProducts();


    // ПЕРЕХОД НА СТРАНИЦУ ТОВАРА

    products.forEach(product => {

        product.addEventListener("click", () => {

            const productId = product.dataset.productId;

            if (productId) {
                window.location.href =
                    `product.html?id=${encodeURIComponent(productId)}`;
            }

        });

    });

});
