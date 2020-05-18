<template>
  <v-app id="inspire">

    <form name="test" action="https://pedestal-test2.aiva-studio.ru/check.php" method="post">
        <MainPage v-model="main_obj" v-show="main_obj.show_main_page_tab"></MainPage>
        <MyGames v-show="main_obj.show_my_games"></MyGames>
        <app--game-guess-number v-show="main_obj.show_game_guess_number"></app--game-guess-number>
<!--        <v-divider class="mt-1"></v-divider>-->
    </form>
  </v-app>
</template>

<script>

import MyGames from "@/components/MyGames";
import MainPage from "@/components/MainPage";



  export default {
      components: {
          MainPage, MyGames
      },
     data: () => ({
         main_obj: {
             show_game_guess_number: false,
             show_my_games: false,
             show_main_page: true,
             show_main_page_tab: true,
         }
     }),
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
