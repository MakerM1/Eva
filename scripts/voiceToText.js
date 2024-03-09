document.getElementById('click_to_convert').addEventListener('click', () => {
    let speech = true;
    window.speechRecognition = window.webkitSpeechRecognition
    const recognition = new speechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener('result', (e) => {
        const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)

        document.getElementById('convert_text').innerHTML = transcript;
    })

    if (speech == true) {
        recognition.start()
    }
})