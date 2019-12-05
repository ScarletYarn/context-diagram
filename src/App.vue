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
      <v-dialog v-model="newDialog" persistent max-width="300px">
        <template v-slot:activator="{ on }">
          <v-btn text dark v-on="on">New</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">New Project</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-text-field
                  label="description"
                  v-model="projectDescription"
                />
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="newProject"
              >Confirm</v-btn
            >
            <v-btn color="blue darken-1" text @click="newDialog = false"
              >Cancel</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn text>Merge</v-btn>
      <v-menu open-on-hover bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">Import</v-btn>
        </template>
        <v-list>
          <v-list-item v-for="n in 1" :key="n" @click="() => {}">
            <v-list-item-title @click="upload()"
              >Import Project</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn text @click="download()">Save</v-btn>
      <v-menu open-on-hover bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">Export</v-btn>
        </template>
        <v-list>
          <v-list-item @click="download">
            <v-list-item-title>Export Project</v-list-item-title>
          </v-list-item>
          <v-list-item @click="downloadPNG">
            <v-list-item-title>Export As PNG</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn text>Help</v-btn>
    </v-app-bar>

    <machine-editor
      @end-edit-machine="endEditMachine"
      ref="machine-editor"
      :active="onEditMachine"
    />

    <domain-editor
      @end-edit-domain="endEditDomain"
      ref="domain-editor"
      :active="onEditDomain"
    />

    <requirement-editor
      @end-edit-requirement="endEditRequirement"
      ref="requirement-editor"
      :active="onEditRequirement"
    />

    <interface-editor
      @end-edit-requirement="endEditInterface"
      ref="interface-editor"
      :active="onEditInterface"
    />

    <reference-editor
      @end-edit-reference="endEditReference"
      ref="reference-editor"
      :active="onEditReference"
    />

    <constraint-editor
      @end-edit-constraint="endEditConstraint"
      ref="constraint-editor"
      :active="onEditConstraint"
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
import Reference from '@/app/graph/line/Reference'
import Constraint from '@/app/graph/line/Constraint'
import DomainEditor from '@/components/DomainEditor.vue'
import RequirementEditor from '@/components/RequirementEditor.vue'
import InterfaceEditor from '@/components/InterfaceEditor.vue'
import ReferenceEditor from '@/components/ReferenceEditor.vue'
import ConstraintEditor from '@/components/ConstraintEditor.vue'
import Requirement from '@/app/graph/shape/Requirement'
import { InterfaceLine } from '@/app/graph/line/InterfaceLine'

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
      this.canvas.activePen = val
    }
  },
  mounted() {},
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
  newDialog: boolean = false
  projectDescription: string = ''
  drawerRight: boolean = true
  tmp: any = 2
  activeStep: number = 1
  subStep: number = 1
  activePen: number = 0
  canvas: Canvas | null = null

  onEditMachine: boolean = false
  editingMachine: Machine | undefined

  onEditDomain: boolean = false
  editingDomain: Domain | undefined

  onEditRequirement: boolean = false
  editingRequirement: Requirement | undefined

  onEditInterface: boolean = false
  editingInterface: InterfaceLine | undefined

  onEditReference: boolean = false
  editingReference: Reference | undefined

  onEditConstraint: boolean = false
  editingConstraint: Constraint | undefined

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

  editDomain(domain: Domain): void {
    this.onEditDomain = true
    this.editingDomain = domain
    // @ts-ignore
    this.$refs['domain-editor'].preSet(
      domain.description,
      domain.shortName,
      domain.domainType,
      domain.physicalProperty
    )
  }

  editRequirement(requirement: Requirement): void {
    this.onEditRequirement = true
    this.editingRequirement = requirement
    // @ts-ignore
    this.$refs['requirement-editor'].preSet(requirement.description)
  }

  editInterface(interfaceLine: InterfaceLine): void {
    this.onEditInterface = true
    this.editingInterface = interfaceLine
    // @ts-ignore
    this.$refs['interface-editor'].preSet(interfaceLine)
  }

  editReference(reference: Reference): void {
    this.onEditReference = true
    this.editingReference = reference
    // @ts-ignore
    this.$refs['reference-editor'].preSet(reference)
  }

  editConstraint(constraint: Constraint): void {
    this.onEditConstraint = true
    this.editingConstraint = constraint
    // @ts-ignore
    this.$refs['constraint-editor'].preSet(constraint)
  }

  endEditMachine(info: { description: string; shortName: string }): void {
    this.onEditMachine = false
    if (!this.editingMachine) return
    this.editingMachine.setInformation(info.description, info.shortName)
    this.editingMachine = undefined
  }

  endEditDomain(info: {
    description: string
    shortName: string
    domainType: number
    physicalProperty: number
  }): void {
    this.onEditDomain = false
    if (!this.editingDomain) return
    this.editingDomain.setInformation(
      info.description,
      info.shortName,
      info.domainType,
      info.physicalProperty
    )
    this.editingDomain = undefined
  }

  endEditRequirement(info: { description: string }): void {
    this.onEditRequirement = false
    if (!this.editingRequirement) return
    this.editingRequirement.setInformation(info.description)
    this.editingRequirement = undefined
  }

  endEditInterface(): void {
    this.onEditInterface = false
    if (!this.editingInterface) return
    this.editingInterface = undefined
  }

  endEditReference(): void {
    this.onEditReference = false
    if (!this.editingReference) return
    this.editingReference = undefined
  }

  endEditConstraint(): void {
    this.onEditConstraint = false
    if (!this.editingConstraint) return
    this.editingConstraint = undefined
  }

  giveWarn(message: string) {
    alert(message)
  }

  upload() {
    let inputObj = document.createElement('input')
    inputObj.setAttribute('id', 'file')
    inputObj.setAttribute('type', 'file')
    inputObj.setAttribute('name', 'file')
    inputObj.setAttribute('style', 'visibility:hidden')
    document.body.appendChild(inputObj)
    // inputObj.value
    inputObj.click()
    inputObj.onchange = e => {
      // @ts-ignore
      let files = e.target.files

      let fr = new FileReader()
      fr.onload = e => {
        // @ts-ignore
        let r = JSON.parse(e.target.result)
        this.projectDescription = r.projectName
        // this.canvas = Canvas.load(this, r)
      }
      fr.readAsText(files[0])
    }
  }

  download() {
    let final = {
      projectName: this.projectDescription,
      machine: this.canvas.machine.toSerializable(),
      domain: this.canvas.domainList.map(e => e.toSerializable()),
      requirement: this.canvas.referenceList.map(e => e.toSerializable()),
      interface: this.canvas.interfaceList.map(e => e.toSerializable()),
      reference: this.canvas.referenceList.map(e => e.toSerializable()),
      constraint: this.canvas.constraintList.map(e => e.toSerializable())
    }
    let buffer = JSON.stringify(final)
    let downloadBlobURL = URL.createObjectURL(
      new Blob([buffer], {
        type: 'text/json'
      })
    )
    let tmpNode = document.createElement('a')
    tmpNode.setAttribute('href', downloadBlobURL)
    tmpNode.setAttribute('download', 'map.json')
    tmpNode.click()
  }

  downloadPNG(): void {
    this.canvas.exportImage()
  }

  newProject(): void {
    Canvas.init(this)
    this.canvas = new Canvas()
    this.newDialog = false
  }
}
</script>
