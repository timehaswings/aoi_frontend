const common = {
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
  getters: {},
  actions: {},
};

export default common;
