import Vue from 'vue'
const AppVue = new Vue({})
export default function ({app, store}) {
    AppVue.$bus.on('Error', () => {
        app.router.push(`/public/ServiceMaintenance`)
    });
}
  