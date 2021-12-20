<template>
  <div class="personal">
    <el-row>
      <el-col :span="12">
        <div class="avatar-wrapper">
          <el-avatar :size="120" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
        </div>
      </el-col>
      <el-col :span="12">
        <el-descriptions title="User Info" :column="1">
          <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
          <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
          <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
          <el-descriptions-item label="Remarks">
            <el-tag size="small">School</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Address">
            No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">会员</el-breadcrumb-item>
        </el-breadcrumb>
        <div>ss</div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">观看历史</el-breadcrumb-item>
        </el-breadcrumb>
        <div>ss</div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">收藏</el-breadcrumb-item>
        </el-breadcrumb>
        <div>ss</div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">收藏</el-breadcrumb-item>
        </el-breadcrumb>
        <div>ss</div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">意见反馈</el-breadcrumb-item>
        </el-breadcrumb>
        <div>ss</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { UserFilled } from '@element-plus/icons';

export default {
  name: 'HomePersonal',
  components: { UserFilled },
  setup(props) {
    return {};
  },
};
</script>

<style scoped>
.avatar-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
