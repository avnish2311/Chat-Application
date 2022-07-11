const express=require("express");
const app=express()
const server=require('http').Server(app)
const io=require('socket.io')(server)
const users={};
app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('room');
});

io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
    // console.log("new user",name);
     users[socket.id]=name;
     socket.broadcast.emit('user-joined',name);
    });
  socket.on('send',message=>{
    socket.broadcast.emit('recieve',{message:message,name:users[socket.id]})
  });
  socket.on('disconnect',message=>{
    socket.broadcast.emit('left',users[socket.id]);
    delete users[socket.id];
  });



})


server.listen(3001,(req,res)=>{
    console.log("listening on port 3001")
})