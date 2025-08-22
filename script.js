// Globalus meniu valdymas
function toggleMenu() {
    const sideMenu = document.getElementById("sideMenu");
    if (sideMenu.style.width === "280px") {
        sideMenu.style.width = "0";
    } else {
        sideMenu.style.width = "280px";
    }
}

// Funkcija automobiliui pasirinkti ir nukreipti į užsakymo formą
function selectCar(carName) {
    // Patikrinti, ar esame pagrindiniame puslapyje
    if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
        const selectElement = document.getElementById('paslaugos-select');
        if (selectElement) {
            selectElement.value = carName;
            document.getElementById('forma').scrollIntoView({ behavior: 'smooth' });
            toggleMenu(); // Uždaro meniu, jei atidarytas
        }
    } else {
        // Jei esame kitame puslapyje, nukreipti į index.html su pasirinktu automobiliu
        localStorage.setItem('selectedCar', carName);
        window.location.href = 'index.html#forma';
    }
}

// Funkcija nuolaidos tikrinimui
function tikrintiNuolaida() {
    const dataInput = document.getElementById('data');
    const valandosInput = document.getElementById('valandos');
    const nuolaidaInfo = document.getElementById('nuolaida-info');

    if (!dataInput || !valandosInput || !nuolaidaInfo) return; // Apsauga nuo klaidų

    const data = dataInput.value;
    const valandos = parseFloat(valandosInput.value);

    if (data && valandos) {
        const menuo = new Date(data).getMonth() + 1; // Mėnesis nuo 1 iki 12
        if (menuo === 5) { // Gegužės mėnuo
            nuolaidaInfo.textContent = 'Gegužės mėn. taikoma 25% nuolaida!';
            nuolaidaInfo.style.display = 'block';
        } else {
            nuolaidaInfo.textContent = '';
            nuolaidaInfo.style.display = 'none';
        }
    } else {
        nuolaidaInfo.textContent = '';
        nuolaidaInfo.style.display = 'none';
    }
}

// Karuselės valdymas galerijos puslapyje
function scrollCarousel(trackId, direction) {
    const track = document.getElementById(trackId);
    if (!track) return;
    const scrollAmount = track.children[0].offsetWidth + 20; // Paveikslėlio plotis + gap
    track.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

// Funkcija, kuri paleidžiama puslapio įkrovimo metu
document.addEventListener('DOMContentLoaded', () => {
    // Meniu uždarymas, paspaudus bet kur kitur
    document.body.addEventListener('click', (event) => {
        const sideMenu = document.getElementById("sideMenu");
        const menuIcon = document.querySelector(".menu-icon");

        if (sideMenu && menuIcon) {
            // Jei meniu yra atidarytas IR paspausta ne ant meniu ikonos, IR ne ant paties meniu
            if (sideMenu.style.width === "280px" && !menuIcon.contains(event.target) && !sideMenu.contains(event.target)) {
                sideMenu.style.width = "0";
            }
        }
    });

    // Patikrinti, ar yra išsaugotas pasirinktas automobilis iš kito puslapio
    const selectedCar = localStorage.getItem('selectedCar');
    if (selectedCar) {
        const selectElement = document.getElementById('paslaugos-select');
        if (selectElement) {
            selectElement.value = selectedCar;
        }
        localStorage.removeItem('selectedCar'); // Išvalyti, kad kitą kartą nenustatytų automatiškai
        // Jei norite, kad puslapis automatiškai nuslinktų prie formos po pasirinkimo iš galerijos:
        document.getElementById('forma')?.scrollIntoView({ behavior: 'smooth' });
    }

    // Jei esame pagrindiniame puslapyje, pridėti event listenerius nuolaidų tikrinimui
    const dataInput = document.getElementById('data');
    const valandosInput = document.getElementById('valandos');
    if (dataInput && valandosInput) {
        dataInput.addEventListener('change', tikrintiNuolaida);
        valandosInput.addEventListener('change', tikrintiNuolaida);
    }
});
