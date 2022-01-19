export default app => {
  app.directive('resize', {
    mounted(el, binding) {
      let width = '',
        height = '';
      let id_of_settimeout = null;
      function vueResizeElementHandler() {
        if (!binding.value) {
          return;
        }
        if (id_of_settimeout) {
          clearTimeout(id_of_settimeout);
        }
        id_of_settimeout = setTimeout(function () {
          const style = document.defaultView.getComputedStyle(el);
          if (width !== style.width || height !== style.height) {
            width = style.width;
            height = style.height;
            binding.value(width, height);
          }
        }, 150);
      }
      el.__vueResizeElement__ = vueResizeElementHandler;
      window.addEventListener('resize', vueResizeElementHandler);
    },
    unmounted(el) {
      window.removeEventListener('onresize', el.__vueResizeElement__);
    },
  });
};
