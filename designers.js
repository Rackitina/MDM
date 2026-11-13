
const designers = [
    {
        id: "anna",
        name: "Анна Лебедева",
        count: 12,
        color: "lavender",
        photo: ""
    },
    {
        id: "ilya",
        name: "Илья Ким",
        count: 8,
        color: "gray",
        photo: ""
    },
    {
        id: "maria",
        name: "Мария Орлова",
        count: 10,
        color: "pink",
        photo: ""
    },
    {
        id: "darya",
        name: "Дарья Соколова",
        count: 9,
        color: "beige",
        photo: ""
    },
    {
        id: "eva",
        name: "Ева Миронова",
        count: 9,
        color: "mint",
        photo: ""
    }
];

const designersGrid = document.getElementById("designersGrid");

designers.forEach(designer => {

    const card = document.createElement("a");

    card.className = "designer-card";
    card.href = `designer.html?id=${designer.id}`;

    const photo = document.createElement("div");
    photo.className = `designer-photo ${designer.color}`;

    if (designer.photo) {
        const img = document.createElement("img");
        img.src = designer.photo;
        img.alt = designer.name;
        photo.appendChild(img);
    } else {
        photo.classList.add("placeholder");
    }

    const info = document.createElement("div");
    info.className = "designer-info";

    const name = document.createElement("h3");
    name.textContent = designer.name;

    const count = document.createElement("p");
    count.textContent =
        `${designer.count} ${getCostumeWord(designer.count)} в каталоге`;

    info.append(name, count);
    card.append(photo, info);

    designersGrid.appendChild(card);
});

function getCostumeWord(number) {
    const n = Math.abs(number) % 100;
    const last = n % 10;

    if (n > 10 && n < 20) return "костюмов";
    if (last === 1) return "костюм";
    if (last >= 2 && last <= 4) return "костюма";

    return "костюмов";
}
