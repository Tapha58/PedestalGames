<template>
  <v-app id="inspire" >
    <form name="test" action="https://pedestal-test2.aiva-studio.ru/check.php" method="post">
        <app-GuessTheNumber></app-GuessTheNumber>
        <app-rules></app-rules>
        <app-PostSettings></app-PostSettings>
        <app-image></app-image>
        <app-time></app-time>
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



<style>
    #inspire {
        width: 710px
}

</style>
