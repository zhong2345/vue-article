<template>
    <el-main>
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" background-color="#545c64"
            text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
            <el-menu-item index="1" utrro>Java</el-menu-item>
            <el-menu-item index="2" >Python</el-menu-item>
            <el-menu-item index="3" >区块链</el-menu-item>
            <el-menu-item index="4" >内容简介</el-menu-item>
            
            
        </el-menu>
        <RouterView :key="key"></RouterView>
    </el-main>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    data(){
        return{
            activeIndex2:'1'
        }
    },
    computed: {
        key() {
            return this.$route.path
        }
    },
    methods:{
        handleSelect(key, keyPath){
            console.log(key, keyPath)
        }
    }
});
</script>
<style lang = "scss" scoped></style>