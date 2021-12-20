import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';

const secret = 'aoi-v1.0.0';

const ls = new SecureLS({
  encodingType: 'aes',
  isCompression: false,
  encryptionSecret: secret,
});

const modulesFiles = import.meta.globEager('./modules/*.js'); /** 动态加载模块 */

const modules = Object.keys(modulesFiles).reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^.\/modules\/(.*).js$/, '$1');
  const value = modulesFiles[modulePath];
  modules[moduleName] = value.default;
  return modules;
}, {});

const store = createStore({
  modules,
  plugins: [
    createPersistedState({
      key: secret,
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key),
      },
    }),
  ],
});

export default store;
