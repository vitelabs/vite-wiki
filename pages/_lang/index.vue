<template>
  <div>
    <section id="home" class="hero is-info is-fullheight" v-in-viewport.once>
      <!-- Hero header: will stick at the top -->
      <div class="hero-head animated fadeIn inview1 delay-1-6" v-headroom>
        <nav class="navbar">
          <div class="navbar-brand">
            <a class="navbar-item" href="http://bulma.io">
              <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
            </a>
          </div>

          <scrollactive class="navbar-menu" :offset="0">
            <div class="navbar-end">
              <a href="#feature" class="scrollactive-item nav-item is-active">
                {{$t('nav.feature')}}
              </a>
              <a href="#tech" class="scrollactive-item nav-item">
                {{$t('nav.tech')}}
              </a>
              <a href="#roadmap" class="scrollactive-item nav-item">
                {{$t('nav.roadmap')}}
              </a>
              <a href="#team" class="scrollactive-item nav-item">
                {{$t('nav.team')}}
              </a>
              <a href="#faq" class="scrollactive-item nav-item">
                {{$t('nav.faq')}}
              </a>
            </div>
          </scrollactive>

        </nav>
      </div>

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered hvr-bounce-in">
          <h1 class="title is-1 animated fadeInDown inview3 delay-0-8">
            Xui-module
          </h1>
          <h2 class="subtitle animated fadeInUp inview3 delay-1">
            Light module to help design websites with Nuxt.
          </h2>
        </div>
      </div>
    </section>

    <section id="feature" class="hero is-light is-fullheight" v-in-viewport.once>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1 animated inview3 flipInX delay-0-5">
            Feature
          </h1>
        </div>
      </div>
    </section>

    <section id="tech" class="hero is-success is-medium" v-in-viewport.once>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1 animated inview3 tada delay-0-5">
            Tech
          </h1>
        </div>
      </div>
    </section>

    <section id="roadmap" class="hero is-success is-medium" v-in-viewport.once>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1 animated inview3 tada delay-0-5">
            Roadmap
          </h1>
        </div>
      </div>
    </section>

    <section id="team" class="hero is-success is-medium" v-in-viewport.once>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1 animated inview3 tada delay-0-5">
            Team
          </h1>
        </div>
      </div>
    </section>

    <section id="faq" class="hero is-success is-medium" v-in-viewport.once>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1 animated inview3 tada delay-0-5">
            Faq
          </h1>
        </div>
      </div>
    </section>



    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <strong>Bulma</strong> by
            <a href="http://jgthms.com">Jeremy Thomas</a>. The source code is licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content is licensed
            <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
          </p>
          <p>
            <a class="icon" href="https://github.com/jgthms/bulma">
              <i class="fa fa-github"></i>
            </a>
          </p>
        </div>
      </div>
    </footer>

  </div>
</template>

<script>
  export default {
  }
</script>

<style>
  .headroom {
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    z-index: 1;
    transition: transform 0.4s ease;
  }
  .headroom.headroom--pinned {
    transform: translateY(0);
  }
  .headroom.headroom--unpinned {
    transform: translateY(-100%);
  }
  nav.navbar {
    transition: background-color 0.4s ease;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .headroom.headroom--unpinned>nav.navbar,
  .headroom.headroom--top>nav.navbar {
    background-color: transparent;
  }
  .headroom.headroom--pinned.headroom--not-top>nav.navbar {
    background-color: rgba(0, 0, 0, 0.2);
  }
</style>
