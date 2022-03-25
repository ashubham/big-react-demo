import { Home } from "./components/home/home";
import { Liveboard } from "./components/liveboard/liveboard";
import { Viz } from "./components/viz/viz";
import { Search } from "./components/search/search";
import { FullApp } from "./components/full/full";

export const routes = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/search",
    element: <Search />
  },
  {
    path: "/liveboard",
    element: <Liveboard />
  },
  {
    path: "/viz",
    element: <Viz />
  },
  {
    path: "/full",
    element: <FullApp />
  }
];
