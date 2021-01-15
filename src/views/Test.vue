<template>
    <div class="special">

      <v-img
          class="item"
          src="https://cdn.activebot.ru/f/contests/promo/badges/new_year_predictions2.png"
          @mousemove="doDrag"
      ></v-img>
      <v-img
          class="item"
          src="https://cdn.activebot.ru/f/contests/promo/badges/new_year_predictions2.png"
          @mousemove="doDrag"
      ></v-img>

    </div>

</template>

<script>
export default {
  data: () => ({
    vv: 'rotateX(10deg)',

  }),



  methods: {
    doDrag(e) {
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