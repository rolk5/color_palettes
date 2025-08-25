const menuContainer = document.querySelector('.navBar');

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


const colorMain = document.querySelector('.color');
const colorName = document.createElement('h1')
colorName.innerHTML = 'Орнажевый голубой'
colorMain.prepend(colorName)

//Находим div class="colorpallete"
const colorPallete = document.querySelector('.colorpallete');




let colorBlock;
let colorPalleteBlock;
let colorText;
let n = 11;


let red;
let green;
let blue;

let invertColor

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
   /* console.log(colorPalleteBlock)*/
   console.log(
`${i} R ${red} G ${green} B ${blue}`)
}
