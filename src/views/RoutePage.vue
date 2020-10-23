<template>
<div>
    <span v-if="show_user_page">Шалом друг, к сожалению ты не админ чтобы тут быть.</span>
</div>
</template>

<script>
    import auto_resize from "@/mixins/auto_resize";
    export default {
        mixins: [auto_resize],
        data: () => ({
            settings: {
                auth_data: ''
            },
            show_user_page: false,
        }),
        mounted: async function () {
            await this.getAllUrlParams()
            if (this.settings.auth_data.vk_group_id) {
                if (this.settings.auth_data.vk_viewer_group_role === 'admin') {
                    this.$router.push({ path: '/choice_games/' + window.location.search})
                } else {
                    this.show_user_page = true
                }
            } else {
                this.$router.push({ path: '/app_install_page/' + window.location.search})
            }
        },
    }

</script>

<style scoped>

</style>