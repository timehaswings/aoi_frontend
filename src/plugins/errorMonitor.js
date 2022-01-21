const _unhandledrejection = e => {
  throw e.reason;
};

const _error = args => {
  console.log('error event:', args);
  return true;
};

export default {
  run() {
    if (window) {
      if (window.addEventListener) {
        window.addEventListener('unhandledrejection', _unhandledrejection);
        window.addEventListener('error', _error, true);
      } else if (window.attachEvent) {
        window.attachEvent('unhandledrejection', _unhandledrejection);
        window.attachEvent('error', _error, true);
      }
    }
  },
  destory() {
    if (window) {
      if (window.removeEventListener) {
        window.removeEventListener('unhandledrejection', _unhandledrejection);
        window.removeEventListener('error', _error);
      } else if (window.detachEvent) {
        window.detachEvent('unhandledrejection', _unhandledrejection);
        window.detachEvent('error', _error);
      }
    }
  },
};
