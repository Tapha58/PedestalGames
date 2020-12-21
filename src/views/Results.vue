<template>
    <div>
        <v-btn to="/my_games/" text dark small color="primary">
            <v-icon class="mr-1">mdi-arrow-left-thick</v-icon>
            Назад
        </v-btn>
        <span>{{result}}</span>
        <v-row>
            <v-col>
                <v-icon color="error">mdi-cards-heart </v-icon>
                <span> - {{like_count}}</span>
            </v-col>
            <v-col>
                <v-icon color="error">mdi-comment-processing-outline </v-icon>
                <span> - {{comment_count}}</span>
            </v-col>
            <v-col>
                <v-icon color="error">mdi-call-missed </v-icon>
                <span> - {{repost_count}}</span>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import auto_resize from "@/mixins/auto_resize";
    export default {
        mixins: [auto_resize],
        props: ['settings', 'auth_data_url', 'data_bus'],
        data: () => ({
            result: '',
            like_count: '0',
            comment_count: '0',
            repost_count: '0',
        }),
        mounted() {
            this.summary()
        },
        methods: {
            summary: async function () {
                let response = await fetch('/app/wallgames/game/' + this.$route.params.id + '/summary/' + this.auth_data_url)
                if (response.ok) {
                    response = await response.json()
                    this.result = response
                    this.like_count = response.like_count
                    this.comment_count = response.comment_count
                    this.repost_count = response.repost_count

                    console.log(response)
                } else {
                    response = await response.json()
                    console.log(response)
                }
            }
        }
    }

</script>

<style scoped>

</style>