function fala() {
    // Criar um novo objeto de reconhecimento de fala
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    recognition.onstart = function() {
        console.log("Voz iniciada");
        document.querySelector("#falar").style.background = 'green';
    };

    // Definir as configurações
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;

    // Criar um evento para quando a fala for reconhecida
    recognition.onresult = function(event) {
        var current = event.resultIndex;
        var transcript = event.results[current][0].transcript;
        console.log(transcript);
            if (transcript.length > 0) {
                document.querySelector("#text_input").value += transcript;
                document.querySelector("#enviar").click();
            }
    };

    recognition.onend = function() {
        document.querySelector("#falar").style.background = 'var(--background-two)';
    };      

    // Iniciar o processo de reconhecimento de fala
    // if(recognition.status === "stopped" || recognition.status === "ready"){
    //     recognition.start();
    // }
    recognition.start();
    console.log(recognition);
}
document.getElementById("falar").addEventListener("click", fala);
