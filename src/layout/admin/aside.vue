<template>
    <el-aside width="200px">
        <el-menu  default-active="2" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>知识库</span>
                </template>
                    <el-menu-item index="/admin">
                    <el-icon><DocumentCopy /></el-icon>知识库分类</el-menu-item>
               
               
                    <el-menu-item index="/admin/about"><el-icon><UserFilled /></el-icon>关于我们</el-menu-item>
               
            </el-sub-menu>
            
            
        </el-menu>






    </el-aside>
</template>

<script>
import { defineComponent } from 'vue';
import {
    Document,
    Menu,
    Location,
    Setting,
House,
} from '@element-plus/icons-vue'
export default defineComponent({
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath)
        },
    },
    components: {
    Document,
    Menu,
    Location,
    Setting,
    House
}
});
</script>
<style lang = "scss" scoped>

</style>