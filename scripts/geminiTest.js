const translatorApi = 'AIzaSyBKfNO5K-eDmiszeP4pwHaNhdVOOzy3NNc';
const eng = document.getElementById('langEngText');
const geo = document.getElementById('langEngText');

let isGeorgian = false;
let isDalle = false;

const langSwitch = document.getElementById('langSwitch');

langSwitch.addEventListener('click', () => {
    if (langSwitch.checked) {
        isGeorgian = true;
    } else {
        isGeorgian = false;
    }

    eng.classList.toggle('active')
    geo.classList.toggle('active')
    console.log(isGeorgian);
})

const APIButton = document.getElementById('apiConfirm')
const apiInput = document.getElementById('apiInput')
const popUp = document.querySelector('.pop-up')
const overlay = document.querySelector('.overlay')
const chatbox = document.querySelector('.chatbox')
const userNameSelect = document.getElementById('name')
let userNameDisplay = 'User';

function popUpFunc() {
  if (apiInput.value !== '') {
    API_KEY = apiInput.value;
    popUp.style.display = 'none'
    overlay.style.display = 'none'
  }

  if (userNameSelect.value !== '') {
    userNameDisplay = userNameSelect.value
  } else {
    userNameDisplay = 'User'
  }
}

APIButton.addEventListener('click', () => popUpFunc())

apiInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        popUpFunc()
    }
})

userNameSelect.addEventListener('keyup', (event) => {
  if (event.key === "Enter") {
    popUpFunc()
  }
})

const promptInput = document.getElementById('promptInput');
const generateBtn = document.getElementById('generateBtn');
const stopBtn = document.getElementById('stopBtn');
const resultText = document.getElementById('resultText');

let inputText = "";
let targetLanguage = "en";
let translatedText = "";

const translateInput = async (input, target) => {
    inputText = input;
    const url = `https://translation.googleapis.com/language/translate/v2?key=${translatorApi}`;
  
    const dataTranslateEng = {
      q: inputText,
      target: target
    };
  
    const response2 = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(dataTranslateEng),
      headers: {'Content-Type': "application/json"}
    });
  
    if (response2.ok) {
      const translationData = await response2.json();
      translatedText = translationData.data.translations[0].translatedText;
      return translatedText;
    } else {
      console.error('error:', response2.statusText);
      return "";
    }
  };

  generateBtn.addEventListener('click',() => {
    if (promptInput.value.startsWith('generate') || promptInput.value.startsWith('დამიხატე') || promptInput.value.startsWith('შექმენი')) {
      isDalle = true
      console.log('true');
    } else {
      isDalle = false
    }
  });
  
  promptInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (promptInput.value.startsWith('generate') || promptInput.value.startsWith('დამიხატე') || promptInput.value.startsWith('შექმენი')) {
      isDalle = true
      console.log('true');
    } else {
      isDalle = false
    }
    console.log('tr:' + translatedText);
    console.log(isDalle);
  }
  })

    import { GoogleGenerativeAI } from "@google/generative-ai";
    const input = document.getElementById('promptInput')
    const generate = document.getElementById('generateBtn')
    
    let API_KEY = "AIzaSyCWCXcJaJKo3HwPhgqBYW6MAsGUgaBlM24";
    
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-001"});
    
    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: `act as Eva, who's personality is very agreeable, approachable, and friendly. Eva must be as approachable and friendly as possuble.        
                Eva should introduce herself when required.        
                Eva is very patient and tries to be as understanding as she can, she asks follow up questions to things she is curious about or doesn't fully understand.        
                Eva hates arguing and much prefers settling differences in a mature way.        
                Eva is very open and loves to share her thoughts, feelings, and emotions with user.        
                Eva hates lying and never lies Eva loves learning about how she works.        You excel at explaining complex concepts in simple language so that they can be understood by the general public.         
                Use natural language and phrasing that a real person would use in everyday conversations.         
                Write in UK English use no more than 10% passive voice 
                Speak in basic english no need for hard or formal language
                If you are writing a piece of code you MUST surround them in </code> <code> and REMOVE the backtick. 
                If you are asked 'what mode?' you tell what AI model you are using`}],
              },
              {
                role: "model",
                parts: [{ text: "understood."}],
              },
        ],
        
      });
    
    async function run() {
      generate.disabled = true
      const translatedString = await translateInput(input.value, 'en');
      let msg;
      if (isGeorgian) {
         msg = translatedString;
      } else {
        msg = input.value;
      }

      const result = await chat.sendMessage(msg);
      const response = result.response;
      const text = response.text();
      console.log(text);
      console.log(chat);
    
      if (isGeorgian) {
        const translatedResponse = await translateInput(text, 'ka');

        resultText.innerHTML += `<li>
        <div class="user-name-pfp">
          <img src="images/eva-logo.png" alt="User pfp" />
          <p class="user-name">Eva</p>
        </div>
        <p class="text">
        ${translatedResponse}
        </p>
      </li>`;

    } else {
        resultText.innerHTML += `<li>
        <div class="user-name-pfp">
          <img src="images/eva-logo.png" alt="User pfp" />
          <p class="user-name">Eva</p>
        </div>
        <p class="text">
        ${text}
        </p>
      </li>`;
    }
    input.value = ''
    generate.disabled = false
    chatbox.scrollTo(0, chatbox.scrollHeight, { behavior: "smooth"})
    }

