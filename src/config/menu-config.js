const base = 'Home'

export default [{
  name: 'basic',
  meta: {
    title: '应用域管理',
    icon: 'fa fa-camera-retro'
  },
  sub: [{
    name: 'Domain',
    meta: {
      index: `/Home/Domain`,
      title: '域注册',
      type: 'menu',
      active: false
    }
  }, {
    name: 'RolesManage',
    meta: {
      index: `/Home/RolesManage`,
      title: '角色注册',
      type: 'menu',
      active: false
    }
  }, {
    name: 'MenusContainer',
    meta: {
      index: `/Home/MenusContainer`,
      title: '菜单绑定',
      type: 'menu',
      active: false
    }
  }]
}, {
  name: 'regist',
  meta: {
    title: '注册管理',
    icon: 'fa fa-bandcamp'
  },
  sub: [{
    name: 'SysOrgan',
    meta: {
      index: `/Home/SysOrgan`,
      title: '机构注册',
      type: 'menu',
      active: false
    }
  },{
    name: 'SysPersonnel',
    meta: {
      index: `/Home/SysPersonnel`,
      title: '人员注册',
      type: 'menu',
      active: false
    }
  },{
    name: 'BaseUser',
    meta: {
      index: `/Home/BaseUser`,
      title: '用户注册',
      type: 'menu',
      active: false
    }
  }]
}]
