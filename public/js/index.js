var socket = io();

$(function(){
    $('#rooms').change(function() {
      var room = $("#rooms").find(":selected").val();
      $('#room').val(room);
    });

});


socket.on('updateRoomList', function(rooms) {
  console.log(rooms);
  $('#rooms').find('option').remove();
  var filterRooms = _.uniq(rooms);

  $('#rooms').append(`<option value=""></option>`);
  filterRooms.forEach( function (room) {
    $('#rooms').append(`<option value="${room}">${room}</option>`);
  });


});

socket.on('disconnect',function () {
  console.log('Disconnected from server');
});
