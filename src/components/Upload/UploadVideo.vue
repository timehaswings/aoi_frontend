<template>
  <el-upload
    :disabled="loading"
    :name="uploadOptions.name"
    :action="uploadOptions.action"
    :method="uploadOptions.method"
    :headers="uploadOptions.headers"
    :on-success="uploadOptions.success"
    :on-error="uploadOptions.error"
    :on-remove="uploadOptions.remove"
    :on-progress="uploadOptions.progress"
    :before-upload="uploadOptions.beforeUpload"
    :before-remove="uploadOptions.beforeRemove"
    :file-list="fileList"
    :limit="1"
    accept=".mp4"
    v-bind="$attrs"
  >
    <el-button icon="el-icon-upload" size="small" type="primary">点击上传视频</el-button>
    <template #tip>
      <div class="el-upload__tip">视频最大长度不得超过{{ maxSize }}M</div>
    </template>
  </el-upload>
</template>

<script>
import { ref, reactive, getCurrentInstance, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'UploadVideo',
  props: {
    maxSize: {
      type: Number,
      default: 20,
    },
    modelValue: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  emits: { 'update:modelValue': [] },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const loading = ref(false);
    const fileList = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });
    const uploadOptions = reactive({
      action: `${import.meta.env.VITE_APP_BASE_URL}/api/v1/upload/video`,
      method: 'post',
      name: 'video',
      headers: { Authorization: `JWT ${store.state.auth.token}` },
      //   fileList: [],
      success(response, file) {
        loading.value = false;
        // uploadOptions.fileList.push(file);
        fileList.value.push(file);
        proxy.$notify.success({
          title: '成功',
          message: response.msg,
        });
      },
      error(err) {
        loading.value = false;
        proxy.$notify.success({
          title: '失败',
          message: `文件上传失败${err}`,
        });
      },
      remove(file) {
        // const index = uploadOptions.fileList.findIndex(item => item.name === file.name);
        const index = fileList.value.findIndex(item => item.name === file.name);
        if (index === -1) {
          return;
        }
        proxy.$api.common
          .delVideo({ path: fileList.value[index].response.data[0] })
          .then(res => {
            if (res.success) {
              console.log(fileList.value);
              proxy.$notify.success({
                title: '成功',
                message: '删除成功',
              });
            } else {
              proxy.$notify.warning({
                title: '失败',
                message: '删除视频失败：' + res.msg,
              });
            }
          })
          .catch(err => {
            proxy.$notify.error({
              title: '错误',
              message: '删除视频失败：' + err.msg,
            });
          });
      },
      progress() {
        loading.value = true;
      },
      beforeUpload(file) {
        if (file.size >= props.maxSize * 1024 * 1024) {
          return false;
        }
      },
      beforeRemove(file) {
        return new Promise((resolve, reject) => {
          proxy
            .$confirm(`确定要删除${file.name}吗？`, 'Warning', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            })
            .then(() => {
              resolve();
            })
            .catch(() => {});
        });
      },
    });
    return {
      uploadOptions,
      loading,
      fileList,
    };
  },
};
</script>
