
document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("requestsTable");
    const search = document.getElementById("requestSearch");
    const statusFilter = document.getElementById("requestStatus");
    const periodFilter = document.getElementById("requestPeriod");
    const shown = document.getElementById("requestsShown");
    const total = document.getElementById("totalRequests");

    if (!table) return;

    function filterRequests() {
        const query = search.value.toLowerCase().trim();
        const status = statusFilter.value;
        const period = periodFilter.value;

        let visible = 0;

        [...table.rows].forEach(row => {
            const text = row.innerText.toLowerCase();
            const date = row.cells[3].innerText;

            const matchesSearch = text.includes(query);
            const matchesStatus =
                !status || row.dataset.status === status;
            const matchesPeriod =
                !period || date.includes(period);

            const isVisible =
                matchesSearch && matchesStatus && matchesPeriod;

            row.hidden = !isVisible;

            if (isVisible) visible++;
        });

        shown.textContent =
            `Показано ${visible} из ${table.rows.length} заявок`;
    }

    search.addEventListener("input", filterRequests);
    statusFilter.addEventListener("change", filterRequests);
    periodFilter.addEventListener("change", filterRequests);

    table.addEventListener("click", event => {
        const button = event.target.closest(".request-action");
        if (!button) return;

        const row = button.closest("tr");

        if (button.classList.contains("confirm")) {
            row.dataset.status = "Подтверждена";

            const badge = row.querySelector(".request-status");
            badge.textContent = "Подтверждена";
            badge.className = "request-status confirmed";

            button.textContent = "Выдать";
            button.className = "request-action issue";
        }

        else if (button.classList.contains("issue")) {
            if (!confirm("Подтвердить выдачу костюма клиенту?")) {
                return;
            }

            row.dataset.status = "Выдана";

            const badge = row.querySelector(".request-status");
            badge.textContent = "Выдана";
            badge.className = "request-status issued";

            button.textContent = "Выдано";
            button.disabled = true;
        }

        filterRequests();
    });

    total.textContent = table.rows.length;
    filterRequests();
});
