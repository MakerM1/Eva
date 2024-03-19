const helpCards = document.querySelectorAll('.helpCard');
const promtInput = document.getElementById('promptInput')

helpCards.forEach((card) => {
    card.addEventListener('click', () => {
        console.log(card.innerText);
        promtInput.value = card.innerText
    })
})

document.body.onload = () => {
    for (let i = 0; i < helpCards.length; i++) {
        if (helpCards[i].innerText.includes('Gift')) {
            helpCards[i].innerHTML += `<i class="fa-solid fa-gift"></i>`
        } else if (helpCards[i].innerText.includes('Nostalgia')) {
            helpCards[i].innerHTML += `<i class="fa-solid fa-question"></i>`
        } else if (helpCards[i].innerText.includes('Math')) {
            helpCards[i].innerHTML += `<i class="fa-solid fa-calculator"></i>`
        } else if (helpCards[i].innerText.includes('Fact')) {
            helpCards[i].innerHTML +=  `<i class="fa-solid fa-face-surprise"></i>`
        }
    }
}
