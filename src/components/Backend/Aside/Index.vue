<template>
    <div class="aside-wrapper">
       <div class="aside-logo">
           <el-avatar :size="50" :src="circleUrl" fit="cover" style="vertical-align: middle;"></el-avatar>
        </div>
        <div style="flex: 1;overflow: auto;">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
            >
                <el-sub-menu index="1">
                <template #title>
                    <i class="el-icon-location"></i>
                    <span>Navigator One</span>
                </template>
                <el-menu-item-group>
                    <template #title><span>Group One</span></template>
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group Two">
                    <el-menu-item index="1-3">item three</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                    <template #title><span>item four</span></template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-sub-menu>
                </el-sub-menu>
                <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <template #title>Navigator Two</template>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <template #title>Navigator Three</template>
                </el-menu-item>
                <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <template #title>Navigator Four</template>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="aside-footer">
            <el-icon :size="14" style="vertical-align: middle;">
                <d-arrow-left />
            </el-icon>
            <span style="margin-left: 15px; font-size: 14px;vertical-align: middle;">折叠侧边栏</span>
        </div>
    </div>
</template>

<script>
import { DArrowLeft, DArrowRight } from '@element-plus/icons'
import { reactive, toRefs } from 'vue'

export default {
    name: "BackendAside",
    components: {
        DArrowLeft, DArrowRight
    },
    setup() {
        const state = reactive({
            circleUrl:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            squareUrl:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
            sizeList: ['large', 'medium', 'small'],
        })
        return {
        ...toRefs(state),
        }
    },
}
</script>

<style scoped>

.aside-wrapper {
    display: flex; 
    flex-flow: column; 
    height: 100%;
    overflow: hidden;
}

.aside-logo {
    height: 80px;
    line-height: 80px;
    text-align: center;
}

.aside-footer{
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #eee;
    cursor: pointer;
}

.aside-footer:hover {
    background-color: #ddd;
}

</style>