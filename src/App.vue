<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer />

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <!--      <HelloWorld />-->
      <div id="canvas"></div>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { Vue, Component } from 'vue-property-decorator'
import * as PIXI from 'pixi.js'
import img from './assets/ball.jpg'

@Component({
  components: {
    HelloWorld
  },
  mounted() {
    let app: PIXI.Application = new PIXI.Application({
      width: 256,
      height: 256
    })

    app.renderer.backgroundColor = 0x061639

    app.loader.add(img).load(setup)

    function setup() {
      console.log('set up')

      let sprite: PIXI.Sprite = new PIXI.Sprite(
        app.loader.resources[img].texture
      )

      let rectangle = new PIXI.Graphics()
      rectangle.beginFill(0xffffff)
      rectangle.drawCircle(100, 100, 50)
      rectangle.endFill()

      let style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fill: 'white',
        stroke: '#ff3300',
        strokeThickness: 4,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6
      })
      let message = new PIXI.Text('Hello World', style)

      app.stage.addChild(sprite)
      app.stage.addChild(rectangle)
      app.stage.addChild(message)

      sprite.x = 100
      sprite.y = 100
      sprite.width = 100
      sprite.rotation = 0.5

      app.ticker.add(delta => gameLoop(delta, sprite))
    }

    function gameLoop(delta: number, sprite: PIXI.Sprite) {
      sprite.rotation += 1
    }

    let element: null | HTMLElement = document.getElementById('canvas')
    if (element) {
      element.appendChild(app.view)
    }
  }
})
export default class App extends Vue {}
</script>
