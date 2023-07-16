export default {
    functional: true,
    render(h, { parent, data }) {

        data.routerView = true
        let route = parent.$route

        let depth = 0

        while (parent) {
            if (parent.$vnode && parent.$vnode.data.routerView) {
                depth++
            }

            parent = parent.$parent
        }

        let record = route.matched[depth]
        console.log(record);

        if (!record) {
            return h()
        }

        // 默认先渲染 app.vue 中的 router-view
        return h(record.component)
    },
}