<template>
    <div class="seat">
        <el-form ref="form" inline :model="form" label-width="80px" size="small">
            <el-form-item label="竖排数量">
                <el-input placeholder="" v-model="yNumber" @change="numberChange('y')"></el-input>
            </el-form-item>
            <el-form-item label="横排数量">
                <el-input placeholder="" v-model="xNumber" @change="numberChange('x')"></el-input>
            </el-form-item>
            <div class="sign">
                <div class="sign-tip"><span class="circle"><i class="el-icon-more"></i></span>代表添加过道</div>
                <div class="sign-tip"><span class="circle bg"><i class="el-icon-more"></i></span>代表取消过道</div>
                <div class="sign-tip"><span class="square bg"></span>可出售座位</div>
                <div class="sign-tip"><span class="square"></span>不可出售座位</div>
            </div>
            <div class="seat-box">
                <div class="seat-tip">
                    <span>双击修改编号，单击选择座位或者取消座位</span>
                </div>
                <div class="seat-btns">
                    <ul class="seat-lBar">
                        <li v-for="(y, i) in yArray" :key="i">{{y}}</li>
                    </ul>
                    <div class="seat-content">
                        <!--<ul class="seat-tBar">
                          <li class="circle" :class="" v-for="(x, i) in xNumber" v-if="x < xNumber"><i class="el-icon-more"></i></li>
                        </ul>-->
                        <ul v-for="(yKey,yIndex) in yArray" :key="yIndex">
                            <li v-for="(xKey, xIndex) in xArray" :key="xIndex">
                                <i @click="passageClick(yKey, xKey)" v-if="(xKey > 1 && xKey <= xArray.length && yKey == 1) || yKey > 1 && xKey == 1" class="icon el-icon-more" :class="(xKey > 1 && xKey <= xArray.length && yKey == 1) ? (passageInstances[yKey + '-' + xKey]) ? ('passage-selected '  + 'top') : 'top' : (passageInstances[yKey + '-' + xKey]) ? ('passage-selected '  + 'left') : 'left'"></i>
                                <el-button @click="seatClick(yKey, xKey)" class="seat-btn" :class="!instances[yKey + '-' + xKey] ? 'use-able' : 'un-able'">{{xKey}}</el-button>
                            </li>
                            <div style="margin: 10px"></div>
                        </ul>
                    </div>
                </div>
            </div>
        </el-form>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        components: {},
        computed: {
            ...mapState({
                company: state => state.company
            })
        },
        watch: {},
        data () {
            return {
                form: {
                    seatDistribution: [],
                    passage: {}
                },
                instances: {},
                passageInstances: {},
                xArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                yArray: [1, 2, 3, 4, 5, 6],
                yNumber: 6,
                xNumber: 10
            }
        },
        created () {
            this.init();
        },
        methods: {
            init() {
                debugger
                this.yNumber = this.form.seatDistribution.length || 6;
                this.xNumber = this.form.seatDistribution.length > 0 ? this.form.seatDistribution.length : 10;
                this.updateSeatDistribution();
            },
            initProduct(data) {
                this.$F.merge(this.form, data.edtShowSpecsList[0]);
                console.log(this.form);
                debugger;
                if (this.form.seatDistribution.length > 0) {
                    if (typeof this.form.seatDistribution == 'string') {
                        this.form.seatDistribution = JSON.parse(this.form.seatDistribution);
                    }
                }
                this.updateSeatDistribution();
                if (this.form.passage) {
                    if (typeof this.form.passage == 'string') {
                        this.form.passage = JSON.parse(JSON.parse(this.form.passage));
                    }
                    if (this.form.passage.x) {
                      this.form.passage.x.forEach((x)=> {
                          this.passageClick(1, x);
                      })
                    }
                    if (this.form.passage.y) {
                        this.form.passage.y.forEach((y)=> {
                            this.passageClick(y, 1);
                        })
                    }
                }
                this.init();
            },
            returnForm() {
                console.log(this.form);
                if (this.form.passage) {
                    if (this.form.passage.x && this.form.passage.x.length > 0) {
                        this.form.passage.x.sort((a, b)=> {
                            return a - b;
                        })
                    }
                    if (this.form.passage.y && this.form.passage.y.length > 0) {
                        this.form.passage.y.sort((a, b)=> {
                            return a - b;
                        })
                    }
                }
              return {seatDistribution: JSON.stringify(this.form.seatDistribution), passage: JSON.stringify(this.form.passage), allStock: this.yNumber * this.xNumber};
            },
            passageClick(yKey, xKey) {
                this.passageInstances[yKey + '-' + xKey] = !this.passageInstances[yKey + '-' + xKey];
                var tempArray = [];
                if (yKey == 1) {
                    for (let key in this.passageInstances) {
                        let value = this.passageInstances[key];
                        if (value && key.startsWith('1')) {
                            tempArray.push(key.split('-')[1])
                        }
                    }
                    this.form.passage.x = tempArray
                } else {
                    for (let key in this.passageInstances) {
                        let value = this.passageInstances[key];
                        if (value && key.endsWith('1')) {
                            tempArray.push(key.split('-')[0])
                        }
                    }
                    this.form.passage.y = tempArray;
                }
                this.$forceUpdate();
            },
            numberChange(type) {
                const array = [];
                if (type == 'x') {
                    for(let i = 1; i <= this.xNumber; i++) {
                        array.push(i);
                    }
                    this.xArray = array;
                } else if (type == 'y') {
                    for(let i = 1; i <= this.yNumber; i++) {
                        array.push(i);
                    }
                    this.yArray = array;
                }
                this.instances = {};
            },
            seatClick (yKey, xKey) {
                this.instances[yKey + '-' + xKey] = !this.instances[yKey + '-' + xKey];
                this.form.seatDistribution[yKey-1][xKey-1] = this.instances[yKey + '-' + xKey] ? 0 : 1;
                this.$forceUpdate()
            },
            updateSeatDistribution() {
                const array = [], a = this;
                if (! this.form.seatDistribution.length > 0) {
                    for(let i = 1; i <= this.yNumber; i++) {
                        let temp = [];
                        for(let j = 1; j <= this.xNumber; j++) {
                            temp.push(1);
                        }
                        array.push(temp);
                    }
                    this.form.seatDistribution = array;
                } else {
                    for(let yKey = 1; yKey <= this.form.seatDistribution.length; yKey++) {
                        let tempArray = this.form.seatDistribution[yKey-1];
                        for(let xKey = 1; xKey <= tempArray.length; xKey++) {
                            a.instances[yKey + '-' + xKey] = (tempArray[xKey - 1] == 0);
                        }
                    }
                }
            }
        }
    }
