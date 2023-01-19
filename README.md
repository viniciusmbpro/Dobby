# Dobby
Um chatbot que usa api da GPT-3, com reconhecimento de fala e reprodução de voz.

Deploy: https://viniciusmbpro.github.io/Dobby/

### index.html
1. Contém uma tag head com meta informações e links para folhas de estilo CSS
2. Contém uma tag body com o conteúdo da página:
    * Cabeçalho com um título "Dobby"
    * Elemento principal com uma div chamada "container" que contém:
        * A div chat e conversas
        * A div de menus hamburguer ( Um para o configurações e outro para conversas )
    * Rodapé com um parágrafo de texto.
3. Inclui vários scripts no final da tag body, adicionando funcionalidade à página como gerenciamento de eventos do usuário, comunicação com uma API de geração de texto

### gerador.js
* Este código JavaScript é usado para adicionar funcionalidade de geração de texto à página HTML.
* Define funções para obter os valores de inputs de configuração do usuário como a chave da API, o número máximo de tokens, temperatura, penalty de frequência e penalty de presença.
* Também define uma função "generateText" para enviar uma solicitação à API OpenAI com esses valores de configuração e retornar uma resposta gerada.
* Ele adiciona um listener de evento de clique ao botão "Enviar" que pega o valor do input do usuário, limpa o input, adiciona a resposta gerada pelo API à lista de mensagens e chama funções para redimensionar as áreas de texto e carregar áudios.
* Ele adiciona também um listener de evento de input ao input do usuário para ajustar o tamanho da caixa de texto automaticamente

### armazenador.js
* Este código JavaScript é usado para adicionar funcionalidade de gerenciamento de conversas à página HTML.
* Ele define uma array "conversations" para armazenar as conversas e funções para salvar e carregar essas conversas do armazenamento local do navegador.
* Ele adiciona uma nova conversa quando o botão "Nova conversa" é clicado, remove uma conversa quando o botão "Deletar" é clicado e adiciona mensagens a uma conversa quando o botão "Enviar" é clicado.
* Ele também tem uma função para editar o título de uma conversa.
* Ele usa a função "getConversation" para recuperar uma conversa específica pelo ID e salva as conversações no armazenamento local do navegador ao adicionar ou remover uma conversa ou adicionar uma mensagem

### audio.js
* Este código JavaScript é usado para adicionar funcionalidade de síntese de fala à página HTML.
* Ele usa a API SpeechSynthesis para reproduzir a mensagem de texto de cada mensagem quando o botão "Iniciar" é clicado e para cancelar a reprodução de áudio quando o botão "Resetar" é clicado.
* Ele cria uma nova instância de SpeechSynthesisUtterance para cada mensagem e define a voz, idioma, velocidade e tom da fala.
* Ele tenta encontrar a primeira voz em português disponível, se não encontrar, usa a primeira voz disponível.
* A função é chamada quando a página é carregada e novamente quando uma nova mensagem é adicionada.

### fala.js
* É uma implementação de reconhecimento de fala para uma aplicação web
* Ele utiliza a API SpeechRecognition do navegador para reconhecer o áudio captado pelo microfone do usuário
* Quando o usuário fala, o áudio é captado e o texto reconhecido é adicionado a uma caixa de texto na página
* O botão "falar" muda de cor para indicar que o reconhecimento de fala está ativo
* Quando o reconhecimento é finalizado, o botão volta a sua cor original
* O reconhecimento está configurado para utilizar a linguagem português (pt-BR) e não fornecer resultados intermediários.

### scripts.js
* Adicionado código para abrir e fechar as seções de conversas e configurações ao clicar nos botões de hambúrguer correspondentes.
* Os botões de hambúrguer são posicionados nas bordas esquerda e direita da tela, respectivamente.
* A seção de conversas é aberta ao clicar no botão hambúrguer esquerdo e fechada ao clicar novamente.
* A seção de configurações é aberta ao clicar no botão hambúrguer direito e fechada ao clicar novamente.
* A largura da seção de chat é ajustada para se adequar às seções abertas.
