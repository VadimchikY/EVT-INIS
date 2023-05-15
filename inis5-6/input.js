const targets = document.querySelectorAll('.target')
const TIME_TO_DOUBLE_CLICK = 500
targets.forEach((draggable) => {
        draggable.addEventListener('mousedown', dragStart);
        draggable.addEventListener('dblclick', dragStart);
    function dragStart(event) {

        const starterPosX = draggable.offsetLeft;
        const starterPosY = draggable.offsetTop;
        const starterColor = window.getComputedStyle(draggable).backgroundColor;

        const innerX = event.clientX - draggable.offsetLeft;
        const innerY = event.clientY - draggable.offsetTop;
        draggable.style.cursor = 'grabbing';
        const generatingEvent = event.type
        document.addEventListener('mousemove', drag);
        if (generatingEvent === 'mousedown') {
            document.addEventListener('mouseup', dragEnd);
        }
        if (generatingEvent === 'dblclick') {
            document.addEventListener('click', dragEnd);
            draggable.style.backgroundColor = 'green'
        }
        document.addEventListener('keydown', isKeydownEscape);


        function drag(innerEvent) {
            draggable.style.left = innerEvent.clientX - innerX + 'px';
            draggable.style.top = innerEvent.clientY - innerY + 'px';
        }

        function dragEnd(innerEvent) {
            draggable.style.cursor = 'default';
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('keydown', isKeydownEscape);
            if (generatingEvent === 'mousedown') {
                document.removeEventListener('mouseup', dragEnd);
            }
            if (generatingEvent === 'dblclick') {
                document.removeEventListener('click', dragEnd);
                draggable.style.backgroundColor = starterColor
            }
        }

        function isKeydownEscape(event) {
            if (event.key === 'Escape') {
                draggable.style.left = starterPosX + 'px';
                draggable.style.top = starterPosY + 'px';
                dragEnd()
            }
        }
    }


//     function addListenersForMobile(draggable) {
//         let isDragging = false;
//         let isDoubleClickMode = false;
//         let starterPosX,starterPosY,innerX,innerY;
//         let choosenElement = null;
//
//         draggable.addEventListener('touchstart', initDrag);
//         draggable.addEventListener('touchmove', drag);
//         draggable.addEventListener('touchend', function (event) {
//             isDragging = false;
//         });
//         window.addEventListener('touchstart',dragInDoubleMode)
//
//
//         function drag(event){
//             console.log('drag')
//             if (isDragging && event.touches.length === 1) {
//                 // Перетаскивание только при одиночном касании
//                 const touch = event.touches[0];
//                 draggable.style.left = touch.clientX - innerX + 'px';
//                 draggable.style.top = touch.clientY - innerY + 'px';
//             }
//         }
//         function initDrag(event){
//             if (event.touches.length === 1) {
//                 starterPosX = draggable.offsetLeft;
//                 starterPosY = draggable.offsetTop;
//                 const touch = event.touches[0];
//                 innerX = touch.clientX - draggable.offsetLeft;
//                 innerY = touch.clientY - draggable.offsetTop;
//
//                 isDragging = true;
//
//                 //создание промиса для double click
//                 draggable.removeEventListener('touchstart', initDrag);
//                 draggable.addEventListener('touchstart',followDrag)
//                 setTimeout(() =>{
//                     draggable.removeEventListener('touchstart', followDrag);
//                     draggable.addEventListener('touchstart',initDrag)
//                 },TIME_TO_DOUBLE_CLICK);
//
//             } else {
//                 draggable.style.left = starterPosX + 'px';
//                 draggable.style.top = starterPosY + 'px';
//                 isDoubleClickMode = false;
//             }
//         }
//
//         function dragInDoubleMode(event){
//             if(isDoubleClickMode){
//                 const touch = event.touches[0];
//                 draggable.style.left = touch.clientX - innerX + 'px';
//                 draggable.style.top = touch.clientY - innerY + 'px';
//             }
//         }
//         function followDrag(event){
//             isDoubleClickMode = true;
//             isDragging = true;
//             choosenElement = draggable
//         }}
});

