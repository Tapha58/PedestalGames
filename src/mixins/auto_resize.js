    import bridge from "@vkontakte/vk-bridge";
    export default {
        updated() {
            this.auto_resize ()
        },
        methods: {
            auto_resize: async function () {
                // if (!this.mobile) {
                if (bridge.supports("VKWebAppResizeWindow")) {
                    bridge.send("VKWebAppResizeWindow", {"width": 795, "height": +Math.max(document.body.offsetHeight, 150) + 10});
                }
            },
            getAllUrlParams: async function() {
                // let url = 'https://pedestal-test2.aiva-studio.ru/app/?vk_access_token_settings=friends%2Cphotos%2Cwall%2Cgroups&vk_app_id=7355601&vk_are_notifications_enabled=0&vk_group_id=195496572&vk_is_app_user=1&vk_is_favorite=0&vk_language=ru&vk_platform=desktop_web&vk_ref=other&vk_user_id=312527953&vk_viewer_group_role=admin&sign=pRX7wFcULWKWDii8VrK8dzAj4Yjlf7o2FffOYSPD8OE'
                let url = sessionStorage.getItem('auth_data_url')
                // let url = this.url
                // let url = this.src
                // console.log(url)
                // извлекаем строку из URL или объекта window
                let queryString = url ? url.split('?')[1] : window.location.search.slice(1);

                // объект для хранения параметров
                let obj = {};

                // если есть строка запроса
                if (queryString) {

                    // данные после знака # будут опущены
                    queryString = queryString.split('#')[0];

                    // разделяем параметры
                    let arr = queryString.split('&');

                    for (let i = 0; i < arr.length; i++) {
                        // разделяем параметр на ключ => значение
                        let a = arr[i].split('=');

                        // обработка данных вида: list[]=thing1&list[]=thing2
                        let paramNum = undefined;
                        let paramName = a[0].replace(/\[\d*\]/, function (v) {
                            paramNum = v.slice(1, -1);
                            return '';
                        });

                        // передача значения параметра ('true' если значение не задано)
                        let paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

                        // преобразование регистра
                        // paramName = paramName.toLowerCase();
                        // paramValue = paramValue.toLowerCase();

                        // если ключ параметра уже задан
                        if (obj[paramName]) {
                            // преобразуем текущее значение в массив
                            if (typeof obj[paramName] === 'string') {
                                obj[paramName] = [decodeURI(obj[paramName])];
                            }
                            // если не задан индекс...
                            if (typeof paramNum === 'undefined') {
                                // помещаем значение в конец массива
                                obj[paramName].push(decodeURI(paramValue));
                            }
                            // если индекс задан...
                            else {
                                // размещаем элемент по заданному индексу
                                obj[paramName][paramNum] = decodeURI(paramValue);
                            }
                        }
                        // если параметр не задан, делаем это вручную
                        else {
                            obj[paramName] = decodeURI(paramValue);
                        }
                    }
                }
                // obj.vk_access_token_settings = decodeURI(obj.vk_access_token_settings)


// The substituted value will be contained in the result variable
                const regex = /%2C/gm
                const str = obj.vk_access_token_settings
                const subst = `,`
                const result = str.replace(regex, subst)
                obj.vk_access_token_settings = result

                // obj.vk_access_token_settings = ''
                this.settings.auth_data = obj
            },
            go_description_page: function (url) {
                window.open(url, '_blank')
            },
        },

        // mounted: {
        //     function () {
        //         this.auth_data_url_test = document.location.search
        //         console.log(this.auth_data_url_test)
        //     }
        // }
    }
