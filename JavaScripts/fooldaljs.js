const sidebar = document.getElementById('sidebar');
const toggleButton = document.getElementById('toggleButton');
const content = document.getElementById('content');
const cards = document.getElementById('forCards');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    toggleButton.classList.toggle('collapsed');
});

window.addEventListener('load', () => {
    for (let i = 0; i < 12; i++) {
        const cardHTML = `
            <div class="col-lg-3">
                <div class="card" style="width: 18rem;">
                    <a href="#"><img src="../img/notavaible.jpg" class="card-img-top" alt="..."></a>
                    <div class="card-body">
                        <h5 class="card-title">Card title ${i + 1}</h5>
                    </div>
                </div>
            </div>`;
        cards.innerHTML += cardHTML;
    }
});

const openModal = document.getElementById('openModal');
const modal = document.getElementById('myModal');

// Modál megnyitása
openModal.addEventListener('click', () => {
    modal.style.display = 'flex';
    modal.innerHTML = `
          <div class="modal-content">
              <h2>Bejelentkezés</h2>
              <input type="text" id="username" placeholder="Felhasználónév">
              <br>
              <input type="password" id="password" placeholder="Jelszó">
              <br>
              <button id="login">Bejelentkezés</button>
              <button id="registration">Regisztráció</button>
              <button id="closeModal">Bezárás</button>
          </div>`;

    // Új "Bezárás" gomb eseményfigyelője
    const newCloseModalButton = document.getElementById('closeModal');
    newCloseModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Modál bezárása a háttérre kattintva
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Elemek megkeresése a DOM-ban a tartalom frissítése után
    const login = document.getElementById("login");
    login.addEventListener('click', () => {
        alert("Jelenleg fejlesztés alatt kérnék egy kis türelmet hozzá!");
    });

    const registration = document.getElementById("registration");
    registration.addEventListener('click', () => {
        alert("Jelenleg fejlesztés alatt kérnék egy kis türelmet hozzá!");
    });
});