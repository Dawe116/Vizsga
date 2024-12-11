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