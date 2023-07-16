import routerLink from "./components/router-link";
import routerView from "./components/router-view";

export let Vue;


export function install(_Vue) {
    Vue = _Vue

    Vue.mixin({
        beforeCreate() {
            // 组件渲染是从父到子的
            if (this.$options.router) {
                // 从根实例上传递 router
                this._routerRoot = this
                this._router = this.$options.router

                this._router.init(this); // this 就是我们整个应用

                // 给根实力添加一个属性 _route 就是当前的current 对象
                Vue.util.defineReactive(this, '_route', this._router.history.current)
            } else {
                // 在所有组件上都增加一个 _routerRoot 指向根实例
                this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
            }
        },
    })

    // 正实例上取值的时候，会去拿到_router属性 代理
    Object.defineProperty(Vue.prototype, '$router', {
        get() {
            return this._routerRoot && this._routerRoot._router
        }
    })

    Object.defineProperty(Vue.prototype, '$route', {
        get() {
            return this._routerRoot && this._routerRoot._route
        }
    })

    Vue.component('router-link', routerLink)

    Vue.component('router-view', routerView)
}