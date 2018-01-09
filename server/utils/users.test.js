const expect = require('expect');

const { Users } = require('./users');
var users;
beforeEach(() => {
  users = new Users();
  users.users = [
    {
      id: '1',
      name: 'Tuomas',
      room: 'tuisku-fanit'
    },
    {
      id: '2',
      name: 'Pentti',
      room: 'shakkikerho'
    },
    {
      id: '3',
      name: 'Liisa',
      room: 'tuisku-fanit'
    }
  ];
});

describe('Users', () => {
  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Tuomas',
      room: 'keilausryhmä'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    var userId = '9999';
    var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var userId = '2';
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find user', () => {
    var userId = '9999';
    var user = users.getUser(userId);

    expect(user).toNotExist();
  });

  it('should return names for tuisku-fanit', () => {
    var userList = users.getUserList('tuisku-fanit');
    expect(userList).toEqual(['Tuomas', 'Liisa']);
  });

  it('should return names for shakkikerho', () => {
    var userList = users.getUserList('shakkikerho');
    expect(userList).toEqual(['Pentti']);
  });
});
