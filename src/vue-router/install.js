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

    Vue.component('router-link', {
        props: {
            to: { type: String, require: true },
            tag: { type: String, default: 'a' }
        },
        methods: {
            handler(){
                this.$router.push(this.to)
            }
        },
        render() {
            let tag = this.tag
            return <tag onClick={this.handler}>{this.$slots.default}</tag>
        },
    })

    Vue.component('router-view', {
        render() {
            return <div>空</div>
        },
    })
}