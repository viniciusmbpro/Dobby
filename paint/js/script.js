var isRecognizing = false;
var recognition;
var audioContext;
var analyser;
var microphone;
var scriptProcessor;
var frequencyDataArray;
var currentColor = "#000000";
var currentBrushSize = 5;
var isDrawing = false;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function setupRecognition() {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    recognition.onstart = function() {
        console.log("Voz iniciada");
        document.querySelector("#falar").classList.add('active');
        document.querySelector("#falar .text").textContent = 'Parar';
    };

    recognition.lang = 'pt-BR';
    recognition.interimResults = false;

    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript.toLowerCase();
        console.log(transcript);

        if (transcript.includes("vermelho")) {
            currentColor = "#ff0000";
        } else if (transcript.includes("verde")) {
            currentColor = "#00ff00";
        } else if (transcript.includes("azul")) {
            currentColor = "#0000ff";
        } else if (transcript.includes("preto")) {
            currentColor = "#000000";
        } else if (transcript.includes("branco")) {
            currentColor = "#ffffff";
        }
        ctx.strokeStyle = currentColor;
    };

    recognition.onend = function() {
        if (isRecognizing) {
            recognition.start();
        } else {
            document.querySelector("#falar").classList.remove('active');
            document.querySelector("#falar .text").textContent = 'Falar';
        }
    };
}

function startRecognition() {
    if (!recognition) {
        setupRecognition();
    }
    recognition.start();
    isRecognizing = true;
}

function stopRecognition() {
    if (recognition) {
        recognition.stop();
    }
    isRecognizing = false;
    document.querySelector("#falar").classList.remove('active');
    document.querySelector("#falar .text").textContent = 'Falar';
}

function startMicrophone() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    scriptProcessor = audioContext.createScriptProcessor(256, 1, 1);
    analyser.fftSize = 256;
    frequencyDataArray = new Uint8Array(analyser.frequencyBinCount);

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);
            analyser.connect(scriptProcessor);
            scriptProcessor.connect(audioContext.destination);

            scriptProcessor.onaudioprocess = function() {
                analyser.getByteFrequencyData(frequencyDataArray);
                var averageFrequency = frequencyDataArray.reduce((a, b) => a + b, 0) / frequencyDataArray.length;
                var color = `rgb(${Math.min(averageFrequency + 100, 255)}, ${Math.max(150 - averageFrequency, 0)}, 255)`;
                document.querySelector("#falar").style.background = color;
            };
        })
        .catch(function(err) {
            console.error('Erro ao acessar o microfone:', err);
        });
}

document.getElementById("falar").addEventListener("click", function() {
    if (audioContext && audioContext.state === 'running') {
        stopRecognition();
        audioContext.close();
        audioContext = null;
    } else {
        startMicrophone();
        startRecognition();
    }
});

canvas.width = window.innerWidth - 200; // Adjusting canvas width
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth - 200;
    canvas.height = window.innerHeight;
});

canvas.addEventListener('mousedown', function(e) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - 200, e.clientY); // Adjusting for sidebar
});

canvas.addEventListener('mousemove', function(e) {
    if (isDrawing) {
        ctx.lineTo(e.clientX - 200, e.clientY); // Adjusting for sidebar
        ctx.stroke();
    }
});

canvas.addEventListener('mouseup', function() {
    isDrawing = false;
});

canvas.addEventListener('mouseout', function() {
    isDrawing = false;
});

document.getElementById('brush-size').addEventListener('input', function(e) {
    currentBrushSize = e.target.value;
    ctx.lineWidth = currentBrushSize;
});

document.getElementById('color-picker').addEventListener('input', function(e) {
    currentColor = e.target.value;
    ctx.strokeStyle = currentColor;
});

ctx.strokeStyle = currentColor;
ctx.lineWidth = currentBrushSize;
