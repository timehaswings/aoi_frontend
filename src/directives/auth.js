import store from '../store';

const auth = {
    // 仅登录时显示
    'is-login': {
        mounted(el) {
            const token = store.state.auth.token;
            if (!token) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        }
    },
    // 仅退出登录时显示
    'is-logout': {
        mounted(el) {
            const token = store.state.auth.token;
            if (token) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        }
    }
}

export default (app) => {
    for(let key in auth){
        app.directive(key, auth[key]);
    }
};