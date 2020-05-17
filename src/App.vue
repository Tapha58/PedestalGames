<template>
  <v-app id="inspire">
    <form name="test" action="https://pedestal-test2.aiva-studio.ru/check.php" method="post">
        <app--game-guess-number  align="center" ></app--game-guess-number>
        <v-divider class="mt-1"></v-divider>
    </form>
  </v-app>
</template>

<script>


  export default {
     data: () => ({}),
  }

</script>



<style>
    .dense-textarea textarea {
        line-height: 1.4rem !important;
    }
    #inspire {
        width: 795px;


    }
    #area1 {
        text-align: center !important;
    }
    #area2 {
        text-align: center !important;
    }
    #area3 {
        text-align: center !important;
    }

    #primary {
        color: #1976D2;
    }


</style>
