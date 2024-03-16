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