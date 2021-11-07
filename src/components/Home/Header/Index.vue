<template>
    <div style="display: flex; justify-content: space-between">
        <div style="display: inline-block">LOGO</div>
        <el-menu
            class="el-menu-demo"
            mode="horizontal"
            background-color="transparent"
            active-text-color="#ffd04b"
            :ellipsis="false"
            router
        >
            <el-menu-item index="/"><home-filled style="width: 1.125em; height: 1.125em; margin-right: 5px;"/>主 页</el-menu-item>
            <el-menu-item index="/category"><grid style="width: 1.125em; height: 1.125em; margin-right: 5px;"/>分 类</el-menu-item>
            <el-menu-item index="/member"><briefcase style="width: 1.125em; height: 1.125em; margin-right: 5px;"/>会员福利</el-menu-item>
            <el-menu-item index="/about"><help-filled style="width: 1.125em; height: 1.125em; margin-right: 5px;"/>关于我们</el-menu-item>
            <el-menu-item index="/personal"><user-filled style="width: 1.125em; height: 1.125em; margin-right: 5px;"/>个人中心</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import { Grid, HomeFilled, UserFilled, Briefcase, HelpFilled } from '@element-plus/icons'

export default {
    name: "HomeHeader",
    components: {
        Grid, HomeFilled, UserFilled, Briefcase, HelpFilled
    }
}
</script>

<style scoped>



</style>