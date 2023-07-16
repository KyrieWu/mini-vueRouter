import { Base } from './base'

export class BrowserHistory extends Base {
    constructor(router) {
        super(router)
    }

    setupListener() {// 稍后需要调用次方法，监控hash 值的变化
        window.addEventListener('popstate', function () {

        })
    }

    getCurrentLocation() {
        return window.location.pathname
    }
}