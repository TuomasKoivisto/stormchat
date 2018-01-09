const expect = require('expect');

const { Rooms } = require('./rooms');
var rooms;
beforeEach(() => {
  rooms = new Rooms();
  rooms.rooms = [
    {
      name: 'Huone1'
    },
    {
      name: 'salaseura'
    },
    {
      name: 'shakkikerho'
    }
  ];
});

describe('Rooms', () => {
  it('should add new room', () => {
    var rooms = new Rooms();
    var room = {
      name: 'Tuomas',
      password: 'secret'
    };
    var resRoom = rooms.addRoom(room.name, room.password);

    expect(rooms.rooms).toEqual([room]);
  });
});
