import { Base } from './base'

function ensureSlash() {
    if (window.location.hash) {
        return
    }

    window.location.hash = '/'
}

function getHash() {
    return window.location.hash.slice(1)
}

export class HashHistory extends Base {
    constructor(router) {
        super(router)

        // 初始化hash 路由的时候，要给定一个默认的hash 路径 /
        ensureSlash()
    }

    setupListener() {// 稍后需要调用次方法，监控hash 值的变化
        window.addEventListener('hashchange', function () {
            this.transitionTo(getHash()) // 这里会监听hash 的变化，我们通过
        })
    }

    getCurrentLocation() {
        return getHash()
    }

    push(location) {
        this.transitionTo(location, () => {
            window.location.hash = location
        })
    }
}