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
        }
    },
    getters: {
        
    },
    actions: {

    }
}

export default common
