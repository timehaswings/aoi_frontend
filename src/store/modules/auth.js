export default {
  state: {
    token: null,
    user: null,
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
  },
  getters: {
    isLogin: state => {
      return state.token ? true : false;
    },
    username: state => {
      return state.user ? state.user.username : undefined;
    },
    email: state => {
      return state.user ? state.user.email : undefined;
    },
    isSuperuser: state => {
      return state.user ? state.user.isSuperuser : false;
    },
  },
  actions: {},
};