window.addEventListener("touchstart", (e) => {
    const box = e.target.closest(".target");
    // проверяет находится ли элемент на который было нажатие внутри элемента target
    if (box) {
        // сохраняем начальные координаты
        const posX = box.style.left;
        const posY = box.style.top;

        const touchMove = (e) => {   // перемещение обьекта за пальцем
            e.preventDefault();   // предотврощает прокрутку страницы
            box.style.left = e.targetTouches[0].pageX - box.offsetWidth / 2 + "px";
            box.style.top = e.targetTouches[0].pageY - box.offsetHeight / 2 + "px";

        };

        box.addEventListener("touchstart", (e) => {
            e.preventDefault(); // предотврощает прокрутку страницы
        });

        box.addEventListener("touchmove", touchMove);

        box.addEventListener("touchend", (e) => {
            e.preventDefault();
            if (e.touches.length > 0) {  // проверяет есть ли еще пальцы на экране
                box.style.left = posX;
                box.style.top = posY;
                document.removeEventListener("touchmove", touchMove);
            }
        });
    }
});


// проверка на двойное касание

const THRESHOLD = 300;
let touchStartTime = 0;
window.addEventListener("touchstart", (e) => {
    const box = e.target.closest(".target");
    if (box) {
        touchStartTime = Date.now();
        box.addEventListener("touchstart", tapHandler);
    }
});

const tapHandler = (event) => {  // проверяет прошло ли время между началом и концом касания
    const box = event.target.closest(".target");
    const posX = box.style.left;
    const posY = box.style.top;
    const touchEndTime = Date.now();
    if (touchEndTime - touchStartTime < THRESHOLD) {
        event.preventDefault();

        console.log('Double click is working!')
        const double_touch_move = (e) => {
            e.preventDefault();
            box.style.left = e.touches[0].pageX - box.offsetWidth / 2 + "px";
            box.style.top = e.touches[0].pageY - box.offsetHeight / 2 + "px";
        };

        box.addEventListener("touchend", (e) => {
            e.preventDefault();

            document.addEventListener("touchmove", double_touch_move);
            document.addEventListener("touchstart", () => {
                document.addEventListener("touchend", (e) => {
                    if (e.touches.length > 0) {
                        box.style.left = posX;
                        box.style.top = posY;
                    }
                    document.removeEventListener("touchmove", double_touch_move);
                    console.log('Double click is finished!')
                });

            });
        });
    }
};


window.addEventListener("touchstart", (e) => {  // два пальца на экране
    const box = e.target.closest(".target");
    if (box) {
        let initDistance = null;
        let initWidth = null;
        let initHeight = null;

        const scaleStart = (e) => {  // если два пальца
            if (e.touches.length === 2) {
                initWidth = box.offsetWidth;  // текущая ширина экрана
                initHeight = box.offsetHeight; // текущая высота элемента
                initDistance = getDistance(e.touches[0], e.touches[1]);  // расстояние между двумя элементами
            }
        };

        const scaleMove = (e) => {  // обрабатывает движение при изменении масштаба элемента
            if (e.touches.length === 2 && initDistance !== null) {
                const newDistance = getDistance(e.touches[0], e.touches[1]);
                const scale = newDistance / initDistance;  // при движении двух касаний вычисляется новое расстояние между ними
                const newWidth = initWidth * scale;
                const newHeight = initHeight * scale;


                if (newWidth >= 50 && newHeight >= 50) {  // если ширина и высота меньше 50px то элемент больше не масшатибруется
                    box.style.width = newWidth + "px";
                    box.style.height = newHeight + "px";
                }
            }
        };

        const scaleEnd = (e) => {
            if (e.touches.length !== 2) {
                initDistance = null;
            }
        };

        box.addEventListener("touchstart", scaleStart);
        box.addEventListener("touchmove", scaleMove);
        box.addEventListener("touchend", scaleEnd);


    }
});

const getDistance = (touch1, touch2) => {
    const dx = touch1.pageX - touch2.pageX;
    const dy = touch1.pageY - touch2.pageY;
    return Math.sqrt(dx * dx + dy * dy);
};