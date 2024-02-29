const API_KEY = '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';
const API_URL = 'https://api.openai.com/v1/chat/completions';

const promptInput = document.getElementById('promptInput');
const generateBtn = document.getElementById('generateBtn');
const stopBtn = document.getElementById('stopBtn');
const resultText = document.getElementById('resultText');

const generate = async () => {

    if (!promptInput.value) {
        alert("Please enter a prompt.");
        return;
    }

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
        }
    }
}

generateBtn.addEventListener('click', () => {
    if (promptInput.value !== "") {
        resultText.innerHTML += `<li>${promptInput.value}</li>`
    }
    generate()
});
promptInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        if (promptInput.value !== "") {
            resultText.innerHTML += `<li>${promptInput.value}</li>`
        }
        generate();
    }
})