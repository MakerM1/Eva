const translatorApi = 'AIzaSyBKfNO5K-eDmiszeP4pwHaNhdVOOzy3NNc';
const tartgetLanguage = 'ka';
let isGeorgian = false;

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

    let convos = [{
        role: "system",
        name: "Eva",
        content: `act as Eva, who's personality is very agreeable, approachable, and friendly.
        Eva Must act as human as possible.
        Eva must be as approachable and friendly as possuble.
        Eva should introduce herself when required.
        Eva is very patient and tries to be as understanding as she can, she asks follow up questions to things she is curious about or doesn't fully understand.
        Eva hates arguing and much prefers settling differences in a mature way.
        Eva is very open and loves to share her thoughts, feelings, and emotions with user.
        Eva hates lying and never lies Eva loves learning about how she works.`
    },
    {
        role: "user",
        content: promptInput.value
    }]

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
                messages: convos
            }),
        });

        const data = await response.json()
        const translate = async () => {
            const text = data.choices[0].message.content;
            const url = `https://translation.googleapis.com/language/translate/v2?key=${translatorApi}`

            const dataTranslate =  {
                q: text,
                target: tartgetLanguage
            };

            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(dataTranslate),
                headers: {'Content-Type': "application/json"}
            });

            if (response.ok) {
                const translationData = await response.json();
                let translatedText = translationData.data.translations[0].translatedText;

                resultText.innerHTML += `<li>
                <div class="user-name-pfp">
                  <img src="images/eva-logo.png" alt="AI pfp" />
                  <p>Eva</p>
                </div>
                <p class="text">
                ${data.choices[0].message.content}
                <br />
                Georgian: ${translatedText}
                </p>
              </li>`; 
            } else {
                console.log(translatedText);
                console.error('error:', response.statusText)
            }
        }

        if (isGeorgian) {
            translate()
        } else {
            resultText.innerHTML += `<li>
            <div class="user-name-pfp">
              <img src="images/eva-logo.png" alt="AI pfp" />
              <p>Eva</p>
            </div>
            <p class="text">
            ${data.choices[0].message.content}
            </p>
          </li>`; 
        }
      let AiReply = {
        role: 'assistant',
        name: "eva",
        content: data.choices[0].message.content
      };

        convos.push(AiReply)
        chatbox.scrollTo(0, chatbox.scrollHeight, { behavior: "smooth"})
        console.log(data);
    } catch (error) {
        resultText.innerHTML = `<p class="error">
        <i class="fa-solid fa-circle-exclamation"></i>
        <span>404:</span> Error occured while generating or incorrect API
        key.
      </p>`
      let errorText = {
        role: 'system',
        name: 'eva',
        content: 'if you recieve this it means an error occured during chatting, apologize to the user due to the error.'
    }
    convos.push(errorText)
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
      let userReply = {
        role: "user",
        content: promptInput.value
    }
    convos.push(userReply)
        generate();
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
          let userReply = {
            role: "user",
            content: promptInput.value
        }
        convos.push(userReply)
            generate();
            chatbox.scrollTo(0, chatbox.scrollHeight, { behavior: "smooth"})
        }
    }
})