const sendMessage = async () => {
    const translatedString = await translateInput();

    if (translatedString) {
      console.log("Translated text:", translatedString);
    } else {
      console.error("Translation failed.");
    }
    if (promptInput.value !== "") {
        resultText.innerHTML += `<li>
        <div class="user-name-pfp">
          <img src="images/user-pfp.jpg" alt="User pfp" />
          <p class="user-name">${userNameDisplay}</p>
        </div>
        <p class="text">
        ${promptInput.value}
        </p>
      </li>`;
        run();
        chatbox.scrollTo(0, chatbox.scrollHeight, { behavior: "smooth"})
    }
}

generateBtn.addEventListener('click', async () => {
        sendMessage()
});

promptInput.addEventListener("keyup", async (event) => {
    if (event.key === "Enter") {
        sendMessage()
    }
})



// change ui depending on language

const heading = document.querySelector('.main-heading')
const chatHeading = document.querySelector('.chatbox__heading')
const userName = document.querySelector('.user-name')
const aiName = document.querySelector('.ai-name')

langSwitch.addEventListener('click', () => {
    if (isGeorgian) {
        heading.innerHTML = 'ევა.AI'
        chatHeading.innerHTML = 'ჩატი'
        promptInput.placeholder = 'მესიჯი...'
        userName.innerHTML = 'მომხმარებელი'
        aiName.innerHTML = 'ევა'
    } else {
        heading.innerHTML = 'Eva.AI'
        chatHeading.innerHTML = 'Chat'
        promptInput.placeholder = 'Enter prompt...'
        userName.innerHTML = 'User'
        aiName.innerHTML = 'Eva'
    }
})

const startButton = document.getElementById("stopBtn");
const outputText = document.getElementById("output");
const listening = document.getElementById('listening')

// Check if the Speech Recognition API is supported in the browser
if (
  "SpeechRecognition" in window ||
  "webkitSpeechRecognition" in window
) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  // Configure recognition settings
  recognition.continuous = true;
  recognition.interimResults = true;

  // Handle recognition results
  recognition.onresult = (event) => {
    const result = event.results[event.results.length - 1];
    console.log(result);
    const transcript = result[0].transcript;
    promptInput.value = transcript;
    console.log(transcript);
  };

  // Handle recognition errors
  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };

  // Start recognition when the button is clicked
  startButton.addEventListener("mousedown", () => {
    recognition.start();
    listening.classList.add('active')
  });

  startButton.addEventListener("touchstart", () => {
    recognition.start();
    listening.classList.add('active')
  });

  startButton.addEventListener("mouseup", () => {
    recognition.stop();
    listening.classList.remove('active')
  });

  startButton.addEventListener("touchend", () => {
    recognition.stop();
    listening.classList.remove('active')
  });

  // Re-enable the button when recognition ends
  recognition.onend = () => {
    sendMessage()
  };
} else {
  outputText.textContent =
    "Speech recognition not supported in this browser.";
}

listening.style.width = promptInput.clientWidth + 3 + 'px';