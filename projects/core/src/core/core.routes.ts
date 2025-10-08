import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadChildren: () => import(`../pages`).then((routes) => routes.routes),
  },
  {
    path: "**",
    loadComponent: () => import("../pages").then((m) => m.NotFoundComponent),
  },
];
