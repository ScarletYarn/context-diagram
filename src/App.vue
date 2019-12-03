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
          <v-list-item title="machine">
            <v-list-item-action>
              <v-img alt="img" width=".5em" src="@/assets/machine.svg" />
            </v-list-item-action>
          </v-list-item>
          <v-list-item title="domain">
            <v-list-item-action>
              <v-img alt="img" width=".5em" src="@/assets/problem-domain.svg" />
            </v-list-item-action>
          </v-list-item>
          <v-list-item title="requirement">
            <v-list-item-action>
              <v-img alt="img" width=".5em" src="@/assets/requirement.svg" />
            </v-list-item-action>
          </v-list-item>
          <v-list-item title="interface">
            <v-list-item-action>
              <v-img alt="img" width=".5em" src="@/assets/interface.svg" />
            </v-list-item-action>
          </v-list-item>
          <v-list-item title="reference">
            <v-list-item-action>
              <v-img alt="img" width=".5em" src="@/assets/reference.svg" />
            </v-list-item-action>
          </v-list-item>
          <v-list-item title="constraint">
            <v-list-item-action>
              <v-img alt="img" width=".5em" src="@/assets/constraint.svg" />
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

    <machine-editor
      @end-edit="endEditMachine"
      ref="machine-editor"
      :active="onEditMachine"
    />

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
import { Vue, Component } from 'vue-property-decorator'
import Canvas from '@/app/Canvas'
import MachineEditor from '@/components/MachineEditor.vue'
import Machine from '@/app/graph/shape/Machine'
import { Domain } from '@/app/graph/shape/Domain'
import Interface from '@/components/Interface.vue'
import Reference from '@/app/graph/line/Reference'
import Constraint from '@/app/graph/line/Constraint'
import DomainEditor from '@/components/DomainEditor.vue'
import RequirementEditor from '@/components/RequirementEditor.vue'
import InterfaceEditor from '@/components/InterfaceEditor.vue'
import ReferenceEditor from '@/components/ReferenceEditor.vue'
import ConstraintEditor from '@/components/ConstraintEditor.vue'

@Component({
  components: {
    MachineEditor,
    DomainEditor,
    RequirementEditor,
    InterfaceEditor,
    ReferenceEditor,
    ConstraintEditor
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
  },
  created() {
    // @ts-ignore
    this.$on('editMachine', this.editMachine)
    // @ts-ignore
    this.$on('editDomain', this.editDomain)
    // @ts-ignore
    this.$on('editRequirement', this.editRequirement)
    // @ts-ignore
    this.$on('editInterface', this.editInterface)
    // @ts-ignore
    this.$on('editReference', this.editReference)
    // @ts-ignore
    this.$on('editConstraint', this.editConstraint)
    // @ts-ignore
    this.$on('giveWarn', this.giveWarn)
  }
})
export default class App extends Vue {
  drawerRight: boolean = true
  tmp: any = 2
  activeStep: number = 1
  subStep: number = 1
  activePen: number = 0
  canvas: Canvas | null = null

  onEditMachine: boolean = false
  editingMachine: Machine | undefined

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

  editMachine(machine: Machine): void {
    this.onEditMachine = true
    this.editingMachine = machine
    // @ts-ignore
    this.$refs['machine-editor'].preSet(machine.description, machine.shortName)
  }

  editDomain(domain: Domain): void {}

  editInterface(interfaceLine: Interface): void {}

  editReference(reference: Reference): void {}

  editConstraint(constraint: Constraint): void {}

  endEditMachine(info: { description: string; shortName: string }): void {
    this.onEditMachine = false
    if (!this.editingMachine) return
    this.editingMachine.setInformation(info.description, info.shortName)
    this.editingMachine = undefined
  }

  giveWarn(message: string) {
    alert(message)
  }
}
</script>
