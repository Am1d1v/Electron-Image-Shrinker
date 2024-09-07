
const path = require('path');
const os = require('os');
const {ipcRenderer} = require('electron');

// Show path
document.querySelector('#output-path').innerText = path.join(__dirname);

const form = document.querySelector('#image-form');
const slider = document.querySelector('#slider');
const img = document.querySelector('#img');
const qualitySlider = document.querySelector('#quality');

// Show picture change quality while slider moving
slider.addEventListener('change', () => {
    qualitySlider.innerText = slider.value;
})

// 
form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const imgPath = __dirname;
    const quality = slider.value;

    ipcRenderer.send('image:minimize', {
        imgPath,
        quality
    });
});


