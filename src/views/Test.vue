<template>
    <div class="special">

      <v-img
          class="item"
          src="https://cdn.activebot.ru/f/contests/promo/badges/new_year_predictions2.png"
          @mousemove="getCoordinates"
          width="300"
      ></v-img>
        <span>{{x}} x {{y}}</span>
      <v-img
          class="item"
          src="https://cdn.activebot.ru/f/contests/promo/badges/new_year_predictions2.png"
          @mousemove="getCoordinates"

          width="300"
      ></v-img>

    </div>

</template>

<script>
export default {
  data: () => ({
    vv: 'rotateX(10deg)',
      x: '',
      y: '',

  }),



  methods: {
      getCoordinates(e) {
          this.x = e.offsetX
          this.y = e.offsetY
      console.log(e)
    },
  }
}

</script>

<style scoped>

.special {
  perspective: 1000px;
  transform-style: preserve-3d;
  user-select: none;
}

.item {
  perspective: 1000px;
  transform-style: preserve-3d;
  user-select: none;
  position: relative;
  will-change: transform;
  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.3, 1, 0.2, 1);
}
</style>