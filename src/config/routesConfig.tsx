import {Navigate} from "react-router-dom";
import type {RouteObject} from  "react-router-dom";
import App from "../App";
import RepoListPage from "../App/pages/RepoListPage";
import RepoPage from "../App/pages/RepoPage";
import {routes} from "@config/routes";


export const routesConfig: RouteObject[] = [
    {
        path: routes.main.mask,
        element: <App/>,
        children: [
            {
              index: true,
              element: <Navigate to={routes.repositories.mask} replace/>
            },
            {
                path: routes.repositories.mask,
                element: <RepoListPage/>
            },
            {
                path: routes.repository.mask,
                element: <RepoPage/>
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to={routes.main.mask} replace />
    },
];