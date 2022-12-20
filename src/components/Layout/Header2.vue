<template>
  <section class="hero is-success">
    <div class="hero-head">
      <header class="navbar">
        <div class="container">
          <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
              <a class="navbar-item" href="/">
                <strong>
                  📻 Platzi Music
                </strong>
              </a>
              <a role="button" class="navbar-burger" :class="{'is-active': menuMobileIsActive, '': !menuMobileIsActive}" @click="menu" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>
            <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active': menuMobileIsActive, '': !menuMobileIsActive}">
              <div class="navbar-start">
                <router-link class="navbar-item" :to="{ path: '/', name: 'search' }">Buscar</router-link>
                <router-link class="navbar-item" to="about">Nosotros</router-link>
              </div>
            </div>
          </nav>
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

<style scoped>
  .navbar-item:focus-within {
    background-color: #6be5ae;
    color: white;
  }
</style>

<script>
  import PmPlayer from '@/components/Player.vue'

  export default {
    data() {
      return {
        menuMobileIsActive: false
      }
    },
    components: {
      PmPlayer
    },
    methods: {
      menu() {
        if (this.menuMobileIsActive) {
          this.menuMobileIsActive = false
        }
        else {
          this.menuMobileIsActive = true
        }
      }
    }
}
</script>