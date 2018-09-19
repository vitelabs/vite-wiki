/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "2d4852098eef915b11c47efacdf9e544"
  },
  {
    "url": "assets/css/0.styles.b186a0e7.css",
    "revision": "0e551a6b6736f0bfea58f1e17ff4bdf8"
  },
  {
    "url": "assets/img/async-confirm.6379a9bb.png",
    "revision": "6379a9bb5f651a73e74cc544f21349ab"
  },
  {
    "url": "assets/img/async-contract.eae2bf68.png",
    "revision": "eae2bf689ca7c68c7475bab2e043dcac"
  },
  {
    "url": "assets/img/async-transaction.8629f39f.png",
    "revision": "8629f39fd1697f74b0aed7f3ccaeb6f5"
  },
  {
    "url": "assets/img/dag-ledger.a28affa8.png",
    "revision": "a28affa8f917fb74c75a899d6db05905"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.c6d20c7a.js",
    "revision": "0b497823baa0dde2179eb68f735b31d1"
  },
  {
    "url": "assets/js/11.b607b69e.js",
    "revision": "fc42199b7c69ea80944d5d6bb8ff2dc4"
  },
  {
    "url": "assets/js/12.ee48bf4f.js",
    "revision": "e473eefeac2b2af5914ecc84dee2198e"
  },
  {
    "url": "assets/js/13.bfee44f6.js",
    "revision": "9bbc97030cc052890d75944467c0a175"
  },
  {
    "url": "assets/js/14.01a546c1.js",
    "revision": "5d5a0e3079d1537500085a3a253ff6d7"
  },
  {
    "url": "assets/js/15.4a0f42cf.js",
    "revision": "05f3a0e833468fa93ea9e811d403a3f0"
  },
  {
    "url": "assets/js/16.bda3452e.js",
    "revision": "4de6d799cf88322dc78697d899213f18"
  },
  {
    "url": "assets/js/17.09825a5c.js",
    "revision": "32a6686c66c395bb86e2144cd65d697f"
  },
  {
    "url": "assets/js/18.df5bd5ff.js",
    "revision": "9c7865b42d26871acffa5986510e26a0"
  },
  {
    "url": "assets/js/19.8111046b.js",
    "revision": "40a281050552e15a8b89090420cf0497"
  },
  {
    "url": "assets/js/2.a37242be.js",
    "revision": "4e25e1fead27de665cd7ba181cc79db7"
  },
  {
    "url": "assets/js/20.14df2add.js",
    "revision": "9baa0bc8e38240e06d4743da5cacb44a"
  },
  {
    "url": "assets/js/21.1459814d.js",
    "revision": "f8b5a1c61c0cf6636c6bd8e6cfc15904"
  },
  {
    "url": "assets/js/22.07491ec7.js",
    "revision": "700dc47b9a2f855b11820c9948e15628"
  },
  {
    "url": "assets/js/23.a95670d9.js",
    "revision": "5cc2461173d5b26d65f18f5b7a2f9cd3"
  },
  {
    "url": "assets/js/24.71a22121.js",
    "revision": "9659f13a0cbad2c8a81f99d748f2a70c"
  },
  {
    "url": "assets/js/25.f7d310f5.js",
    "revision": "e5e3f5e933a4542b55e060efad796a5b"
  },
  {
    "url": "assets/js/26.726c4a77.js",
    "revision": "7eb53f5b518e0a6d33966f646cf14a39"
  },
  {
    "url": "assets/js/27.34967273.js",
    "revision": "8c788e7fc1d38759bcc564146abb912f"
  },
  {
    "url": "assets/js/28.6bc4fdeb.js",
    "revision": "210d2c6f2aa0dcc15a4e98e57c04266e"
  },
  {
    "url": "assets/js/29.540f7860.js",
    "revision": "d2586f9e1f19884f36904b1e12a846f0"
  },
  {
    "url": "assets/js/3.d2cccde5.js",
    "revision": "b5f18e8ebd40d255d57434cd1c8e5575"
  },
  {
    "url": "assets/js/4.fba3231f.js",
    "revision": "d9181631ece6f3b1bbb71ffe7d4a5b60"
  },
  {
    "url": "assets/js/5.99d59da1.js",
    "revision": "18cb52cc562345a4550b4d4be3d5ed77"
  },
  {
    "url": "assets/js/6.a3993d1b.js",
    "revision": "accd532823c9b57b09849fa7f1218eae"
  },
  {
    "url": "assets/js/7.d61bd8f4.js",
    "revision": "562291de39011f65da4c4bfccaa1d9b5"
  },
  {
    "url": "assets/js/8.ac992d09.js",
    "revision": "2392bec30caebe373a5e2a67fbfbd64e"
  },
  {
    "url": "assets/js/9.a067193d.js",
    "revision": "a0c3635bbf195e033f2af06971dd2f51"
  },
  {
    "url": "assets/js/app.48bcc568.js",
    "revision": "50d0d34189962219ab8834a5c580ff55"
  },
  {
    "url": "assets/js/vendors~docsearch.f7d259d9.js",
    "revision": "620a654ea7603cdd97aa3542d5f40415"
  },
  {
    "url": "hero.png",
    "revision": "1f6437c5d65c10de98edc48fa48ec998"
  },
  {
    "url": "icon.png",
    "revision": "80cdb34f667bfb451338a8b81a38aca0"
  },
  {
    "url": "index.html",
    "revision": "c36f4aff86fe167fb9759a4cb58ed72e"
  },
  {
    "url": "introduction/asynchronous-architecture.html",
    "revision": "174f4c4fe938e217b6745473b8dd06dd"
  },
  {
    "url": "introduction/dag-ledger.html",
    "revision": "1a74c551420a6cf5adca8fd7bf66e66b"
  },
  {
    "url": "introduction/index.html",
    "revision": "a5ff7ea434bd4b45e5806b5496d7e330"
  },
  {
    "url": "introduction/other.html",
    "revision": "3aafe6ef85f061377c7bab5c0baa1181"
  },
  {
    "url": "introduction/vite-token.html",
    "revision": "d4d4d0f5015733f446027eb6dd08a086"
  },
  {
    "url": "logo_black_transparent.svg",
    "revision": "f9a5b1bb2e7f9f689a4a4c98a97b27c3"
  },
  {
    "url": "logo_black.svg",
    "revision": "29ceb1871267d564c71cafbe1df2728f"
  },
  {
    "url": "zh/about/index.html",
    "revision": "28987d629034f4ca51992af7621a55b5"
  },
  {
    "url": "zh/api/rpc/index.html",
    "revision": "658bf3fe217e66fdfc35d46c5bffc5f6"
  },
  {
    "url": "zh/api/rpc/ledger.html",
    "revision": "d690d266fa70dcc7a16fa86af91d4319"
  },
  {
    "url": "zh/api/rpc/p2p.html",
    "revision": "04e9a7446bb5986e984a9c3bc0e7049b"
  },
  {
    "url": "zh/api/rpc/wallet.html",
    "revision": "d747aafd4350e4d5ea2a6cf7656054dd"
  },
  {
    "url": "zh/index.html",
    "revision": "f412c89716bbfa71616c644bba015e1a"
  },
  {
    "url": "zh/introduction/asynchronous-architecture.html",
    "revision": "3947dd1ca51b678cfc51962ccab0ca13"
  },
  {
    "url": "zh/introduction/dag-ledger.html",
    "revision": "203e853ef406d1fd1a67a25ba812a2c0"
  },
  {
    "url": "zh/introduction/index.html",
    "revision": "e34420a8075c37af5a14e9c52a1bef71"
  },
  {
    "url": "zh/introduction/other.html",
    "revision": "dea2c36cdc66875c1cb12534b010c57d"
  },
  {
    "url": "zh/introduction/vite-token.html",
    "revision": "39dd599e4d33f9ecaec69d398b4ebdbf"
  },
  {
    "url": "zh/technology/design-features.html",
    "revision": "f8b732a569fd0ebcef9d511ff5d4880c"
  },
  {
    "url": "zh/technology/gen-address.html",
    "revision": "0dcdb167e12cb0da0e79383469041493"
  },
  {
    "url": "zh/technology/index.html",
    "revision": "7848e8943bcfa2a473384b3657b3cf54"
  },
  {
    "url": "zh/technology/ledger-struct.html",
    "revision": "12d7d6f2e60706d58a6d81919d5b2d61"
  },
  {
    "url": "zh/technology/uri-standard.html",
    "revision": "5c0c5a1f4a5da1de973a91e350f63855"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
