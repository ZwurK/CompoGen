import Layout from "../layouts/DefaultLayout.vue";
import HomePage from "../views/Home.vue";
import GenerationPage from "../views/Generation.vue";
import ExplorePage from "../views/Explore.vue";
import ComponentPage from "../views/Component.vue";
import FavoritesPage from "../views/Favorites.vue";
import LegalPage from "../views/legal/LegalNotices.vue";


const mainRoutes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
        component: HomePage,
        name: "Home",
      },
      {
        path: "generate",
        component: GenerationPage,
        name: "Generation",
      },
      {
        path: "explore",
        component: ExplorePage,
        name: "Exploration",
      },
      {
        path: "/component/:id",
        component: ComponentPage,
        name: "Component",
      },
      {
        path: "/favorites",
        component: FavoritesPage,
        name: "Favorites",
      },
      {
        path: "/legal",
        component: LegalPage,
        name: "Legal",
      },
    ],
  },
];

export default mainRoutes;
