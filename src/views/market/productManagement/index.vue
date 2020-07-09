<!--
 * @Date: 2020-02-15 21:08:27
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-27 11:14:21
 * @FilePath: /cloudAdmin/src/views/market/productManagement/index.vue
 -->
<template>
    <div id="page1">
        <el-tabs class="pageTab" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="产品管理" name="first">
                <ProductList ref="productList" @editShop="editShop" :action="action" :uploadData="uploadData" @setProductDetail="setProductDetail" :productDetail="productDetail"/>
            </el-tab-pane>
            <el-tab-pane label="产品发布" name="second" >
                <ProductPublish ref="publishRef" @freshTable="freshTable" :action="action" :courseTypes="courseTypes" :uploadData="uploadData" @activeNameChange="activeNameChange" />
            </el-tab-pane>
            <el-tab-pane label="课程分类" name="third">
                <ProductCategory :action="action" :courseTypes="courseTypes"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import ProductList from './ProductList'
    import ProductPublish from './ProductPublish'
    import ProductCategory from './ProductCategory'
    import httpRequest from '@/utils/httpRequest'
    import { mapState, mapActions } from "vuex";
    export default {
        components: { ProductList, ProductPublish, ProductCategory },
        computed: {
            ...mapState({
                user: state => state.user
            }),
        },
        data () {
            return {
                productDetail: {},
                uploadData:{},
                courseTypes: [],
                // action: httpRequest.adornUrl('/edt/upload/upload_img'),
                action: 'http://xxyweeds.top:8895/edt/upload/upload_img',
                activeName: 'first' //第一个默认启动
            }
        },
        created () {
            this.uploadData = { imgModel: "1", platSource: 1006, userId: this.user.userId };
            this.$F.getCourseTypes(null, 1, (data) => {
                this.courseTypes = data
            })
        },
        activated () {
            //从首页过来初始化
            if (this.$route.query && this.$route.query.type) {
                this.activeName = this.$route.query.type
                if (this.activeName == 'second') {
                    // this.$refs.publishRef.initProduct()
                }
            }
        },
        methods: {
            //二级tab切片
            handleClick (tab, event) {
                // console.log(tab, event);
                if (tab.index == 1) {
                    // this.$refs.publishRef.initProduct()
                }
            },
            freshTable () {
                this.$refs.productList.getDataList()
            },
            editShop (id) {
                this.activeName = 'second'
                // this.$refs.publishRef.initProduct(id)
            },
            activeNameChange() {
                this.activeName = 'first' ;
                this.$refs.productList.fetchGoodList();
            },

            setProductDetail(data) {
                this.productDetail = data;
                this.activeName = 'second';
                if (data) {
                    this.$refs.publishRef.initProduct(data);
                }

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
