<template>
  <div class="container">
    <navbar-page class="navigation" />
    <router-view/>
  </div>
</template>

<script>
import NavbarPage from "@/components/NavbarPage";
export default {
  name: 'App',
  components: {
    NavbarPage
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body{
  background: black;
}

.navigation{
  display: flex;
  justify-content: center;

}


</style>
