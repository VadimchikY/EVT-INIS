import db from './shirts.js'

console.log('jaahah')
const productContainer = document.querySelector(".box-container");

// Проходимся по всем товарам и создаем карточки товаров
db.forEach((product, iter) => {
    const productCard = document.createElement("div");
    productCard.classList.add("box");

    const productImage = document.createElement("img");
    productImage.src = product.colors.white.front;
    productImage.alt = product.name;
    productImage.height=200;
    productImage.width=180;
    productCard.appendChild(productImage);

    const productTitle = document.createElement("h3");
    productTitle.textContent = product.name;
    productCard.appendChild(productTitle);

    const productInfo = document.createElement("p");
    productInfo.textContent = `Available in ${Object.keys(product.colors).length} colors`;
    productCard.appendChild(productInfo);

    const productPrice = document.createElement("span");
    productPrice.textContent = `${product.price}`;
    productCard.appendChild(productPrice);

    const divForButtons = document.createElement("div");
    divForButtons.className='buttons-card';
    divForButtons.setAttribute('data-id', iter.toString());

    const productButton1 = document.createElement("button");
    productButton1.className='quick-view-button';
    productButton1.textContent = "Quick View";
    divForButtons.appendChild(productButton1);

    const productButton2 = document.createElement("button");
    productButton2.className='see-page-button';
    productButton2.textContent = "See Page";
    divForButtons.appendChild(productButton2);

    productCard.appendChild(divForButtons);
    // Добавляем карточку товара на страницу
    productContainer.appendChild(productCard);
});


// Получить модальное окно и кнопку закрытия
const divsForButtons = document.querySelectorAll('.buttons-card');

// Получаем модальное окно
const modal = document.querySelector('#quick-view-modal');

for(let divForButton of divsForButtons){           // ф-ция отображения модального окна
    const quick_view_button = divForButton.querySelector('.quick-view-button')
    const see_page_button = divForButton.querySelector('.see-page-button')

    const card_id = divForButton.getAttribute('data-id');
    const object = db[card_id];

    quick_view_button.addEventListener('click', function(event)
    {
        modal.style.display = "block";

        const modalWindow = document.createElement("div");
        modalWindow.id="modal-content";
        const image1 = document.createElement("img");
        image1.src = object.colors.white.front;
        image1.alt = object.name;
        image1.height=200;
        image1.width=180;
        modalWindow.appendChild(image1);

        const image2 = document.createElement("img");
        image2.src = object.colors.white.back;
        image2.alt = object.name;
        image2.height=200;
        image2.width=180;
        modalWindow.appendChild(image2);
        modalWindow.appendChild(document.createElement("br"));

        const title = document.createElement("h3");
        title.textContent = object.name;
        modalWindow.appendChild(title);

        const info = document.createElement("p");
        info.textContent = `Available in ${Object.keys(object.colors).length} colors`;
        modalWindow.appendChild(info);

        const price = document.createElement("span");
        price.textContent = `${object.price}`;
        modalWindow.appendChild(price);

        document.getElementById('modal-content').replaceWith(modalWindow);

    })
    see_page_button.addEventListener('click', function (event){
        localStorage.setItem('card', JSON.stringify(object));
        window.location.href = "details.html";
    })

}


// Закрыть модальное окно, если пользователь щелкнет за его пределами
document.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

