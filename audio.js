function carregarAudios() {
    var mensagens = document.querySelectorAll(".mensagens_list > div");

    for (var i = 0; i < mensagens.length; i++) {
        // Obtém botões de cada mensagem
        var startBtn = mensagens[i].querySelector(".audio_player > .startBtn");
        var resetBtn = mensagens[i].querySelector(".audio_player > .resetBtn");
        // Obtém textarea de cada mensagem
        var textArea = mensagens[i].querySelector("textarea");
        // Cria uma nova instância de SpeechSynthesisUtterance para cada mensagem
        var msg = new SpeechSynthesisUtterance();
        // Obtém vozes em português
        var voices = speechSynthesis.getVoices();
        var ptVoice;
        for(var j = 0; j < voices.length; j++) {
          if(voices[j].lang === 'pt-BR') {
            ptVoice = voices[j];
            break;
          }
        }
        // Se não achar nenhuma voz em português, usará a primeira voz disponível
        if(!ptVoice) {
          ptVoice = voices[0];
        }
        msg.voice = ptVoice;
        msg.lang = 'pt-BR';
        msg.rate = 1.5;
        msg.pitch = 1.5;
        // Adiciona eventos de clique para os botões
        startBtn.addEventListener("click", (function(msg) {
            return function() {
                msg.text = this.parentNode.parentNode.querySelector("textarea").value;
                speechSynthesis.speak(msg);
            };
        })(msg));
        
        resetBtn.addEventListener("click", (function(msg) {
            return function() {
                speechSynthesis.cancel(msg);
            };
        })(msg));
    }    
}
window.carregarAudios = carregarAudios;