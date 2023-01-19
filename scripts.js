// Conversas
var ham_conv = document.getElementById("hamburguer_conv");
ham_conv.addEventListener("click", function(){
  if(ham_conv.parentNode.querySelector(".conversas").style.display === "none"){
    ham_conv.parentNode.querySelector(".conversas").style.display = "block";
    ham_conv.parentNode.querySelector(".chat").style.width = "100%";

    ham_conv.style.left = ham_conv.parentNode.querySelector(".conversas").offsetWidth + "px";
  } else {
    ham_conv.parentNode.querySelector(".conversas").style.display = "none";
    ham_conv.parentNode.querySelector(".chat").style.width = "100%";

    ham_conv.style.left = "0px";
  }
});
ham_conv.style.left = ham_conv.parentNode.querySelector(".conversas").offsetWidth + "px";

// Configurações
var ham_config = document.getElementById("hamburguer_config");
ham_config.addEventListener("click", function(){
  if(ham_config.parentNode.querySelector(".configuracoes").style.display === "none"){
    ham_config.parentNode.querySelector(".configuracoes").style.display = "block";

    ham_config.style.right = ham_config.parentNode.querySelector(".configuracoes").offsetWidth + "px";
  } else {
    ham_config.parentNode.querySelector(".configuracoes").style.display = "none";

    ham_config.style.right = "0px";
  }
});
ham_config.style.right = ham_config.parentNode.querySelector(".configuracoes").offsetWidth + "px";