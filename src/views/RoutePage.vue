<template>
<div>
    <div v-if="$vuetify.breakpoint.name !== ('xs' || 'sm') ? false : true" class="mobile_background_top"></div>
    <span v-if="show_user_page">Эта страница доступна только администраторам группы.</span>
</div>
</template>

<script>
    import auto_resize from "@/mixins/auto_resize";
    export default {
        mixins: [auto_resize],
        props: ['settings'],
        data: () => ({
            show_user_page: false,
        }),
        mounted: async function () {
            if (this.settings.auth_data.vk_group_id) {
                if (this.settings.auth_data.vk_viewer_group_role === 'admin') {
                    this.$router.push({ path: '/choice_games/' + window.location.search})
                } else {
                    // window.open("https://vk.com/app" + this.settings.auth_data.vk_app_id, "_parent")
                    this.$router.push({ path: '/app_install_page/' + window.location.search})
                    // this.show_user_page = true
                }
            } else {
                this.$router.push({ path: '/app_install_page/' + window.location.search})
            }
        },
    }

</script>

<style scoped>

</style>