/*const menuContainer = document.querySelector('.navBar');

const ui = document.createElement('ui');
menuContainer.appendChild(ui);

let li;
let aHref;

for (let i = 0; i < 10; i++) {
    li = document.createElement('li');
    ui.appendChild(li);

    aHref = document.createElement('a');
    aHref.innerHTML = `Пункт ${i + 1}`
    aHref.href = `page${i + 1}.html`
    li.appendChild(aHref);
}

    //console.log(aHref)

*/


//Находим div class="content"
const content = document.querySelector('.content');

let colorArrayContainer = document.createElement('div'); //Контенер всех паллеток
colorArrayContainer.className = 'colorArrayContainer';

content.appendChild(colorArrayContainer);




//Array of color pallete with properties
let colorsArray = [];

//Color paleete object example
let color = {
    name: 'Оранжевый голубой',
    properties:
        {
            red: {
                x: 1,
                waveLength: Math.PI / 6,
                xOffsetWave: Math.PI / 2,
                yStretchWave: 1
            },
            
            green: {
                x: 1,
                waveLength: Math.PI / 6,
                xOffsetWave: Math.PI / 1.2 ,
                yStretchWave: 1
            },
            
            blue: {
                x: 1,
                waveLength: Math.PI / 10,
                xOffsetWave: 3 * Math.PI / 2,
                yStretchWave: 1
            },
        },

        fn: {

            red: function (x, waveLength, xOffsetWave, yStretchWave) {      //Определяет график кривой цвета
                let value = Math.round( (Math.sin( x * waveLength + xOffsetWave ) * yStretchWave + yStretchWave ) * 255 / 2);
                return value
            },
            green: function (x, waveLength, xOffsetWave, yStretchWave) {      //Определяет график кривой цвета
                let value = Math.round( (Math.sin( x * waveLength + xOffsetWave ) * yStretchWave + yStretchWave ) * 255 / 2);
                return value
            },
            blue: function (x, waveLength, xOffsetWave, yStretchWave) {      //Определяет график кривой цвета
                let value = Math.round( (Math.sin( x * waveLength + xOffsetWave ) * yStretchWave + yStretchWave ) * 255 / 2);
                return value
            }
        },

        alpha: 1,

        colorAmount: function randomNumber (min = 3, max = 10) {                     //RandomNumber
                        return Math.floor(Math.random() * (max - min) + min);
                        }
    };




/*
function randomNumber (min = 3, max = 10) {                     //RandomNumber
    return Math.floor(Math.random() * (max - min) + min);
};*/

function colorCurve (x, waveLength, xOffsetWave, yStretchWave, n) {      //Определяет график кривой цвета
    let value = Math.round( (Math.sin( x / n * 10 * waveLength + xOffsetWave ) * yStretchWave + yStretchWave ) * 255 / 2);
    return value
};





let amountNum = 60;             //Количество паллеток
let colorItemContainer;         //Контейнер каждой отдельной паллетки   
let colorHeader;                //Заголовок
let colorPalleteContainer;      //Цвета
let colorItemPalleteContainer  //Каждый цвет
let colorComponentRed;          //Составляющий цвет красный
let colorComponentGreen;        //Составляющий цвет зеленый
let colorComponentBlue;         //Составляющий цвет синий
let colorBlockStyle;            //Текстовая динамическая запись цвета



for (i = 0; i <= amountNum; i++) {      //Генерация набора палеток
    colorsArray.push(color);
};

console.log(colorsArray);


let inputColorRange;                //Переменная ползунка
let inputRangeArray = [];           //Создаем массив для input

for (let i = 1; i <= 3; i++) {      //Создаем массив для input в количестве 3-х объектоа //(3) [1, 2, 3]
    inputRangeArray.push(i)
};

let pseudo = [];

