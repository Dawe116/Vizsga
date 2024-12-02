const sidebar = document.getElementById('sidebar');
const toggleButton = document.getElementById('toggleButton');
const content = document.getElementById('content');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    toggleButton.classList.toggle('collapsed');
    toggleButton.textContent = sidebar.classList.contains('collapsed') ? 'Show Filters' : 'Hide Filters';
});


