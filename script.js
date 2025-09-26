/**
 * Генератор цветовых палитр на основе различных фукций (синуса...)
 * Подход похож на https://dev.thi.ng/gradients/ и https://coolors.co/
 * 
 * Подход с функуиями кривой синуса:
 *  Каждый канал R/G/B кривой синуса со следующими параметрами:
 *  — anp     ->  амплитуда (размах колебаний)
 *  — freq    ->  количество гребней, частота
 *  — offsetX ->  смещение по X
 *  — offsetY ->  смещение по Y
 */


//  ---------------Константы---------------

//Находим div class="content" для вставки всего содержимого
const ROOT_CONTAINER = document.querySelector('.content');




//  ---------------Функции---------------

/**
 * Генерация значения канала по синусоиде https://www.desmos.com/calculator/wq4s6zggec?lang=ru
 * @param {number} i        - индекс цвета
 * @param {number} amp      - амплитуда (размах колебаний)
 * @param {number} freq     - количество гребней, частота
 * @param {number} offsetX  - смещение по X
 * @param {number} offsetY  - смещение по Y
 * @param {number} n        - количество цветов в палитре
 * @returns {number}        - значение канала 0...255
 */

function colorCurve ({
    i = '',
    amp = '',
    freq = '',
    offsetX = '',
    offsetY = '',
    n = ''
  } = {}) {
    //Определяет график кривой цвета
    let value = Math.round( ( (amp * Math.sin( freq / 10 * Math.PI * ((i / n * 10) - offsetX) ) ) + offsetY) * 255);
    return Math.min(255, Math.max(0, value))
  };
/*(x - 1) для того чтобы счетчик начинался с 0 и столбцов было столько же сколько и в объекте "n4"  учитывается в строчке где "Цвета генерируются по свойству объекта"*/

/**
 * Белый или черный цвет текста в зависимости от фона ячеки
 * @param {number} r 
 * @param {number} g 
 * @param {number} b 
 * @returns {string} 'white' если цвет меньше 225/2,'black' если больше
 */
function invertColorText (r, g, b) {
  const avg = (r + g + b) / 3;
  return avg <= 225/2 ? 'white' : 'black'
};



//Функция длдя создания DOM элементов
function createHTML_Element ({
    tag = '',
    className = '',
    textContent = '',
    parent = '',
    inputType = '',
    value = '',
    option = {}
  } = {}) {
    const el = document.createElement(tag);
      if (className) el.className = className;
      if (textContent) el.innerText = textContent;

      if (inputType) el.type = inputType;
      //Стандартные значения для input range
      el.step = 0.1;
      el.min = -10;
      el.max = 20;

      el.value = value;

      //dataset
      if (option.dataset) {
        for (let [key, value] of Object.entries(option.dataset)) {
          el.dataset[key] = value;
        }
      };

      //Стили
      if (option.style) {
        for (let [key, value] of Object.entries(option.style)) {
          el.style[key] = value;
        }
      };      

      if (parent) parent.appendChild(el);
      return el;
  };



//Функция для генерации градиентов
function colorPalletesGenerator (value, index, parent) {
  
    //Контейнер каждой отдельной паллетки Заголовок и цвета
    const colorPalleteContainer = createHTML_Element({
      tag: 'div',
      className: 'colorPalleteContainer',
      parent: parent,
    });

    //Контейнер с цветами
    const colorBlocksContainer = createHTML_Element({
      tag: 'div',
      className: 'colorBlocksContainer',
      parent: colorPalleteContainer,
    });

    //Генерация цветов и подписей к нему
    for (let i = 0; i <= value.colorBlockAmount; i++) {


        /*---------Цвета генерируются по свойству объекта----------*/
        let red = colorCurve({
          i: i,
          amp: value.properties.red.amp,
          freq: value.properties.red.freq,
          offsetX: value.properties.red.offsetX,
          offsetY: value.properties.red.offsetY,
          n: value.colorBlockAmount
        });

        let green = colorCurve({
          i: i,
          amp: value.properties.green.amp,
          freq: value.properties.green.freq,
          offsetX: value.properties.green.offsetX,
          offsetY: value.properties.green.offsetY,
          n: value.colorBlockAmount
        });

        let blue =  colorCurve({
          i: i,
          amp: value.properties.blue.amp,
          freq: value.properties.blue.freq,
          offsetX: value.properties.blue.offsetX,
          offsetY: value.properties.blue.offsetY,
          n: value.colorBlockAmount
        });


    //Контейнер с цветом
    const colorBlock_Edit = createHTML_Element({
        tag: 'div',
        className: 'colorBlock',
        parent: colorBlocksContainer,
        option: {
          dataset: {
            colorInfo: `${red}, ${green}, ${blue}`
          },
          style: {backgroundColor: `rgba(${red}, ${green}, ${blue}, 1)`}
        },
      });

        
        //Подпись цвета
        const colorAttributeHTML = document.createElement('p');
        colorAttributeHTML.innerText = 
        `RGB
        R ${red}
        G ${green}
        B ${blue}
        A 1`;
        colorAttributeHTML.style.color = invertColorText(red, green, blue);
        colorBlock_Edit.appendChild(colorAttributeHTML);

        //Копирование в буфер обмена цвета при нажатии на текст
        colorBlock_Edit.addEventListener('click', function (el) {
        navigator.clipboard.writeText(el.currentTarget.dataset.colorInfo);
         console.log(el.currentTarget.dataset.colorInfo)
        })

    };


        //Заголовок для каждой паллетки
       const colorBlocksHeader = document.createElement('p');
        colorBlocksHeader.innerText = `${value.name}`;
        colorPalleteContainer.appendChild(colorBlocksHeader);

          //Открытие окна редактора паллетки по клику на название
          colorBlocksHeader.addEventListener('click', function () {

          
              editPalletesWindow({
              pallete: colorsArray[index],
              parent: ROOT_CONTAINER,
            });
          });


};

