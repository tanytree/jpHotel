<template>
    <div class="flexP">
      <el-dialog :visible.sync="urlShowDialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
        <el-steps :active="active" align-center>
            <el-step title="商品基本信息"></el-step>
            <el-step title="详细信息"></el-step>
            <el-step title="其他信息"></el-step>
        </el-steps>
        <div class="flexcenter">
            <el-form ref="form" :model="form" label-width="80px" size="small" v-show="active==0" :rules="rules">
                <el-form-item label="商品名称" prop="titleName">
                    <el-input v-model="form.titleName"></el-input>
                </el-form-item>
                <el-form-item label="产品类型" prop="productType">
                    <template>
                      <el-radio-group v-model="form.productType">
                        <el-radio label="1">当前课程</el-radio>
                        <el-radio label="2">活动课程</el-radio>
                        <el-radio label="3">产地预定</el-radio>
                        <el-radio label="4">门票</el-radio>
                      </el-radio-group>
<!--                      产品类型 1当前课程 2活动课程 3场地预定 4门票-->
                    </template>
                </el-form-item>
              <currentCourse v-show="form.productType == 1" :form="form" :action="action" :courseTypes="courseTypes" :uploadData="uploadData" :edtShow="form.edtShow" ref="currentCourse"/>
              <activesCourse v-show="form.productType == 2" :form="form" :action="action" :courseTypes="courseTypes" :uploadData="uploadData" :edtShow="form.edtShow" ref="activesCourse"/>
              <site-book v-show="form.productType == 3" :form="form" :action="action" :courseTypes="courseTypes" :uploadData="uploadData" :edtShow="form.edtShow" ref="siteBook"/>
              <tickets v-show="form.productType == 4" :action="action" :form="form" ref="tickets" :uploadData="uploadData" :edtShow="form.edtShow"/>
            </el-form>

            <el-form :model="form" label-width="80px" v-show="active==1">
                <el-form-item label="商品详情">
                    <div class="step2">
                        <el-input resize="none" placeholder="请输入产品介绍" type="textarea" :autosize="{ minRows: 12, maxRows: 20}" v-model="form.contentDetail"></el-input>
                        <div style="display: inline-block;">
                          <el-upload
                            :action="action"
                            :data="uploadData" :limit="6"
                            list-type="picture-card"
                            :before-upload="beforeUpload"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :file-list="form.showContentIcons"
                            accept=".png, .jpg, .gif"
                            :on-success="(res, file, fileList) => mainPicSuccess(res, file, fileList)">
                            <i class="el-icon-plus avatar-uploader-icon" v-if="form.contentIcon && form.contentIcon.length < 6"></i>
<!--                            <i class="el-icon-plus"></i>-->
                            <div slot="tip" class="el-upload__tip">尺寸建议750*422，大小2M以下，最多6张</div>
                            </el-upload>
                        </div>
                    </div>
                </el-form-item>

            </el-form>
            <el-form :model="form" label-width="120px" v-show="active==2">
                <el-form-item label="上架状态">
                    <el-radio-group v-model="form.status">
                        <el-radio :label="0">立即上架</el-radio>
                        <el-radio :label="1">暂时不上传</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </div>
        <div class="btns">
            <el-button class="cancel" v-if="active == 0" @click="back">取消</el-button>
            <el-button class="cancel" v-if="active>0" @click="back">上一步</el-button>
            <el-button class="submit" v-if="active<2" @click="next">下一步</el-button>
            <el-button class="submit" v-if="active==2" @click="finsh">完成</el-button>
        </div>
    </div>
