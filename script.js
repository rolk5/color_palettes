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
                waveAmount_k: Math.PI / 6,
                shiftX: Math.PI / 2,
                amplitY: 1
            },
            
            green: {
                x: 1,
                waveAmount_k: Math.PI / 6,
                shiftX: Math.PI / 1.2 ,
                amplitY: 1
            },
            
            blue: {
                x: 1,
                waveAmount_k: Math.PI / 10,
                shiftX: 3 * Math.PI / 2,
                amplitY: 1
            },
        },
/*
        fn: {

            red: function (x, waveAmount_k, shiftX, amplitY, n) {      //Определяет график кривой цвета
                let value = Math.round( (Math.sin( x / n * 10 * waveAmount_k + shiftX ) * amplitY + amplitY ) * 255 / 2);
                return value
            },
            green: function (x, waveAmount_k, shiftX, amplitY, n) {      //Определяет график кривой цвета
                let value = Math.round( (Math.sin( x / n * 10 * waveAmount_k + shiftX ) * amplitY + amplitY ) * 255 / 2);
                return value
            },
            blue: function (x, waveAmount_k, shiftX, amplitY, n) {      //Определяет график кривой цвета
                let value = Math.round( (Math.sin( x / n * 10 * waveAmount_k + shiftX ) * amplitY + amplitY ) * 255 / 2);
                return value
            }
        },*/

        alpha: 1,

        colorBlockAmount: 7,

        colorAmount: function randomNumber (min = 3, max = 10) {                     //RandomNumber
                        return Math.floor(Math.random() * (max - min) + min);
                        }
    };





function randomNumberPI_Divader (min = 3, max = 10) {                     //RandomNumber
    return Math.floor(Math.random() * (max - min) + min);
};

function colorCurve (x, waveAmount_k, shiftX, amplitY, n, shiftY) {      //Определяет график кривой цвета
    let value = Math.round( ( (amplitY * Math.sin( waveAmount_k / 10 * Math.PI * ((x / n * 10) - shiftX) ) ) + shiftY)* 255);
    if (value <= 0) {
      value = 0
    } else if (value >= 255) {
      value = 255
    } else {
      value
    }
    return value
};
/*(x - 1) для того чтобы счетчик начинался с 0 и столбцов было столько же сколько и в объекте "n4"  учитывается в строчке где "Цвета генерируются по свойству объекта"*/




let amountNum = 60;             //Количество паллеток
let colorItemContainer;         //Контейнер каждой отдельной паллетки   
let colorHeader;                //Заголовок
let colorPalleteContainer;      //Цвета
let colorItemPalleteContainer  //Каждый цвет
let colorComponentRed;          //Составляющий цвет красный
let colorComponentGreen;        //Составляющий цвет зеленый
let colorComponentBlue;         //Составляющий цвет синий
let colorBlockStyle;            //Текстовая динамическая запись цвета



