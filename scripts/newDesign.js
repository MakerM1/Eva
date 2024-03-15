const uiSwitch = document.getElementById('ui')
const apiConfirm = document.getElementById('apiConfirm')

apiConfirm.addEventListener('click', () => {
    if (uiSwitch.checked) {
        document.body.classList.add('newDesign')
    }
})