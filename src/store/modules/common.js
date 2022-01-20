import api from '../../axios';

export default {
  state: {
    notifyMsg: 'hello world',
    isCollapse: false,
    category: [],
    tags: [],
    area: [],
  },
  mutations: {
    COLLAPSE: state => {
      state.isCollapse = true;
    },
    OPEN: state => {
      state.isCollapse = false;
    },
    TOGGLE: state => {
      state.isCollapse = !state.isCollapse;
    },
    SET_NOTIFY: (state, notifyMsg) => {
      state.notifyMsg = notifyMsg;
    },
    SET_CATEGORY: (state, category) => {
      state.category = category;
    },
    SET_TAGS: (state, tags) => {
      state.tags = tags;
    },
    SET_AREA: (state, area) => {
      state.area = area;
    },
  },
  getters: {
    category: state => {
      return state.category;
    },
    tags: state => {
      return state.tags;
    },
    area: state => {
      return state.area;
    },
  },
  actions: {
    async getCategory({ commit }) {
      await api.home.getCategory().then(res => {
        if (res.success) {
          commit('SET_CATEGORY', res.data);
        }
      });
    },
    async getTag({ commit }) {
      await api.home.getTag().then(res => {
        if (res.success) {
          commit('SET_TAGS', res.data);
        }
      });
    },
    async getArea({ commit }) {
      await api.home.getArea().then(res => {
        if (res.success) {
          commit('SET_AREA', res.data);
        }
      });
    },
  },
};
