
document.addEventListener("DOMContentLoaded", () => {

    // ТЕКУЩАЯ ДАТА

    const dateElement = document.getElementById("currentDate");

    if (dateElement) {
        dateElement.textContent = new Intl.DateTimeFormat("ru-RU", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(new Date());

        dateElement.textContent =
            dateElement.textContent.charAt(0).toUpperCase() +
            dateElement.textContent.slice(1);
    }


    // ПРОВЕРКА АВТОРИЗАЦИИ

    const user = JSON.parse(
        sessionStorage.getItem("garderob_user") || "null"
    );

    if (!user || user.role !== "admin") {
        window.location.replace("../login.html");
        return;
    }


    // УВЕДОМЛЕНИЯ

    const toast = document.getElementById("adminToast");
    let toastTimer;

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }


    // ПЕРЕКЛЮЧЕНИЕ РАЗДЕЛОВ

        // ПЕРЕКЛЮЧЕНИЕ РАЗДЕЛОВ (теперь для ссылок)
    const navigationItems = document.querySelectorAll(".nav-item");

    navigationItems.forEach(item => {
        item.addEventListener("click", (event) => {
            const section = item.dataset.section;
            const href = item.getAttribute("href");

            // Если это ссылка с href="#", отменяем стандартное поведение
            if (href === "#") {
                event.preventDefault();
                
                // Показываем уведомление для разделов в разработке
                const names = {
                    requests: "Заявки",
                    issue: "Выдача и возврат",
                    designers: "Дизайнеры",
                    reports: "Отчёты",
                    users: "Пользователи"
                };

                if (section && names[section]) {
                    showToast(`Раздел «${names[section]}» будет подключён отдельно`);
                }
            }
        });
    });



    // ССЫЛКА НА ВСЕ ЗАЯВКИ

    document.querySelectorAll("[data-section-link]").forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();

            const section = link.dataset.sectionLink;

            const target = document.querySelector(
                `.nav-item[data-section="${section}"]`
            );

            if (target) target.click();
        });
    });


    // ПОДТВЕРЖДЕНИЕ И ВЫДАЧА

    document.querySelectorAll(".action-button").forEach(button => {

        button.addEventListener("click", () => {

            const row = button.closest("tr");

            const requestNumber = row.cells[0].textContent.trim();

            if (button.textContent.trim() === "Подтвердить") {

                button.textContent = "Подтверждено";
                button.disabled = true;

                showToast(
                    `Заявка ${requestNumber} подтверждена`
                );

            } else if (button.textContent.trim() === "Выдать") {

                button.textContent = "Выдано";
                button.disabled = true;

                showToast(
                    `Выдача по заявке ${requestNumber} отмечена`
                );
            }

        });

    });


    // ПРИНЯТЬ КОСТЮМ

    const acceptButton = document.getElementById("acceptCostume");

    acceptButton.addEventListener("click", () => {
        showToast("Форма приёма костюма будет подключена отдельно");
    });


    // ПОИСК ПО ШТРИХ-КОДУ

    const searchInput = document.getElementById("barcodeSearch");

    searchInput.addEventListener("keydown", event => {

        if (event.key !== "Enter") return;

        const value = searchInput.value.trim();

        if (!value) return;

        const rows = document.querySelectorAll(
            ".requests-card tbody tr"
        );

        let found = false;

        rows.forEach(row => {
            row.style.background = "";

            if (
                row.textContent.toLowerCase().includes(value.toLowerCase())
            ) {
                row.style.background = "#efecff";
                row.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                found = true;
            }
        });

        showToast(
            found
                ? "Совпадение найдено в заявках"
                : "Совпадений в текущих заявках нет"
        );

    });


    // ВЫХОД ИЗ АККАУНТА

    document.getElementById("logoutButton").addEventListener(
        "click",
        () => {

            sessionStorage.removeItem("garderob_user");

            window.location.replace("../login.html");

        }
    );

});
