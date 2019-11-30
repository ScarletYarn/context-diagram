<template>
  <v-app>
    <v-navigation-drawer v-model="drawerRight" app clipped right width="400">
      <v-list dense class="body-2" expand>
        <v-list-group value="true" disabled>
          <template v-slot:activator>
            <v-list-item>Process of scenario based projection</v-list-item>
          </template>

          <v-list-group sub-group no-action disabled v-model="tmp" value="2">
            <template v-slot:activator>
              <v-list-item :input-value="activeStep === 1"
                >Step 1: Draw the context diagram</v-list-item
              >
            </template>
            <v-list-item :input-value="activeStep === 1 && subStep === 1">
              <v-list-item-action>1.1: Designate machine.</v-list-item-action>
            </v-list-item>
            <v-list-item :input-value="activeStep === 1 && subStep === 2">
              <v-list-item-action>1.2: Identify domains.</v-list-item-action>
            </v-list-item>
            <v-list-item :input-value="activeStep === 1 && subStep === 3">
              <v-list-item-action
                >1.3: Identify interactions.</v-list-item-action
              >
            </v-list-item>
            <v-list-item :input-value="activeStep === 1 && subStep === 4">
              <v-list-item-action
                >1.4: Check context diagram.</v-list-item-action
              >
            </v-list-item>
          </v-list-group>
          <v-list-group value="true" sub-group no-action disabled>
            <template v-slot:activator>
              <v-list-item :input-value="activeStep === 2"
                >Step 2: Draw the problem diagram</v-list-item
              >
            </template>
            <v-list-item :input-value="activeStep === 2 && subStep === 1">
              <v-list-item-action
                >2.1: Identity requirements.</v-list-item-action
              >
            </v-list-item>
            <v-list-item :input-value="activeStep === 2 && subStep === 2">
              <v-list-item-action>2.1: Identify references.</v-list-item-action>
            </v-list-item>
            <v-list-item :input-value="activeStep === 2 && subStep === 3">
              <v-list-item-action
                >2.3: Check problem diagram.</v-list-item-action
              >
            </v-list-item>
          </v-list-group>
        </v-list-group>
        <v-container>
          <v-row align="center" justify="space-around">
            <v-btn color="deep-purple darken-1" dark @click="back">BACK</v-btn>
            <v-btn color="deep-purple darken-1" dark @click="next">NEXT</v-btn>
          </v-row>
        </v-container>
        <v-list-group value="true">
          <template v-slot:activator>
            <v-list-item>Diagram</v-list-item>
          </template>
        </v-list-group>
        <v-list-group value="true">
          <template v-slot:activator>
            <v-list-item>Phenomenon</v-list-item>
          </template>
        </v-list-group>
        <v-list-group value="true">
          <template v-slot:activator>
            <v-list-item>Interaction</v-list-item>
          </template>
        </v-list-group>
        <v-list-group value="true">
          <template v-slot:activator>
            <v-list-item>Reference</v-list-item>
          </template>
        </v-list-group>
        <v-list-group value="true">
          <template v-slot:activator>
            <v-list-item>Other Information</v-list-item>
          </template>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
      permanent
      mini-variant
      v-model="drawerRight"
      app
      clipped
      left
    >
      <v-list dense>
        <v-list-item-group v-model="activePen">
          <v-list-item>
            <v-list-item-action>
              <v-img alt="img" width=".5em" src="@/assets/machine.svg" />
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-img alt="img" width=".5em" src="@/assets/dashed-oval.png" />
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-right clipped-left color="deep-purple darken-1" dark>
      <v-toolbar-title>Context Diagram</v-toolbar-title>
      <v-spacer />
      <v-btn text>New</v-btn>
      <v-btn text>Merge</v-btn>
      <v-btn text>Upload</v-btn>
      <v-btn text>Open</v-btn>
      <v-btn text>Save</v-btn>
      <v-btn text>Download</v-btn>
      <v-btn text>Ontology</v-btn>
      <v-btn text>Help</v-btn>
    </v-app-bar>

    <v-content class="grey lighten-1">
      <v-container class="fill-height" fluid>
        <v-row justify="center" align="center">
          <div id="canvas"></div>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { Vue, Component } from 'vue-property-decorator'
import Canvas from '@/app/Canvas'

@Component({
  components: {
    HelloWorld
  },
  watch: {
    activePen(val) {
      // @ts-ignore
      this.canvas.activePen = val
    }
  },
  mounted() {
    // @ts-ignore
    this.canvas = new Canvas(this)
  }
})
export default class App extends Vue {
  drawerRight: boolean = true
  tmp: any = 2
  activeStep: number = 1
  subStep: number = 1
  activePen: number = 0
  canvas: Canvas | null = null

  back(): void {
    if (this.subStep > 1) {
      this.subStep--
    } else if (this.activeStep === 2) {
      this.activeStep = 1
      this.subStep = 4
    }
  }

  next(): void {
    if (this.subStep < 3) {
      this.subStep++
    } else if (this.activeStep === 1 && this.subStep === 4) {
      this.activeStep = 2
      this.subStep = 1
    } else if (this.activeStep === 1) {
      this.subStep++
    }
  }
}
</script>
