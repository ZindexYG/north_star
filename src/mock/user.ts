const users = {
  admin: {
    roles: ['admin'],
    name: 'Admin',
    menu: ['/Main/Table', '/Main/About', '/Main/User'],
  },
  editor: {
    roles: ['editor'],
    name: 'Editor',
    menu: ['/Main/Table', '/Main/User'],
  },
}

export default [
  // /user/login
  {
    url: '/mock/user/login',
    type: 'post',
    response: res => {
      const { username } = res.body
      const user = users[username]
      if (user) {
        return {
          code: 0,
          data: user,
        }
      }
      return {
        code: 304,
      }
    },
  },
  // /user/logout
  {
    url: '/mock/user/logout',
    type: 'post',
    response: () => {
      return {
        code: 0,
        data: 'success',
      }
    },
  },
]
