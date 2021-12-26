<template>
    <n-h1 class="header">EasyChat</n-h1>
    <div v-if="!joined" class="parent-container">
      <div class="name-container">
        <n-input type="text" size="large" v-model:value="username" placeholder="Enter Username">
          <template #prefix>
            <n-icon size="32">
              <AccountBoxTwotone/>
            </n-icon>
          </template>
          </n-input>
        <n-button type="primary" size="large" @click.prevent="join" class="btn">Join</n-button>
      </div>
    </div>
    <div v-else>
      <n-space vertical class="list-container">
        <p v-for="message in messages" :key="message.id">
          <strong> {{message.user}} </strong>
          <strong> : {{message.text}} </strong>
        </p>
      </n-space>
        <n-input type="textarea" size="small"
        v-model:value="text"
          class="text-message"
          @keyup="sendMessage"
        round clearable></n-input>
    </div>
</template>

<script>
import io from 'socket.io-client';
import { AccountBoxTwotone } from '@vicons/material';
// import { Icon } from '@vicons/utils';

export default {
  name: 'EasyChatApp',
  components: {
    AccountBoxTwotone,
    // Icon,
  },
  data() {
    return {
      username: '',
      joined: false,
      text: '',
      messages: [],
    };
  },
  methods: {
    join() {
      this.joined = true;
      this.socketInstance = io('http://localhost:3000');

      this.socketInstance.on(
        'message:received', (msg) => {
          this.messages = this.messages.concat(msg);
        },
      );
    },
    sendMessage(e) {
      if (e.keyCode === 13) {
        this.addMessage();
        this.text = '';
      }
    },
    addMessage() {
      const message = {
        id: new Date().getTime(),
        user: this.username,
        text: this.text,
      };
      this.messages = this.messages.concat(message);
      this.socketInstance.emit('message', message);
    },
  },
};
</script>

<style scoped>
.header {
  color: #DFD8CA;
  margin-bottom: 5px;
  background-color: #B91646;
  position: sticky;
  width: 100%;
}
.parent-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  padding-top: 150px;
}
.name-container {
  display: flex;
  flex-direction: column;
  width: 200px;
}
.btn {
  margin-top: 12px;
}
.list-container {
  text-align: left;
  margin: 0 5px;
}
p {
  margin: 0px;
  color: #090910;
  background: #EEEBDD;
}
.text-message {
  position: fixed;
  width: 98%;
  height: 40px;
  left: 5px;
  bottom: 2px;
  box-sizing: border-box;
}
</style>
