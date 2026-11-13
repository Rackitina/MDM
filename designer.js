
/* =====================================
   ДАННЫЕ ДИЗАЙНЕРОВ
===================================== */

const designersData = {

    anna: {
        name: "Анна Лебедева",
        year: 2026,
        count: 12,
        collections: 2,
        rentals: 31,

        description:
            "Выпускница направления «Дизайн костюма». Работает с натуральным шёлком и драпировкой, вдохновляется вечерней модой 1930-х. Коллекция «Вечер» показана на неделе моды выпускников 2026 года.",

        color: "beige",
        photo: "",

        collectionList: [
            {
                id: "evening",
                name: "Коллекция «Вечер», 2026",
                products: [
                    {
                        id: "sumerki",
                        name: "Платье «Сумерки»",
                        size: "44",
                        price: 2500,
                        color: "lavender"
                    },
                    {
                        id: "60e",
                        name: "Платье-трапеция «60-е»",
                        size: "42",
                        price: 2500,
                        color: "beige"
                    },
                    {
                        id: "vecher",
                        name: "Жилет «Вечер»",
                        size: "46",
                        price: 1500,
                        color: "gray"
                    },
                    {
                        id: "ten",
                        name: "Платье с драпировкой «Тень»",
                        size: "44",
                        price: 2500,
                        color: "pink"
                    }
                ]
            },

            {
                id: "diploma",
                name: "Дипломная коллекция, 2025",
                products: [
                    {
                        id: "diploma-1",
                        name: "Платье «Линия»",
                        size: "42",
                        price: 2000,
                        color: "mint"
                    },
                    {
                        id: "diploma-2",
                        name: "Костюм «Графика»",
                        size: "46",
                        price: 3000,
                        color: "gray"
                    },
                    {
                        id: "diploma-3",
                        name: "Платье «Контур»",
                        size: "44",
                        price: 2500,
                        color: "lavender"
                    },
                    {
                        id: "diploma-4",
                        name: "Жакет «Форма»",
                        size: "42",
                        price: 1800,
                        color: "beige"
                    }
                ]
            }
        ]
    },


    ilya: {
        name: "Илья Ким",
        year: 2026,
        count: 8,
        collections: 2,
        rentals: 24,

        description:
            "Молодой дизайнер, работающий на стыке современной классики и сценического костюма. В своих коллекциях сочетает архитектурный крой, лаконичные формы и выразительные детали.",

        color: "gray",
        photo: "",

        collectionList: [
            {
                id: "modern",
                name: "Коллекция «Модерн», 2026",
                products: [
                    {
                        id: "modern-1",
                        name: "Костюм-тройка «Модерн»",
                        size: "46",
                        price: 3000,
                        color: "gray"
                    },
                    {
                        id: "modern-2",
                        name: "Жакет «Архитектура»",
                        size: "48",
                        price: 2500,
                        color: "lavender"
                    },
                    {
                        id: "modern-3",
                        name: "Брюки «Геометрия»",
                        size: "46",
                        price: 1500,
                        color: "beige"
                    },
                    {
                        id: "modern-4",
                        name: "Костюм «Баланс»",
                        size: "44",
                        price: 3500,
                        color: "mint"
                    }
                ]
            },
            {
                id: "stage",
                name: "Сценическая коллекция, 2025",
                products: [
                    {
                        id: "stage-1",
                        name: "Костюм «Сцена»",
                        size: "48",
                        price: 3500,
                        color: "pink"
                    },
                    {
                        id: "stage-2",
                        name: "Жилет «Ритм»",
                        size: "46",
                        price: 1500,
                        color: "gray"
                    },
                    {
                        id: "stage-3",
                        name: "Жакет «Акцент»",
                        size: "44",
                        price: 2200,
                        color: "lavender"
                    },
                    {
                        id: "stage-4",
                        name: "Брюки «Движение»",
                        size: "46",
                        price: 1800,
                        color: "beige"
                    }
                ]
            }
        ]
    },


    maria: {
        name: "Мария Орлова",
        year: 2026,
        count: 10,
        collections: 2,
        rentals: 28,

        description:
            "Дизайнер авторской одежды, исследующая эстетику исторических костюмов и современные силуэты. В коллекциях использует выразительные фактуры, деликатную отделку и необычные пропорции.",

        color: "pink",
        photo: "",

        collectionList: [
            {
                id: "barokko",
                name: "Коллекция «Барокко», 2026",
                products: [
                    {
                        id: "barokko-1",
                        name: "Корсетное платье «Барокко»",
                        size: "42",
                        price: 4000,
                        color: "pink"
                    },
                    {
                        id: "barokko-2",
                        name: "Платье «Сад»",
                        size: "44",
                        price: 3000,
                        color: "mint"
                    },
                    {
                        id: "barokko-3",
                        name: "Корсет «Ренессанс»",
                        size: "42",
                        price: 2500,
                        color: "beige"
                    },
                    {
                        id: "barokko-4",
                        name: "Платье «Орнамент»",
                        size: "46",
                        price: 3500,
                        color: "lavender"
                    }
                ]
            },
            {
                id: "romantic",
                name: "Романтическая коллекция, 2025",
                products: [
                    {
                        id: "romantic-1",
                        name: "Платье «Роза»",
                        size: "44",
                        price: 2800,
                        color: "pink"
                    },
                    {
                        id: "romantic-2",
                        name: "Блуза «Лепесток»",
                        size: "42",
                        price: 1500,
                        color: "beige"
                    },
                    {
                        id: "romantic-3",
                        name: "Юбка «Флора»",
                        size: "44",
                        price: 1800,
                        color: "mint"
                    },
                    {
                        id: "romantic-4",
                        name: "Платье «Вдохновение»",
                        size: "46",
                        price: 3200,
                        color: "gray"
                    }
                ]
            }
        ]
    },


    darya: {
        name: "Дарья Соколова",
        year: 2026,
        count: 9,
        collections: 2,
        rentals: 19,

        description:
            "Создаёт функциональные образы, в которых сочетаются комфорт, выразительный силуэт и минимализм. Особое внимание уделяет материалам, посадке и универсальности вещей.",

        color: "beige",
        photo: "",

        collectionList: [
            {
                id: "constructive",
                name: "Коллекция «Конструктив», 2026",
                products: [
                    {
                        id: "constructive-1",
                        name: "Жакет «Конструктив»",
                        size: "46",
                        price: 1500,
                        color: "beige"
                    },
                    {
                        id: "constructive-2",
                        name: "Платье-рубашка «Студия»",
                        size: "42",
                        price: 1500,
                        color: "beige"
                    },
                    {
                        id: "constructive-3",
                        name: "Костюм «Система»",
                        size: "44",
                        price: 3000,
                        color: "gray"
                    },
                    {
                        id: "constructive-4",
                        name: "Жилет «Модуль»",
                        size: "46",
                        price: 1800,
                        color: "mint"
                    }
                ]
            },
            {
                id: "basic",
                name: "Базовая коллекция, 2025",
                products: [
                    {
                        id: "basic-1",
                        name: "Платье «Основа»",
                        size: "44",
                        price: 1800,
                        color: "lavender"
                    },
                    {
                        id: "basic-2",
                        name: "Жакет «Лаконика»",
                        size: "46",
                        price: 2000,
                        color: "gray"
                    },
                    {
                        id: "basic-3",
                        name: "Брюки «Линия»",
                        size: "42",
                        price: 1200,
                        color: "beige"
                    },
                    {
                        id: "basic-4",
                        name: "Рубашка «Форма»",
                        size: "44",
                        price: 1000,
                        color: "pink"
                    }
                ]
            }
        ]
    },


    eva: {
        name: "Ева Миронова",
        year: 2026,
        count: 9,
        collections: 2,
        rentals: 17,

        description:
            "Дизайнер экспериментальной одежды. Исследует взаимодействие формы, фактуры и движения, создавая необычные образы для съёмок, показов и творческих проектов.",

        color: "mint",
        photo: "",

        collectionList: [
            {
                id: "metal",
                name: "Коллекция «Металл», 2026",
                products: [
                    {
                        id: "metal-1",
                        name: "Комбинезон «Металл»",
                        size: "44",
                        price: 4000,
                        color: "mint"
                    },
                    {
                        id: "metal-2",
                        name: "Платье «Импульс»",
                        size: "42",
                        price: 2800,
                        color: "gray"
                    },
                    {
                        id: "metal-3",
                        name: "Жилет «Хром»",
                        size: "46",
                        price: 2000,
                        color: "lavender"
                    },
                    {
                        id: "metal-4",
                        name: "Костюм «Энергия»",
                        size: "44",
                        price: 3500,
                        color: "beige"
                    }
                ]
            },
            {
                id: "experimental",
                name: "Экспериментальная коллекция, 2025",
                products: [
                    {
                        id: "experimental-1",
                        name: "Платье «Волна»",
                        size: "44",
                        price: 2500,
                        color: "mint"
                    },
                    {
                        id: "experimental-2",
                        name: "Костюм «Объект»",
                        size: "46",
                        price: 3500,
                        color: "gray"
                    },
                    {
                        id: "experimental-3",
                        name: "Жакет «Трансформер»",
                        size: "42",
                        price: 2200,
                        color: "pink"
                    },
                    {
                        id: "experimental-4",
                        name: "Платье «Пластика»",
                        size: "44",
                        price: 3000,
                        color: "lavender"
                    }
                ]
            }
        ]
    }

};


