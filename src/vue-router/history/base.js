export class Base {
    constructor(router) {
        this.router = router
    }

    // 所有的逻辑要放在transitionTo 来实现
    transitionTo(location, listener) {
        let record = this.router.match(location)

        // 如果当路由切换的时候，也应该调用 transitionTo 方法,再次拿到新的记录
        listener && listener()
    }
}