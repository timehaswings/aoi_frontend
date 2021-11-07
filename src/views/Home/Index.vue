<template>
    <div>
        <el-carousel :interval="4000" type="card" height="400px">
            <el-carousel-item v-for="item in 6" :key="item">
              <h3 class="medium">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
          <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 20px 0;">
            <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
            <el-breadcrumb-item>promotion management</el-breadcrumb-item>
            <el-breadcrumb-item>promotion list</el-breadcrumb-item>
            <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
          </el-breadcrumb>
          <el-row v-for="(o, index) in 6" :key="o" style="margin-top: 20px">
            <el-col
              v-for="(o, index) in 4"
              :key="o"
              :span="5"
              :offset="index > 0 ? 1 : 0"
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
import { ref } from 'vue'

export default {
    name: "HomeIndex",
    setup() {
        const activeIndex = ref('1')
        const activeIndex2 = ref('1')
        const handleSelect = (key, keyPath) => {
        console.log(key, keyPath)
        }
        return {
        activeIndex,
        activeIndex2,
        handleSelect,
        }
    },
}
</script>

<style scoped>

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
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