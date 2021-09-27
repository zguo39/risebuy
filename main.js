import Vue from 'vue'
import App from './App'
import ourLoading from '@/components/our-loading/our-loading.vue'
import {
	httpRequest
} from './network/api.js'
import share from '@/utils/share.js'

function convertStamp(str) {
	let newDate = new Date();
	newDate.setTime(str);
	return newDate.toLocaleDateString() + " " + newDate.toLocaleTimeString();
}

function beautify_time(timestamp){
	    var mistiming = Math.round(new Date() / 1000)-timestamp;
	    var postfix = mistiming>0 ? '前' : '后'
	    mistiming = Math.abs(mistiming)
	    var arrr = ['年','个月','星期','天','小时','分钟','秒'];
	    var arrn = [31536000,2592000,604800,86400,3600,60,1];
	 
	    for(var i=0; i<7; i++){
	        var inm = Math.floor(mistiming/arrn[i])
	        if(inm!=0){
	            return inm+arrr[i] + postfix
	        }
	    }
	}

Vue.component('ourLoading', ourLoading)
Vue.prototype.$httpRequest = httpRequest
Vue.prototype.$convertStamp = convertStamp
Vue.prototype.$beautify_time = beautify_time
Vue.mixin(share)


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
