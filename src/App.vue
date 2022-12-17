<template>
  <div id="app">
    {{servermessage}}
    <div v-if="!login">
      <form @submit.prevent="enterName()">
        <input v-model="name" placeholder="Adınız">
        <input type="submit" value="Giriş Yap">
      </form>
    </div>
    <div v-else>
      Online kullanıcılar
      <ul>
        <li v-bind:key="user.id" v-for="user in users">{{ user.name }}</li>
      </ul>
      <form @submit.prevent="sendMessage()">
        <input v-model="message" placeholder="Mesajınız">
        <input type="submit">
      </form>
      Mesajlar
      <ul>
        <li v-bind:key="message" v-for="message in messages" v-html="message"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client';

export default {
  name: 'App',
  components: {},
  created() {
    // SocketioService.setupSocketConnection();
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT, {
      auth: {
        token: 'abc'
      }
    });

    this.socket.emit('my message', 'Hello there from Vue.');
    
    this.socket.on('my broadcast', (data) => {
      this.servermessage = data
    });
  },
  beforeUnmount() {
     if (this.socket) {
        this.socket.disconnect();
    }
    // SocketioService.disconnect();
  },
  
  data () {
    return {
      login: false,
      name: "",
      users: [],
      message: "",
      messages: [],
      servermessage: ''
    }
  },
  sockets: {
    users(data) {
      this.users = data;
    },
    messages(data) {
      this.messages = data;}
    },
  methods: {
    enterName() {
      this.login = true;
      this.socket.emit('new_user', this.name);

      this.socket.on('user_server', (data) => {
        console.log('uesrgeldi')
        console.log(data)
      })

      // SocketioService.getUserName(this.name);
    },
    sendMessage() {
      this.socket.emit('new_message', {
        name: this.name,
        message: this.message
      });

      this.socket.on('messages', (data) => {
        this.messages.push(data)
      })
      this.message = '';
    }
  }

  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
