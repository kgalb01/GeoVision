const buzzwords = document.querySelectorAll('.buzzword');
const popup = document.getElementById('popup');
const popupContent = document.getElementById('popup-content');
const popupClose = document.getElementById('popup-close');

popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });


buzzwords.forEach(buzzword => {
        buzzword.addEventListener('mouseenter', () => {
        popupContent.textContent = buzzword.dataset.popup;
        popup.style.display = 'block';
        
    });

buzzword.addEventListener('mouseleave', () => {
        popup.style.display = 'none'; 
    });
});

