<template>
    <div>
        <canvas id="canvas" width="795" height="200"></canvas>
    </div>
</template>

<script>
    import {fabric} from 'fabric';
    export default {
        name: "Test",
        data: () => ({
    }),
        mounted() {
        let canvas = new fabric.Canvas('canvas')
        // let rect = new fabric.Circle({
        //     left: 100,
        //     top: 100,
        //     fill: 'green',
        //     radius: 20,
        // });
        canvas.setBackgroundImage('https://sun9-40.userapi.com/c206724/v206724891/49727/xUpDyaoIJqw.jpg');
        // canvas.add(rect);
            fabric.Image.fromURL('https://sun1-23.userapi.com/impg/c857020/v857020083/1362ef/GFVnF6578MM.jpg?size=50x0&quality=90&crop=142,125,456,456&sign=f509a3b5f6c83b22cc93af2e1d7991dc&ava=1', function(oImg) {
                canvas.add(oImg);
            });

    },
    methods: {}
    }
</script>

<style scoped>

</style>