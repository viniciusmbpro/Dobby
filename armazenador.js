var conversa_atual = 1;
let list = document.querySelector(".conversas ol");

// Create an array to store the conversations
let conversations = [
    {
        id: 1,
        title: "Conversa 1",
        messages: [
        ]
    }
];

// Save the conversations to a browser's local storage
function saveConversations() {
    let json = JSON.stringify(conversations);
    localStorage.setItem("conversations", json);
    console.log('Conversations saved to browser local storage');
}

// Load the conversations from the browser's local storage
function loadConversations() {
    let json = localStorage.getItem("conversations");
    if (json) {
        conversations = JSON.parse(json);
        console.log('Conversations loaded from browser local storage');
    }
}

// function downloadConversations() {
//     let json = localStorage.getItem("conversations");
//     if (json) {
//         let blob = new Blob([json], { type: 'application/json' });
//         saveAs(blob, 'conversations.json');
//         console.log('Conversations downloaded');
//     }
// }
// window.dwc = downloadConversations;


// Add a new conversation
function addConversation(title) {
    let id = conversations.length + 1;
    let conversation = {
        id: id,
        title: title + id,
        messages: []
    };
    conversations.push(conversation);
    saveConversations();
    let list = document.querySelector(".conversas ol");
    displayOneConversation(conversation, list);
    console.log('Conversation added: ' + title);
}
document.getElementById("nova_conversa").addEventListener("click", function (e) {
    addConversation('Conversa ');
});

// Remove a conversation
function removeConversation(id) {
    let index = -1;
    for (let i = 0; i < conversations.length; i++) {
        if (conversations[i].id == id) {
            index = i;
            break;
        }
    }
    if (index !== -1) {
        let title = conversations[index].title;
        conversations.splice(index, 1);
        saveConversations();
        displayConversations();
        console.log('Conversation removed: ' + title);
    } else {
        console.log('Conversation not found: ' + id);
    }
}
list.addEventListener("click", function(event) {
    let target = event.target;
    if (target.innerHTML === "Deletar") {
        let id = target.parentNode.querySelector("input").value;
        console.log(id);
        removeConversation(id);
    }
});

// Add a message to a conversation
function addMessage(user, jarvis) {
    let conversation = conversations[getConversation(conversa_atual)];
    if (conversation) {
        let message = {
            user: user,
            jarvis: jarvis,
            timestamp: new Date().toISOString()
        };
        conversation.messages.push(message);
        saveConversations();
        console.log('Message added to conversation: ' + conversa_atual);
    } else {
        console.log('Conversation not found: ' + conversa_atual);
    }
}
window.addMessage = addMessage;

// Edit a conversation
function editConversation(id, p) {
    conversations[getConversation(id)].title = p.innerHTML;
    saveConversations();
    console.log('Conversation edited: ' + p.innerHTML);
}
list.addEventListener("click", function(event) {
    var target_executable = 1;
    let target = event.target;
    if (target.innerHTML === "Salvar" && target_executable) {
        target_executable = 0;
        let id = target.parentNode.querySelector("input").value;
        let p = target.parentNode.querySelector("p");
        p.contentEditable = false;
        console.log(id);
        target.innerHTML = "Editar";
        target.style.background = "var(--secondary)";
        editConversation(id, p);
    }
    if (target.innerHTML === "Editar" && target_executable) {
        target_executable = 0;
        let p = target.parentNode.querySelector("p");
        p.contentEditable = true;
        p.focus();
        target.innerHTML = "Salvar";
        target.style.backgroundColor = "green";
    }
});

// Get a conversation by id
function getConversation(id) {
    for (let i = 0; i < conversations.length; i++) {
        if (conversations[i].id == id) {
            return i;
        }
    }
    return null;
}

function displayConversations() {
    let list = document.querySelector(".conversas ol");
    list.innerHTML = "";
    for (let i = 0; i < conversations.length; i++) {
        let conversation = conversations[i];
        displayOneConversation(conversation, list);
    }
}
function displayOneConversation(conversation, list) {
    let li = document.createElement("li");

    let p = document.createElement("p");
    p.innerHTML = conversation.title;
    li.appendChild(p);

    let input_id = document.createElement("input");
    input_id.type = "hidden";
    input_id.value = conversation.id;
    li.appendChild(input_id);        

    let editButton = document.createElement("button");
    editButton.innerHTML = "Editar";
    li.appendChild(editButton);

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Deletar";
    li.appendChild(deleteButton);

    list.appendChild(li);
}

// Add event listeners to the conversation list items
function addListeners() {
    let list = document.querySelector(".conversas ol");
    list.addEventListener("click", function(event) {
        let target = event.target;
        if (target.tagName === "P") {
            let id = target.parentNode.querySelector("input").value;
            console.log(id);
            conversa_atual = id;
            let conversation = conversations[getConversation(id)];

            let list = document.querySelector(".mensagens_list");
            list.innerHTML = "";
            for (let i = 0; i < conversation.messages.length; i++) {
                list.innerHTML += `<div class="user_msg"><textarea readonly>${conversation.messages[i].user.trim()}</textarea> <div class="tokens">Tokens: ${conversation.messages[i].user.split(" ").length} | ${conversation.messages[i].timestamp}</div><div class="audio_player"><button class="startBtn">Iniciar</button><button class="resetBtn">Resetar</button></div></div>`;

                list.innerHTML += `<div class="jarvis_msg"><textarea readonly>${conversation.messages[i].jarvis.trim()}</textarea> <div class="tokens">Tokens: ${conversation.messages[i].jarvis.split(" ").length} | ${conversation.messages[i].timestamp}</div><div class="audio_player"><button class="startBtn">Iniciar</button><button class="resetBtn">Resetar</button></div></div>`;
            }
            resizeTextAreas();
            window.carregarAudios();
        }
    });
    list.querySelector("li p").click();
    window.carregarAudios();
}

function resizeTextAreas() {
    var textareas = document.querySelectorAll(".mensagens_list > div textarea");
    for (var i = 0; i < textareas.length; i++) {
        // var tam = textareas[i].innerHTML.slice(0, 100).length;
        // textareas[i].style.width = 8+tam/4 + "rem";
        // textareas[i].style.width = "300px";

        textareas[i].cols = "60";
        textareas[i].style.height = "auto";
        textareas[i].style.height = textareas[i].scrollHeight + "px";
    }
}
window.resizeTextAreas = resizeTextAreas;

// Initialize the application
loadConversations();
displayConversations();
addListeners();
