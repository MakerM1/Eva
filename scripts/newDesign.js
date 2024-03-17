const uiSwitch = document.getElementById('ui')
const apiConfirm = document.getElementById('apiConfirm')
const ai = document.getElementById('ai')
const verAiChoice = document.getElementById('ver')
const asSwitch = document.querySelector('.ai-switch')

apiConfirm.addEventListener('click', () => {
    if (uiSwitch.checked) {
        document.body.classList.add('newDesign')
    } else {
        document.body.classList.remove('newDesign')
    }
})

asSwitch.addEventListener('click', () => {
    if (ai.hasAttribute('src')) {
        ai.removeAttribute('src')

        if (verAiChoice.checked) {
            ai.setAttribute('src', 'scripts/geminiTest.js')
        } else {
            ai.setAttribute('src', 'scripts/index.js')
        }
    }
    
    if (verAiChoice.checked) {
        ai.setAttribute('src', 'scripts/geminiTest.js')
    } else {
        ai.setAttribute('src', 'scripts/index.js')
    }
})