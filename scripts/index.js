const APIButton = document.getElementById('apiConfirm')
const apiInput = document.getElementById('apiInput')
const popUp = document.querySelector('.pop-up')
const overlay = document.querySelector('.overlay')

let API_KEY;

APIButton.addEventListener('click', () => {
    if (apiInput.value !== '') {
        API_KEY = apiInput.value;
        popUp.style.display = 'none'
        overlay.style.display = 'none'
    }
})
const API_URL = 'https://api.openai.com/v1/chat/completions';

const promptInput = document.getElementById('promptInput');
const generateBtn = document.getElementById('generateBtn');
const stopBtn = document.getElementById('stopBtn');
const resultText = document.getElementById('resultText');

const generate = async () => {
    generateBtn.disabled = true;

    if (generateBtn.disabled === true) {
        generateBtn.innerHTML = `<i class="fa-solid fa-spinner"></i>`
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: promptInput.value}]
            }),
        });

        const data = await response.json()
        // let translated = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ka&dt=t&q=${data.choices[0].message.content}`
        resultText.innerHTML += `<li class="ai-message">
        ${data.choices[0].message.content}</li>`; 
        console.log(data);
    } catch (error) {
        resultText.innerText = 'Error occured while generating.'
        console.error('Error: ', error);
    } finally {
        generateBtn.disabled = false;

        if (generateBtn.disabled === false) {
            generateBtn.innerHTML = `<i class="fa-solid fa-location-arrow"></i>`
            promptInput.value = ''
        }
    }
}

generateBtn.addEventListener('click', () => {
    if (promptInput.value !== "") {
        resultText.innerHTML += `<li>${promptInput.value}</li>`
        generate()
    }
});
promptInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        if (promptInput.value !== "") {
            resultText.innerHTML += `<li>${promptInput.value}</li>`
            generate();
        }
    }
})