const modulesFiles = import.meta.globEager("./modules/*.js") /** 动态加载模块 */

const modules = Object.keys(modulesFiles).reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^.\/modules\/(.*).js$/, '$1')
  modules[moduleName] = modulesFiles[modulePath]
  return modules
}, {})

export default modules;
