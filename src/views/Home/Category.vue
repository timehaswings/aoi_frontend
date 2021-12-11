<template>
  <div class="category">
    <el-row>
      <el-col :span="24">
        <el-radio-group v-model="queryParams.category" size="medium">
          <el-radio-button label="New York"></el-radio-button>
          <el-radio-button label="Washington"></el-radio-button>
          <el-radio-button label="Los Angeles"></el-radio-button>
          <el-radio-button label="Chicago"></el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row style="margin-top: 5px">
      <el-col :span="24">
        <el-radio-group v-model="queryParams.category" size="medium">
          <el-radio-button label="New York"></el-radio-button>
          <el-radio-button label="Washington"></el-radio-button>
          <el-radio-button label="Los Angeles"></el-radio-button>
          <el-radio-button label="Chicago"></el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row style="margin-top: 5px">
      <el-col :span="24">
        <el-radio-group v-model="queryParams.category" size="medium">
          <el-radio-button label="New York"></el-radio-button>
          <el-radio-button label="Washington"></el-radio-button>
          <el-radio-button label="Los Angeles"></el-radio-button>
          <el-radio-button label="Chicago"></el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row justify="center" style="margin-top: 20px">
      <el-col :span="24">
        <div v-masonry="containerId" :horizontal-order="true" transition-duration="0.3s" item-selector=".image-item" :gutter="12">
          <div v-masonry-tile class="item" v-for="(item, index) in blocks" :key="index">
            <el-card class="image-item" :body-style="{ padding: '0px' }">
              <img :src="item.src" />
              <div style="padding: 14px">
                <span>Yummy hamburger</span>
                <div class="bottom">
                  <time class="time">2020-01-01</time>
                  <el-button type="text" class="button">Operating</el-button>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';

export default {
  name: 'HomeCategory',
  setup() {
    const queryParams = reactive({
      category: 'New York',
    });
    const containerId = ref(100);
    const blocks = ref([
      { name: '名字1', src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', id: 1 },
      { name: '名字2', src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', id: 2 },
      { name: '名字3', src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', id: 3 },
      { name: '名字4', src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', id: 4 },
      { name: '名字5', src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', id: 5 },
      { name: '名字6', src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', id: 6 },
      { name: '名字7', src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', id: 7 },
      { name: '名字8', src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', id: 8 },
      { name: '名字9', src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', id: 9 },
      { name: '名字10', src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', id: 10 },
      { name: '名字11', src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', id: 11 },
      { name: '名字12', src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png', id: 12 },
    ]);
    return {
      queryParams,
      containerId,
      blocks,
    };
  },
};
</script>

<style scoped>
.image-item {
  margin-bottom: 12px;
}
</style>
