class Rooms{
  constructor() {
    this.rooms = [];
  }

  addRoom(name) {
    var room = this.getRoom(name);
    if (room){
      room.number = room.number + 1;
      return 1;
    }
    else
    {
      room = {
        name: name,
        number: 1
      };
      this.rooms.push(room);
      return 2;
    }
  }

  getRoom(name){
    return this.rooms.filter((room) => room.name === name)[0];
  }

  deleteRoom(name){
    var room = this.getRoom(name);
    if (room) {
      this.rooms = this.rooms.filter((room) => room.name !== name);
    }

    return room;
  }

  getRoomList(){
    var roomsArray = this.rooms.map((room) =>{
      return room.name;
    });
    return roomsArray;
  }

  getNumberPeopleInRoom(name){
    var room = this.getRoom(name);
    if (room){
      return room.number;
    }
    return 0;
  }

  truSoNguoiTrongRoom(name){
    var room = this.getRoom(name);
    if (room){
      room.number = room.number-1;
    }
    return room;
  }
}

module.exports = {Rooms};
