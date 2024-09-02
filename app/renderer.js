
const path = require('path');
const os = require('os');

document.querySelector('#output-path').innerText = path.join(__dirname);


const form = document.querySelector('#image-form');
const slider = document.querySelector('#slider');
const img = document.querySelector('#img');

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const imgPath = img.files[0];
    const quality = slider.value;

    console.log(imgPath, quality);
});

