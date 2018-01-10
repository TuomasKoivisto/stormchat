class Rooms {
  constructor() {
    this.rooms = [];
  }
  addRoom(name, password) {
    var room = { name, password, users: [] };
    this.rooms.push(room);
    return room;
  }
  deleteRoom() {}
  listRooms() {
  }
  checkPassword(name, password) {
    var access = false;
    for (var i in this.rooms) {
      if (this.rooms[i].name == name && this.rooms[i].password == password) {
        access = true;
      }
    }
    return access;
  }
  addUser(roomname, username) {
    for (var i in this.rooms) {
      if (this.rooms[i].name == roomname) {
        this.rooms[i].users.push(username);
      }
    }
    this.listRooms();
  }
  getUsers(room) {
    for (var i in this.rooms) {
      if (this.rooms[i].name == room) {
        return this.rooms[i];
      }
    }
  }
  removeUser(user) {
    for (var i in this.rooms) {
      if (this.rooms[i].name == user.room) {
        this.rooms[i].users = this.rooms[i].users.filter((users) => {
          return users !== user.user
        });
      }
    }
  }
  checkUserName(user) {
    var username = 'not taken';
    for (var i in this.rooms) {
      if (this.rooms[i].name == user.roomname) {
        for (var j in this.rooms[i].users) {
          if (this.rooms[i].users[j] === user.username) {
            username = 'taken';
          }
      }
    }
  }
  return username;
}
}

module.exports = { Rooms };
