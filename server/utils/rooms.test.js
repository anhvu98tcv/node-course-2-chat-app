const expect = require('expect');

const {Rooms} = require('./rooms');

describe('Rooms', () => {
  var rooms;

  beforeEach( () => {
    rooms = new Rooms();
    rooms.rooms = [{
      name: 'Room 1',
      number: 1
    },{
      name: 'Room 2',
      number: 1
    },{
      name: 'Room 3',
      number: 1
    }]
  });

  it('should add room', () => {
    var rooms = new Rooms();
    var room = {
      name: 'Room 4',
      number: 1
    };

    var resRoom = rooms.addRoom(room.name);
    //expect(resRoom) =
    expect(rooms.rooms).toEqual([room]);
    expect(rooms.rooms.length).toBe(1);
  });

  it('should add room', () => {
    var room = {
      name: 'Room 3',
    };

    var resRoom = rooms.addRoom(room.name);
    //expect(resRoom) =
    expect(rooms.rooms.length).toBe(3);
  });

  it('should delete room' , () => {
    var name = 'Room 3';
    var room =rooms.deleteRoom(name);
    expect(room.name).toBe(name);
    expect(rooms.rooms.length).toBe(2);
  });

  it('should not delete room', () => {
    var name = 'Room 99';
    var room =rooms.deleteRoom(name);
    expect(room).toNotExist();
    expect(rooms.rooms.length).toBe(3);
  });

  it('should find room' , () => {
    var name = 'Room 1';
    var room = rooms.getRoom(name);
    expect(room.name).toBe(name);
  });

  it('should not find room' , () => {
    var name = 'Room 99';
    var room = rooms.getRoom(name);
    expect().toNotExist();
  });

  it('should return 1 people in room', () => {
    var name = "Room 1";
    var rel = rooms.getNumberPeopleInRoom(name);
    expect(rel).toBe(1);
  });

  it('should return 2 people in room', () => {
    var name = "Room 1";
    rooms.addRoom("Room 1");
    var rel = rooms.getNumberPeopleInRoom(name);
    expect(rel).toBe(2);
  });

  it('should reduce number in room', () =>{
    var name = "Room 1";
    rooms.addRoom("Room 1");
    var rel = rooms.truSoNguoiTrongRoom(name);
    expect(rooms.getNumberPeopleInRoom(name)).toBe(1);

  });
});
