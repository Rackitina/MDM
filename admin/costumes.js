
document.addEventListener("DOMContentLoaded", () => {
    const STORAGE_KEY = "garderob_costumes";

    const demoCostumes = [
        {
            id: "ГК-0124",
            name: "Платье «Сумерки»",
            designer: "А. Лебедева",
            category: "Вечерний",
            size: "44",
            condition: "Отличное",
            location: "Хр.1 · В-4",
            status: "Забронирован",
            price: 40000,
            material: "Шёлк 100%",
            color: "Лиловый",
            photos: [],
            light: "#e6def8",
            dark: "#d2c7ed"
        },
        {
            id: "ГК-0098",
            name: "Костюм-тройка «Модерн»",
            designer: "И. Ким",
            category: "Сценический",
            size: "48",
            condition: "Хорошее",
            location: "—",
            status: "В аренде",
            price: 55000,
            material: "Шерсть",
            color: "Серый",
            photos: [],
            light: "#e0e3e8",
            dark: "#ccd0d7"
        },
        {
            id: "ГК-0112",
            name: "Корсетное платье «Барокко»",
            designer: "М. Орлова",
            category: "Арт-костюм",
            size: "42",
            condition: "Отличное",
            location: "—",
            status: "В аренде",
            price: 90000,
            material: "Атлас",
            color: "Розовый",
            photos: [],
            light: "#f3dce0",
            dark: "#e8cbd2"
        },
        {
            id: "ГК-0077",
            name: "Жакет «Конструктив»",
            designer: "Д. Соколова",
            category: "Повседневный",
            size: "46",
            condition: "Хорошее",
            location: "Хр.1 · С-1",
            status: "Свободен",
            price: 18000,
            material: "Лён",
            color: "Бежевый",
            photos: [],
            light: "#eee3d5",
            dark: "#e0d1bf"
        },
        {
            id: "ГК-0140",
            name: "Пальто «Нуар»",
            designer: "И. Ким",
            category: "Вечерний",
            size: "50",
            condition: "Хорошее",
            location: "Зона чистки",
            status: "Чистка",
            price: 48000,
            material: "Шерсть",
            color: "Серый",
            photos: [],
            light: "#e4e1e8",
            dark: "#d1cdd8"
        },
        {
            id: "ГК-0151",
            name: "Комбинезон «Металл»",
            designer: "Е. Миронова",
            category: "Арт-костюм",
            size: "44",
            condition: "Отличное",
            location: "Хр.2 · А-2",
            status: "Свободен",
            price: 70000,
            material: "Металлизированная ткань",
            color: "Оливковый",
            photos: [],
            light: "#e3e8dc",
            dark: "#d0d9c9"
        },
        {
            id: "ГК-0160",
            name: "Платье-кимоно «Сад»",
            designer: "М. Орлова",
            category: "Сценический",
            size: "OS",
            condition: "Отличное",
            location: "—",
            status: "В аренде",
            price: 60000,
            material: "Шёлк",
            color: "Мятный",
            photos: [],
            light: "#dcece7",
            dark: "#c7ded7"
        },
        {
            id: "ГК-0214",
            name: "Жилет «Вечер»",
            designer: "А. Лебедева",
            category: "Повседневный",
            size: "46",
            condition: "Отличное",
            location: "Хр.1 · В-5",
            status: "Свободен",
            price: 15000,
            material: "Бархат",
            color: "Лиловый",
            photos: [],
            light: "#e5e0ec",
            dark: "#d3cdda"
        }
    ];

    let costumes;

    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        costumes = Array.isArray(saved) ? saved : demoCostumes;
    } catch {
        costumes = demoCostumes;
    }

    let currentPage = 1;
    const pageSize = 8;
    let selectedPhotos = [];
    let editingId = null;

    const tbody = document.getElementById("costumesTableBody");
    const search = document.getElementById("costumeSearch");

    const filters = [
        "statusFilter",
        "categoryFilter",
        "designerFilter",
        "locationFilter"
    ].map(id => document.getElementById(id));

    const toast = document.getElementById("adminToast");

    function save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(costumes));
    }

    function notify(message) {
        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(notify.timer);

        notify.timer = setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    function money(value) {
        return Number(value).toLocaleString("ru-RU") + " ₽";
    }

    function nextInventoryNumber() {
        const numbers = costumes.map(item =>
            Number(item.id.split("-")[1])
        );

        const next = Math.max(0, ...numbers) + 1;

        return "ГК-" + String(next).padStart(4, "0");
    }

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);
    }

    function getFilteredCostumes() {
        const query = search.value.trim().toLowerCase();

        return costumes.filter(item => {

            const matchesSearch =
                !query ||
                [
                    item.id,
                    item.name,
                    item.designer,
                    item.category
                ].some(value =>
                    String(value).toLowerCase().includes(query)
                );

            const matchesFilters = [
                item.status === filters[0].value || !filters[0].value,
                item.category === filters[1].value || !filters[1].value,
                item.designer === filters[2].value || !filters[2].value,
                item.location === filters[3].value || !filters[3].value
            ].every(Boolean);

            return matchesSearch && matchesFilters;
        });
    }

    function render() {
        const filtered = getFilteredCostumes();

        const totalPages = Math.max(
            1,
            Math.ceil(filtered.length / pageSize)
        );

        currentPage = Math.min(currentPage, totalPages);

        const start = (currentPage - 1) * pageSize;

        const visible = filtered.slice(start, start + pageSize);

        tbody.innerHTML = visible.map(item => {

            const statusClass = {
                "Свободен": "free",
                "Забронирован": "booked",
                "В аренде": "rented",
                "Чистка": "cleaning"
            }[item.status] || "";

            const photo = item.photos?.length
                ? `<img class="costume-photo" src="${escapeHTML(item.photos[0])}" alt="">`
                : `<div class="costume-photo" style="--photo-light:${escapeHTML(item.light || "#e6e0f5")};--photo-dark:${escapeHTML(item.dark || "#d2c9e9")}"></div>`;

            return `
                <tr data-id="${escapeHTML(item.id)}">
                    <td>${photo}</td>
                    <td class="inventory-number">${escapeHTML(item.id)}</td>
                    <td>
                        <span class="costume-title">${escapeHTML(item.name)}</span>
                        <span class="costume-subtitle">${escapeHTML(item.category)}</span>
                    </td>
                    <td>${escapeHTML(item.designer)}</td>
                    <td>${escapeHTML(item.size)}</td>
                    <td>${escapeHTML(item.condition)}</td>
                    <td>${escapeHTML(item.location)}</td>
                    <td>
                        <span class="costume-status ${statusClass}">
                            ${escapeHTML(item.status)}
                        </span>
                    </td>
                    <td>${money(item.price)}</td>
                    <td>
                        <button class="edit-costume"
                            data-edit="${escapeHTML(item.id)}"
                            title="Редактировать">✎</button>
                    </td>
                </tr>
            `;
        }).join("");

        document.getElementById("resultsCount").textContent =
            `Показано ${visible.length} из ${filtered.length}`;

        document.getElementById("pageInfo").textContent =
            `Стр. ${currentPage} из ${totalPages}`;

        document.getElementById("prevPage").disabled =
            currentPage === 1;

        document.getElementById("nextPage").disabled =
            currentPage === totalPages;

        document.getElementById("nextInventoryNumber").textContent =
            `Инв. номер будет присвоен автоматически: ${nextInventoryNumber()}`;
    }


    // ФИЛЬТРАЦИЯ

    search.addEventListener("input", () => {
        currentPage = 1;
        render();
    });

    filters.forEach(filter => {
        filter.addEventListener("change", () => {
            currentPage = 1;
            render();
        });
    });

    document.getElementById("prevPage").onclick = () => {
        currentPage--;
        render();
    };

    document.getElementById("nextPage").onclick = () => {
        currentPage++;
        render();
    };


    // ПЕРЕХОД К ФОРМЕ

    const formSection = document.getElementById("newCostumeSection");

    document.getElementById("newCostumeButton").onclick = () => {
        editingId = null;
        resetForm();

        formSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        document.getElementById("costumeName").focus();
    };


    // ФОТОГРАФИИ

    const fileInput = document.getElementById("costumePhotos");
    const photoLabel = document.getElementById("photoUploadText");
    const preview = document.getElementById("photoPreview");

    photoLabel.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", async () => {
        const files = [...fileInput.files];

        if (files.some(file => !file.type.startsWith("image/"))) {
            notify("Можно загружать только изображения");
            fileInput.value = "";
            return;
        }

        if (files.length > 12) {
            notify("Максимум 12 фотографий");
            fileInput.value = "";
            return;
        }

        try {
            selectedPhotos = await Promise.all(
                files.map(file => new Promise((resolve, reject) => {
                    const reader = new FileReader();

                    reader.onload = () => resolve(reader.result);
                    reader.onerror = reject;

                    reader.readAsDataURL(file);
                }))
            );

            preview.innerHTML = selectedPhotos.map(src =>
                `<img src="${src}" alt="Предпросмотр">`
            ).join("");

            photoLabel.textContent =
                `Выбрано фотографий: ${selectedPhotos.length}`;

        } catch {
            notify("Не удалось прочитать фотографии");
        }
    });


    // ЗАПОЛНЕНИЕ ФОРМЫ

    function resetForm() {
        document.getElementById("costumeForm").reset();

        selectedPhotos = [];
        preview.innerHTML = "";

        photoLabel.textContent =
            "Перетащите фотографии сюда или нажмите для выбора";

        editingId = null;
    }

    function editCostume(id) {
        const item = costumes.find(costume => costume.id === id);

        if (!item) return;

        editingId = id;

        document.getElementById("costumeName").value = item.name;
        document.getElementById("costumeDesigner").value = item.designer;
        document.getElementById("costumeCategory").value = item.category;
        document.getElementById("costumeSize").value = item.size;
        document.getElementById("costumeMaterial").value = item.material;
        document.getElementById("costumeColor").value = item.color;
        document.getElementById("costumePrice").value = item.price;
        document.getElementById("costumeLocation").value = item.location;
        document.getElementById("costumeCondition").value = item.condition;

        selectedPhotos = item.photos || [];

        preview.innerHTML = selectedPhotos.map(src =>
            `<img src="${src}" alt="Предпросмотр">`
        ).join("");

        photoLabel.textContent = selectedPhotos.length
            ? `Сохранено фотографий: ${selectedPhotos.length}`
            : "Выберите фотографии";

        document.getElementById("nextInventoryNumber").textContent =
            `Редактирование костюма: ${id}`;

        formSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    tbody.addEventListener("click", event => {
        const button = event.target.closest("[data-edit]");

        if (button) editCostume(button.dataset.edit);
    });


    // СОХРАНЕНИЕ КОСТЮМА

    document.getElementById("costumeForm").addEventListener(
        "submit",
        event => {
            event.preventDefault();

            if (selectedPhotos.length < 3) {
                notify("Добавьте минимум 3 фотографии костюма");
                return;
            }

            const existing = costumes.find(item =>
                item.id === editingId
            );

            const item = {
                id: editingId || nextInventoryNumber(),

                name: document.getElementById("costumeName").value.trim(),
                designer: document.getElementById("costumeDesigner").value,
                category: document.getElementById("costumeCategory").value,
                size: document.getElementById("costumeSize").value.trim(),
                material: document.getElementById("costumeMaterial").value.trim(),
                color: document.getElementById("costumeColor").value.trim(),
                price: Number(document.getElementById("costumePrice").value),
                location: document.getElementById("costumeLocation").value,
                condition: document.getElementById("costumeCondition").value,

                photos: selectedPhotos,

                status: existing?.status || "Свободен",

                light: existing?.light || "#e6def8",
                dark: existing?.dark || "#d2c7ed"
            };

            if (existing) {
                costumes = costumes.map(old =>
                    old.id === editingId ? item : old
                );
            } else {
                costumes.unshift(item);
            }

            save();
            resetForm();
            currentPage = 1;
            render();

            notify(existing
                ? "Данные костюма обновлены"
                : `Костюм ${item.id} добавлен`
            );
        }
    );


    // ОТМЕНА

    document.getElementById("cancelCostume").onclick = () => {
        resetForm();
        notify("Изменения отменены");
    };


    // ЭКСПОРТ CSV ДЛЯ EXCEL

    document.getElementById("exportExcel").onclick = () => {
        const headers = [
            "Инвентарный номер",
            "Название",
            "Дизайнер",
            "Категория",
            "Размер",
            "Состояние",
            "Место хранения",
            "Статус",
            "Оценочная стоимость"
        ];

        const rows = costumes.map(item => [
            item.id,
            item.name,
            item.designer,
            item.category,
            item.size,
            item.condition,
            item.location,
            item.status,
            item.price
        ]);

        const csv = "\uFEFF" + [headers, ...rows]
            .map(row => row.map(value =>
                `"${String(value ?? "").replace(/"/g, '""')}"`
            ).join(";"))
            .join("\r\n");

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;"
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "uchet-kostyumov.csv";
        link.click();

        URL.revokeObjectURL(url);

        notify("Таблица подготовлена для Excel");
    };


    // ПЕЧАТЬ ЭТИКЕТКИ

    function printLabel(item) {
        const printWindow = window.open("", "_blank");

        if (!printWindow) {
            notify("Разрешите открытие всплывающих окон для печати");
            return;
        }

        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="ru">
            <head>
                <meta charset="UTF-8">
                <title>Этикетка ${escapeHTML(item.id)}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        text-align: center;
                        padding: 30px;
                    }
                    .label {
                        border: 1px solid #222;
                        width: 280px;
                        padding: 20px;
                        margin: auto;
                    }
                    h2 { font-size: 19px; }
                    .number { font-size: 23px; font-weight: bold; }
                    svg { width: 240px; height: 75px; }
                </style>
            </head>
            <body>
                <div class="label">
                    <h2>ГАРДЕРОБ</h2>
                    <p>${escapeHTML(item.name)}</p>
                    <p class="number">${escapeHTML(item.id)}</p>
                    <svg id="barcode"></svg>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js"><\/script>
                <script>
                    window.onload = function() {
                        if (window.JsBarcode) {
                            JsBarcode("#barcode",
                                "${escapeHTML(item.id)}",
                                { format: "CODE128", displayValue: true }
                            );
                        }
                        window.print();
                    };
                <\/script>
            </body>
            </html>
        `);

        printWindow.document.close();
    }

    document.getElementById("acceptanceAct").onclick = () => {
        if (editingId) {
            const item = costumes.find(item => item.id === editingId);
            if (item) printLabel(item);
            return;
        }

        notify("Сначала сохраните костюм, чтобы напечатать этикетку");
    };


    // ВЫХОД

    document.getElementById("logoutButton").onclick = () => {
        sessionStorage.removeItem("garderob_user");
        window.location.replace("../login.html");
    };


    // ПЕРВИЧНЫЙ ЗАПУСК

    if (!localStorage.getItem(STORAGE_KEY)) {
        save();
    }

    render();
});
