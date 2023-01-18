var addMessage = window.addMessage;
var resizeTextAreas = window.resizeTextAreas;

//Configurando engine
function getEngineValue() {
  engineValue = document.getElementById("engine").value;
  console.log(engineValue)
}
getEngineValue();

function getApiKey() {
    var api_key = document.getElementById("api_key").value;
    return api_key;
}

//Gerando mensagens
function generateText(input) {
    var endpoint = `https://api.openai.com/v1/engines/${engineValue}/completions`;
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getApiKey()}`
        },
        body: JSON.stringify({
            prompt: input,
            temperature: 0.5,
            max_tokens: 2000,
            temperature: 0.5,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0
        })
    })
        .then(response => response.json())
        .then(json => json);
}

document.getElementById("enviar").addEventListener("click", function (e) {
    e.preventDefault();
    let input = document.querySelector("#text_input").value;
    document.querySelector("#text_input").value = "";

    console.log(input);

    let list = document.querySelector(".mensagens_list");
    list.innerHTML += `<div class="user_msg"><textarea readonly>${input.trim()}</textarea> <div class="tokens">Tokens: ${input.split(" ").length}</div><div class="audio_player"><button class="startBtn">Iniciar</button><button class="resetBtn">Resetar</button></div></div>`;
    list.innerHTML += `<div class="jarvis_msg" id="waiting-response"><textarea readonly>Aguardando resposta...</textarea></div>`;
    resizeTextAreas();
    generateText(input)
    .then(output => {
            texto = output.choices[0].text;
            tokens = output.usage.completion_tokens;
            var element_msg = document.querySelector("#waiting-response");
            element_msg.innerHTML = `<textarea readonly>${texto.trim()}</textarea> <div class="tokens">Tokens: ${tokens} | ${engineValue}</div><div class="audio_player"><button class="startBtn">Iniciar</button><button class="resetBtn">Resetar</button></div>`;
            element_msg.id = "";
            addMessage(input, texto);
            resizeTextAreas();
            window.carregarAudios();
            element_msg.querySelector(".audio_player > .startBtn").click();
        });
});

// Resize auto text_input
var text_input = document.querySelector("#text_input");
text_input.addEventListener("input", ajustarTamanhoTextarea);
function ajustarTamanhoTextarea() {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight - 18) + "px";
}