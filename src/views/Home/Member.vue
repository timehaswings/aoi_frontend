<template>
    <div>
        <!-- <el-icon :size="20" :color="color">
        <edit></edit>
        </el-icon>
        <edit style="width: 1em; height: 1em; margin-right: 8px;" />
        <apple style="width: 1em; height: 1em; margin-right: 8px;" /> -->
        <el-row :gutter="10">
            <el-col :span="12">
                <el-carousel :interval="5000" arrow="always">
                    <el-carousel-item v-for="item in 4" :key="item">
                    <h3>{{ item }}</h3>
                    </el-carousel-item>
                </el-carousel>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card" shadow="never">
                    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
                </el-card>
            </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
            <el-col :span="24">
                <i class="el-icon-lx-emojifill" style="font-size: 30px;color: #ffc300"></i>
                <el-radio-button label="New York" style="margin-right: 10px"></el-radio-button>
                <el-radio-button label="New York" style="margin-right: 10px"></el-radio-button>
                <el-radio-button label="New York" style="margin-right: 10px"></el-radio-button>
                <el-radio-button label="New York" style="margin-right: 10px"></el-radio-button>
            </el-col>
        </el-row>
         <el-row v-for="(o) in 6" :key="o" :gutter="20" style="margin-top: 20px">
            <el-col
              v-for="(o, index) in 5"
              :key="o"
              :xs="1" :sm="3" :md="4" :lg="6" :xl="8"
            >
              <el-card :body-style="{ padding: '0px' }">
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="image"
                />
                <div style="padding: 14px">
                  <span>Yummy hamburger</span>
                  <div class="bottom">
                    <time class="time">2020-01-01</time>
                    <el-button type="text" class="button">Operating</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
    </div>
</template>

<script>
// import { Edit, Apple, ArrowLeft } from '@element-plus/icons'

export default {
    // components: {
    //     Edit, Apple, ArrowLeft
    // }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 500px;
  height: 500px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

</style>