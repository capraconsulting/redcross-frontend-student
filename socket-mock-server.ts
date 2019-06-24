const sio = require('socket.io')();
const port = 8000;

let connections = [{ studentID: 'student', teacherID: 'teacher' }];

sio.on('connection', socket => {
  socket.on('join room', room => {
    console.log('room joined');
    socket.join(room);
  });

  socket.on('leave room', room => {
    socket.leave(room);
  });

  socket.on('connectWithStudent', (studentID, teacherID) => {
    console.log(studentID);
    connections.push({
      studentID,
      teacherID,
    });
  });

  socket.on('message', (message, roomID) => {
    socket.to(roomID).emit('message', message);
  });
});

sio.listen(port);
console.log('Listening on port ', port);
