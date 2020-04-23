<template>
  <div id="app" >
<!--    <app-guessTheNumber class="mt-5"></app-guessTheNumber>-->
<!--    <app-rules class="mt-3"></app-rules>-->
<!--    <app-postSettings class="mb-5"></app-postSettings>-->
<!--    <app-image class="mb-0"></app-image>-->

<!--    <div class="mb-5">-->
<!--      <div class="px-5 col-lg-6">-->
<!--        <hr>-->
<!--        <b-button variant="primary">Запустить сейчас</b-button>-->
<!--      </div>-->
<!--    </div>-->
    <form name="test" action="check.php" method="post">
      <input type="text" name="name" placeholder="Имя">
      <input type="text" name="surname" placeholder="Фамилия">
      <input type="submit">
    </form>


  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'

  export default {
    data: () => ({}),
  }
</script>

<style>

</style>
