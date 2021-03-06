import Vue from 'vue';
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import VueBus from 'vue-bus';
import axios from 'axios';

Vue.prototype.$axios = axios;

Vue.use(ElementUi);
Vue.use(VueBus);

new Vue({
    el: '#app',
    render: h => h(App),
    components: { App }
})