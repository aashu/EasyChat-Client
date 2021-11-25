<template>
    <div v-if="!joined" class="parent-container">
      <div class="name-container">
        <input type="text" class="user-name" v-model="username"/>
        <button class="join-button" @click.prevent="join">Join</button>
      </div>
    </div>
    <div v-if ="joined">
      <div class="list-container">
        <div v-for="message in messages" :key="message.id">
          <strong> {{message.user}} </strong>
          <strong> : {{message.text}} </strong>
        </div>
      </div>
      <div class="text-input-container">
        <textarea
          v-model="text"
          class="text-message"
          @keyup.enter="sendMessage"
        ></textarea>
      </div>
    </div>
</template>

<script>
export default {
  name: 'EasyChatApp',
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
    },
    sendMessage() {
      this.addMessage();
      this.text = '';
    },
    addMessage() {
      const message = {
        id: new Date().getTime(),
        user: this.username,
        text: this.text,
      };
      this.messages = this.messages.concat(message);
    },
  },
};
</script>

<style scoped>
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
.user-name {
  height: 30px;
  font-size: 20px;
  padding: 5px;
  margin-bottom: 5px;
  text-align: center;
  font-weight: bold;
}
.join-button {
  height: 30px;
  font-size: 20px;
}
.text-input-container {
  height: 100vh;
}
.text-message {
  width: 100%;
  position: absolute;
  bottom: 0px;
  height: 70px;
  padding: 10px;
  box-sizing: border-box;
}
</style>