colorsArray.forEach((value, index, array) => {
    colorItemContainer = document.createElement('div');                     //Контейнер каждой отдельной паллетки
        colorItemContainer.className = `colorItemContainer${i}`;                //Класс
        colorArrayContainer.appendChild(colorItemContainer);                    //Передаем контейнер каждой отдельной паллетки в HTML
        


        colorPalleteContainer = document.createElement('div');              //Контейнер с цветами
        colorPalleteContainer.className = `colorPalleteContainer${i}`;          //Класс
        colorItemContainer.appendChild(colorPalleteContainer);                  //Передаем в HTML


        let r1;
        let r2;

        let g1;
        let g2;

        let b1;
        let b2;

        let red;
        let green;
        let blue;

        let colorAttributeHTML;
        let colorAttributeHTML_invert;

        let valueColorAmountFixed = value.colorAmount(3, 20);
        
        for (let i = 1; i <= valueColorAmountFixed; i++) {                          //Генерация цветов

        r1 = value.properties.red.waveLength;
        r2 = value.properties.red.xOffsetWave;

        g1 = value.properties.green.waveLength;
        g2 = value.properties.green.xOffsetWave;

        b1 = value.properties.blue.waveLength;
        b2 = value.properties.blue.xOffsetWave;

        red = colorCurve(i, r1, r2, 1, valueColorAmountFixed);
        green = colorCurve(i, g1, g2, 1, valueColorAmountFixed);
        blue = colorCurve(i, b1, b2, 1, valueColorAmountFixed);

        if ((red + blue + green)/3 <= 255 / 2) {
            colorAttributeHTML_invert = 'white' //white
            } else {
            colorAttributeHTML_invert = 'black' 
            };



            colorItemPalleteContainer = document.createElement('div');          //Контейнер с цветом
            colorItemPalleteContainer.className = `colorItemPalleteContainer`;      //Класс
            colorPalleteContainer.appendChild(colorItemPalleteContainer);           //Передаем в HTML
                colorBlockStyle = `rgba(${red}, ${green}, ${blue}, 1)`;
                colorItemPalleteContainer.style.backgroundColor = colorBlockStyle;

                colorAttributeHTML = document.createElement('p');                           //Информация о цвете
                    colorAttributeHTML.innerText = 
                    `RGB
                    R ${red}
                    G ${green}
                    B ${blue}
                    A 1`;
                    colorAttributeHTML.style.color = colorAttributeHTML_invert;
                    colorItemPalleteContainer.appendChild(colorAttributeHTML);

        };





/*
function colorCurve (x, waveLength, xOffsetWave, yStretchWave) {      //Определяет график кривой цвета
    let value = Math.round( (Math.sin( x * waveLength + xOffsetWave ) * yStretchWave + yStretchWave ) * 255 / 2);
    return value
};

    red = Math.round(
    (
        Math.sin(
            (i/ n * 10 * Math.PI / 6) + (Math.PI / 2)
        ) + 1 ) * 255 / 2);

    green = Math.round(
    (
        Math.sin(
            (i / n * 10 * Math.PI / 6) + (Math.PI / 1.2)
        ) + 1 ) * 255 / 2);

    blue = Math.round(
    (
        Math.sin(
            (i / n * 10 * Math.PI / 10) - (- 3 * Math.PI / 2)
        ) + 1 ) * 255 / 2);





*/
        





        colorHeader = document.createElement('p');                         //Заголовок для каждой паллетки
        colorHeader.innerText = `${value.name} ${index}`                        //Содержимое
        colorItemContainer.appendChild(colorHeader);                            //Передаем в HTML

        /*
        inputRangeArray.forEach((val, ind, arr) => {                        //Создаем ползунки input //Для каждого элемента массива inputRangeArray создаем по вложенному массиву val, ind, arr// (3) [[1, 2, 3], [1, 2, 3], [1, 2, 3]]
            arr.forEach((v, i, a) => {
                inputColorRange = document.createElement('input');
                    inputColorRange.type = 'range';
                    inputColorRange.value = 50;
                    inputColorRange.className = `range${val}.${v}`;         //Задаем class_ы в формате ['range1.1', 'range1.2', 'range1.3', 'range2.1', 'range2.2', 'range2.3', 'range3.1', 'range3.2', 'range3.3']
                    colorItemContainer.appendChild(inputColorRange);

                });
            }
        );

*/


});













/*
let colorBlock;
let colorPalleteBlock;
let colorText;
let n = 11;


let red;
let green;
let blue;

let invertColor;

for (let i = 1; i <= n; i++) {

    red = Math.round(
    (
        Math.sin(
            (i/ n * 10 * Math.PI / 6) + (Math.PI / 2)
        ) + 1 ) * 255 / 2);

    green = Math.round(
    (
        Math.sin(
            (i / n * 10 * Math.PI / 6) + (Math.PI / 1.2)
        ) + 1 ) * 255 / 2);

    blue = Math.round(
    (
        Math.sin(
            (i / n * 10 * Math.PI / 10) - (- 3 * Math.PI / 2)
        ) + 1 ) * 255 / 2);
    

    colorBlock = `rgba(${red}, ${green}, ${blue}, 1)`;
    colorPalleteBlock = document.createElement('div');
    colorPalleteBlock.className = 'blockColor';
    colorPalleteBlock.style.backgroundColor = colorBlock;

    if ((red + blue + green)/3 <= 255 / 2) {
        invertColor = 'white' //white
    } else {
       invertColor = 'black' 
    };


    colorText = document.createElement('p');
    colorText.innerText = 
        `RGBA
        R ${red} 
        G ${green} 
        B ${blue} 
        A 1`;
    colorText.style.color = invertColor;
    colorPallete.appendChild(colorPalleteBlock);
    colorPalleteBlock.appendChild(colorText)
   console.log(colorPalleteBlock)
   console.log(
`${i} R ${red} G ${green} B ${blue}`)
};
*/



