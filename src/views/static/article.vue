<template>
   <div :class="ok ? 'home':'index'">
    <div class="root">
      <div class="adCate-tool">
            <el-button type="warning" @click="toAdd">添加</el-button>
            <el-button type="warning" @click="enterarticlecat">文章类型管理</el-button>
            <el-button type="warning" ><router-link to="/shuju" style="text-decoration: none;color: aliceblue;">用户界面</router-link></el-button>
            <el-button type="warning" @click="enterlogin" style="float: right; " >重新登陆</el-button>
        </div>
      <el-dialog v-model="dialogFormVisible" title="文章内容">
        <el-form :model="article">
          
          <!-- <el-form-item label="用户文章编号" :label-width="formLabelWidth">
            <el-input v-model="article.userArticleCatId" autocomplete="off" />
          </el-form-item> -->
          <el-form-item label="文章内容" :label-width="formLabelWidth">
            <el-input v-model="article.content" autocomplete="off" />
          </el-form-item>
          <el-form-item label="文章标题" :label-width="formLabelWidth">
            <el-input v-model="article.title" autocomplete="off" />
          </el-form-item>
          <el-form-item label="是否公开" :label-width="formLabelWidth">
            <el-input v-model="article.open" autocomplete="off" />
          </el-form-item>
          <el-form-item label="文章分类id" :label-width="formLabelWidth">
            <el-input v-model="article.articleCatId" autocomplete="off" />
          </el-form-item>
          <el-form-item label="用户编号" :label-width="formLabelWidth">
            <el-input v-model="article.undefined" autocomplete="off" />
          </el-form-item>
          <el-form-item label="创建时间" :label-width="formLabelWidth">
              <el-date-picker v-model="article.createTime" type="date" autocomplete="off" placeholder="选择日期" />
          </el-form-item>
          <el-form-item label="更新时间" :label-width="formLabelWidth">
              <el-date-picker v-model="article.updateTime" type="date" autocomplete="off" placeholder="选择日期" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="confirm()"> 确定 </el-button>
          </span>
        </template>
      </el-dialog>
      <div class="table">
        <el-table :data="list" style="width: 100%">
          <el-table-column fixed prop="id" label="文章id" width="80" align="center"/>
          <el-table-column prop="articleCatId" label="用户文章编号" width="150" align="center"/>
          <el-table-column prop="title" label="文章标题" width="80" align="center"/>
          <el-table-column prop="content" label="文章内容" width="400" align="center"/>
          <el-table-column prop="updateTime" label="更新时间" width="250" align="center"/>
          <el-table-column prop="createTime" label="创建时间" width="250" align="center"/>
          <el-table-column prop="userinfoId" label="用户编号" width="250" align="center"/>
          <el-table-column prop="open" label="是否公开" width="250" align="center"/>
          <el-table-column fixed="right" label="权限" width="150" align="center">
            <template #default="scope" >
              <el-button type="info" plain size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
              <el-button type="danger" plain size="small"  @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
  </template>
    
    <script>
  import article from '@/http/article'
  import { defineComponent } from "vue";
  
  export default defineComponent({
    data() {
      return {
        articles: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            article: {
              "articleCatId": 0,
              "content": "",
              "createTime": "",
              "deleted": 0,
              "id": 0,
              "open": 0,
              "title": "",
              "updateTime": "",
              "userinfoId": 0 },
            formLabelWidth: 100,
            list:[]
      };
    },
    created(){
      this.fetchData()
    },
    mounted() {
      this.fetchData(1);
      
    },
    methods: {
      enterarticlecat() {
            console.log("进入文章类型管理");
            this.$router.push({ path: '/articlecat' });
    },
    enterlogin() {
            console.log("进入登录界面");
            this.$router.push({ path: '/login' });
    },
      fetchData() {
        article.entire().then((res) => {
          console.log(res)
          this.list = res.data.articles;
          console.log(this.list);
        });
      },
      handleDelete(id) {
        const data = id;
        ElMessageBox.confirm("您是否需要删除该文章吗?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning",
        })
          .then(() => {
            article.remove(data).then((res) => {
              if (res.success) {
                ElMessage({
                  type: "success",
                  message: "删除成功",
                });
                this.fetchData();
              } else {
                ElMessage({
                  type: "error",
                  message: "网络出问题，联系管理员",
                });
              }
            });
          })
          .catch(() => {
            ElMessage({
              type: "warning",
              message: "取消删除",
            });
          });
      },
      
      handleSelect(id) {
        article.select({ id }).then((res) => {
          this.article = res.data.article;
        }).catch((err) => {
          console.error(err);
        });
      },
      handleEdit(id) {
        this.dialogFormVisible = true;
        const data = { id };
        article.select(data).then((res) => {
          this.article = res.data.article;
        });
      },
      toAdd() {
            //到添加的页面
            this.dialogFormVisible = true;
            this.article={
              "userArticleCatId": 0,
              "content": "",
              "courseId": 0,
              "createTime": "",
              "deleted": 0,
              "id": 0,
              "open": 0,
              "title": "",
              "updateTime": "",
              "userinfoId": 0
            }
            
        },
      confirm() {
        let i=this
        if (this.article.id == undefined || this.article.id == 0) {
          article.add(this.article).then((res) => {
            if (res.success) {
              ElMessage({
                type: "success",
                message: "添加成功",
              });
              i.fetchData();
            } else {
              ElMessage({
                type: "error",
                message: "网络出问题，联系管理员",
              });
            }
            this.dialogFormVisible = false;
          });
        } else {
          article.update(this.article).then((res) => {
            if (res.success) {
              ElMessage({
                type: "success",
                message: "编辑成功",
              });
              this.fetchData();
            } else {
              ElMessage({
                type: "error",
                message: "网络出问题，联系管理员",
              });
            }
          });
          this.dialogFormVisible = false;
        }
      },
    },
  });

  </script>
    <style lang="scss" scoped>
  </style>
    