<template>
<div class="navbar">
    <router-link  class="link"  :to="{ name: 'main' }">Main page</router-link>

</div>
</template>

<script>
export default {
  name: "NavbarPage"
}
</script>

<style lang="scss" scoped>
  .navbar{
      display: flex;
      gap: 2em;
      height:2em;
      align-items: center;
    font-size: 2em;

    .link{
      text-decoration: none;
      color: red;
    }

    .active-class{
      color: white;
    }


  }

</style>