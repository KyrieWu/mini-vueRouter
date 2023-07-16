
function createRoute(record, location) {
    let matched = []

    if (record) {
        while (record) {
            matched.unshift(record)
            record = record.parent
        }
    }

    return {
        ...location,
        matched
    }
}

function runQueue(queue, from, to, cb) {
    function next(index) {
        if (index >= queue.length) return cb()

        let hook = queue[index]

        hook(from, to, () => {
            next(index + 1)
        })
    }

    next(0)
}

export class Base {
    constructor(router) {
        this.router = router

        this.current = createRoute(null, {
            path: '/'
        })
    }

    // 所有的逻辑要放在transitionTo 来实现
    transitionTo(location, listener) {
        let record = this.router.match(location)

        let route = createRoute(record, { path: location })

        if (location == this.current.path && route.matched.length == this.current.matched.length) {
            return
        }

        let queue = [].concat(this.router.beforeEachHooks)

        runQueue(queue, this.current, route, () => {
            this.current = route // 这里更新当前的current 对象

            // 如果当路由切换的时候，也应该调用 transitionTo 方法,再次拿到新的记录
            listener && listener()

            this.cb && this.cb(route)
        })
    }

    listen(cb) { // 自定义了一个钩子
        this.cb = cb
    }
}