var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;
var sum = 0;

net.createServer(function(sock) {
    var state = 0; // state variable
    var inputNum = 0;
    var tmp   = 0;
    var password = "x";
        switch(state){
            case 0://Part that ask user to insert correct password
                sock.write('Input password: ')
                sock.on('data', function(data){
                    if(data == password){
                        state = 1; // change state to preparing for start state
                        sock.write(sum)
                        break;
                    }else{
                        sock.write('That\'s incorrect password!!')
                    }
                })
                break
            case 1:
                sock.write('Input number: ') // Goal number = Number that indicate the end of game
                sock.on('data', function(data){
                    inputNum = parseInt(data)
                    if(inputNum == 0){
                        state = 2; //change state to disconnect 
                    }
                    else {
                        sum = sum + inputNum
                        sock.write(sum)
                    }
                })

            case 2: //disconnect
                sock.write('Do you want to disconnect?(Y/N)')
                while(true){
                    sock.on('data', function(data){
                    if(data == 'N' || data == 'n'){
                        state = 1 // return to state that select argument
                    }else{
                        if(data == 'Y' || data == 'y'){
                            sock.close() // close connection
                            break
                            }
                        }
                    })
                }
            }
        }).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);