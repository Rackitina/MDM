(function () {
    let employees = [
        {
            id: 1,
            name: "Сергей Волков",
            login: "admin",
            role: "Администратор",
            lastLogin: "13.11, 09:02",
            status: "Активен",
            password: ""
        },
        {
            id: 2,
            name: "Ольга Петрова",
            login: "sklad",
            role: "Кладовщик",
            lastLogin: "13.11, 11:40",
            status: "Активен",
            password: ""
        },
        {
            id: 3,
            name: "Наталья Кузнецова",
            login: "kostum",
            role: "Костюмер",
            lastLogin: "13.11, 10:12",
            status: "Активен",
            password: ""
        },
        {
            id: 4,
            name: "Игорь Зайцев",
            login: "sklad2",
            role: "Кладовщик",
            lastLogin: "02.11, 17:55",
            status: "Отпуск",
            password: ""
        }
    ];

    let editingId = null;

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        })[char]);
    }

    function renderEmployees() {
        const tbody = document.getElementById("employeesTable");

        if (!tbody) return;

        tbody.innerHTML = employees.map(employee => `
            <tr>
                <td>${escapeHTML(employee.name)}</td>
                <td>${escapeHTML(employee.login)}</td>
                <td>
                    <span class="role-badge">
                        ${escapeHTML(employee.role)}
                    </span>
                </td>
                <td>${escapeHTML(employee.lastLogin || "Нет данных")}</td>
                <td>
                    <span class="employee-status ${
                        employee.status === "Активен" ? "" : "inactive"
                    }">
                        ${escapeHTML(employee.status)}
                    </span>
                </td>
                <td>
                    <button class="employee-edit-btn"
                            data-edit-id="${employee.id}">
                        Изменить
                    </button>
                </td>
            </tr>
        `).join("");
    }

    function openModal(employee = null) {
        const modal = document.getElementById("employeeModal");
        const form = document.getElementById("employeeForm");

        if (!modal || !form) return;

        form.reset();

        editingId = employee ? employee.id : null;

        document.getElementById("employeeModalTitle").textContent =
            employee ? "Изменить сотрудника" : "Добавить сотрудника";

        document.getElementById("employeeName").value =
            employee?.name || "";

        document.getElementById("employeeLogin").value =
            employee?.login || "";

        document.getElementById("employeeRole").value =
            employee?.role || "Кладовщик";

        document.getElementById("employeeStatus").value =
            employee?.status || "Активен";

        document.getElementById("employeePassword").value = "";

        document.getElementById("employeePassword").required = !employee;

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
    }

    function closeModal() {
        const modal = document.getElementById("employeeModal");

        if (!modal) return;

        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");

        editingId = null;
    }

    function saveEmployee(event) {
        event.preventDefault();

        const name = document.getElementById("employeeName").value.trim();
        const login = document.getElementById("employeeLogin").value.trim();
        const password = document.getElementById("employeePassword").value;
        const role = document.getElementById("employeeRole").value;
        const status = document.getElementById("employeeStatus").value;

        if (!name || !login) {
            alert("Заполните имя и логин.");
            return;
        }

        if (!editingId && password.length < 8) {
            alert("Пароль должен содержать минимум 8 символов.");
            return;
        }

        const duplicate = employees.find(employee =>
            employee.login.toLowerCase() === login.toLowerCase() &&
            employee.id !== editingId
        );

        if (duplicate) {
            alert("Такой логин уже существует.");
            return;
        }

        if (editingId) {
            const employee = employees.find(item => item.id === editingId);

            if (!employee) return;

            employee.name = name;
            employee.login = login;
            employee.role = role;
            employee.status = status;

            if (password) {
                employee.password = password;
            }
        } else {
            employees.push({
                id: Date.now(),
                name,
                login,
                role,
                status,
                lastLogin: "Ещё не входил",
                password
            });
        }

        renderEmployees();
        closeModal();
    }

    window.initUsers = function () {
        const page = document.getElementById("usersPage");

        if (!page || page.dataset.initialized === "true") return;

        page.dataset.initialized = "true";

        renderEmployees();

        document.getElementById("addEmployeeBtn")
            ?.addEventListener("click", () => openModal());

        document.getElementById("closeEmployeeModal")
            ?.addEventListener("click", closeModal);

        document.getElementById("cancelEmployeeModal")
            ?.addEventListener("click", closeModal);

        document.getElementById("employeeForm")
            ?.addEventListener("submit", saveEmployee);

        document.getElementById("employeesTable")
            ?.addEventListener("click", event => {
                const button = event.target.closest("[data-edit-id]");

                if (!button) return;

                const id = Number(button.dataset.editId);
                const employee = employees.find(item => item.id === id);

                if (employee) openModal(employee);
            });

        document.getElementById("employeeModal")
            ?.addEventListener("click", event => {
                if (event.target.id === "employeeModal") {
                    closeModal();
                }
            });
    };
})();