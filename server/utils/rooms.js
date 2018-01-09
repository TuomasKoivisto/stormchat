class Rooms {
  constructor() {
    this.rooms = [
      {
        name: 'test',
        password: 'salasana',
        users: []
      }
    ];
  }
  addRoom(name, password) {
    var room = { name, password, users: [] };
    this.rooms.push(room);
    return room;
  }
  deleteRoom() {}
  listRooms() {
    //console.log(this.rooms);
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
        console.log(this.rooms[i].users)
        return this.rooms[i];
      }
    }
  }
}

module.exports = { Rooms };
