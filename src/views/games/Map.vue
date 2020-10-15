<template>
    <div>
        <table border="1" v-if="show_table">
            <tr>
                <th><v-btn @click="get_map" icon small>
                    <v-icon size="20">mdi-cached</v-icon>
                </v-btn></th>
                <th v-for="z in col_count" :key=z>{{get_column_name(z)}}</th>
            </tr>
            <tr v-for="i in row_count" :key=i>
                <th>{{i}}</th>
                <td
                        valign="center"
                        v-for="j in col_count"
                        :key=j
                >
<!--    <svg v-show="!occupied_on_table(j,i) && win_on_table(j,i)" width="40" height="40" >-->
    <svg v-show="occupied_on_table(j,i)" width="40" height="40" >
        <circle  cx="20" cy="20" r="10" fill="red" />
        Sorry, your browser does not support inline SVG.
        <!--                    <text fill="#000000" font-size="18" font-family="Verdana"-->
        <!--                          x="42" y="60">{{get_column_name(j) + i}}</text>-->
    </svg>

                    <img v-if="win_on_table(j,i)" src="/static/wallgames/image/sea_battle_maps/shot_down.png">
                    {{win_on_table(j,i) || occupied_on_table(j,i) ? null: get_column_name(j) + i}}
                </td>
<!--                <td v-for="j in col_count" :key=j v-bind:class="{ active: win_on_table(i,j)}">{{j + ',' + i}}</td>-->
            </tr>
        </table>
        <v-img v-else src="https://img.freepik.com/free-vector/error-404-concept-for-landing-page_52683-18367.jpg?size=626&ext=jpg"></v-img>
    </div>
</template>

<script>
    import bridge from "@vkontakte/vk-bridge";
    export default {
        data: () => ({
            row_count: '',
            col_count: '',
            ascii_lowercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            win: [],
            occupied: [],
            auth_data: {},
            auth_data_url: '',
            show_table: true,
            mobile: false,
        }),
        beforeMount:
            async function() {
                await this.getAllUrlParams()
                await this.get_map()
                this.auto_resize()
        },
        mounted() {
            this.mobile = this.auth_data.vk_platform !== 'desktop_web'
        },
        updated() {
            this.auto_resize()
        },
        computed: {
        },
        methods: {
            get_map: async function () {
                try {
                    let response = await fetch("/app/wallgames/map/" + this.auth_data.map + '/' + this.auth_data_url)
                    if (response.ok) {
                        response = await response.json()
                        this.win = response.win
                        this.occupied = response.occupied
                        this.row_count = response.row_count
                        this.col_count = response.col_count
                    } else if (response.status === 404) {
                        this.show_table = false
                    }
                } catch (err) {
                    console.log(err)
                }
            },
            get_column_name: function (j) {
                let dividend = j
                let column_name = ""
                while (dividend > 0) {
                    let modulo = (dividend - 1) % 26
                    column_name = this.ascii_lowercase[modulo] + column_name
                    dividend = Math.floor((dividend - modulo) / 26)
                }
                return column_name
            },
            win_on_table: function (i,j) {
                for (let key of this.win) {
                    if (key[0] == i && key[1] == j) {
                        return true
                    }
                }
                return false
            },
            occupied_on_table: function (i,j) {
                for (let key of this.occupied) {
                    if (key[0] == i && key[1] == j && !this.win_on_table(i,j)) {
                        return true
                    }
                }
                return false
            },
            getAllUrlParams: async function() {
                this.auth_data_url = document.location.search
                let url = this.auth_data_url
                let queryString = url ? url.split('?')[1] : window.location.search.slice(1);
                let obj = {};
                if (queryString) {
                    queryString = queryString.split('#')[0];
                    let arr = queryString.split('&');
                    for (let i = 0; i < arr.length; i++) {
                        let a = arr[i].split('=');
                        let paramNum = undefined;
                        let paramName = a[0].replace(/\[\d*\]/, function (v) {
                            paramNum = v.slice(1, -1);
                            return '';
                        });
                        let paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
                        if (obj[paramName]) {
                            if (typeof obj[paramName] === 'string') {
                                obj[paramName] = [decodeURI(obj[paramName])];
                            }
                            if (typeof paramNum === 'undefined') {
                                obj[paramName].push(decodeURI(paramValue));
                            }
                            else {
                                obj[paramName][paramNum] = decodeURI(paramValue);
                            }
                        }
                        else {
                            obj[paramName] = decodeURI(paramValue);
                        }
                    }
                }
                const regex = /%2C/gm
                const str = obj.vk_access_token_settings
                const subst = `,`
                const result = str.replace(regex, subst)
                obj.vk_access_token_settings = result
                this.auth_data = obj
            },
            auto_resize: async function () {
                // Проверяет, поддерживается ли событие на текущей платформе.
                if (bridge.supports("VKWebAppResizeWindow")) {
                    let scrollWidth = (this.col_count + 1) * 45
                    let scrollHeight = (this.row_count + 1) * 45
                    bridge.send("VKWebAppResizeWindow", {"width": Math.min(scrollWidth + 30, 1050), "height": Math.min(scrollHeight + 30, 730)});
                }
            },
        },

    }
</script>

<style scoped>
    .win {
        font-size: 0px;

    }
    .occupied {
        /*background-color: red;*/
        /*border-radius: 50%;*/

    }
    table {
        border-collapse: collapse;
        font-size: 14px;

    }
    table td, table th {
        text-align: center;
        width: 45px !important;
        height: 45px !important;
        min-height: 45px;
        min-width: 45px;

    }
    img {
        height: 45px;
        width: 45px;
    }

    svg {
        display: block;
        margin: 0 auto;
    }
</style>