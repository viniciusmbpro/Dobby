var isRecognizing = false;
var recognition;

function fala() {
    // Criar um novo objeto de reconhecimento de fala, se não existir
    if (!recognition) {
        var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();

        recognition.onstart = function() {
            console.log("Voz iniciada");
            document.querySelector("#falar").style.background = 'green';
        };

        // Definir as configurações
        recognition.lang = 'pt-BR';
        recognition.interimResults = true; // Permitir resultados intermediários

        // Criar um evento para quando a fala for reconhecida
        recognition.onresult = function(event) {
            var transcript = '';
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                transcript += event.results[i][0].transcript;
            }
            console.log(transcript);
            if (transcript.length > 0) {
                document.querySelector("#text_input").value = transcript;
            }
        };

        recognition.onend = function() {
            if (isRecognizing) {
                recognition.start(); // Reiniciar reconhecimento se ainda estiver ativo
            } else {
                document.querySelector("#falar").style.background = 'var(--background-two)';
            }
        };
    }

    if (isRecognizing) {
        recognition.stop();
        isRecognizing = false;
        document.querySelector("#falar").style.background = 'var(--background-two)';
    } else {
        recognition.start();
        isRecognizing = true;
        document.querySelector("#falar").style.background = 'green';
    }
}

document.getElementById("falar").addEventListener("click", fala);
