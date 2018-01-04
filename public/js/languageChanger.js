const eng = {"send":"Send", "createR":" Create Room", "createRText": "Give your Room a name and password", "enter":" Enter Room", "chooseR":"Choose Room",
            "roomN":"Room Name", "passw":"Password", "passwAg":"Password again", "chooseName": "Choose a username", "choose": "Choose","shortRName": "Your room name is too short. At least four characters is required.", "roomCreated": "You successfully created room<strong></strong>", "join": "Join", "shortUName": "Your username is too short. At least five characters is required.", "htmlRemoved": "Character sequence not allowed.", "spacesRemoved": "Spaces not allowed.", "shortPassword": "Your password is too short. At least five characters is required.", "searchRoom": "search room", "passwordRequired": "Type password to enter this Room", "chooseRoomBtn": "Enter Room<span id='login-glyphicon' class='glyphicon glyphicon glyphicon-log-in'></span>", "cancel": "Cancel", "users":"Users", "sign":"Sign up", "leave":"Leave", "download": "Download", "writeMsg": "Write your message here..."};
const ptg = {"send":"Enviar", "createR":" Criar quarto", "createRText": "Dê a sua Sala um nome e senha", "enter":"Entre no quarto",
            "chooseR":"Escolha uma sala para participar", "roomN":"Nome da sala", "passw":"Senha",
            "passwAg":"Senha novamente", "chooseName": "Escolha um nome de usuário", "choose": "escolher", "shortRName": "O nome do seu quarto é muito curto. Pelo menos quatro caracteres são necessários.", "roomCreated": "Você criou espaço com sucesso<strong></strong>", "join": "Junte-se", "shortUName": "Seu nome de usuário é muito curto. Pelo menos cinco caracteres são necessários.", "htmlRemoved": "Não é permitida a sequência de caracteres.", "spacesRemoved": "Espaços não permitidos.", "shortPassword": "Sua senha é muito curta. Pelo menos cinco caracteres são necessários.", "searchRoom": "sala de busca", "passwordRequired": "Digite a senha para entrar nesta sala", "chooseRoomBtn": "Entrar no quarto<span id='login-glyphicon' class='glyphicon glyphicon glyphicon-log-in'></span>", "cancel": "cancelar", "users":"Comercial", "sign":"Inscrever-se", "leave":"sair", "download": "baixar", "writeMsg": "escreva sua mensagem aqui..."};

function changeLanguage(lang) {
  $('#createRoomText').html(lang.createR);
  $('#enterRoomText').html(lang.enter);
  $('#createRoomForm p').html(lang.createRText);
  $('#roomName').attr("placeholder", lang.roomN);
  $('#roomPassword').attr("placeholder", lang.passw);
  $('#roomPasswordAgain').attr("placeholder", lang.passwAg);
  $('#CreateRoom-button').html(lang.createR);
  $('#chooseNameForm p').html(lang.chooseName);
  $('#choosename-button').html(lang.choose);
  $('#short-roomName').html(lang.shortRName);
  $('#roomCreatedMessage').html(lang.roomCreated);
  $('#createdRoom').html(room);
  $('#enter-now-button').html(lang.join);
  $('#short-username').html(lang.shortUName);
  $('#htmlRemoved').html(lang.htmlRemoved);
  $('#spacesRemoved').html(lang.spacesRemoved);
  $('#short-password').html(lang.shortPassword);
  $('#createdRoomsContainer p').html(lang.chooseR);
  $('#roomSearch').attr("placeholder", lang.searchRoom);
  $('#passwordRequired').attr("placeholder", lang.passwordRequired);
  $('#chooseRoom-button').html(lang.chooseRoomBtn);
  $('#backToListing').html(lang.cancel);
  $('#users .tooltiptext').html(lang.users);
  $('#logout .tooltiptext').html(lang.leave);
  $('#download .tooltiptext').html(lang.download);
  $('#textArea').attr("placeholder", lang.writeMsg);
  $('#sendBtn').html(lang.send);

}

$('#portugal-flag').click(function() {
  changeLanguage(ptg);
});

$('#uk-flag').click(function() {
  changeLanguage(eng);
});
