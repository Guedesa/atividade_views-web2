function arquivar() {
    var texto = document.getElementById("texto").value;
    var caixa = document.createElement("span");
    var div = document.createElement("div");
    document.body.appendChild(div);
    div.id = "cadastro";
    caixa.id = "assunto";
    caixa.innerHTML = texto;
    div.appendChild(caixa);
    div.classList.add("div-shadow");
  
    var data = document.getElementById("data").value;
    var hora = document.getElementById("hora").value;
    var dataHora = document.createElement("p");
    dataHora.innerHTML = " Dados: " + data + " às " + hora;
    div.appendChild(dataHora);
  
    var excluir = document.createElement("button");
    excluir.id = "excluir";
    excluir.classList = "btn-add";
    excluir.innerHTML = "apagar";
    div.appendChild(excluir);
    excluir.onclick = apagar;
  
    var modificar = document.createElement("button");
    modificar.id = "Editar";
    modificar.classList = "btn-add";
    modificar.innerHTML = "Editar ";
    div.appendChild(modificar);
    modificar.onclick = editar;
  
    function editar() {
      var inputEditar = document.createElement("input");
      inputEditar.type = "text";
      inputEditar.value = caixa.innerHTML;
      div.insertBefore(inputEditar, caixa);
      caixa.style.display = "none";
      modificar.style.display = "none";
  
      var confirmarEdicao = document.createElement("button");
      confirmarEdicao.innerHTML = "Confirmar";
      div.insertBefore(confirmarEdicao, caixa);
      confirmarEdicao.onclick = function () {
        var novoNome = inputEditar.value;
        if (novoNome.trim() === "") {
          caixa.innerHTML = texto;
        } else {
          caixa.innerHTML = novoNome;
        }
        inputEditar.remove();
        caixa.style.display = "inline";
        modificar.style.display = "inline";
        confirmarEdicao.remove();
      };
    }
  
    function apagar() {
      div.remove();
    }
  }
  