colorsArray = [
  {
    "name": "Синий пурпурный оранжевый",
    "properties": {
      "red": {
        "shiftY": 0.8,
        "waveAmount_k": 1.1,
        "shiftX": 4.3,
        "amplitY": 0.5
      },
      "green": {
        "shiftY": 0.3,
        "waveAmount_k": 0.6,
        "shiftX": 6.3,
        "amplitY": 0.5
      },
      "blue": {
        "shiftY": 0.8,
        "waveAmount_k": 0.5,
        "shiftX": 21,
        "amplitY": 0.4
      }
    },
    "alpha": 1,
    "colorBlockAmount": 5
  },





  {
    "name": "Синий голубой",
    "properties": {
      "red": {
        "shiftY": -1,
        "waveAmount_k": 0,
        "shiftX": 0,
        "amplitY": 0
      },
      "green": {
        "shiftY": 0.5,
        "waveAmount_k": 1,
        "shiftX": 5,
        "amplitY": 0.5
      },
      "blue": {
        "shiftY": 0.5,
        "waveAmount_k": 0.7,
        "shiftX": 2.7,
        "amplitY": 0.5
      }
    },
    "alpha": 1,
    "colorBlockAmount": 9
  },






  {
    "name": "Синий белый красный",
    "properties": {
      "red": {
        "shiftY": 1,
        "waveAmount_k": 0.9,
        "shiftX": 5,
        "amplitY": 1
      },
      "green": {
        "shiftY": 0.6,
        "waveAmount_k": 2,
        "shiftX": 2.5,
        "amplitY": 0.4
      },
      "blue": {
        "shiftY": 1,
        "waveAmount_k": 0.9,
        "shiftX": 16,
        "amplitY": 1
      }
    },
    "alpha": 1,
    "colorBlockAmount": 10
  },
  {
    "name": "Голубой пурпурный",
    "properties": {
      "red": {
        "shiftY": 0.6,
        "waveAmount_k": 1,
        "shiftX": 5.6,
        "amplitY": 0.4
      },
      "green": {
        "shiftY": 0.5,
        "waveAmount_k": 1,
        "shiftX": 15,
        "amplitY": 0.5
      },
      "blue": {
        "shiftY": 0.6,
        "waveAmount_k": 1.2,
        "shiftX": 12.3,
        "amplitY": 0.4
      }
    },
    "alpha": 1,
    "colorBlockAmount": 10
  },
  {
    "name": "Оранжевый голубой",
    "properties": {
      "red": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI / 2,
        "shiftX": Math.PI * 3,
        "amplitY": 0.5
      },
      "green": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI / 2,
        "shiftX": 7,
        "amplitY": 0.5
      },
      "blue": {
        "shiftY": 0.5,
        "waveAmount_k": 1,
        "shiftX": 5,
        "amplitY": 0.5
      }
    },
    "alpha": 1,
    "colorBlockAmount": 7
  },
  {
    "name": "Оранжевый голубой",
    "properties": {
      "red": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI * Math.random(),
        "shiftX": Math.PI * Math.random(),
        "amplitY": 0.5
      },
      "green": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI * Math.random(),
        "shiftX": 7,
        "amplitY": 0.5
      },
      "blue": {
        "shiftY": 0.5,
        "waveAmount_k": 1,
        "shiftX": 5,
        "amplitY": 0.5
      }
    },
    "alpha": 1,
    "colorBlockAmount": 7
  },
  {
    "name": "Оранжевый голубой",
    "properties": {
      "red": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI / 2,
        "shiftX": Math.PI * 3,
        "amplitY": 0.5
      },
      "green": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI / 2,
        "shiftX": 7,
        "amplitY": 0.5
      },
      "blue": {
        "shiftY": 0.5,
        "waveAmount_k": 1,
        "shiftX": 5,
        "amplitY": 0.5
      }
    },
    "alpha": 1,
    "colorBlockAmount": 7
  },
  {
    "name": "Оранжевый голубой",
    "properties": {
      "red": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI / 2,
        "shiftX": Math.PI * 3,
        "amplitY": 0.5
      },
      "green": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI / 2,
        "shiftX": 7,
        "amplitY": 0.5
      },
      "blue": {
        "shiftY": 0.5,
        "waveAmount_k": 1,
        "shiftX": 5,
        "amplitY": 0.5
      }
    },
    "alpha": 1,
    "colorBlockAmount": 7
  },
  {
    "name": "Оранжевый голубой",
    "properties": {
      "red": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI / 2,
        "shiftX": Math.PI * 3,
        "amplitY": 0.5
      },
      "green": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI / 2,
        "shiftX": 7,
        "amplitY": 0.5
      },
      "blue": {
        "shiftY": 0.5,
        "waveAmount_k": 1,
        "shiftX": 5,
        "amplitY": 0.5
      }
    },
    "alpha": 1,
    "colorBlockAmount": 7
  },
  {
    "name": "Оранжевый голубой",
    "properties": {
      "red": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI / 2,
        "shiftX": Math.PI * 3,
        "amplitY": 0.5
      },
      "green": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI / 2,
        "shiftX": 7,
        "amplitY": 0.5
      },
      "blue": {
        "shiftY": 0.5,
        "waveAmount_k": 1,
        "shiftX": 5,
        "amplitY": 0.5
      }
    },
    "alpha": 1,
    "colorBlockAmount": 7
  },
  {
    "name": "Оранжевый голубой",
    "properties": {
      "red": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI / 2,
        "shiftX": Math.PI * 3,
        "amplitY": 0.5
      },
      "green": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI / 2,
        "shiftX": 7,
        "amplitY": 0.5
      },
      "blue": {
        "shiftY": 0.5,
        "waveAmount_k": 1,
        "shiftX": 5,
        "amplitY": 0.5
      }
    },
    "alpha": 1,
    "colorBlockAmount": 7
  },
  {
    "name": "Оранжевый голубой",
    "properties": {
      "red": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI / 2,
        "shiftX": Math.PI * 3,
        "amplitY": 0.5
      },
      "green": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI / 2,
        "shiftX": 7,
        "amplitY": 0.5
      },
      "blue": {
        "shiftY": 0.5,
        "waveAmount_k": 1,
        "shiftX": 5,
        "amplitY": 0.5
      }
    },
    "alpha": 1,
    "colorBlockAmount": 7
  },
  {
    "name": "Оранжевый голубой",
    "properties": {
      "red": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI / 2,
        "shiftX": Math.PI * 3,
        "amplitY": 0.5
      },
      "green": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI / 2,
        "shiftX": 7,
        "amplitY": 0.5
      },
      "blue": {
        "shiftY": 0.5,
        "waveAmount_k": 1,
        "shiftX": 5,
        "amplitY": 0.5
      }
    },
    "alpha": 1,
    "colorBlockAmount": 7
  },
  {
    "name": "Оранжевый голубой",
    "properties": {
      "red": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI / 2,
        "shiftX": Math.PI * 3,
        "amplitY": 0.5
      },
      "green": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI / 2,
        "shiftX": 7,
        "amplitY": 0.5
      },
      "blue": {
        "shiftY": 0.5,
        "waveAmount_k": 1,
        "shiftX": 5,
        "amplitY": 0.5
      }
    },
    "alpha": 1,
    "colorBlockAmount": 7
  },
  {
    "name": "Оранжевый голубой",
    "properties": {
      "red": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI / 2,
        "shiftX": Math.PI * 3,
        "amplitY": 0.5
      },
      "green": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI / 2,
        "shiftX": 7,
        "amplitY": 0.5
      },
      "blue": {
        "shiftY": 0.5,
        "waveAmount_k": 1,
        "shiftX": 5,
        "amplitY": 0.5
      }
    },
    "alpha": 1,
    "colorBlockAmount": 7
  },
  {
    "name": "Оранжевый голубой",
    "properties": {
      "red": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI / 2,
        "shiftX": Math.PI * 3,
        "amplitY": 0.5
      },
      "green": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI / 2,
        "shiftX": 7,
        "amplitY": 0.5
      },
      "blue": {
        "shiftY": 0.5,
        "waveAmount_k": 1,
        "shiftX": 5,
        "amplitY": 0.5
      }
    },
    "alpha": 1,
    "colorBlockAmount": 7
  },
  {
    "name": "Оранжевый голубой",
    "properties": {
      "red": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI / 2,
        "shiftX": Math.PI * 3,
        "amplitY": 0.5
      },
      "green": {
        "shiftY": 0.5,
        "waveAmount_k": Math.PI / 2,
        "shiftX": 7,
        "amplitY": 0.5
      },
      "blue": {
        "shiftY": 0.5,
        "waveAmount_k": 1,
        "shiftX": 5,
        "amplitY": 0.5
      }
    },
    "alpha": 1,
    "colorBlockAmount": 7
  },
];






