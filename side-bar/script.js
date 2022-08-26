const hide_button = document.getElementById('hide-button');
const show_button = document.getElementById('show-button');

hide_button.addEventListener('click',()=>{
    document.querySelector('#menu').style.visibility='hidden';

})

show_button.addEventListener('click',()=>{
    document.querySelector('#menu').style.visibility='visible';
    document.querySelector('#menu').style.transition='visibility 2s linear,opacity 1s linea';

})