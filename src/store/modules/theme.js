/**
 * 默认主题配置
 */
const defaultTheme = [
  { property: '--default-bg-color', value: '#fafafa' },
  { property: '--light-bg-color', value: '#ffffff' },
  { property: '--dark-bg-color', value: '#2b3140' },
  { property: '--backend-header-bg-color', value: '#b3c0d1' },
  { property: '--backend-aside-bg-color', value: '#d3dce6' },
  { property: '--backend-main-bg-color', value: '#e9eef3' },
  { property: '--home-header-bg-color', value: '#ebeef5' },
  { property: '--home-main-bg-color', value: '#fafafa' },
  { property: '--home-header-height', value: '60px' },
  { property: '--aside-footer-height', value: '40px' },
  { property: '--content-footer-height', value: '60px' },
  { property: '--header-height', value: '64px' },
];

export default {
  state: {
    themeList: [...defaultTheme],
  },
  mutations: {
    SET_PROPERTY(state, property, value) {
      for (let theme of state.themeList) {
        if (theme.property === property) {
          theme.value = value;
          break;
        }
      }
    },
    SET_THEME(state, themeList) {
      state.themeList = themeList;
    },
    SET_DEFAULT(state) {
      state.themeList = [...defaultTheme];
    },
  },
  getters: {
    getThemeList: state => {
      return state.themeList;
    },
  },
};
