document.addEventListener('DOMContentLoaded', () => {
    const detailButtons = document.querySelectorAll('.detail-button');
    const sidebarItems = document.querySelectorAll('.sidebar-item');

    detailButtons.forEach(button => {
        button.addEventListener('click', () => {
            const className = button.previousElementSibling.textContent;
            alert(`Melihat detail kelas: "${className}"`);
        });
    });

    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            sidebarItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            console.log(`Navigasi ke: ${item.querySelector('span').textContent}`);
        });
    });
});
