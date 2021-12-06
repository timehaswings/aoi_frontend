<template>
  <div>
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
    <el-row v-for="o in 6" :key="o" :gutter="20" style="margin-top: 20px">
      <el-col v-for="(o, index) in 5" :key="o" :xs="1" :sm="3" :md="4" :lg="6" :xl="8">
        <el-card :body-style="{ padding: '0px' }">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image" />
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
import { reactive } from 'vue';

export default {
  name: 'HomeCategory',
  setup() {
    const queryParams = reactive({
      category: 'New York',
    });
    return {
      queryParams,
    };
  },
};
</script>

<style scoped>
.scrollbar-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-danger-lighter);
  color: var(--el-color-danger);
}
</style>