</template>
<script>
    import currentCourse from './type/currentCourse'
    import activesCourse from './type/activesCourse'
    import tickets from './type/tickets'
    import { mapState, mapActions } from 'vuex'
    import SiteBook from './type/siteBook'
    export default {
        props: ['action', 'courseTypes', 'uploadData', 'productDetail'],
        components: {
            SiteBook,
            currentCourse,
            activesCourse,
            tickets,
        },
        computed: {
            ...mapState({
            }),
        },
        watch: {
        },
        data () {
            return {
                //显示图片
                urlShowDialogVisible: false,
                dialogImageUrl: '',
                active: 0,   //操作步骤值
                form: {
                    contentDetail: '',
                    showContentIcons: [],
                    titleName: '',  //产品名称
                    productType: '', //产品类型
                    icon: [],     //商品主图
                    contentIcon: [],//产品详情图片
                    status: 0,
                    edtShow: {},//  各类型数据
                    productData: {},
                },
                requestParams: {},
                rules: {
                    titleName : [ { required: true, message: "商品名称必填", trigger: "blur" } ],
                    productType : [ { required: true, message: "产品类型必填", trigger: "blur" } ],
                },
            }
        },
        created () {
            /**  获取产品类型 **/

        },
        methods: {
            initProduct(data) {
                this.$refs['form'].resetFields();
                this.requestParams = {};
                this.active = 0;
                this.form = {
                    contentDetail: '',
                    titleName: data.name,
                    productType: data.type + '',
                    icon: data.icon ? data.icon.split(',') : [],
                    showContentIcons: [],
                    status: data.shelvesStatus || 0,
                    id: data.id,
                    productData: data,
                };
                if (data.type == 1 || data.type == 2) {
                    this.form.contentDetail = data.edtCourse.contentDetail ? data.edtCourse.contentDetail : '';
                    this.form.contentIcon = data.edtCourse.courseDetail ? data.edtCourse.courseDetail.split(',') : [];
                } else if (data.type == 3) {
                    this.form.contentDetail = data.edtReserver.contentDetail ? data.edtReserver.contentDetail : '';
                    this.form.contentIcon = data.edtReserver.reserverDetail ? data.edtReserver.reserverDetail.split(',') : [];
                } else if (data.type == 4){
                    this.form.contentDetail = data.edtShow.contentDetail ? data.edtShow.contentDetail : '';
                    this.form.contentIcon = data.edtShow.showDetail ? data.edtShow.showDetail.split(',') : [];
                }
                if (this.form.contentIcon && this.form.contentIcon.length > 0) {
                    this.form.contentIcon.forEach(item=> {
                        if (item)
                            this.form.showContentIcons.push({ url: item});
                    })
                }
                this.$forceUpdate();
                setTimeout(()=> {
                    if ((this.form.productData.type == 1 || this.form.productData.type == 2) && this.$refs.currentCourse ) {
                        this.$refs.currentCourse.initProduct(data);
                    } else if (data.type == 4 && this.$refs.tickets) {
                        this.$refs.tickets.initProduct(data);
                    } else if (data.type == 3 && this.$refs.siteBook) {
                        this.$refs.siteBook.initProduct(data);
                    }
                }, 100)
            },
            finsh () {
                let contentIcons = [];
                if (this.form.contentIcon && this.form.contentIcon.length > 0) {
                    this.form.contentIcon.forEach(item => {
                        if (item && item.startsWith('http')) {
                            contentIcons.push(item);
                        }
                    })
                }
                this.requestParams.contentIcon = contentIcons.join(',');
                let icons = [];
                if (this.requestParams.icon && this.requestParams.icon.length > 0) {
                    this.requestParams.icon.forEach(item => {
                        if (item && item.url && item.url.startsWith('http')) {
                            icons.push(item.url);
                        }
                    })
                }
                this.requestParams.icon = icons.join(',');
                this.requestParams.status = this.form.status;
                var params = JSON.parse(JSON.stringify(this.requestParams));
                params.passage = JSON.stringify(params.passage);
                params.showStarttime = JSON.stringify(params.showStarttime);
                params.showCitys = JSON.stringify(params.showCitys);
                params.showJson = JSON.stringify(params.showJson);
                delete params['productData'];
                delete params['showContentIcons'];
                this.$F.doRequest(this, '/edt/adminsystem/productRelease', params, (data) => {
                    this.$message.success('发布产品成功');
                    setTimeout(()=> {
                        this.$emit('activeNameChange');
                    }, 1200)
                })
            },

            next () {
                if (this.active == 0) {
                    this.$refs["form"].validate(valid => {
                        if (valid) {
                            Object.assign(this.requestParams, this.form);
                            let secondFormData = false;
                            console.log(this.form)
                            if (this.form.productType == 1)  //当前课程、
                                secondFormData = this.$refs.currentCourse.returnForm()
                            if (this.form.productType == 2)   //活动课程
                                secondFormData = this.$refs.activesCourse.returnForm();
                            if (this.form.productType == 3)  //场地
                                secondFormData = this.$refs.siteBook.returnForm();
                            if (this.form.productType == 4)  //tickets
                                secondFormData = this.$refs.tickets.returnForm()
                            if (! secondFormData)
                                return;
                            Object.assign(this.requestParams, secondFormData)
                            delete this.requestParams['spec'];
                            if (!this.form.showContentIcons) {
                                this.form.showContentIcons = [];
                            }
                            console.log(this.form);
                            console.log(this.requestParams);
                            if (this.active++ > 2) this.active = 0
                        }
                    })
                } else if (this.active == 1) {
                    this.requestParams.contentDetail = this.form.contentDetail;
                    if (this.active++ > 2) this.active = 0
                }


            },

            back () {
                if (this.active == 0) {
                  this.$emit('activeNameChange');
                } else
                  this.active--
            },

            //上传图片需要用到方法
           //预览图片
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.urlShowDialogVisible = true;
            },

            //上传成功回调
            mainPicSuccess: function (res, file, fileList, index) {
                if (res.code == 200) {
                    this.form.contentIcon.push(res.data);
                } else {
                    this.$message.error(res.message);
                    this.form.contentIcon.pop();
                }
            },

            beforeUpload (file) {
                return this.$F.beforeUpload(this, file, 2)
            },

            /**删除图片 */
            handleRemove(file, fileList, c) {
                this.form.contentIcon = fileList;
            },
        }
    }
