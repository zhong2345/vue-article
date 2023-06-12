<template>
    <div>
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" tab-class="my-tab-class"
            active-class="my-active-tab">
            <el-tab-pane v-for="i in tableData" :key="i.id" :label="i.catName" :name="i.id">
                <div class="mn" v-for="i in namelist" :key="i.id" :title="i.title">
                    <el-descriptions>
                        <div class="kuang">
                            <el-descriptions-item span="1.5" width="275px">
                                <h1>标题：{{ i.title }}</h1><br>
                            </el-descriptions-item>
                            <el-descriptions-item label="内容:" width="600px"><br>{{ i.content }}</el-descriptions-item>
                            <el-descriptions-item label="创建时间：" class="pl">
                                <el-tag size="small">{{ i.createTime }}</el-tag>
                            </el-descriptions-item>
                        </div>
                    </el-descriptions>
                    <el-divider></el-divider>
                </div>

            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            activeName: "",
            namelist: []
        }
    },
    methods: {
        handleClick(tab) {
            let a = this
            console.log('被点击的 tab 的 label:', tab.props);
            const params = {
                cateId: tab.props.name

            };
            // 发送 GET 请求，并传递参数
            this.$axios.get(`http://api.jqrjq.cn/api/article/${params.cateId}`, {
                params
            })
                .then(response => {
                    // 处理响应结果
                    console.log(response);
                    if (response.success) {
                        a.namelist = response.data.articles
                    } else {
                        a.namelist = []
                    }
                    console.log(response.success);
                })
                .catch(error => {
                    // 处理请求错误
                    console.error(error);
                });
        },
        list() {
            let t = this
            const params = {
                // token: 'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2ODg1Mjc4NDgsInN1YiI6IjQxNDA5MDI5N0BxcS5jb20iLCJpYXQiOjE2ODU5MzU4NDg5NTN9.sl6w2npKu3jyPb6F86fqbKEWq-ab1rqQ07Lekwczm2-yjm10EaZDzskzc4qv7La2z7fQyNq8yICkOqADrUrNQg'

            };
            // 发送 GET 请求，并传递参数
            this.$axios.get('http://api.jqrjq.cn/api/articleCat/all', { params })
                .then(response => {
                    // 处理响应结果
                    console.log(response.data.articleCats);
                    // console.log(response.data.data.articleCats);
                    t.tableData = response.data.articleCats
                })
                .catch(error => {
                    // 处理请求错误
                    console.error(error);
                });
        }
    },
    mounted() {
        this.list()
    },

}
</script>

<style>
.kuang {
    width: 800px;
}

.el-descriptions-item:third-child {
    float: right;
    margin-right: 5%;
}

h1 {
    text-align: center;
}

.mn {
    text-align: center;
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    color: #fff;
}


.el-tabs__item.is-active {
    color: #ffd04b !important;


}

.el-tabs__active-bar {
    background-color: #ffd04b !important;
}

.el-tabs__item:hover {
    color: #ffd04b !important;
}

.el-tabs__item:active {
    color: #ffd04b !important;
}

.el-tabs__header {
    background-color: #545c64;

}

.el-tabs__item {
    color: #fff;
}

.pl {
    padding-left: 20px;
}</style>