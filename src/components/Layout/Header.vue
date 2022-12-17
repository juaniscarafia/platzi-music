<template>
  <section class="hero is-success">
    <div class="hero-head">
      <header class="navbar">
        <div class="container">
          <div class="navbar-left">
            <div class="navbar-item">
              <strong>
                📻 Platzi Music
              </strong>
            </div>
          </div>
          <div class="navbar-menu navbar-right">
            <router-link class="navbar-item" :to="{ name: 'Search' }">Buscar</router-link>
            <router-link class="navbar-item" to="about">Nosotros</router-link>
          </div>
        </div>
      </header>
    </div>
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">Platzi Music</h1>
        <h2 class="subtitle">Canciones que estan Vue-nisimas!</h2>
        <PmPlayer />
      </div>
    </div>
  </section>
</template>

<script>
  import PmPlayer from '@/components/Player.vue'

  export default {
    components: {
      PmPlayer
    }
  }
</script>