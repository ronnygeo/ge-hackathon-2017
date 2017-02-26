var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var userService=require('./services/user.service.server.js')();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

var numUsers = 0;
var onlineUsers={};
var connectedUsers={};

io.on('connection', function (socket) {
    var addedUser = false;

    socket.on('authenticate', function(data){
        if(userService.authenticate(data)){
            onlineUsers[data] = socket;
            connectedUsers[data]=socket;
            console.log('data');
            //socket.username=data;
            numUsers++;
            socket.emit('successful', data);
            // echo globally (all clients) that a person has connected
            //socket.broadcast.emit('user joined', {
            //    username: socket.username,
            //    numUsers: numUsers
            //});
        }
        else{
            socket.emit('unsuccessful')
        }
    });

    socket.on('add user', function(username){
        if(username in onlineUsers){
            connectedUsers[username]=onlineUsers[username];
            console.log(connectedUsers);
            for(var user in connectedUsers){
                connectedUsers[user].emit('user joined', {
                    username: username
                });
            }
        }
        else{
            socket.emit('add unsuccessful');
        }
    });

    // when the client emits 'new message', this listens and executes
    socket.on('new message', function (data) {
        // we tell the client to execute 'new message'
        for (var user in connectedUsers){
                if(connectedUsers[user] != data.username) {
                    connectedUsers[user].emit('new message', {
                        username: data.username,
                        message: data.message
                    })
                };
        }
    });

    // when the client emits 'add user', this listens and executes
    //socket.on('add user', function (username) {
    //    if (addedUser) return;
    //
    //    // we store the username in the socket session for this client
    //    socket.username = username;
    //    numUsers++;
    //    addedUser = true;
    //    socket.emit('login', {
    //        numUsers: numUsers
    //    });
    //    // echo globally (all clients) that a person has connected
    //    socket.broadcast.emit('user joined', {
    //        username: socket.username,
    //        numUsers: numUsers
    //    });
    //
    //});

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', function (username) {
        for(var user in connectedUsers){
            console.log(username!=user)
            if (user != username){
                socket.broadcast.emit('typing', {
                    username: username
                });
            }
        }
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', function (username) {
        socket.broadcast.emit('stop typing', {
            username: username
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        //if (data in onlineUsers) {
        //    numUsers--;
        //    delete onlineUsers[data];
        //    delete connectedUsers[data];
        //    // echo globally that this client has left
        //    for (var user in connectedUsers) {
        //        connectedUsers[user].emit('user left', {
        //        //
        //        });
        //    }
        //}
    });
});

require('./app.js')(app);
;
//module.exports = app;
server.listen(8080, 'localhost');