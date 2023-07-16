import { createRouteMap } from './create-route-map'

export function createMatcher(routes) {

    let { pathMap } = createRouteMap(routes)
    function addRoutes(routes) {
        createRouteMap(routes, pathMap)

    }

    function addRoute(route) {
        createRouteMap([route], pathMap)

    }

    function match(location) {
        return pathMap[location]
    }

    return {
        addRoutes,
        addRoute,
        match
    }
}
