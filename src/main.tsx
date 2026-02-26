
import { createRoot } from 'react-dom/client'
import '@styles/styles.css'
import {routesConfig} from "@config/routesConfig";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter(routesConfig);
createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
);
