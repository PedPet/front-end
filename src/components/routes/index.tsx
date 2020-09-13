import { lazy, LazyExoticComponent } from "react";

export interface Route {
    route: string;
    component: LazyExoticComponent<React.FC<any>>;
}

const routes: Route[] = [
    {
        route: "/",
        component: lazy(() => import("../animals")),
    },
    {
        route: "/animals",
        component: lazy(() => import("../animals")),
    },
    {
        route: "/animals/add",
        component: lazy(() => import("../animals/add")),
    },
];

export default routes;
