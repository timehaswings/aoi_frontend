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
      if (subMenu.component !== '/') {
        const subRoute = transform(subMenu);
        route.children.push(subRoute);
        if (subMenu.children) {
          recursionMenu(subRoute, subMenu.children);
        }
      } else {
        if (subMenu.children) {
          recursionMenu(route, subMenu.children);
        }
      }
    });
  }
};

export default {
  state: {
    title: 'AOI VIDEO',
    publicRoutes: null,
    privateRoutes: null,
  },
  mutations: {
    SET_TITLE(state, title) {
      state.title = title;
    },
    SET_PUBLIC_ROUTES(state, publicRoutes) {
      state.publicRoutes = publicRoutes;
    },
    SET_PRIVATE_ROUTES(state, privateRoutes) {
      state.privateRoutes = privateRoutes;
    },
  },
  getters: {
    hasPublicRoute: state => {
      return state.publicRoutes !== null ? true : false;
    },
    hasPrivateRoute: state => {
      return state.privateRoutes !== null ? true : false;
    },
    getBackendMenu: state => {
      return state.privateRoutes !== null ? true : false;
    },
    privateRoutes: state => {
      const routes = [];
      if (state.privateRoutes !== null && state.privateRoutes.length === 1 && state.privateRoutes[0].children) {
        state.privateRoutes[0].children.forEach(item => {
          const route = transform(item);
          if (item.children) {
            recursionMenu(route, item.children);
          }
          routes.push(route);
        });
      }
      return routes;
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
        await api.home.getPublicMenu().then(res => {
          if (res.success) {
            commit('SET_PUBLIC_ROUTES', res.data);
          }
        });
      }
    },
    async getPrivateRoutes({ commit, state }) {
      if (state.privateRoutes === null) {
        await api.home.getPrivateMenu().then(res => {
          if (res.success) {
            commit('SET_PRIVATE_ROUTES', res.data);
          }
        });
      }
    },
  },
};
