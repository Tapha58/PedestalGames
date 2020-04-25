<template>
  <div id="app">

    <form name="test" action="https://pedestal-test2.aiva-studio.ru/check.php" method="post">

        <app-guessTheNumber class="mt-0"></app-guessTheNumber>
        <app-rules class="mt-3"></app-rules>
        <app-postSettings class="mb-5"></app-postSettings>
        <app-image class="mb-0"></app-image>

        <div class="mb-0">
          <div class="px-5 col-lg-6">
            <hr>
            <b-button type="submit" variant="primary">Запустить сейчас</b-button>
          </div>
        </div>

    </form>

  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'

  // import {autosizePage} from '../src/assets/index'

  export default {
    data: () => ({}),
  //   mounted() {
  //       console.log('autosize')
  //       autosizePage()
  //   }
  }
</script>



<style>

</style>
