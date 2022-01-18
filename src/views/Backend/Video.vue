<template>
  <base-table
    ref="baseTable"
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
    <template #modal_form="{ data }">
      <el-form ref="editForm" size="mini" :model="data" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="data.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="data.desc" placeholder="请输入描述"></el-input>
        </el-form-item>
        <el-form-item label="演员">
          <el-input v-model="data.artists" placeholder="请输入演员"></el-input>
        </el-form-item>
        <el-form-item label="所属分类">
          <el-select v-model="data.category" placeholder="请选择分类" style="width: 150px">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签">
          <el-select v-model="data.tags" multiple placeholder="请选择标签" style="width: 300px">
            <el-option v-for="item in tagList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上映时间">
          <el-date-picker
            v-model="data.releaseTime"
            :default-value="new Date()"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            type="date"
            placeholder="请选择上映时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="视频">
          <upload-video v-model="videos"></upload-video>
        </el-form-item>
        <el-form-item>
          <div class="right-wrapper">
            <el-button v-if="data.id" type="primary" @click="state.update(data)">修改</el-button>
            <el-button v-else type="primary" @click="state.add(data)">新增</el-button>
            <el-button @click="cancel">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </template>
  </base-table>
</template>

<script>
import { ref, reactive, getCurrentInstance, onMounted } from 'vue';
import BaseTable from '@/components/Backend/BaseTable/Index.vue';
import UploadVideo from '@/components/Upload/UploadVideo.vue';

export default {
  components: { BaseTable, UploadVideo },
  setup() {
    const { proxy } = getCurrentInstance();
    const activeList = [
      { label: '已激活', value: true },
      { label: '未激活', value: false },
    ];
    const categoryList = ref([]);
    const tagList = ref([]);
    const videos = ref([]);
    const baseTable = ref([]);
    const cancel = () => {
      baseTable.value.hideModal();
    };
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
        { field: 'id', title: 'ID', width: 60 },
        { field: 'name', title: '名称' },
        { field: 'desc', title: '描述' },
        { field: 'artists', title: '演员' },
        { field: 'sort', title: '权重' },
        { field: 'isActive', title: '激活状态', slots: { default: 'row_is_active' } },
        { field: 'releaseTime', title: '上映时间' },
        // { field: 'createTime', title: '创建时间' },
      ],
      data: [],
      total: 0,
      query(params) {
        return proxy.$api.video
          .get(params)
          .then(res => {
            if (res.success) {
              state.data = res.data.rows;
              state.total = res.data.total;
            } else {
              proxy.$tips.warning('获取视频失败：' + res.msg);
            }
          })
          .catch(err => {
            proxy.$tips.error('获取视频失败：' + err.msg);
          });
      },
      add(data) {
        if (!videos.value.length) {
          return proxy.$tips.warning('必须上传视频');
        }
        const params = {
          ...data,
          m3u8Path: videos.value[0].response.data[0],
          thumbPath: videos.value[0].response.data[0],
        };
        return proxy.$api.video
          .add(params)
          .then(res => {
            if (res.success) {
              state.query();
              cancel();
              proxy.$tips.success(res.msg);
            } else {
              proxy.$tips.warning('添加视频失败：' + res.msg);
            }
          })
          .catch(err => {
            proxy.$tips.error('添加视频失败：' + err.msg);
          });
      },
      update(data) {
        return proxy.$api.video
          .update(data)
          .then(res => {
            if (res.success) {
              state.query();
              cancel();
              proxy.$tips.success(res.msg);
            } else {
              proxy.$tips.warning('修改视频失败：' + res.msg);
            }
          })
          .catch(err => {
            proxy.$tips.error('修改视频失败：' + err.msg);
          });
      },
      del(data) {
        return proxy.$api.video
          .del({ id: data.id })
          .then(res => {
            if (res.success) {
              state.query();
              proxy.$tips.success(res.msg);
            } else {
              proxy.$tips.warning('删除视频失败：' + res.msg);
            }
          })
          .catch(err => {
            proxy.$tips.error('删除视频失败：' + err.msg);
          });
      },
    });
    const getCategory = () => {
      proxy.$api.category
        .get({ isActivate: true })
        .then(res => {
          if (res.success) {
            categoryList.value = res.data.rows;
          } else {
            proxy.$tips.warning('获取类别失败：' + res.msg);
          }
        })
        .catch(err => {
          proxy.$tips.error('获取类别失败：' + err.msg);
        });
    };
    const getTags = () => {
      proxy.$api.tag
        .get({ isActivate: true })
        .then(res => {
          if (res.success) {
            tagList.value = res.data.rows;
          } else {
            proxy.$tips.warning('获取标签失败：' + res.msg);
          }
        })
        .catch(err => {
          proxy.$tips.error('获取标签失败：' + err.msg);
        });
    };
    onMounted(() => {
      getCategory();
      getTags();
    });
    return {
      state,
      videos,
      baseTable,
      cancel,
      categoryList,
      tagList,
    };
  },
};
</script>

<style scoped></style>