</script>
<style lang="less">
    .seat {
        margin-left: 80px;
        border: 1px solid #cfcfcf;
        border-radius: 4px;
        padding: 20px;

        .sign {
            margin-left: 80px;
            padding: 20px 0;
            display: flex;

            .sign-tip {
                margin-right: 30px;

                & > span {
                    display: inline-block;
                    height: 20px;
                    background-color: #fff;
                    border: 1px solid #A3A3A3;
                    line-height: 18px;
                    text-align: center;
                    color: #888;
                    margin-right: 10px;
                    vertical-align: middle;
                    font-size: 12px;
                }

                .circle {
                    width: 20px;
                    border-radius: 50%;

                    &.bg {
                        background: #126EFF;
                        color: #fff;
                        border-color: #126EFF;
                    }
                }

                .square {
                    width: 40px;
                    border-radius: 4px;

                    &.bg {
                        background: #126EFF;
                        color: #fff;
                        border-color: #126EFF;
                    }
                }
            }
        }

        .seat-box {
            width: 100%;
            background: #F3F8FF;
            border-radius: 4px;
            padding: 20px;

            .seat-tip {
                padding-left: 60px;
                color: #888888;
                margin-bottom: 20px;
            }

            .seat-btns {
                display: flex;
                flex-direction: row;
                justify-content: center;

                .seat-lBar {
                    background: #7A7D81;
                    color: #fff;
                    padding: 0 10px;
                    border-radius: 20px;
                    margin-right: 20px;
                    margin-top: 20px;

                  li {
                    height: 40px;
                    line-height: 40px;
                  }
                }

                .seat-content {
                    flex: 1;
                    width: 0;

                    .seat-tBar {
                        padding: 0 10px;
                    }

                    ul {
                        display: flex;
                        padding-left: 20px;

                        &:first-child {
                            padding-top: 20px;
                        }

                        li {
                            position: relative;
                        }

                        .icon {
                            position: absolute;
                            height: 20px;
                            width: 20px;
                            background-color: #fff;
                            border: 1px solid #A3A3A3;
                            color: #888;
                            border-radius: 50%;
                            font-size: 12px;
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            &.top {
                                top: -20px;
                                left: -10px;
                            }
                            &.left {
                                left: -20px;
                                top: -10px;
                            }
                            &.passage-selected {
                              background-color: blue;
                              color: white
                            }
                        }

                        .seat-btn {
                            width: 60px;
                            border-radius: 3px;
                            padding: 6px 10px;
                            margin: 5px;
                        }

                        .use-able {
                            background-color: #126EFF;
                            color: #fff;
                        }

                        .un-able {
                            background-color: #fff;
                            color: #333;
                        }
                    }
                }
            }
        }
    }


</style>
