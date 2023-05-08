window.card = JSON.parse(localStorage.getItem('card'));
document.title=card.name

const cardDiv = document.querySelector('.main-container');

let current_color = Object.keys(card.colors)[0];
let current_side = Object.keys(card.colors[current_color])[0]

cardDiv.querySelector('.card-name').textContent=card.name;
cardDiv.querySelector('.card-image').src=card.colors[current_color][current_side];
cardDiv.querySelector('.card-price').textContent=card.price;
cardDiv.querySelector('.card-desc').textContent=card.description;





const collectionOfSides = card.colors[current_color]

for (const key of Object.keys(collectionOfSides)) {
    const button = document.createElement('button')
    button.textContent=key;
    button.addEventListener('click', () =>{changeImage(current_color,key);
    current_side=key})
    cardDiv.querySelector('.side-buttons').appendChild(button)
}
for (const key of Object.keys(card.colors)) {
    const button = document.createElement('button')
    button.style.backgroundColor=key;
    button.textContent=key;
    button.addEventListener('click', () =>{changeImage(key,current_side);
    current_color=key})
    cardDiv.querySelector('.color-buttons').appendChild(button)
}


function changeImage(color, side){
    document.querySelector('.card-image').src=card.colors[color][side]
}






