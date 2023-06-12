import instance from "./axios";

const add = (data) => {
    return instance.request({
       url: 'api/article/add',
       method: 'post',
       data
    })
 }
 const entire = () => {
    return instance.request({
       url:'api/article/all',
       method:'get',
       
    })
 }
 const remove = (data) => {
    return instance.request({
       url: 'api/article/delete/'+data,
       method: 'get',
      //  params: data
    })
 }
 
 const update = (data) => {
    return instance.request({
       url:'api/article/edit',
       method:'post',
       data
    })
 }
 
 const select = (data) => {
    return instance.request({
       url:'api/article/one',
       method:'get',
       params:data
    })
 }
 
  const getArticlesByUserId = (data) => {
     return instance.request({
         url:'api/article/getArticles/${userId}',
         method:'get',
         params:data
      })
  }
 
  const getArticlesByPage = () => {
     return instance.request({
         url:'api/article/page',
         method:'post',
      })
  }
  const getArticlesByCateId = () => {
    return instance.request({
        url:'api/article/${cateId}',
        method:'post',
     })
 }
 export default {
    add,remove,update,select,entire,getArticlesByCateId,getArticlesByPage,getArticlesByUserId
  }