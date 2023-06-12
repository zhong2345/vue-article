<template>
    <div>
        <el-container class="layout-container-demo" style="height: 500px">
            <el-aside width="200px">
                <el-scrollbar>
                    <el-menu :default-openeds="['1', '3']">
                        <el-sub-menu index="1" style="transform: translateX(-10px);">
                            <template #title>

                                <svg viewBox="0 0 1024 1024" style="margin-right: 10px;" width="15px" height="15px"
                                    xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                                    <path fill="currentColor"
                                        d="M832 384H576V128H192v768h640V384zm-26.496-64L640 154.496V320h165.504zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm160 448h384v64H320v-64zm0-192h160v64H320v-64zm0 384h384v64H320v-64z">
                                    </path>
                                </svg>
                                知识库
                            </template>
                            <el-menu-item index="1-1">
                                <svg viewBox="0 0 1024 1024" style="margin-right: 10px;" width="15px" height="15px"
                                    xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                                    <path fill="currentColor"
                                        d="M832 384H576V128H192v768h640V384zm-26.496-64L640 154.496V320h165.504zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm160 448h384v64H320v-64zm0-192h160v64H320v-64zm0 384h384v64H320v-64z">
                                    </path>
                                </svg><router-link to="/H" style="text-decoration: none;color: black;">知识库分类</router-link></el-menu-item>
                            <el-menu-item index="1-2">
                                <svg style="margin-right: 10px;" width="15px" height="15px" viewBox="0 0 1024 1024"
                                    xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                                    <path fill="currentColor"
                                        d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z">
                                    </path>
                                </svg>关于我们</el-menu-item>
                        </el-sub-menu>
                    </el-menu>
                </el-scrollbar>
            </el-aside>
            <el-container>

                <router-view></router-view>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import 'element-plus/dist/index.css'
export default {
    
}
</script>

<style scoped>
.el-tabs {
    width: 100%;
}

.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.el-header {
    color: #333;
    line-height: 60px;
    background-color: #333;
}

.el-aside {
    color: #333;

}
</style>