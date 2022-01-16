import api from '../../axios';

const transform = menu => {
  return {
    path: menu.url,
    name: menu.id,
    meta: {
      title: menu.name,
    },
    component: () => import(`../../views${menu.component}`),
  };
};

const recursionMenu = (route, menus) => {
  if (menus && menus.length) {
    if (!route.children) {
      route.children = [];
    }
    menus.forEach(subMenu => {
      const subRoute = transform(subMenu);
      route.children.push(subRoute);
      if (subMenu.children) {
        recursionMenu(subRoute, subMenu.children);
      }
    });
  }
};

export default {
  state: {
    title: 'AOI VIDEO',
    publicRoutes: null,
  },
  mutations: {
    SET_TITLE(state, title) {
      state.title = title;
    },
    SET_PUBLIC_ROUTES(state, publicRoutes) {
      state.publicRoutes = publicRoutes;
    },
  },
  getters: {
    hasPublicRoute: state => {
      return state.publicRoutes !== null ? true : false;
    },
    publicRoutes: state => {
      const routes = [];
      if (state.publicRoutes !== null && state.publicRoutes.length === 1 && state.publicRoutes[0].children) {
        state.publicRoutes[0].children.forEach(item => {
          const route = transform(item);
          if (item.children) {
            recursionMenu(route, item.children);
          }
          routes.push(route);
        });
      }
      return routes;
    },
  },
  actions: {
    async getPublicRoutes({ commit, state }) {
      if (state.publicRoutes === null) {
        await api.home.getMenu().then(res => {
          if (res.success) {
            commit('SET_PUBLIC_ROUTES', res.data);
          }
        });
      }
    },
  },
};
