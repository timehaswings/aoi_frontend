<template>
  <base-table
    :columns="state.columns"
    :data="state.data"
    :total="state.total"
    :query-form-items="state.queryFormItems"
    edit-form-title-width="80"
    :modal-width="500"
    :query-function="state.query"
    :add-function="state.add"
    :update-function="state.update"
    :del-function="state.del"
  >
    <template #row_is_active="{ row }">
      <el-tag v-if="row.isActive" size="mini" type="success" effect="dark">已激活</el-tag>
      <el-tag v-else size="mini" type="danger" effect="dark">未激活</el-tag>
    </template>
    <template #modal_form="{ data, modalVisible }">
      <el-form ref="editForm" :model="data" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="data.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="data.desc"></el-input>
        </el-form-item>
        <el-form-item label="演员">
          <el-input v-model="data.artists"></el-input>
        </el-form-item>
        <el-form-item label="上映时间">
          <el-input v-model="data.releaseTime"></el-input>
        </el-form-item>
        <el-form-item label="视频">
          <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              Drop file here or
              <em>click to upload</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
    </template>
  </base-table>
</template>

<script>
import { reactive, getCurrentInstance } from 'vue';
import { UploadFilled } from '@element-plus/icons';
import BaseTable from '@/components/Backend/BaseTable/Index.vue';

export default {
  components: { BaseTable, UploadFilled },
  setup() {
    const { proxy } = getCurrentInstance();
    const activeList = [
      { label: '已激活', value: true },
      { label: '未激活', value: false },
    ];
    const state = reactive({
      queryFormItems: [
        {
          field: 'isActive',
          span: 6,
          title: '激活状态',
          resetValue: null,
          itemRender: {
            name: '$select',
            options: activeList,
            props: { placeholder: '请选择激活状态' },
          },
        },
      ],
      columns: [
        { field: 'id', title: 'ID' },
        { field: 'name', title: '名称' },
        { field: 'desc', title: '描述' },
        { field: 'artists', title: '演员' },
        { field: 'sort', title: '权重' },
        { field: 'isActive', title: '激活状态', slots: { default: 'row_is_active' } },
        { field: 'releaseTime', title: '上映时间' },
        { field: 'createTime', title: '创建时间' },
      ],
      data: [],
      total: 0,
      query(params) {
        const query = { ...params, sort: '-sort,-id' };
        return proxy.$api.video
          .get(query)
          .then(res => {
            if (res.success) {
              state.data = res.data.rows;
              state.total = res.data.total;
            } else {
              proxy.$notify.warning({
                title: '失败',
                message: '获取类别失败：' + res.msg,
              });
            }
          })
          .catch(err => {
            proxy.$notify.error({
              title: '错误',
              message: '获取类别失败：' + err.msg,
            });
          });
      },
      add(data) {
        return proxy.$api.video
          .add(data)
          .then(res => {
            if (res.success) {
              proxy.$notify.success({
                title: '成功',
                message: '添加类别成功',
              });
            } else {
              proxy.$notify.warning({
                title: '失败',
                message: '添加类别失败：' + res.msg,
              });
            }
          })
          .catch(err => {
            proxy.$notify.error({
              title: '错误',
              message: '添加类别失败：' + err.msg,
            });
          });
      },
      update(data) {
        return proxy.$api.video
          .update(data)
          .then(res => {
            if (res.success) {
              proxy.$notify.success({
                title: '成功',
                message: '修改类别成功',
              });
            } else {
              proxy.$notify.warning({
                title: '失败',
                message: '修改类别失败：' + res.msg,
              });
            }
          })
          .catch(err => {
            proxy.$notify.error({
              title: '错误',
              message: '修改类别失败：' + err.msg,
            });
          });
      },
      del(data) {
        return proxy.$api.video
          .del({ id: data.id })
          .then(res => {
            if (res.success) {
              proxy.$notify.success({
                title: '成功',
                message: '删除类别成功',
              });
            } else {
              proxy.$notify.warning({
                title: '失败',
                message: '删除类别失败：' + res.msg,
              });
            }
          })
          .catch(err => {
            proxy.$notify.error({
              title: '错误',
              message: '删除类别失败：' + err.msg,
            });
          });
      },
    });
    return {
      state,
    };
  },
};
</script>
