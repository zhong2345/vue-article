import{q as s,_ as C,d as k,s as I,o as T,c as E,a as f,b as t,w as a,N as _,K as $,E as u,f as B,i as v,g as D,j as r,l as F,m as q,M as U,n as L,k as W}from"./index-88a35129.js";/* empty css                       */const A=e=>s.request({url:"api/article/add",method:"post",data:e}),M=()=>s.request({url:"api/article/all",method:"get"}),z=e=>s.request({url:"api/article/delete/"+e,method:"get"}),N=e=>s.request({url:"api/article/edit",method:"post",data:e}),j=e=>s.request({url:"api/article/one",method:"get",params:e}),P=e=>s.request({url:"api/article/getArticles/${userId}",method:"get",params:e}),K=()=>s.request({url:"api/article/page",method:"post"}),S=()=>s.request({url:"api/article/${cateId}",method:"post"}),c={add:A,remove:z,update:N,select:j,entire:M,getArticlesByCateId:S,getArticlesByPage:K,getArticlesByUserId:P};const G=k({data(){return{articles:[],page:{total:0,current:1,size:10},dialogFormVisible:!1,article:{articleCatId:0,content:"",createTime:"",deleted:0,id:0,open:0,title:"",updateTime:"",userinfoId:0},formLabelWidth:100,list:[]}},created(){this.fetchData()},mounted(){this.fetchData(1)},methods:{enterarticlecat(){console.log("进入文章类型管理"),this.$router.push({path:"/articlecat"})},enterlogin(){console.log("进入登录界面"),this.$router.push({path:"/login"})},fetchData(){c.entire().then(e=>{console.log(e),this.list=e.data.articles,console.log(this.list)})},handleDelete(e){const l=e;$.confirm("您是否需要删除该文章吗?","提示",{confirmButtonText:"是",cancelButtonText:"否",type:"warning"}).then(()=>{c.remove(l).then(p=>{p.success?(u({type:"success",message:"删除成功"}),this.fetchData()):u({type:"error",message:"网络出问题，联系管理员"})})}).catch(()=>{u({type:"warning",message:"取消删除"})})},handleSelect(e){c.select({id:e}).then(l=>{this.article=l.data.article}).catch(l=>{console.error(l)})},handleEdit(e){this.dialogFormVisible=!0;const l={id:e};c.select(l).then(p=>{this.article=p.data.article})},toAdd(){this.dialogFormVisible=!0,this.article={userArticleCatId:0,content:"",courseId:0,createTime:"",deleted:0,id:0,open:0,title:"",updateTime:"",userinfoId:0}},confirm(){let e=this;this.article.id==null||this.article.id==0?c.add(this.article).then(l=>{l.success?(u({type:"success",message:"添加成功"}),e.fetchData()):u({type:"error",message:"网络出问题，联系管理员"}),this.dialogFormVisible=!1}):(c.update(this.article).then(l=>{l.success?(u({type:"success",message:"编辑成功"}),this.fetchData()):u({type:"error",message:"网络出问题，联系管理员"})}),this.dialogFormVisible=!1)}}}),H={class:"root"},J={class:"adCate-tool"},O={class:"dialog-footer"},Q={class:"table"};function R(e,l,p,X,Y,Z){const n=B,g=I("router-link"),m=F,d=q,h=U,b=L,V=v,i=W,w=D;return T(),E("div",{class:_(e.ok?"home":"index")},[f("div",H,[f("div",J,[t(n,{type:"warning",onClick:e.toAdd},{default:a(()=>[r("添加")]),_:1},8,["onClick"]),t(n,{type:"warning",onClick:e.enterarticlecat},{default:a(()=>[r("文章类型管理")]),_:1},8,["onClick"]),t(n,{type:"warning"},{default:a(()=>[t(g,{to:"/shuju",style:{"text-decoration":"none",color:"aliceblue"}},{default:a(()=>[r("用户界面")]),_:1})]),_:1}),t(n,{type:"warning",onClick:e.enterlogin,style:{float:"right"}},{default:a(()=>[r("重新登陆")]),_:1},8,["onClick"])]),t(V,{modelValue:e.dialogFormVisible,"onUpdate:modelValue":l[9]||(l[9]=o=>e.dialogFormVisible=o),title:"文章内容"},{footer:a(()=>[f("span",O,[t(n,{onClick:l[7]||(l[7]=o=>e.dialogFormVisible=!1)},{default:a(()=>[r("取消")]),_:1}),t(n,{type:"primary",onClick:l[8]||(l[8]=o=>e.confirm())},{default:a(()=>[r(" 确定 ")]),_:1})])]),default:a(()=>[t(b,{model:e.article},{default:a(()=>[t(d,{label:"文章内容","label-width":e.formLabelWidth},{default:a(()=>[t(m,{modelValue:e.article.content,"onUpdate:modelValue":l[0]||(l[0]=o=>e.article.content=o),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),t(d,{label:"文章标题","label-width":e.formLabelWidth},{default:a(()=>[t(m,{modelValue:e.article.title,"onUpdate:modelValue":l[1]||(l[1]=o=>e.article.title=o),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),t(d,{label:"是否公开","label-width":e.formLabelWidth},{default:a(()=>[t(m,{modelValue:e.article.open,"onUpdate:modelValue":l[2]||(l[2]=o=>e.article.open=o),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),t(d,{label:"文章分类id","label-width":e.formLabelWidth},{default:a(()=>[t(m,{modelValue:e.article.articleCatId,"onUpdate:modelValue":l[3]||(l[3]=o=>e.article.articleCatId=o),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),t(d,{label:"用户编号","label-width":e.formLabelWidth},{default:a(()=>[t(m,{modelValue:e.article.undefined,"onUpdate:modelValue":l[4]||(l[4]=o=>e.article.undefined=o),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),t(d,{label:"创建时间","label-width":e.formLabelWidth},{default:a(()=>[t(h,{modelValue:e.article.createTime,"onUpdate:modelValue":l[5]||(l[5]=o=>e.article.createTime=o),type:"date",autocomplete:"off",placeholder:"选择日期"},null,8,["modelValue"])]),_:1},8,["label-width"]),t(d,{label:"更新时间","label-width":e.formLabelWidth},{default:a(()=>[t(h,{modelValue:e.article.updateTime,"onUpdate:modelValue":l[6]||(l[6]=o=>e.article.updateTime=o),type:"date",autocomplete:"off",placeholder:"选择日期"},null,8,["modelValue"])]),_:1},8,["label-width"])]),_:1},8,["model"])]),_:1},8,["modelValue"]),f("div",Q,[t(w,{data:e.list,style:{width:"100%"}},{default:a(()=>[t(i,{fixed:"",prop:"id",label:"文章id",width:"80",align:"center"}),t(i,{prop:"articleCatId",label:"用户文章编号",width:"150",align:"center"}),t(i,{prop:"title",label:"文章标题",width:"80",align:"center"}),t(i,{prop:"content",label:"文章内容",width:"400",align:"center"}),t(i,{prop:"updateTime",label:"更新时间",width:"250",align:"center"}),t(i,{prop:"createTime",label:"创建时间",width:"250",align:"center"}),t(i,{prop:"userinfoId",label:"用户编号",width:"250",align:"center"}),t(i,{prop:"open",label:"是否公开",width:"250",align:"center"}),t(i,{fixed:"right",label:"权限",width:"150",align:"center"},{default:a(o=>[t(n,{type:"info",plain:"",size:"small",onClick:y=>e.handleEdit(o.row.id)},{default:a(()=>[r("编辑")]),_:2},1032,["onClick"]),t(n,{type:"danger",plain:"",size:"small",onClick:y=>e.handleDelete(o.row.id)},{default:a(()=>[r("删除")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])])])],2)}const te=C(G,[["render",R]]);export{te as default};
