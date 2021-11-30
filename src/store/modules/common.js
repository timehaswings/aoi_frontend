const common = {
  state: {
    notifyMsg: 'hello world',
    isCollapse: false,
  },
  mutations: {
    COLLAPSE: (state) => {
      state.isCollapse = true;
    },
    OPEN: (state) => {
      state.isCollapse = false;
    },
    TOGGLE: (state) => {
      state.isCollapse = !state.isCollapse;
    },
  },
  getters: {},
  actions: {},
};

export default common;
