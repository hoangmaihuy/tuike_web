export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: '登录',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: '欢迎',
                icon: 'smile',
                component: './Welcome',
              },
              {
                name: '课程列表',
                icon: 'table',
                path: '/courses',
                component: './CourseList',
              },
              {
                name: '添加测评',
                icon: 'form',
                path: '/review/new',
                component: './AddReview',
              },
              {
                name: '课程详细',
                hideInMenu: true,
                path: '/course/:courseId',
                component: './CourseDetail'
              },
              {
                name: '教师详细',
                hideInMenu: true,
                path: '/teacher/:teacherId',
                component: './TeacherDetail',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
