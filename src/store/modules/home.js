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

const getRouterFromMenu = menu => {
  const routes = [];
  if (menu !== null && menu.length === 1) {
    const route = transform(menu[0]);
    if (menu[0].children) {
      recursionMenu(route, menu[0].children);
    }
    routes.push(route);
  }
  return routes;
};

const recursionNav = (nav, menus) => {
  if (menus && menus.length) {
    if (!nav.children) {
      nav.children = [];
    }
    menus.forEach(subMenu => {
      const path = nav.path.endsWith('/') ? nav.path + subMenu.url : nav.path + '/' + subMenu.url;
      const hasChildren = subMenu.children && subMenu.children.length;
      const subNav = { id: subMenu.id, path: path, name: subMenu.name, icon: subMenu.icon, isLeaf: !hasChildren };
      nav.children.push(subNav);
      if (hasChildren) {
        recursionNav(subNav, subMenu.children);
      }
    });
  }
};

const getMenuNav = menu => {
  const navs = [];
  if (menu !== null && menu.length === 1) {
    const hasChildren = menu[0].children && menu[0].children.length;
    const nav = { id: menu[0].id, path: menu[0].url, name: menu[0].name, icon: menu[0].icon, isLeaf: !hasChildren };
    if (hasChildren) {
      recursionNav(nav, menu[0].children);
      return nav.children;
    }
  }
  return navs;
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
    backendMenu: state => {
      return getMenuNav(state.privateRoutes);
    },
    frontendMenu: state => {
      return getMenuNav(state.publicRoutes);
    },
    privateRoutes: state => {
      return getRouterFromMenu(state.privateRoutes);
    },
    publicRoutes: state => {
      return getRouterFromMenu(state.publicRoutes);
    },
  },
  actions: {
    async getPublicRoutes({ commit }) {
      await api.home.getPublicMenu().then(res => {
        if (res.success) {
          commit('SET_PUBLIC_ROUTES', res.data);
        }
      });
    },
    async getPrivateRoutes({ commit }) {
      await api.home.getPrivateMenu().then(res => {
        if (res.success) {
          commit('SET_PRIVATE_ROUTES', res.data);
        }
      });
    },
  },
};
