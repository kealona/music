import Vue from 'vue'
import Router from 'vue-router'

import header from '../components/header.vue'
import aside from '../components/aside.vue'
import bottom from '../components/bottom.vue'

import test from '../test.vue'
import upload from '../upload.vue'

import add_music from '../view/manager/add_music.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/header',
      component: header
    },
    {
      path: '/aside',
      component: aside
    },
    {
      path: '/test',
      component: test
    },
    {
      path: '/upload',
      component: upload
    },
    {
      path: '/bottom',
      component: bottom
    },
    {
      path: '/index',
      component: resolve => require(['@/view/index'], resolve),
      children: [{
          path: '/homePage',
          component: resolve => require(['@/components/homePage'], resolve)
        }, {
          path: '/recommend',
          component: resolve => require(['@/components/recommend/recommend'], resolve)
        }, {
          path: '/playlist',
          component: resolve => require(['@/components/recommend/playlist'], resolve)
        }, {
          path: '/mv',
          component: resolve => require(['@/components/video/mv'], resolve)
        }, {
          path: '/friends',
          component: resolve => require(['@/components/friends/friends'], resolve),
          meta: {
            requireAuth: true
          }
        }, {
          path: '/follow',
          component: resolve => require(['@/components/friends/follow'], resolve),
          meta: {
            requireAuth: true
          }
        }, {
          path: '/fans',
          component: resolve => require(['@/components/friends/fans'], resolve),
          meta: {
            requireAuth: true
          }
        }, {
          path: '/local',
          component: resolve => require(['@/components/music/local'], resolve)
        }, {
          path: '/download',
          component: resolve => require(['@/components/music/download'], resolve)
        }, {
          path: '/myradio',
          component: resolve => require(['@/components/music/myradio'], resolve),
          meta: {
            requireAuth: true
          }
        }, {
          path: '/collection',
          component: resolve => require(['@/components/music/collection'], resolve),
          meta: {
            requireAuth: true
          }
        }, {
          path: '/mylike',
          component: resolve => require(['@/components/songlist/mylike'], resolve),
          meta: {
            requireAuth: true
          }
        }, {
          path: '/live',
          component: resolve => require(['@/view/live'], resolve)
        }, {
          path: '/playlistDetail',
          component: resolve => require(['@/components/songlist/playlist'], resolve)
        }, {
          path: '/personinfo',
          component: resolve => require(['@/components/personal/personinfo'], resolve),
          meta: {
            requireAuth: true
          }
        }, {
          path: '/video',
          component: resolve => require(['@/components/video/video'], resolve)
        }, {
          path: '/search',
          component: resolve => require(['@/components/search'], resolve)
        }
      ],
      redirect: '/homePage'
    },
    {
      path: '/add_music',
      component: add_music
    }, {
      path: '/',
      redirect: '/homePage'
    }
  ]
})
