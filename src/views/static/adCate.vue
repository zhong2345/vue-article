<template>
    <div class="adCates">
        <div class="adCate-tool">
            <el-button type="warning" @click="toAdd">添加</el-button>
        </div>
        <el-table :data="adCates" style="width: 100%">
            <el-table-column fixed prop="id" label="#" width="50" />
            <el-table-column prop="name" label="广告类型" />
            <el-table-column prop="width" label="宽度" width="120" />
            <el-table-column prop="height" label="高度" width="120" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="toEdit(scope.row)">更新</el-button>
                    <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total"
            @current-change="currentchange" />
    </div>
    <el-dialog v-model="dialogFormVisible" title="广告类型编辑">
        <el-form :model="adCate">
            <el-form-item label="广告类型" :label-width="formLabelWidth">
                <el-input v-model="adCate.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="width" :label-width="formLabelWidth">
                <el-input v-model="adCate.width" autocomplete="off" />
            </el-form-item>
            <el-form-item label="height" :label-width="formLabelWidth">
                <el-input v-model="adCate.height" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="save">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script>
import { defineComponent } from "vue"
import { adCatePage, adCateDelId, adCateAdd, adCateEdit } from "../../http"
import { ElMessage } from 'element-plus'
import {cloneDeep} from 'lodash-es'
export default defineComponent({
    data() {
        return {
            adCates: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            adCate: {
                "height": "",
                "id": 0,//标志点0 添加>0 更新
                "name": "",
                "width": ""
            },
            formLabelWidth: 80
        }

    },
    mounted() {
        this.getAdCatesPage(1)
    },
    methods: {
        toEdit(adcate) {
            console.log(adcate);
            this.dialogFormVisible=true;
            this.adCate= cloneDeep(adcate);

           
        },
        getAdCatesPage(current) {
            const data = {
                current: current,
                size: 2
            }

            adCatePage(data).then(res => {
                console.log(res);
                const page = res.data.page;
                this.adCates = page.records;
                this.page = page;
            }).catch(error => {
                console.log(error);
            })
        },
        currentchange(current) {
            // console.log(current);
            this.getAdCatesPage(current);
            this.page.current = current;//数据更新目前显示的页面
        },
        del(id) {
            //删除数据
            //模拟删除，服务器进行处理
            //能够有反悔机会

            //如果只有一条数据，删除数据之后如何处理？
            //人机交互
            console.log(id)
            const params = {
                id: id
            }
            adCateDelId(params).then(res => {
                if (res.success) {
                    this.getAdCatesPage(this.page.current)

                }
                else {
                    console.log(res.msg)
                    return false
                }
            }).catch(error => {

            })
        },
        toAdd() {
            //到添加的页面
            this.dialogFormVisible = true;
            this.adCate={
                "height": "",
                "id": 0,//标志点0 添加>0 更新
                "name": "",
                "width": ""
            }
            
        },
        save() {
            // console.log(this.adCate)
            const adcate = this.adCate;
            if (adcate.id == 0) {
                adCateAdd(adcate).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getAdCatesPage(this.page.current)
                        ElMessage(res.msg)
                    }
                    else {
                        ElMessage(res.msg)
                        return false
                    }
                }).catch(error => {
                    ElMessage('网络错误联系管理员')
                })
            }
            else{
                adCateEdit(adcate).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getAdCatesPage(this.page.current)
                        ElMessage(res.msg)
                    }
                    else {
                        ElMessage(res.msg)
                        return false
                    }
                }).catch(error => {
                    ElMessage('网络错误联系管理员')
                })
            }
        }
    }
});
</script>

<style lang="scss" scoped></style>