</script>
<style lang="less">
    .el-specItem {
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        height: auto;
        line-height: 40px;
        padding: 10px 20px;
        outline: 0;
        -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        width: 100%;

        .cancel {
            width: auto;
            padding: 6px 8px;
            border-radius: 3px;
        }
    }

    .specItem {
        border-bottom: 1px solid #d8d8d8;
        padding: 0 10px;
    }

    .specVal {
        display: flex;
        flex-wrap: wrap;

        .valTit {
            width: 60px;
        }

        .inputBox {
            position: relative;
            margin-right: 10px;

            i {
                position: absolute;
                right: 0;
                top: 0;
                cursor: pointer;
            }
        }
    }

    .flexP {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .avatar-uploader .el-upload:hover {
            border-color: #409eff;
        }

        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
        }

        .avatar {
            width: 40px;
            height: 40px;
            display: block;
        }

        .avatars {
            width: 40px;
            height: 40px;
            margin-right: 10px;
            position: relative;
            display: inline-block;

            .deleteIcon {
                position: absolute;
                right: -0;
                top: -0;
                line-height: 20px;
                color: #fff;
                cursor: pointer;
                background-color: rgba(0, 0, 0, 0.3);

                text-align: center;
                width: 20px;
                height: 20px;
            }
        }

        .btns {
            padding: 20px 0 10px;
            border-top: 1px solid #EFEFEF;
            text-align: center;
        }
    }

    .parmarBtn {
        position: relative;
        display: inline-block;
        margin-right: 8px;
        background: #fff;
        border-radius: 2px;
        line-height: 1;
        border: 1px solid rgba(199, 199, 199, 1);
        padding: 7px 15px;
        box-sizing: border-box;

        i {
            position: absolute;
            right: -5px;
            top: -5px;
            color: #d81e06;
            cursor: pointer;
        }
    }

    .flexcenter {
        flex: 1;
        overflow-y: auto;
        padding: 30px;

        .el-form-item {
            margin-bottom: 30px;
        }

        .step2 {
            padding: 20px;
            background: #F4F5F8;
            border: 1px solid #999;
            border-radius: 4px;

            .el-textarea__inner {
                border: 0;
                background: transparent;
                padding: 0;
            }
        }
    }
</style>
