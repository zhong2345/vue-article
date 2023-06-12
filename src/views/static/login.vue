<template >
  <!-- 登录页面设计
    1.表单
    2.验证
    3.登录实现,效果：loading
    4.状态信息的保存
    5.页面跳转
    6.reset
  -->
  <!-- <div>数量{{ userStore.count }}</div>
  <button @click="userStore.increat">count++</button> -->

  <div class="bj">
    
  <el-form ref="ruleFormRef" :model="userForm" status-icon :rules="rules" class="demo-ruleForm">
    <el-form-item prop="email">
      <el-input v-model="userForm.email" autocomplete="off" placeholder="请输入你的邮箱" suffix-icon="Message" />
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="userForm.password" autocomplete="off" placeholder="请输入你的密码" suffix-icon="Lock" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="btnLogin">管理员登录</el-button>
      <el-button @click="resetForm">重新输入</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
   
<script>
import { defineComponent } from 'vue';
import { userLogin } from '../../http';
import { mapActions, storeToRefs } from 'pinia';
import { useUserStore } from '../../store/user';
export default defineComponent({
  setup() {
    // 组合式
    // const userStore = useUserStore();
    // // const {setToken,fillUserinfo}=storeToRefs(userStore);
    // // const {count,increat}=storeToRefs(userStore)
    // return {userStore}
  },
  data() {
    return {
      userForm: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          { required: true, message: '请输入正确的电子邮箱', tirgger: 'blur' },
          { type: 'email', message: '电子邮箱格式错误', tirgger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入正确的用户密码', tirgger: 'blur' },
          { min: 8, message: '密码长度不得小于8', tirgger: 'blur' }

        ],
      },
    }
  },
  methods: {
    // 选项式
    ...mapActions(useUserStore, ['setToken', 'fillUserinfo']),
    btnLogin() {
      const that = this;
      const formEl = that.$refs.ruleFormRef//取对象
      // console.log(formEl);
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          //414090297@qq.com
          const res = userLogin(that.userForm)
          // console.log(res);
          res.then(result => {
            // console.log(result)
            //用户的状态：用户信息，用是否登录的标志token isLogin：true
            //pinia下次解决
            //跳转页面
            if (result.success) {
              const userinfo = result.data.userinfo;
              console.log(userinfo);
              that.setToken(userinfo.token);
              that.fillUserinfo(userinfo);
              this.$router.push('/articlecat')
            } else {
              return false;
            }

            // this.$router.push('/')
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit')
          return false;
        }
      })
      console.log(this.userForm);

    },
    resetForm() {
      const formEl = this.$refs.ruleFormRef
      formEl.resetFields()
    }
  }
});
</script>
  
<style lang="scss" scoped>
.max {
  image {
    z-index: -1;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
  }
}
</style>
<style scoped>
.bj{
  background: url(../static/微信图片_20230610203309.jpg);
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
.demo-ruleForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 300px;
 
}

label {
  margin: 10px 0;

}

input {
  padding: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  padding: 10px;
  border-radius: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
}


</style>