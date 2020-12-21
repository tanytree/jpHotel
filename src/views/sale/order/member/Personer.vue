<template>
    <div class="boss-index">
        <!-- 具体参照黄工的营销部-产品管理部-店铺产品分类 -->
        <div class="flex_row">
            <div class="goodsType">
                <div class="goodsTop" style="margin-bottom: 20px;">
                    <el-button class="cancel" :icon="1==1?'el-icon-caret-right':'el-icon-caret-bottom'" @click="expanded(1)">{{$t('manager.grsl_foldAll')}}</el-button>
                    <el-button class="cancel" @click="addCategory(1)">{{$t('manager.grsl_addFirstGroup')}}</el-button>
                </div>
                <div class="accountBtm">
                    <el-tree :props="treeProps"  node-key="id" ref="treeType" default-expand-all>
                        <div class="custom-tree-node" slot-scope="{node, data}">
                            <span>{{ node.label }}</span>
                            <span>
                                <el-button class="btn-text" type="text"  size="mini" @click="() => addSecond(node, data, 1)" @click.stop>{{$t('manager.grsl_addSecondGroup')}}</el-button>
                                <el-button class="btn-text" type="text"  size="mini" @click="() => addThird(node, data, 1)" @click.stop>{{$t('manager.grsl_addThridGroup')}}</el-button>
                                <el-button class="btn-text" type="text" size="mini" @click="() => editNode(node, data, 1)" @click.stop>{{$t("manager.hp_editor")}}</el-button>
                                <el-button class="btn-text" type="text" size="mini" @click="() => deleteNode(data)" @click.stop>{{$t('commons.delete')}}</el-button>
                            </span>
                        </div>
                    </el-tree>
                </div>
            </div>
        </div>
        <!-- 新增分类 -->
        <el-dialog :title="cateTitle" :visible.sync="cateVisible" top="0" width="600px" :close-on-click-modal="false">
            <el-form label-position="right" label-width="120px" size="medium">
                <el-form-item :label="$t('manager.grsl_firstGroupName')+':'">
                    <el-input :disabled="category.categoryLevel==2 || category.categoryLevel==3 ? true: false" v-model="category.first"></el-input>
                </el-form-item>
                <el-form-item v-if="category.categoryLevel==2 || category.categoryLevel==3" :label="$t('manager.grsl_secondGroupName')+':'">
                    <el-input :disabled="category.categoryLevel==3 ? true: false" v-model="category.second"></el-input>
                </el-form-item>
                <el-form-item v-if="category.categoryLevel==3" :label="$t('manager.grsl_thridGroupName')+':'">
                    <el-input v-model="category.third"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" class="blueBtn mini" @click="submit">{{$t('commons.confirm')}}</el-button>
                <el-button class="defaultBtn mini" @click="cateVisible = false">{{$t('commons.cancel')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                treeProps: {children: "child", label: "name"},
                isexpand: true,
                allTree: [],
                cateVisible: false,
                cateTitle: "",
                add: true,
                category: {
                    id: "",
                    categoryLevel: "",
                    first: "",
                    second: "",
                    third: "",
                    pCategoryId: "",
                },
            };
        },
     
        mounted() {
          
        },
        computed: {
            addFirstGroup: {
                get() {
                    return this.$t("manager.grsl_addFirstGroup");
                },
                set() {
                },
            },

            addSecondGroup: {
                get() {
                    return this.$t("manager.grsl_addSecondGroup");
                },
                set() {
                },
            },
            addThridGroup: {
                get() {
                    return this.$t("manager.grsl_addThridGroup");
                },
                set() {
                },
            },
            resetType: {
                get() {
                    return this.$t("manager.grsl_resetType");
                },
                set() {
                },
            },
            confirm: {
                get() {
                    return this.$t("manager.grsl_confirm");
                },
                set() {
                },
            },
            cancle: {
                get() {
                    return this.$t("manager.grsl_cancle");
                },
                set() {
                },
            },
            alertTitle: {
                get() {
                    return this.$t("boss.loginDetail_alertTitle");
                },
                set() {
                },
            },
            deleteContent: {
                get() {
                    return this.$t("manager.grsl_deleteContent");
                },
                set() {
                },
            },
        },
        watch: {
            addFirstGroup(newValue, oldValue) {
                this.addFirstGroup = newValue;
            },
            addSecondGroup(newValue, oldValue) {
                this.addSecondGroup = newValue;
            },
            addThridGroup(newValue, oldValue) {
                this.addThridGroup = newValue;
            },
            resetType(newValue, oldValue) {
                this.resetType = newValue;
            },
            confirm(newValue, oldValue) {
                this.confirm = newValue;
            },
            cancle(newValue, oldValue) {
                this.cancle = newValue;
            },
            alertTitle(newValue, oldValue) {
                this.alertTitle = newValue;
            },
            deleteContent(newValue, oldValue) {
                this.deleteContent = newValue;
            },
        },
        methods: {
            addCategory(type) {
                this.cateVisible = true;
                this.category.categoryLevel = 1;
                this.category.pCategoryId = 0;
                this.category.first = "";
                this.cateTitle = this.addFirstGroup;
                this.categoryType = type;
                this.add = true;
            },
            addSecond(node, data, type) {
                this.cateVisible = true;
                this.category.categoryLevel = 2;
                this.category.pCategoryId = data.id;
                this.category.first = data.name;
                this.category.second = "";
                this.cateTitle = this.addSecondGroup;
                this.categoryType = type;
                this.add = true;
            },
            addThird(node, data, type) {
                this.cateVisible = true;
                this.category.categoryLevel = 3;
                this.category.pCategoryId = data.id;
                this.category.first = node.parent.data.name;
                this.category.second = data.name;
                this.category.third = '';
                this.cateTitle = this.addThridGroup;
                this.categoryType = type;
                this.add = true;
            },
            expanded: function (type) {
                this.isexpand = !this.isexpand;
                if(type == 1) {
                    for (
                        var i = 0;
                        i < this.$refs.treeType.store._getAllNodes().length;
                        i++
                    ) {
                        this.$refs.treeType.store._getAllNodes()[i].expanded = this.isexpand;
                    }
                } else {
                    for (
                        var i = 0;
                        i < this.$refs.serviceType.store._getAllNodes().length;
                        i++
                    ) {
                        this.$refs.serviceType.store._getAllNodes()[i].expanded = this.isexpand;
                    }
                }

            },
            editNode: function (node, data, type) {
                this.cateVisible = true;
                this.cateTitle = this.resetType;
                this.categoryType = type;
                if (data.categoryLevel == 1) {
                    this.category = {
                        id: data.id,
                        categoryLevel: data.categoryLevel,
                        first: data.name,
                        second: "**",
                        third: "**",
                        pCategoryId: data.pCategoryId,
                    };
                } else if (data.categoryLevel == 2) {
                    this.category = {
                        id: data.id,
                        categoryLevel: data.categoryLevel,
                        first: node.parent.data.name,
                        second: data.name,
                        third: "**",
                        pCategoryId: data.pCategoryId,
                    };
                } else {
                    this.category = {
                        id: data.id,
                        categoryLevel: data.categoryLevel,
                        first: node.parent.parent.data.name,
                        second: node.parent.data.name,
                        third: data.name,
                        pCategoryId: data.pCategoryId,
                    };
                }
                this.add = false;
            },

            //删除
            deleteNode: function (data) {
                var a = this;

                this.$confirm(this.deleteContent, this.alertTitle, {
                    confirmButtonText: this.confirm,
                    cancelButtonText: this.cancle,
                    type: "warning",
                }).then(() => {
                    this.$F.doRequest(
                        this,
                        "/pms/hotelcategory/delete",
                        {id: data.id},
                        (res) => {
                            // this.initData(data.categoryType);
                        }
                    );
                });
            },
            submit: function () {
                const a = this;
                let param = {};
                const name =
                    a.category.categoryLevel == 1
                        ? a.category.first
                        : a.category.categoryLevel == 2
                        ? a.category.second
                        : a.category.third;
                if (a.add) {
                    param = {
                        name: name,
                        categoryLevel: this.category.categoryLevel,
                        pCategoryId: this.category.pCategoryId,
                        categoryType: this.categoryType
                    };
                } else {
                    param = {
                        id: this.category.id,
                        name: name,
                        categoryLevel: this.category.categoryLevel,
                        pCategoryId: this.category.pCategoryId,
                        categoryType: this.categoryType
                    };
                }
                this.$F.doRequest(this, "/pms/hotelcategory/edit", param, (res) => {
                    // this.initData(this.categoryType);
                    this.cateVisible = false;
                });
            },
        },
    };
</script>

<style lang="less" scope>
    .goodsType {
        flex: 1;
        display: flex;
        flex-direction: column;
        background-color: #e4e7ea;
        border-radius: 8px;
        padding: 20px;
        margin: 0 10px;
        max-height: 100%;

        .el-tree {
            background: transparent;

            & > .el-tree-node {
                background-color: #fff;
                margin-bottom: 20px;
                border-radius: 6px;
            }

            .custom-tree-node {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 14px;
                padding-right: 8px;
            }

            .el-tree-node__content {
                height: 54px;
                border-bottom: 1px solid #dfdfdf;
                color: #333;
            }
        }

        .goodsTop {
            padding: 20px;
            display: flex;
            flex-direction: row;
            background-color: #fff;
            border-radius: 6px;
            margin-bottom: 20px;
            line-height: 38px;

            > span {
                margin-right: 20px;
            }
        }

        .accountBtm {
            padding: 0;
            overflow: auto;
        }
    }
</style>
