//route 访问路径，路由
//router 路由管理者
import { createRouter, createWebHashHistory,createWebHistory} from 'vue-router';// 创建路由实例并传递 `routes` 配置const router = createRouter({// 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
//创建路由 route
import Index from '../views/static/index.vue'
import User from '../views/static/user.vue'
import Info from '@/views/static/info.vue'
import Footer from '@/layout/footer.vue'
import Header from '@/layout/header.vue'
import LayoutAdmin from '@/layout/admin/index.vue'
//白名单
const whiteList=[
  "/",
  // "/adcate",
  "/login"
]
import {useUserStore} from'../store/user'
import { formContextKey } from 'element-plus';
const routes = [
    { path: '/', 
    name:'home',
    component:Index,
    // components:{
    //   default:Index,
    //   Footer,//命名视图
    //   Header
    // }
   },
   { path: '/adcate', name: 'adCate', component: () => import('../views/static/adCate.vue') },
    { path: '/index',redirect:'/'},
    { path: '/user',name:'user', component: User,
    meta:{
      title:'user页面',
      Auth:true 
    },
    children:[
      {
        path:'info',
        component:Info
      }
  ]
},
    { path: '/user/:id(\\d+)+',name:'userId', component: User,props:true, },
    { path: '/login',name:'login', component:()=>import('../views/static/login.vue') //懒加载 
  },
    { path: '/object',name:'object', component:()=>import('../views/static/object.vue'),//懒加载
    children:[
      {
        path:'',
        name:'objectinfo',//嵌套命名路由
        component:Info
      },
      {
        path:'login',
        component:import('@//views/static/login.vue')
      },
  ]  
  },
    { path: '/shops',name:'shops', component:()=>import('../views/static/shop.vue') //懒加载 
  },
    { path: '/cart',name:'cart', component:()=>import('../views/static/cart.vue') //懒加载 
    },
    {
      path: '/articlecat',
      name: 'articlecat',
      component: () => import('../views/static/articlecat.vue')// 懒加载
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('../views/static/article.vue')// 懒加载
},
    {
      path:'/admin',
      name:'admin',
      component:LayoutAdmin,
      children:[
        {
          path:'',
          name:'admin-index',
          component:()=>import('@/views/admin/index.vue')
        },
        {
          path:'info',
          name:'admin-info',
          component:()=>import('@/views/admin/info.vue')
        },
        {
          path:'logout',
          name:'admin-logout',
          component:()=>import('@/views/admin/logout.vue')
        },
        {
          path:'changepassword',
          name:'admin-changepassword',
          component:()=>import('@/views/admin/changepassword.vue')
        },
        {
          path:'about',
          name:'about',
          component:()=>import('@/views/admin/about.vue')
        },
        {
          path:'forgetpassword',
          name:'admin-forgetpassword',
          component:()=>import('@/views/admin/forgetpassword.vue')
        },
      ]
    },
{
    path: '/shuju',
    name: 'shuju',
    component:()=>import('../components/cation/HelloLogin.vue'),
    children: [
      {
        path: '',
        name: 'L',
        component:()=>import('../components/cation/HomeLo.vue'),
      },
      
      {
        path: '/H',
        name: 'H',
        component:()=>import('../components/cation/HelloWorld.vue'),
      }
    ]
  },
    { path:'/:pathMatch(.*)*',name:'404', component:()=>import('../views/404.vue') //懒加载 
  }
 ]
 //创建路由管理 router
 const router = createRouter({// 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
   history: createWebHistory(),
   routes,})
   //前置路由守卫
   router.beforeEach((to,from,next)=>{
    //前置路由
    // if(to.name!=='cart'){
    //   next({name:'cart'})
    // }else{
    //   next();
    // }
    const userStore=useUserStore();
    console.log(userStore.token);
    //console.log(to,from)
    // if(to.path=="/login"&&userStore.token.length>0){
    //   next()
    // }
    // else{
    //   next("/login");
    // }
    if(whiteList.includes(to.path)){
      next();
    }
    else{
      if(userStore.token&&userStore.token.length>0){
         next()
      }
      else{
        next({name:"login"})
      }
    }
    
   })
  //导出路由
 export default router;