/*
for (i = 0; i <= amountNum; i++) {      //Генерация набора палеток
    colorsArray.push(color);
};*/




let inputColorRange;                //Переменная ползунка
let inputRangeArray = [];           //Создаем массив для input

for (let i = 1; i <= 3; i++) {      //Создаем массив для input в количестве 3-х объектоа //(3) [1, 2, 3]
    inputRangeArray.push(i)
};

let pseudo = [];

colorsArray.forEach((value, index, array) => {
    colorItemContainer = document.createElement('div');                     //Контейнер каждой отдельной паллетки
        colorItemContainer.className = `colorItemContainer${index}`;                //Класс
        colorArrayContainer.appendChild(colorItemContainer);                    //Передаем контейнер каждой отдельной паллетки в HTML
        


        colorPalleteContainer = document.createElement('div');              //Контейнер с цветами
        colorPalleteContainer.className = `colorPalleteContainer${index}`;          //Класс
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

        let n4 = value.colorBlockAmount;
        
        for (let i = 0; i <= n4; i++) {                          //Генерация цветов



        /*---------Цвета генерируются по свойству объекта----------*/

        r1 = value.properties.red.waveAmount_k; 
        r2 = value.properties.red.shiftX;
        r3 = value.properties.red.amplitY;

        r5 = value.properties.red.shiftY;
        

        g1 = value.properties.green.waveAmount_k;
        g2 = value.properties.green.shiftX;
        g3 = value.properties.green.amplitY;

        g5 = value.properties.green.shiftY;


        b1 = value.properties.blue.waveAmount_k;
        b2 = value.properties.blue.shiftX;
        b3 = value.properties.blue.amplitY;

        b5 = value.properties.blue.shiftY;


        red = colorCurve(i, r1, r2, r3, n4, r5);
        green = colorCurve(i, g1, g2, g3, n4, g5);
        blue = colorCurve(i, b1, b2, b3, n4, b5);



        /*---------Цвета генерируются по методу объекта----------*/
/*
        r1 = value.properties.red.waveAmount_k;
        r2 = value.properties.red.shiftX;

        g1 = value.properties.green.waveAmount_k;
        g2 = value.properties.green.shiftX;

        b1 = value.properties.blue.waveAmount_k;
        b2 = value.properties.blue.shiftX;

        red = value.fn.red(i, randomNumberPI_Divader(), randomNumberPI_Divader(), 1, valueColorAmountFixed);
        green = value.fn.red(i, randomNumberPI_Divader(), randomNumberPI_Divader(), 1, valueColorAmountFixed);
        blue = value.fn.red(i, randomNumberPI_Divader(), randomNumberPI_Divader(), 1, valueColorAmountFixed);
*/






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


console.log(green)


/*
function colorCurve (x, waveAmount_k, shiftX, amplitY) {      //Определяет график кривой цвета
    let value = Math.round( (Math.sin( x * waveAmount_k + shiftX ) * amplitY + amplitY ) * 255 / 2);
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
        colorHeader.innerText = `${value.name}`                        //Содержимое
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



console.log(colorsArray);









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