/*------------------------------------------------------*/

//Функция для редактирования градиентов
function editPalletesWindow ({
  pallete = '', //Ссылка градиент из массива
  parent = '',  //Родитель
} = {}) {

  //Окно редактируемой паллетки Заголовок, цвета, ползунки
  const colorEditWindow = createHTML_Element({
    tag: 'div',
    className: 'colorWindow_Edit',
    parent: parent,
  });

    //Окно редактируемой паллетки Заголовок, цвета, ползунки
  const closeBtn = createHTML_Element({
    tag: 'div',
    className: 'closePallete',
    textContent: 'Закрыть',
    parent: colorEditWindow,
  });

  closeBtn.addEventListener('click', function () {
  ROOT_CONTAINER.lastChild.remove()
  })
  
    //Заголовок для каждой паллетки
    const colorBlocksHeader = createHTML_Element({
       tag: 'h1',
       parent: colorEditWindow,
       textContent: `${pallete.name}`,
     });

    //Контейнер со всеми цветами
    const colorBlocksContainer_Edit = createHTML_Element({
      tag: 'div',
      className: 'colorBlocksContainer_Edit',
      parent: colorEditWindow,
    });




    //Контейнер с инструментами для редактирования цветов
    const editColorTools = createHTML_Element({
      tag: 'div',
      className: 'editColorTools',
      parent: colorEditWindow,
    });

  //  Цикл создет количество цветов {i1} для групп слайдеров
  /**
   * {i1}: 1 - red;
   *   2 - green;
   *   3 - blue;
   * {i2}: 1 - amp;
   *   2 - freq;
   *   3 - offsetX;
   *   4 - offsetY;
   */

  //  Массив каналов цвета //Обращаемся ко всем ключам в propertis [red, green, blue]
  const colorPropChannel = Object.keys(pallete.properties);


  //  Цикл создания слайдеров по каналам
  for (let i1 = 0; i1 < 3; i1++) {

    //Контейнер слайдеров по каналам
    const sliderChannel_Container = createHTML_Element({
      tag: 'div',
      className: `sliderChannel_Container_${colorPropChannel[i1]}`,
      parent: editColorTools
    });


    //Массив свойств для каждого канала ['offsetY', 'freq', 'offsetX', 'amp']   //Чтобы вывести маасив необходимо обращаться к индексу colorPropChannel Object.keys(pallete.properties[colorPropChannel[0]])
    const propertyColorName = Object.keys(pallete.properties[colorPropChannel[i1]]);
    const propertyColorValue = Object.values(pallete.properties[colorPropChannel[i1]]);

 
    

    //Цикл создет 4 слайдера {i2} для парметра каждого канала {i1}
    for (let i2 = 0; i2 < propertyColorName.length; i2++) {

      //Создание каждого отдельного слайдера
      const inputColorRange = createHTML_Element({
        tag: 'input',
        className: 'inputRange',
        inputType: 'range',
        parent: sliderChannel_Container,
        value: propertyColorValue[i2],
        option: {dataset:
            {color: colorPropChannel[i1],
              prop: propertyColorName[i2]
            }
          },
      });
      
      //Отображение значения слайдера 
      const inputColorRangeValue = createHTML_Element({
        tag: 'p',
        className: `inputRangeText_${colorPropChannel[i1]}_${propertyColorName[i2]}`,
        textContent: `${propertyColorName[i2]} ${propertyColorValue[i2]}`,
        parent: sliderChannel_Container,
      });


      //Изменение значения слайдера при прокрутке слайдера
      inputColorRange.addEventListener('input', function(el) {
        inputColorRangeValue.textContent = `${propertyColorName[i2]} ${el.target.value}`;
      });
        
    };

  };

  


  //Генерация цветов и подписей к нему
  for (let i = 0; i <= pallete.colorBlockAmount; i++) {

    /*---------Цвета генерируются по свойству объекта---------*/
    let red = colorCurve({
      i: i,
      amp: pallete.properties.red.amp,
      freq: pallete.properties.red.freq,
      offsetX: pallete.properties.red.offsetX,
      offsetY: pallete.properties.red.offsetY,
      n: pallete.colorBlockAmount
    });
      
    let green = colorCurve({
      i: i,
      amp: pallete.properties.green.amp,
      freq: pallete.properties.green.freq,
      offsetX: pallete.properties.green.offsetX,
      offsetY: pallete.properties.green.offsetY,
      n: pallete.colorBlockAmount
    });
      
    let blue =  colorCurve({
      i: i,
      amp: pallete.properties.blue.amp,
      freq: pallete.properties.blue.freq,
      offsetX: pallete.properties.blue.offsetX,
      offsetY: pallete.properties.blue.offsetY,
      n: pallete.colorBlockAmount
    });

          
        


    //Контейнер с цветом
    const colorBlock_Edit = createHTML_Element({
        tag: 'div',
        className: 'colorBlock_Edit',
        parent: colorBlocksContainer_Edit,
        option: {
          dataset: {
            colorInfo: `${red}, ${green}, ${blue}`
          },
          style: {backgroundColor: `rgba(${red}, ${green}, ${blue}, 1)`}
        },
      });

        

      //Копирование в буфер обмена цвета при нажатии на текст
      colorBlock_Edit.addEventListener('click', function (el) {
        navigator.clipboard.writeText(el.currentTarget.informationOfColor);
        console.log(el.currentTarget.dataset.colorInfo)
      })


    //Подпись цвета
    const colorAttributeHTML = createHTML_Element({
        tag: 'p',
        parent: colorBlock_Edit,
        textContent: 
        `RGB
        R ${red}
        G ${green}
        B ${blue}
        A 1`,
        option: {
          style: {color: invertColorText(red, green, blue)}
        },
      });

  };





  //Получаем все, что находится в '.editColorTools'
  const getRangeValue = document.querySelector('.editColorTools');


  getRangeValue.addEventListener('input', function (el) { 

    const color = el.target.dataset.color;
    const prop = el.target.dataset.prop;
    const value = el.target.value;

    pallete.properties[color][prop] = Number(value);


    const colorBox = document.querySelectorAll('.colorBlock_Edit');
    colorBox.forEach((v, i) => {
      updateColor (v, i, pallete, v.firstChild);

    })

    

  });

};