/* =====================================
   ЗАГРУЗКА ПРОФИЛЯ
===================================== */

const params = new URLSearchParams(window.location.search);
const designerId = params.get("id") || "anna";

const designer = designersData[designerId];

if (!designer) {
    window.location.replace("designers.html");
}


/* =====================================
   ЗАПОЛНЕНИЕ ИНФОРМАЦИИ
===================================== */

if (designer) {

    document.title = `${designer.name} — Гардероб`;

    document.getElementById("breadcrumbName").textContent =
        designer.name;

    document.getElementById("designerName").textContent =
        designer.name;

    document.getElementById("designerYear").textContent =
        `Дизайнер-партнёр с ${designer.year} года`;

    document.getElementById("designerDescription").textContent =
        designer.description;

    document.getElementById("costumeCount").textContent =
        designer.count;

    document.getElementById("collectionCount").textContent =
        designer.collections;

    document.getElementById("rentalCount").textContent =
        designer.rentals;

    const avatar = document.getElementById("designerAvatar");

    avatar.style.backgroundColor = getColor(designer.color);

    if (designer.photo) {
        avatar.innerHTML = "";

        const image = document.createElement("img");
        image.src = designer.photo;
        image.alt = designer.name;

        avatar.appendChild(image);
    }

    document.getElementById("portfolioLink").href =
        designer.portfolio || "#";

    document.getElementById("socialLink").href =
        designer.social || "#";


    /* =====================================
       КОЛЛЕКЦИИ
    ===================================== */

    const tabs = document.getElementById("collectionTabs");

    const productsContainer =
        document.getElementById("designerProducts");

    function renderCollection(index) {

        const collection = designer.collectionList[index];

        tabs.querySelectorAll("button").forEach((button, i) => {
            button.classList.toggle("active", i === index);
        });

        productsContainer.innerHTML = "";

        collection.products.forEach(product => {

            const card = document.createElement("a");

            card.className = "designer-product-card";
            card.href = `product.html?id=${product.id}`;

            const photo = document.createElement("div");

            photo.className =
                `designer-product-photo ${product.color} placeholder`;

            const name = document.createElement("h3");
            name.textContent = product.name;

            const details = document.createElement("p");
            details.textContent = `р. ${product.size}`;

            const price = document.createElement("strong");
            price.textContent =
                `${product.price.toLocaleString("ru-RU")} ₽ / сутки`;

            card.append(photo, name, details, price);

            productsContainer.appendChild(card);
        });
    }

    designer.collectionList.forEach((collection, index) => {

        const button = document.createElement("button");

        button.className =
            `collection-tab ${index === 0 ? "active" : ""}`;

        button.textContent = collection.name;

        button.addEventListener("click", () => {
            renderCollection(index);
        });

        tabs.appendChild(button);
    });

    renderCollection(0);
}


/* =====================================
   ЦВЕТА
===================================== */

function getColor(color) {

    const colors = {
        lavender: "#d9d2f3",
        beige: "#f0dfc8",
        gray: "#d9dde3",
        pink: "#efd3d8",
        mint: "#d0e2dc"
    };

    return colors[color] || "#d9d2f3";
}
