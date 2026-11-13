
document.addEventListener("DOMContentLoaded", () => {

    const reportContent = document.getElementById("reportContent");

    if (!reportContent) return;

    // =====================================
    // ДАННЫЕ ОТЧЁТОВ
    // =====================================

    const monthlyData = {
        "2026-10": {
            revenue: 412500,
            fines: 18300,
            chart: [120, 185, 240, 210, 330, 412],
            chartLabels: ["Май", "Июнь", "Июль", "Авг", "Сен", "Окт"],
            designers: [
                ["Мария Орлова", 9, 14, 132000, 92400, "—", "На карту", "Выплачено"],
                ["Анна Лебедева", 12, 19, 97500, 68250, "—", "На карту", "Выплачено"],
                ["Илья Ким", 8, 11, 82500, 57750, "2 800 ₽", "Наличными", "К выплате"],
                ["Ева Миронова", 5, 7, 64000, 44800, "—", "На карту", "К выплате"],
                ["Дарья Соколова", 10, 18, 36500, 25550, "1 500 ₽", "Наличными", "Выплачено"]
            ]
        },

        "2026-09": {
            revenue: 330000,
            fines: 12500,
            chart: [120, 185, 240, 210, 330, 412],
            chartLabels: ["Май", "Июнь", "Июль", "Авг", "Сен", "Окт"],
            designers: [
                ["Мария Орлова", 9, 12, 105000, 73500, "—", "На карту", "Выплачено"],
                ["Анна Лебедева", 12, 15, 82000, 57400, "—", "На карту", "Выплачено"],
                ["Илья Ким", 8, 10, 65000, 45500, "2 000 ₽", "Наличными", "К выплате"],
                ["Ева Миронова", 5, 6, 48000, 33600, "—", "На карту", "Выплачено"],
                ["Дарья Соколова", 10, 14, 30000, 21000, "1 000 ₽", "Наличными", "Выплачено"]
            ]
        },

        "2026-08": {
            revenue: 210000,
            fines: 9500,
            chart: [120, 185, 240, 210, 330, 412],
            chartLabels: ["Май", "Июнь", "Июль", "Авг", "Сен", "Окт"],
            designers: [
                ["Мария Орлова", 9, 10, 70000, 49000, "—", "На карту", "Выплачено"],
                ["Анна Лебедева", 12, 12, 55000, 38500, "—", "На карту", "Выплачено"],
                ["Илья Ким", 8, 9, 45000, 31500, "1 500 ₽", "Наличными", "К выплате"],
                ["Ева Миронова", 5, 5, 25000, 17500, "—", "На карту", "Выплачено"],
                ["Дарья Соколова", 10, 8, 15000, 10500, "—", "Наличными", "Выплачено"]
            ]
        }
    };

    const formatMoney = value =>
        new Intl.NumberFormat("ru-RU").format(value) + " ₽";

    // =====================================
    // ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК
    // =====================================

    const tabs = document.querySelectorAll(".report-tab");
    const views = document.querySelectorAll(".report-view");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {

            const target = tab.dataset.tab;

            tabs.forEach(item => item.classList.remove("active"));
            views.forEach(view => view.classList.remove("active"));

            tab.classList.add("active");

            const targetView = document.getElementById(target);

            if (targetView) {
                targetView.classList.add("active");
            }
        });
    });

    // =====================================
    // ОБНОВЛЕНИЕ ФИНАНСОВ
    // =====================================

    const monthSelect = document.getElementById("reportMonth");

    function updateReports() {

        const month = monthSelect.value;
        const data = monthlyData[month];

        if (!data) {
            document.getElementById("totalRevenue").textContent = "Нет данных";
            document.getElementById("designerPayments").textContent = "—";
            document.getElementById("platformIncome").textContent = "—";
            document.getElementById("totalFines").textContent = "—";
            document.getElementById("designerTable").innerHTML =
                '<tr><td colspan="8">За выбранный период нет демонстрационных данных</td></tr>';
            return;
        }

        const designerPayments = Math.round(data.revenue * 0.7);
        const platformIncome = data.revenue - designerPayments;

        document.getElementById("totalRevenue").textContent =
            formatMoney(data.revenue);

        document.getElementById("designerPayments").textContent =
            formatMoney(designerPayments);

        document.getElementById("platformIncome").textContent =
            formatMoney(platformIncome);

        document.getElementById("totalFines").textContent =
            formatMoney(data.fines);

        updateDesignerTable(data.designers);
        updateChart(data);

        const monthName = monthSelect.options[
            monthSelect.selectedIndex
        ].text.split(" ")[0].toLowerCase();

        document.getElementById("paymentsTitle").textContent =
            "Выплаты дизайнерам за " + monthName;
    }

    monthSelect.addEventListener("change", updateReports);

    // =====================================
    // ТАБЛИЦА ДИЗАЙНЕРОВ
    // =====================================

    function updateDesignerTable(designers) {

        const tbody = document.getElementById("designerTable");

        tbody.innerHTML = designers.map(designer => {

            const [
                name,
                costumes,
                rentals,
                revenue,
                payment,
                compensation,
                method,
                status
            ] = designer;

            const statusClass =
                status === "Выплачено" ? "paid" : "pending";

            return `
                <tr>
                    <td>${name}</td>
                    <td>${costumes}</td>
                    <td>${rentals}</td>
                    <td>${formatMoney(revenue)}</td>
                    <td><strong>${formatMoney(payment)}</strong></td>
                    <td>${compensation}</td>
                    <td>${method}</td>
                    <td>
                        <span class="status ${statusClass}">
                            ${status}
                        </span>
                    </td>
                </tr>
            `;
        }).join("");
    }

    // =====================================
    // ДИАГРАММА
    // =====================================

    function updateChart(data) {

        const chart = document.getElementById("revenueChart");
        const max = Math.max(...data.chart, 1);

        chart.innerHTML = data.chart.map((value, index) => {

            const height = (value / max) * 100;
            const isCurrent = index === data.chart.length - 1;

            return `
                <div class="chart-column">
                    <span class="chart-value">${value}</span>

                    <div
                        class="chart-bar ${isCurrent ? "current" : ""}"
                        style="height: ${height}%"
                    ></div>

                    <span class="chart-month">
                        ${data.chartLabels[index]}
                    </span>
                </div>
            `;
        }).join("");
    }

    // =====================================
    // ОСТАЛЬНЫЕ ВИДЫ ОТЧЁТОВ
    // =====================================

    const availability = [
        ["Свободны", 214, "green"],
        ["В аренде", 37, "purple"],
        ["Чистка / ремонт", 9, "orange"],
        ["Списаны", 1, "red"]
    ];

    document.getElementById("availabilityContent").innerHTML =
        availability.map(item => `
            <div class="fund-item">
                <div class="fund-label">
                    <span>${item[0]}</span>
                    <strong>${item[1]}</strong>
                </div>
                <div class="fund-progress">
                    <div class="fund-fill ${item[2]}"
                         style="width:${item[1] / 261 * 100}%">
                    </div>
                </div>
            </div>
        `).join("");

    const issuedItems = [
        ["ГК-0112", "Корсетное платье «Барокко»", "Агентство «Мода+»", "05.11–11.11.2026"],
        ["ГК-0160", "Платье-кимоно «Сад»", "К. Иванов", "08.11–14.11.2026"],
        ["ГК-0140", "Пальто «Нуар»", "Студия «Свет»", "10.11–16.11.2026"]
    ];

    document.getElementById("issuedContent").innerHTML = `
        <div class="table-wrapper">
            <table class="reports-table">
                <thead>
                    <tr>
                        <th>Инв. №</th>
                        <th>Костюм</th>
                        <th>Клиент</th>
                        <th>Период аренды</th>
                    </tr>
                </thead>
                <tbody>
                    ${issuedItems.map(item => `
                        <tr>
                            ${item.map(value => `<td>${value}</td>`).join("")}
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;

    const conditionItems = [
        ["Отличное", 180],
        ["Хорошее", 70],
        ["Требуется чистка", 7],
        ["Требуется ремонт", 3],
        ["Списано", 1]
    ];

    document.getElementById("conditionContent").innerHTML = `
        <div class="table-wrapper">
            <table class="reports-table">
                <thead>
                    <tr>
                        <th>Состояние</th>
                        <th>Количество костюмов</th>
                    </tr>
                </thead>
                <tbody>
                    ${conditionItems.map(item => `
                        <tr>
                            <td>${item[0]}</td>
                            <td>${item[1]}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;

    // =====================================
    // ИСТОРИЯ ПО КОСТЮМУ
    // =====================================

    const costumeHistory = {
        "ГК-0112": [
            ["05.11.2026", "Выдача клиенту", "Агентство «Мода+»"],
            ["13.11.2026", "Возврат", "Состояние: хорошее"],
            ["13.11.2026", "Отправлен на чистку", "Кладовщик"]
        ],
        "ГК-0124": [
            ["15.09.2026", "Выдача", "Студия «Свет»"],
            ["17.09.2026", "Возврат", "Состояние: отличное"],
            ["02.10.2026", "Осмотр", "Состояние: отличное"]
        ]
    };

    const historySearch = document.getElementById("historySearch");

    historySearch.addEventListener("input", () => {

        const number = historySearch.value.trim().toUpperCase();
        const result = document.getElementById("historyContent");

        if (!number) {
            result.innerHTML = "";
            return;
        }

        const history = costumeHistory[number];

        if (!history) {
            result.textContent = "История для этого костюма не найдена.";
            return;
        }

        result.innerHTML = `
            <div class="table-wrapper">
                <table class="reports-table">
                    <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Операция</th>
                            <th>Комментарий</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${history.map(item => `
                            <tr>
                                ${item.map(value => `<td>${value}</td>`).join("")}
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `;
    });

    // =====================================
    // ЭКСПОРТ В EXCEL (CSV)
    // =====================================

    document.getElementById("downloadExcel").addEventListener("click", () => {

        const data = monthlyData[monthSelect.value];

        if (!data) {
            alert("Нет данных для экспорта.");
            return;
        }

        const rows = [
            ["Дизайнер", "Костюмов", "Аренд", "Выручка",
             "К выплате", "Компенсации", "Способ выплаты", "Статус"],
            ...data.designers
        ];

        const csv = "\uFEFF" + rows.map(row =>
            row.map(value =>
                `"${String(value).replace(/"/g, '""')}"`
            ).join(";")
        ).join("\r\n");

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;"
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `Отчёты-${monthSelect.value}.csv`;
        link.click();

        URL.revokeObjectURL(url);
    });

    // =====================================
    // ПЕЧАТЬ / СОХРАНЕНИЕ PDF
    // =====================================

    document.getElementById("downloadPDF").addEventListener("click", () => {

        const activeView = document.querySelector(".report-view.active");

        if (!activeView) return;

        const printWindow = window.open("", "_blank");

        if (!printWindow) {
            alert("Разрешите открытие всплывающих окон для печати.");
            return;
        }

        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="ru">
            <head>
                <meta charset="UTF-8">
                <title>Отчёт ${monthSelect.value}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 30px;
                        color: #17151d;
                    }
                    h2 { margin-bottom: 20px; }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        font-size: 12px;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 10px;
                        text-align: left;
                    }
                    th { background: #f2f0f7; }
                    .finance-cards {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 10px;
                        margin-bottom: 25px;
                    }
                    .finance-card {
                        border: 1px solid #ddd;
                        padding: 15px;
                    }
                    .finance-card strong {
                        display: block;
                        margin-top: 10px;
                    }
                    .analytics-grid {
                        display: grid;
                        grid-template-columns: 2fr 1fr;
                        gap: 15px;
                        margin-bottom: 20px;
                    }
                    .report-panel {
                        border: 1px solid #ddd;
                        padding: 15px;
                        margin-bottom: 15px;
                    }
                    .chart-column {
                        display: inline-flex;
                        flex-direction: column;
                        vertical-align: bottom;
                        margin: 10px;
                    }
                    .chart-bar {
                        width: 25px;
                        background: #4934df;
                    }
                    .chart-container {
                        height: 200px;
                        display: flex;
                        align-items: flex-end;
                        justify-content: space-around;
                    }
                    .fund-progress {
                        height: 8px;
                        background: #eee;
                    }
                    .fund-fill {
                        height: 100%;
                    }
                    @media print {
                        body { padding: 0; }
                    }
                </style>
            </head>
            <body>
                <h1>ГАРДЕРОБ — Отчёты</h1>
                <p>Период: ${monthSelect.options[monthSelect.selectedIndex].text}</p>
                ${activeView.innerHTML}
            </body>
            </html>
        `);

        printWindow.document.close();

        printWindow.onload = () => {
            printWindow.print();
        };
    });

    // Первоначальная загрузка
    updateReports();

});