function updateColor (obj, i, pallete, colorText) {

  let red = colorCurve({
    i: i,
    amp: pallete.properties.red.amp,
    freq: pallete.properties.red.freq,
    offsetX: pallete.properties.red.offsetX,
    offsetY: pallete.properties.red.offsetY,
    n: pallete.colorBlockAmount
  });
      
  let green = colorCurve({
    i: i,
    amp: pallete.properties.green.amp,
    freq: pallete.properties.green.freq,
    offsetX: pallete.properties.green.offsetX,
    offsetY: pallete.properties.green.offsetY,
    n: pallete.colorBlockAmount
  });
      
  let blue =  colorCurve({
    i: i,
    amp: pallete.properties.blue.amp,
    freq: pallete.properties.blue.freq,
    offsetX: pallete.properties.blue.offsetX,
    offsetY: pallete.properties.blue.offsetY,
    n: pallete.colorBlockAmount
  });

   obj.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, 1)`;
   obj.dataset.colorInfo = `${red}, ${green}, ${blue}`;

   colorText.style.color = invertColorText(red, green, blue);
   colorText.innerText = `RGB
        R ${red}
        G ${green}
        B ${blue}
        A 1`;


}

  








//  ---------------Данные---------------
/**
 * Массив палитр. Каждая палитра - это объект с параметрами волн
 */

const colorsArray = [
  {
    "name": "Синий пурпурный оранжевый",
    "properties": {
      "red": {
        "freq": 1.1,
        "offsetY": 0.8,
        "offsetX": 4.3,
        "amp": 0.5
      },
      "green": {
        "offsetY": 0.3,
        "freq": 0.6,
        "offsetX": 6.3,
        "amp": 0.5
      },
      "blue": {
        "offsetY": 0.8,
        "freq": 0.5,
        "offsetX": 21,
        "amp": 0.4
      }
    },
    "alpha": 1,
    "colorBlockAmount": 10
  },





  {
    "name": "Синий голубой",
    "properties": {
      "red": {
        "amp": 0,
        "freq": 0,
        "offsetX": 0,
        "offsetY": -1,
      },
      "green": {
        "amp": 0.5,
        "freq": 1,
        "offsetX": 5,
        "offsetY": 0.5,
      },
      "blue": {
        "amp": 0.7,
        "freq": 0.5,
        "offsetX": 0,
        "offsetY": 0.3,
      }
    },
    "alpha": 1,
    "colorBlockAmount": 10
  },



  {
    "name": "Синий белый красный",
    "properties": {
      "red": {
        "amp": 1,
        "freq": 1,
        "offsetX": 5,
        "offsetY": 1,
      },
      "green": {
        "amp": 0.8,
        "freq": 1,
        "offsetX": 0,
        "offsetY": 0.2,
      },
      "blue": {
        "amp": 1,
        "freq": 1,
        "offsetX": - 5,
        "offsetY": 1,
      }
    },
    "alpha": 1,
    "colorBlockAmount": 20
  },
  {
    "name": "Голубой пурпурный",
    "properties": {
      "red": {
        "offsetY": 0.6,
        "freq": 1,
        "offsetX": 5.6,
        "amp": 0.4
      },
      "green": {
        "offsetY": 0.5,
        "freq": 1,
        "offsetX": 15,
        "amp": 0.5
      },
      "blue": {
        "offsetY": 0.6,
        "freq": 1.2,
        "offsetX": 12.3,
        "amp": 0.4
      }
    },
    "alpha": 1,
    "colorBlockAmount": 15
  },

  {
    "name": "Оранжевый голубой",
    "properties": {
      "red": {
        "amp": -0.5,
        "freq": 5 / 3,
        "offsetX": 3,
        "offsetY": 0.5,
      },
      "green": {
        "amp": -0.5,
        "freq": 25 / 18,
        "offsetX": 0,
        "offsetY": 0.5,
      },
      "blue": {
        "amp": -0.5,
        "freq": 1,
        "offsetX": - 5,
        "offsetY": 0.5,
      }
    },
    "alpha": 1,
    "colorBlockAmount": 15
  },
  {
    "name": "Случайный",
    "properties": {
      "red": {
        "amp": 0.5,
        "freq": 1,
        "offsetX": 0,
        "offsetY": 0.5,
      },
      "green": {
        "amp": 0.5,
        "freq": 1,
        "offsetX": 5,
        "offsetY": 0.5,
      },
      "blue": {
        "amp": 0.5,
        "freq": 2,
        "offsetX": 5,
        "offsetY": 0.5,
      }
    },
    "alpha": 1,
    "colorBlockAmount": 15
  },
  {
    "name": "Оранжевый голубой",
    "properties": {
      "red": {
        "offsetY": 0.5,
        "freq": Math.PI / 2,
        "offsetX": Math.PI * 3,
        "amp": 0.5
      },
      "green": {
        "offsetY": 0.5,
        "freq": Math.PI / 2,
        "offsetX": 7,
        "amp": 0.5
      },
      "blue": {
        "offsetY": 0.5,
        "freq": 1,
        "offsetX": 5,
        "amp": 0.5
      }
    },
    "alpha": 1,
    "colorBlockAmount": 20
  },
  {
    "name": "Оранжевый голубой",
    "properties": {
      "red": {
        "offsetY": 0.5,
        "freq": Math.PI / 2,
        "offsetX": Math.PI * 3,
        "amp": 0.5
      },
      "green": {
        "offsetY": 0.5,
        "freq": Math.PI / 2,
        "offsetX": 7,
        "amp": 0.5
      },
      "blue": {
        "offsetY": 0.5,
        "freq": 1,
        "offsetX": 5,
        "amp": 0.5
      }
    },
    "alpha": 1,
    "colorBlockAmount": 7
  },
    {
    "name": "Синий голубой",
    "properties": {
      "red": {
        "amp": 0,
        "freq": 0,
        "offsetX": 0,
        "offsetY": -1,
      },
      "green": {
        "amp": 0.5,
        "freq": 1,
        "offsetX": 5,
        "offsetY": 0.5,
      },
      "blue": {
        "amp": 0.7,
        "freq": 0.5,
        "offsetX": 0,
        "offsetY": 0.3,
      }
    },
    "alpha": 1,
    "colorBlockAmount": 10
  },
];





//Контейнер всех паллеток
const colorArrayContainer = document.createElement('div');
colorArrayContainer.className = 'colorArrayContainer';
ROOT_CONTAINER.appendChild(colorArrayContainer);







colorsArray.forEach((value, index) => {

  //Генерация всех паллеток
  colorPalletesGenerator (value, index, colorArrayContainer);

});













