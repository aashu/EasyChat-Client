import { createApp } from 'vue';
import {
  create, NButton, NSpace, NInput, NH2, NH1, NIcon,
} from 'naive-ui';
import App from './App.vue';

const naive = create({
  components: [
    NButton,
    NSpace,
    NInput,
    NIcon,
    NH2,
    NH1,
  ],
});

const vueApp = createApp(App);
vueApp.use(naive);
vueApp.mount('#app');
