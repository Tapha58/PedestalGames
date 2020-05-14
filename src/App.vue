<template>
  <v-app id="inspire" >
    <form name="test" action="https://pedestal-test2.aiva-studio.ru/check.php" method="post">
        <app--game-guess-number></app--game-guess-number>
        <v-divider class="mt-1"></v-divider>
    </form>
  </v-app>
</template>

<script>
  import bridge from '@vkontakte/vk-bridge';

  export default {
     data: () => ({}),
     methods: {
        publishPost() {
            bridge.send("VKWebAppShowWallPostBox", {"owner_id": -168555251, "message": 'hello group', "from_group": "1"});
        },
     },
  }

</script>



<style lang="scss">
    @import url("https://fonts.googleapis.com/css?family=Questrial");

    .application {
        font-family: "Questrial",fantasy;
    }

    .dense-textarea textarea {
        line-height: 1.4rem !important;
    }
    #inspire {
        width: 795px
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
