import { install, Vue } from './install'
import { createMatcher } from './create-match'

import { HashHistory } from './history/hash'
import { BrowserHistory } from './history/history'

class VueRouter {
    constructor(options) {
        // 用户传递的路由配置，我们可以对这个配置
        let routes = options.routes || []
        this.beforeEachHooks = []

        //变成映射表 方便后续的匹配操作，可以匹配也可以添加新的路由
        this.matcher = createMatcher(routes)

        //根据不同的模式创建对应的路由系统

        let mode = options.mode || 'hash'

        switch (mode) {
            case 'hash':
                this.history = new HashHistory(this)
                break;
            case 'history':
                this.history = new BrowserHistory(this)
                break
            default:
                break;
        }
    }

    match(location) {
        return this.matcher.match(location)
    }

    listen(cb) {
        this.cb = cb
    }

    push(location) {
        return this.history.push(location)
    }

    beforeEach(cb) {
        this.beforeEachHooks.push(cb)
    }

    init(app) {
        let history = this.history

        // 根据路径的变化匹配对应的组件来进行渲染，路径变化了 需要更新视图(响应式的)

        // 根据路径匹配到对应的组件 来渲染，之后监听路由变化
        history.transitionTo(history.getCurrentLocation(), () => {
            history.setupListener() // 监听路由的变化
        })

        history.listen((newRoute) => { // 这个目的就是更新 _route 的值是它能够发生变化,数据变化会自动渲染
            app._route = newRoute
        })

    }

}

VueRouter.install = install

export default VueRouter