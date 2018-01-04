var userID = getCookie("userID");
var chatID = getCookie("chatID");
var socket;
var lastMessage = 0;
//var userName = $('#username').val();
var rooms = document.getElementById("createdRooms");
var roomCount = 0;
var userCount = 0;
var users = {};

window.onload = function(){
  if(getCookie("loggedIn") == 1){
    $('#modal').modal('toggle');
    listUsers();
    joinRoom();
  }
}

// Aseta keksi, field = keksin nimi ja value = keksin arvo
function setCookie(field,value) {
  document.cookie = field+"="+value+";";
}

// Hae keksi nimellä, palauttaa pelkän arvon
function getCookie(field) {
    var name = field + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

//Hae aika
function getTime(){
  $.post("/api/get_time", function(data){
    return data;
  })
}

//Lisää käyttäjän kantaan ja palauttaa ID:n
function createUser(){
  var sendInfo = {
    name : $('#username').val()
  };

  api_ajax('/users/create', sendInfo, {
      success: function (data) {
          setCookie("userID", data.result.id);
      }
  });
}

//Listaa käyttäjät ja lisää ne #group-users elementtiin listamuodossa.
function listUsers(){
  var sendInfo = {
      chat_id: getCookie('chatID')
    };

  api_ajax("/users/list", sendInfo, {
      success: function (data) {
          //console.log(data);
          for(var i=userCount; i<data.result.length; i++){
              //users.push(data.result[i].name);
              users[data.result[i].id] = {name:data.result[i].name};
              $("#userlist").append("<li>" + data.result[i].name + "</li>");
          }
          userCount = data.result.length;
          $("#users-amount").html(userCount);

      }
  });
}


function createRoom(){
  var sendInfo = {
    name: $("#roomName").val(),
    password: $("#roomPassword").val()
    };

  api_ajax("/rooms/create", sendInfo, {
      success: function (data) {
          this.chatID = data.result;
      }
  });
}

function joinRoom(){
  console.log("joinRoom() kutsuttu");
  let password = $("#passwordRequired").val();
  console.log("Salasana: "+password);
  var sendInfo = {
    chat_id:getCookie('chatID'),
    user_id: getCookie('userID'),
    password: password
    //password: $("#passwordRequired").val()
    };

    api_ajax("/rooms/join", sendInfo, {
        success: function (data) {
            console.log("1 = Kirjautuminen onnistui, 0 = epäonnistui");
            console.log("Tulos:"+data.result);
            if(data.result === 1){
                //Onko käyttäjä huoneessa 1 = on, 0 = ei
                  $('#roomSelected').fadeOut(150);/*
                  if(getCookie('userID') == undefined ){
                    $('#chooseNameForm').delay(150).fadeIn(150);
                  } */
                    $('#modal').modal('toggle');

                  clearFields();
                  setCookie("loggedIn","1",)
                  connectSocket();
              } else {
                  $('#wrong-password').fadeIn(150);
                  $('#wrong-password').delay(5000).fadeOut(150);
              }
              updateMessages();
              listUsers();
            }
        });
    }


function connectSocket() {
  socket = io("http://10.114.34.17:5000/", {query: {chat_id: getCookie('chatID'), user_id: getCookie('userID'), token:"asd"}});
    var ws = new Workspace(document.getElementById("working-area"), fetchWorkspace, editWorkSpace, updateWorkspace);


  socket.on('update workspace', (param) => {
       ws.notify(param.update_id);
      });


  socket.on('error', function (err) {
      console.log(err.type);
  });


  socket.on('update messages', function() {
    updateMessages();
  });

  socket.on('update users', function(user) {
      listUsers();
  });

  socket.on('user disconnect', function() {
      listUsers();
  });

}

function sendMessage() {
    let message = $("#textArea").val();
    console.log(message);
    let msg = {user_id: getCookie('userID'),
                    chat_id: getCookie('chatID'),
                    content: message,
                    /*token: getCookie('token')*/};
    socket.emit('post message', msg);
    $("#textArea").val("");
}

function editWorkSpace(params) {
    socket.emit('edit workspace', params);

}

function leaveRoom(){
  var sendInfo = {
    chat_id:getCookie('chatID'),
    user_id: getCookie('userID')
    };

  api_ajax("/rooms/leave", sendInfo, {
      success: function (data) {
          console.log("1 = Uloskirjautuminen onnistui, 0 = epäonnistui");
          console.log("Tulos:"+data.result);
          if(data.result === 1){
              //Onko käyttäjä huoneessa 1 = on, 0 = ei
              setCookie("loggedIn","0");
          }
      }
  });
}

function listRooms(){

  api_ajax("/rooms/list", {}, {
      success: function (data) {
          for(var i = roomCount; i < data.result.length; i++){

              // Luodaan HTML -elementti, jolle asetetaan luokka ja onClick
              // eventlistener. Klikatessa kyseisen elementin "chatID" tallentuu
              // selaimen kekseihin
              rooms.innerHTML +=
                  "<li onclick='setCookie(`chatID`,"+data.result[i].id+
                  ")' class='listedRoom listedRoom-hover'>"+
                  data.result[i].name+"</li>";
          }

          // Tällä pidetään kirjaa "rooms" listan pituudesta, ja estetään
          // huoneiden tuominen listaan kahteen kertaan.
          roomCount = data.result.length;
      }
  });
}

function updateMessages(){
  $("#messagelist").html("");
  console.log("updateMessages() kutsuttu")
  var sendInfo = {
      chat_id: getCookie('chatID'),
      since: 0 //lastMessage
    };

  api_ajax("/messages/list", sendInfo, {
      success: function (data) {
        console.log(data.result[0]);
        console.log(users[data.result[0].user_id].name);
        //users[data.result[i].user_id].name
          for(var i=0; i<data.result.length; i++){
              $("#messagelist").append("<li><i>"+users[data.result[i].user_id].name
              +" says:"
              +"</i><br>"+ data.result[i].message
              +"</li>");
          }
          //lastMessage = data.result.length;
      }
  });
}

function fetchWorkspace(sendInfo, callback) {

  api_ajax("/workspaces/content", sendInfo, {
      success: function (data) {
          callback(data);
      }
  });
}

function updateWorkspace(sendInfo, callback) {
  api_ajax("/workspaces/updates", sendInfo, {
      success: function (data) {
        callback(data);
      }
  });
}

/*
function workspaceInsert(pos) {

  var input = $("#working-area").val().charAt(pos);

  var sendInfo = {
    chat_id: getCookie('chatID'),
    since: getCookie('lastUpdate'),
    caret_pos: pos,
    pos: pos,
    input: input
  };

  api_ajax("/workspaces/insert", sendInfo, {
      success: function (data) {
          setCookie("lastUpdate", data.result);
      }
  });
}

function workspaceRemove(obj) {
    var sendInfo = {
      chat_id: getCookie('chatID'),
      since: getCookie('lastUpdate'),
      pos: 1,
      len: 1
    };

    api_ajax("/workspaces/insert", sendInfo, {
        success: function (data) {
            setCookie("lastUpdate", data.result);
        }
    });
  }
function sendMessage(){
  console.log("SendMessage() kutsuttu");
  var sendInfo = {
    user_id: getCookie('userID'),
    chat_id: getCookie('chatID'),
    message: $("#textArea").val()
  }

  $.ajax({
    type: "POST",
    url: "/api/messages/post",
    data: JSON.stringify(sendInfo),
    contentType: "application/json",
    dataType:"json",
    success: function (data) {
      //console.log(data.result.id);
    }
  })
  updateMessages();
  $("#textArea").val() = "";

// Helper functions:

function inputWorkspaceText(updObj) {
    var txt = $("#working-area").val();
    var newTxt = txt.slice(0, updObj.pos) + updObj.text + txt.slice(updObj.pos);
    $("#working-area").text(newTxt);
}

function removeWorkspaceText(pos, len) {
    var txt = $("#working-area").val();
    var newTxt = cut(txt, pos, pos+len)

    function cut(text, cutStart, cutEnd) {
        return text.substr(0,cutStart) + str.substr(cutEnd+1);
    }
    $("#working-area").text(newTxt);
}

// API handler:
  */

function api_ajax(route, data_params, ajax_params){
    var call = Object.assign({
        type: "POST",
        url: '/api'+ route,
        data: JSON.stringify(data_params),
        contentType: "application/json",
        dataType: "json"
    }, ajax_params);
    $.ajax(call);
}
