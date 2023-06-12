<template>
    <div class="articleCats">
        <!-- 工具 -->
        <div class="article-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
            <el-button type="warning" @click="enterarticle">文章内容管理</el-button>
            <el-button type="warning" ><router-link to="/shuju" style="text-decoration: none;color: aliceblue;">用户界面</router-link></el-button>
            <el-button type="warning" @click="enterlogin" style="float: right; ">重新登陆</el-button>
        </div>
        <!-- 表格 -->
        <el-table :data="articleCats" style="width: 100%">
            <!-- 列定义 -->
            <el-table-column fixed prop="id" label="分类id" width="120" />
            <el-table-column prop="catName" label="类别名称" width="120" />
            <el-table-column prop="parentId" label="夫级id" width="120" />
            <el-table-column prop="showInNav" label="是否导航显示" width="120" />
            <el-table-column prop="sortOrder" label="排序" width="120" />
            <el-table-column prop="createTime" label="创建时间" width="120" />
            <el-table-column prop="updateTime" label="更新时间" width="120" />
            <el-table-column prop="deleted" label="删除" width="120" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="toEdit(scope.row)">更新</el-button> <!-- 更新按钮 -->
                    <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button> <!-- 删除按钮 -->
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination layout="prev, pager, next" :page-size="page.size" :total="parseInt(page.total)"
            @current-change="currentchange" />
    </div>


    <!-- articleCat编辑对话框 -->
    <el-dialog v-model="dialogFormVisible" title="新增文章类型">
        <el-form :model="articleCat">
            <el-form-item label="类别名称" :label-width="formLabelWidth">
                <el-input v-model="articleCat.catName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="夫级id" :label-width="formLabelWidth">
                <el-input v-model="articleCat.parentId" autocomplete="off" />
            </el-form-item>
            <el-form-item label="是否导航显示" :label-width="formLabelWidth">
                <el-radio v-model="articleCat.showInNav" label="true">true</el-radio>
                <el-radio v-model="articleCat.showInNav" label="false">false</el-radio>
            </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth">
                <el-input v-model="articleCat.sortOrder" autocomplete="off" />
            </el-form-item>
            <el-form-item label="创建时间" :label-width="formLabelWidth">
                <el-date-picker v-model="articleCat.createTime" type="date" autocomplete="off" placeholder="选择日期" />
            </el-form-item>
            <el-form-item label="更新时间" :label-width="formLabelWidth">
                <el-date-picker v-model="articleCat.updateTime" type="date" autocomplete="off" placeholder="选择日期" />
            </el-form-item>
        </el-form>

        <!-- 对话框底部按钮 -->
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button> <!-- 取消按钮 -->
                <el-button type="primary" @click="save">保存</el-button> <!-- 保存按钮 -->
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { ArticleCatPage, ArticleCatDelId, AddArticleCat, ArticleCatEdit } from "../../http/articlecat";
import { ElMessageBox, ElMessage } from 'element-plus';
import { cloneDeep } from 'lodash-es';

export default defineComponent({
    data() {
        return {
            articleCats: [], // 数据
            page: {
                records: [],
                total: 0,
                current: 1,
                size: 10,
            }, // 分页数据
            dialogFormVisible: false, // 对话框是否可见
            articleCat: {
                catName: "",
                createTime: "",
                deleted: 0,
                id: 0,
                parentId: 0,
                showInNav: true,
                sortOrder: 0,
                updateTime: "",
            }, // 当前编辑对象
            formLabelWidth: 98, // 表单标签宽度
        };
    },
    mounted() {
        this.getArticleCatsPage(1); // 组件加载时获取第一页数据
    },
    methods: {
        enterarticle() {
            console.log("进入文章内容管理");
            this.$router.push({ path: '/article' });
        },
        enterlogin() {
            console.log("进入登录界面");
            this.$router.push({ path: '/login' });
        },
        toEdit(articlecat) {
            this.dialogFormVisible = true; // 打开articleCat编辑对话框
            this.articleCat = cloneDeep(articlecat); // 深拷贝
        },
        getArticleCatsPage(current) {
            const data = {
                current: current,
                size: 5,
            };
            ArticleCatPage(data)
                .then((res) => {
                    const page = res.data.articleCats;
                    this.articleCats = page; // 设置分类数据
                    this.page = page; // 设置分页数据
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        currentchange(current) {
            this.getArticleCatsPage(current);
            this.page.current = current;
        },
        del(id) {
            ElMessageBox.confirm('确定删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    const params = {
                        id: id,
                    };
                    ArticleCatDelId(params)
                        .then((res) => {
                            if (res.success) {
                                const index = this.articleCats.findIndex((item) => item.id === id);
                                this.articleCats.splice(index, 1); // 移除被删除的分类
                                this.page.total--; // 总数减一
                                if (this.articleCats.length === 0 && this.page.current > 1) {
                                    this.currentchange(this.page.current - 1);
                                } else {
                                    this.getArticleCatsPage(this.page.current);
                                }
                            } else {
                                console.log(res.msg);
                                return false;
                            }
                        })
                        .catch((err) => { });
                })
                .catch(() => { });
        },
        toAdd() {
            this.dialogFormVisible = true; // 打开articleCat编辑对话框
            this.resetArticleCat(); // 重置 articleCat 对象
        },
        save() {
            const articlecat = this.articleCat;
            if (articlecat.id == 0) {
                AddArticleCat(articlecat)
                    .then((res) => {
                        if (res.success) {
                            this.dialogFormVisible = false; // 关闭articleCat编辑对话框
                            this.getArticleCatsPage(this.page.current); // 刷新当前页数据
                            ElMessage(res.msg);
                            this.resetArticleCat(); // 重置 articleCat 对象
                        } else {
                            ElMessage(res.msg);
                            return false;
                        }
                    })
                    .catch((err) => {
                        ElMessage('网络错误联系管理员');
                    });
            } else {
                ArticleCatEdit(articlecat)
                    .then((res) => {
                        if (res.success) {
                            this.dialogFormVisible = false; // 关闭articleCat编辑对话框
                            this.getArticleCatsPage(this.page.current); // 刷新当前页数据
                            ElMessage(res.msg);
                            this.resetArticleCat(); // 重置 articleCat 对象
                        } else {
                            ElMessage(res.msg);
                            return false;
                        }
                    })
                    .catch((err) => {
                        ElMessage('网络错误联系管理员');
                    });
            }
        },
        resetArticleCat() {
            this.articleCat = {
                catName: '',
                createTime: '',
                deleted: 0,
                id: 0,
                parentId: 0,
                showInNav: true,
                sortOrder: 0,
                updateTime: '',
            };
        },
    },
});
</script>

<style lang="scss" scoped></style>