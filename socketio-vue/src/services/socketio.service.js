// import { io } from 'socket.io-client';

// class SocketioService {
//   socket;
//   constructor() {}


//   setupSocketConnection() {
//     this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT, {
//       auth: {
//         token: 'abc'
//       }
//     });
    
//     this.socket.emit('my message', 'Hello there from Vue.');
    
//     this.socket.on('my broadcast', (data) => {
//       console.log('data', data);
//     });

//     this.socket.on('users', (users) => {
//       console.log({users})
//     })
    

//   }

//   getUserName(users){
//     this.socket.emit('users', users);

    
    
//   }

//   disconnect() {
//     if (this.socket) {
//         this.socket.disconnect();
//     }
// }
// }

// export default new SocketioService();