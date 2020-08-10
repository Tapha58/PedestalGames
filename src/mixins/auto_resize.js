    import bridge from "@vkontakte/vk-bridge";
    export default {
        updated() {
            this.auto_resize (30)
        },
        methods: {
            auto_resize: async function (size) {
                if (!this.mobile) {
                    bridge.send("VKWebAppResizeWindow", {"width": 795, "height": Math.max(document.body.offsetHeight, 150) + size});
                }
            },
        },
        // mounted: {
        //     function () {
        //         this.auth_data_url_test = document.location.search
        //         console.log(this.auth_data_url_test)
        //     }
        // }
    }
