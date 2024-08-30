<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-link to="/about/a"> About - A</router-link>
    <router-link to="/about/b"> About - B</router-link>
    <router-view />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
