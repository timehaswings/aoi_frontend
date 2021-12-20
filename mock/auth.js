export default [
  {
    url: 'http://localhost:8000/api/v1/token/auth',
    method: 'POST',
    response: ({ body }) => {
      console.log('---');
      return {
        success: true,
        msg: '登录成功',
        data: {
          id: 1,
          username: 'zhoujielun',
          gender: 'Man',
          roleList: [],
          token: 'abcdefg',
          isSuperuser: false,
          name: '周杰伦',
          phone: '',
          email: '',
          menuList: menuList,
        },
      };
    },
  },
  {
    url: '/api/v1/logout',
    method: 'post',
    response: ({ body }) => {
      return {
        success: true,
        msg: '退出成功',
      };
    },
  },
];
