
document.addEventListener("DOMContentLoaded", () => {
    // Авторизация
    const user = JSON.parse(
        sessionStorage.getItem("garderob_user") || "null"
    );

    if (!user) {
        window.location.replace("../login.html");
        return;
    }

    const employeeName = document.getElementById("employeeName");
    const employeeRole = document.getElementById("employeeRole");

    if (employeeName && user.name) employeeName.textContent = user.name;
    if (employeeRole && user.role) employeeRole.textContent =
        user.role === "admin" ? "Администратор" : "Костюмер";

    // Данные заявки
    const request = {
        number: "3-0391",
        costumeId: "ГК-0112",
        client: "Агентство «Мода»",
        issueDate: "05.11.2026",
        dueDate: "11.11.2026",
        returnDate: "13.11.2026",
        dailyRate: 4000
    };

    const COSTUMES_KEY = "garderob_costumes";
    const RETURNS_KEY = "garderob_returns";

    let costumes = JSON.parse(
        localStorage.getItem(COSTUMES_KEY) || "[]"
    );

    // Демонстрационная запись, если костюм ещё не добавлен
    let costume = costumes.find(
        item => item.id === request.costumeId
    );

    if (!costume) {
        costume = {
            id: request.costumeId,
            name: "Корсетное платье «Барокко»",
            designer: "М. Орлова",
            category: "Арт-костюм",
            size: "42",
            condition: "Отличное",
            status: "В аренде",
            price: 90000,
            material: "Атлас",
            color: "Розовый",
            location: "—",
            photos: [],
            light: "#f3dce0",
            dark: "#e8cbd2"
        };

        costumes.push(costume);
        localStorage.setItem(COSTUMES_KEY, JSON.stringify(costumes));
    }

    const valuation = Number(costume.price) || 90000;
    const deposit = valuation * 0.5;
    const dailyRate = request.dailyRate;

    let delayDays = 2;
    let returnPhotos = [];

    const $ = id => document.getElementById(id);

    const checkboxes = [
        ...document.querySelectorAll(".damage-checkbox")
    ];

    const formatMoney = value =>
        Math.round(value).toLocaleString("ru-RU") + " ₽";

    function toast(message) {
        const element = $("returnToast");

        element.textContent = message;
        element.classList.add("show");

        clearTimeout(toast.timer);

        toast.timer = setTimeout(() => {
            element.classList.remove("show");
        }, 3000);
    }

    // Информация о костюме

    $("costumeName").textContent =
        `${costume.name} · ${costume.id}`;

    $("valuationInfo").textContent =
        `${formatMoney(valuation)} / ${formatMoney(deposit)}`;

    $("costumeImage").style.background =
        `repeating-linear-gradient(
            135deg,
            ${costume.light || "#f0dce2"} 0px,
            ${costume.light || "#f0dce2"} 9px,
            ${costume.dark || "#e7cdd5"} 9px,
            ${costume.dark || "#e7cdd5"} 18px
        )`;

    // Фото при выдаче

    const issuePhoto = $("issuePhoto");

    if (costume.photos && costume.photos.length) {
        issuePhoto.style.backgroundImage =
            `url("${costume.photos[0]}")`;
        issuePhoto.textContent = "";
    }

    // Фото при возврате

    $("returnPhotos").addEventListener("change", async event => {
        const files = [...event.target.files];

        if (files.some(file => !file.type.startsWith("image/"))) {
            toast("Выберите только изображения");
            event.target.value = "";
            return;
        }

        if (files.length > 12) {
            toast("Можно загрузить максимум 12 фотографий");
            event.target.value = "";
            return;
        }

        try {
            returnPhotos = await Promise.all(
                files.map(file => new Promise((resolve, reject) => {
                    const reader = new FileReader();

                    reader.onload = () => resolve(reader.result);
                    reader.onerror = reject;

                    reader.readAsDataURL(file);
                }))
            );

            const preview = $("returnPhotoPreview");

            if (returnPhotos.length) {
                preview.style.backgroundImage =
                    `url("${returnPhotos[0]}")`;

                preview.querySelector("span").textContent =
                    `Загружено фото: ${returnPhotos.length}`;
            }
        } catch {
            toast("Ошибка загрузки фотографий");
        }
    });

    // Расчёт штрафов

    function calculate() {
        const selected = {};

        checkboxes.forEach(input => {
            selected[input.dataset.type] = input.checked;
        });

        const cleaning = selected.cleaning ? 1500 : 0;
        const minor = selected.minor ? valuation * 0.10 : 0;
        const serious = selected.serious ? valuation * 0.40 : 0;
        const lost = selected.lost ? valuation : 0;

        // При утрате остальные повреждения не суммируем
        const damage = selected.lost
            ? valuation
            : cleaning + minor + serious;

        const delay = dailyRate * 1.5 * delayDays;
        const penalty = damage + delay;

        // Возврат не может быть отрицательным
        const refund = Math.max(0, deposit - penalty);

        // Состояние костюма после приёма
        let status = "Свободен";

        if (selected.lost) {
            status = "Утрачен";
        } else if (selected.serious || selected.minor) {
            status = "В ремонте";
        } else if (selected.cleaning) {
            status = "Чистка";
        }

        $("cleaningTotal").textContent = formatMoney(cleaning);
        $("minorTotal").textContent = formatMoney(minor);
        $("delayTotal").textContent = formatMoney(delay);

        $("penaltyTotal").textContent = formatMoney(penalty);
        $("depositTotal").textContent = formatMoney(deposit);
        $("refundTotal").textContent = formatMoney(refund);

        $("newStatus").textContent = status;

        $("minorPrice").textContent = formatMoney(valuation * .10);
        $("seriousPrice").textContent = formatMoney(valuation * .40);
        $("lostPrice").textContent = formatMoney(valuation);

        const delayRow = $("delayTotal").parentElement;
        delayRow.querySelector("span").textContent =
            `Просрочка, ${delayDays} дн.`;

        $("delayDays").textContent =
            `${delayDays} дн.`;

        return {
            cleaning,
            minor,
            serious,
            lost,
            damage,
            delay,
            penalty,
            refund,
            deposit,
            valuation,
            status,
            delayDays
        };
    }

    checkboxes.forEach(input => {
        input.addEventListener("change", () => {
            // Утрата несовместима с остальными повреждениями
            if (input.dataset.type === "lost" && input.checked) {
                checkboxes.forEach(other => {
                    if (other !== input) other.checked = false;
                });
            }

            if (input.dataset.type !== "lost" && input.checked) {
                const lost = checkboxes.find(
                    item => item.dataset.type === "lost"
                );

                if (lost) lost.checked = false;
            }

            calculate();
        });
    });

    // Изменение количества дней просрочки

    $("delayMinus").addEventListener("click", () => {
        delayDays = Math.max(0, delayDays - 1);
        calculate();
    });

    $("delayPlus").addEventListener("click", () => {
        delayDays = Math.min(365, delayDays + 1);
        calculate();
    });

    // Формирование данных акта

    function createAct() {
        const calculation = calculate();

        return {
            id: `АП-${Date.now().toString().slice(-6)}`,
            requestNumber: request.number,
            costumeId: costume.id,
            costumeName: costume.name,
            client: request.client,
            employee: user.name || "Костюмер",
            date: new Date().toLocaleDateString("ru-RU"),
            issueDate: request.issueDate,
            dueDate: request.dueDate,
            returnDate: request.returnDate,
            calculation,
            photos: returnPhotos,
            comment: $("returnComment").value.trim(),
            createdAt: new Date().toISOString()
        };
    }

    // Печать акта

    function printAct(act) {
        const printWindow = window.open("", "_blank");

        if (!printWindow) {
            toast("Разрешите всплывающие окна для печати");
            return;
        }

        const c = act.calculation;

        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="ru">
            <head>
                <meta charset="UTF-8">
                <title>Акт ${act.id}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 35px;
                        color: #17151e;
                    }
                    h1 { font-size: 23px; }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 25px 0;
                    }
                    td, th {
                        padding: 12px;
                        border-bottom: 1px solid #ddd;
                        text-align: left;
                    }
                    .total {
                        font-size: 20px;
                        font-weight: bold;
                    }
                    .photos {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 10px;
                    }
                    .photos img {
                        width: 140px;
                        height: 140px;
                        object-fit: cover;
                    }
                    @media print {
                        body { padding: 10px; }
                    }
                </style>
            </head>
            <body>
                <h1>ГАРДЕРОБ</h1>
                <h2>Акт осмотра и приёма возврата</h2>
                <p>Номер акта: ${act.id}</p>
                <p>Заявка: ${act.requestNumber}</p>
                <p>Костюм: ${act.costumeName} · ${act.costumeId}</p>
                <p>Клиент: ${act.client}</p>
                <p>Сотрудник: ${act.employee}</p>
                <p>Дата возврата: ${act.returnDate}</p>

                <table>
                    <tr><td>Загрязнение</td><td>${formatMoney(c.cleaning)}</td></tr>
                    <tr><td>Мелкий ремонт</td><td>${formatMoney(c.minor)}</td></tr>
                    <tr><td>Серьёзное повреждение</td><td>${formatMoney(c.serious)}</td></tr>
                    <tr><td>Утрата</td><td>${formatMoney(c.lost)}</td></tr>
                    <tr><td>Просрочка</td><td>${formatMoney(c.delay)}</td></tr>
                    <tr><td>Общий штраф</td><td>${formatMoney(c.penalty)}</td></tr>
                    <tr><td>Залог</td><td>${formatMoney(c.deposit)}</td></tr>
                    <tr class="total"><td>К возврату клиенту</td><td>${formatMoney(c.refund)}</td></tr>
                </table>

                <p>Состояние костюма: ${c.status}</p>
                <p>Комментарий: ${escapeHTML(act.comment || "Нет комментария")}</p>

                <h3>Фотографии при возврате</h3>
                <div class="photos">
                    ${act.photos.map(src =>
                        `<img src="${src}" alt="Фото возврата">`
                    ).join("")}
                </div>

                <br><br>
                <p>Подпись сотрудника: ____________________</p>
                <p>Подпись клиента: ______________________</p>

                <script>
                    window.onload = () => window.print();
                <\/script>
            </body>
            </html>
        `);

        printWindow.document.close();
    }

    // Принятие возврата

    function acceptReturn() {
        const act = createAct();

        const hasDamage = checkboxes.some(input =>
            input.checked
        );

        if (hasDamage && returnPhotos.length === 0) {
            if (!confirm(
                "Фотографии повреждений не загружены. Принять возврат без фотографий?"
            )) {
                return;
            }
        }

        // Обновляем костюм
        const index = costumes.findIndex(
            item => item.id === costume.id
        );

        if (index !== -1) {
            costumes[index].status = act.calculation.status;
            costumes[index].condition =
                act.calculation.status === "В ремонте"
                    ? "Требуется ремонт"
                    : act.calculation.status === "Утрачен"
                        ? "Утрачен"
                        : "Требуется проверка";

            costumes[index].location =
                act.calculation.status === "В ремонте"
                    ? "Зона ремонта"
                    : act.calculation.status === "Чистка"
                        ? "Зона чистки"
                        : costumes[index].location;

            costumes[index].returnPhotos = returnPhotos;
            costumes[index].lastReturnAct = act.id;

            localStorage.setItem(
                COSTUMES_KEY,
                JSON.stringify(costumes)
            );
        }

        // Сохраняем акт
        let acts = [];

        try {
            acts = JSON.parse(
                localStorage.getItem(RETURNS_KEY) || "[]"
            );
        } catch {
            acts = [];
        }

        acts.push(act);

        localStorage.setItem(
            RETURNS_KEY,
            JSON.stringify(acts)
        );

        toast(`Возврат принят. Акт ${act.id} сформирован`);

        printAct(act);
    }

    $("acceptReturn").addEventListener("click", acceptReturn);

    $("printReturnAct").addEventListener("click", () => {
        printAct(createAct());
    });

    // Безопасное отображение текста в акте
    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);
    }

    // Первоначальный расчёт
    calculate();
});
ы