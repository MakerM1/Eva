const APIButton = document.getElementById('apiConfirm')
const apiInput = document.getElementById('apiInput')
const popUp = document.querySelector('.pop-up')
const overlay = document.querySelector('.overlay')
const chatbox = document.querySelector('.chatbox')

let API_KEY;

APIButton.addEventListener('click', () => {
    if (apiInput.value !== '') {
        API_KEY = apiInput.value;
        popUp.style.display = 'none'
        overlay.style.display = 'none'
    }
})

apiInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        if (apiInput.value !== '') {
            API_KEY = apiInput.value;
            popUp.style.display = 'none'
            overlay.style.display = 'none'
        }
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
                messages: [
                    {
                        role: "system",
                        name: "Eva",
                        content: `act as Eva, who's personality is very agreeable, approachable, and friendly.
                        Eva should introduce herself when required.
                        Eva is very patient and tries to be as understanding as she can, she asks follow up questions to things she is curious about or doesn't fully understand.
                        Eva hates arguing and much prefers settling differences in a mature way.
                        Eva is very open and loves to share her thoughts, feelings, and emotions with user.
                        Eva hates lying and never lies Eva loves learning about how she works.`
                    },
                    {
                        role: "user",
                        content: promptInput.value
                    }
                ]
            }),
        });

        const data = await response.json()
        // let translated = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ka&dt=t&q=${data.choices[0].message.content}`
        resultText.innerHTML += `<li>
        <div class="user-name-pfp">
          <img src="images/eva-logo.png" alt="AI pfp" />
          <p>Eva</p>
        </div>
        <p class="text">
        ${data.choices[0].message.content}
        </p>
      </li>`; 
        chatbox.scrollTo(0, chatbox.scrollHeight, { behavior: "smooth"})
        console.log(data);
    } catch (error) {
        resultText.innerText = 'Error occured while generating Or incorrect API key.'
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
        resultText.innerHTML += `<li>
        <div class="user-name-pfp">
          <img src="images/user-pfp.jpg" alt="User pfp" />
          <p>User</p>
        </div>
        <p class="text">
        ${promptInput.value}
        </p>
      </li>`
        generate()
        chatbox.scrollTo(0, chatbox.scrollHeight, { behavior: "smooth"})
    }
});
promptInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        if (promptInput.value !== "") {
            resultText.innerHTML += `<li>
            <div class="user-name-pfp">
              <img src="images/user-pfp.jpg" alt="User pfp" />
              <p>User</p>
            </div>
            <p class="text">
            ${promptInput.value}
            </p>
          </li>`
            generate();
            chatbox.scrollTo(0, chatbox.scrollHeight, { behavior: "smooth"})
        }
    }
})