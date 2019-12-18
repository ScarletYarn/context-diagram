<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawerRight"
      app
      clipped
      permanent
      right
      width="400"
    >
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
              <v-list-item-action>2.2: Identify references.</v-list-item-action>
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
        <v-list-group value="true" no-action>
          <template v-slot:activator>
            <v-list-item>Diagram</v-list-item>
          </template>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{
                this.projectDescription
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            context Diagram
          </v-list-item>
          <v-list-item>
            problem Diagram
          </v-list-item>
        </v-list-group>
        <v-list-group value="true">
          <template v-slot:activator>
            <v-list-item>Phenomenon</v-list-item>
          </template>
          <v-list-item>
            <v-simple-table style="width: 100%">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Description</th>
                    <th class="text-left">PheType</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in phenomenons" :key="item.name">
                    <td>phe{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ phenomenonName[item.type] }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-list-item>
        </v-list-group>
        <v-list-group value="true">
          <template v-slot:activator>
            <v-list-item>Interaction</v-list-item>
          </template>
          <v-list-item>
            <v-simple-table style="width: 100%">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Initiator</th>
                    <th class="text-left">Receiver</th>
                    <th class="text-left">Content</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in phenomenons" :key="item.name">
                    <td>inter{{ index + 1 }}</td>
                    <td>{{ item.initiator.description }}</td>
                    <td>{{ item.receiver.description }}</td>
                    <td>{{ item.description }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-list-item>
        </v-list-group>
        <v-list-group value="true" style="width: 100%">
          <template v-slot:activator>
            <v-list-item>Reference</v-list-item>
          </template>
          <v-list-item style="width: 100%">
            <v-simple-table style="width: 100%">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Initiator</th>
                    <th class="text-left">Receiver</th>
                    <th class="text-left">Content</th>
                    <th class="text-left">Constraint</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in references" :key="item.name">
                    <td>req{{ item.name }}</td>
                    <td>{{ item.initiator }}</td>
                    <td>{{ item.receiver }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.constraint }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-list-item>
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
          <v-list-item
            v-for="item in pens"
            :title="item.name"
            :key="item.name"
            :disabled="!item.allow"
          >
            <v-list-item-action>
              <v-img :alt="item.name" width=".5em" :src="item.src" />
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
      <v-btn @click="merge" text>Merge</v-btn>
      <v-menu open-on-hover bottom offset-y transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">Import</v-btn>
        </template>
        <v-list>
          <v-list-item @click="upload">
            <v-list-item-title>Import Project</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-dialog width="700px">
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">Custom</v-btn>
        </template>
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            Custom rules
          </v-card-title>
          <v-card-actions>
            <v-container width="80%">
              <v-switch
                v-for="item in rules"
                :key="item.rule"
                v-model="item.valid"
                :label="item.rule"
              />
            </v-container>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-menu open-on-hover bottom offset-y transition="scale-transition">
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

    <line-editor
      @end-edit-line="endEditLine"
      ref="line-editor"
      :active="onEditLine"
    />

    <shape-editor
      @end-edit-shape="endEditShape"
      :active="onEditShape"
      :shape="editingShape"
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
import Procedure from '@/app/Procedure'
import { Phenomenon } from '@/app/graph/Phenomenon'
import LineEditor from '@/components/LineEditor.vue'
import { Line } from '@/app/graph/line/Line'
import ShapeEditor from '@/components/ShapeEditor.vue'
import Shape from '@/app/graph/shape/Shape'

@Component({
  components: {
    ShapeEditor,
    LineEditor
  },
  watch: {
    activePen(val) {
      this.canvas.activePen = val
    }
  },
  mounted() {},
  created() {
    document.addEventListener('keyup', ev => {
      if (
        this.onEditMachine ||
        this.onEditDomain ||
        this.onEditRequirement ||
        this.onEditLine ||
        this.onEditShape
      )
        return
      if (ev.code === 'Backspace' || ev.code === 'Delete') this.deleteElement()
    })
    this.$on('edit-shape', this.editShape)
    this.$on('edit-line', this.editLine)
    this.$on('giveWarn', this.giveWarn)
  }
})
export default class App extends Vue {
  newDialog: boolean = false
  projectDescription: string = ''
  get projectName(): string {
    if (this.projectDescription.length > 0) return this.projectDescription
    else return 'Default'
  }
  drawerRight: boolean = true
  pens = [
    {
      name: 'machine',
      src: require('@/assets/machine.svg'),
      allow: false
    },
    {
      name: 'domain',
      src: require('@/assets/problem-domain.svg'),
      allow: false
    },
    {
      name: 'requirement',
      src: require('@/assets/requirement.svg'),
      allow: false
    },
    {
      name: 'interface',
      src: require('@/assets/interface.svg'),
      allow: false
    },
    {
      name: 'reference',
      src: require('@/assets/reference.svg'),
      allow: false
    },
    {
      name: 'constraint',
      src: require('@/assets/constraint.svg'),
      allow: false
    }
  ]
  tmp: any = 2
  activeStep: number = 1
  subStep: number = 1
  activePen: number = -1
  canvas: Canvas | null = null
  procedure: Procedure | null = null

  get rules(): Array<{ rule: string; valid: boolean }> {
    return Procedure.ruleSet
  }

  onEditShape: boolean = false
  editingShape: Shape | null = null

  onEditLine: boolean = false
  editingLine: Line | undefined

  phenomenons: Array<Phenomenon> = Phenomenon.PhenomenonList
  // height: number = 120

  get phenomenonName(): Array<string> {
    return ['event', 'state', 'value']
  }

  get references(): Array<{
    name: string
    description: string
    initiator: string
    receiver: string
    constraint: boolean
  }> {
    let res = []
    for (let item of this.phenomenons) {
      if (item.position === 1) {
        res.push({
          name: item.name,
          description: item.description,
          initiator: item.initiator.description,
          receiver: item.receiver.description,
          constraint: item.constraint
        })
      }
    }
    return res
  }

  back(): void {
    let obj = this.procedure.previous()
    this.activeStep = obj.step
    this.subStep = obj.subStep
    this.flushAllow()
  }

  next(): void {
    let obj = this.procedure.next()

    if (obj.err) {
      alert(obj.err)
    } else {
      this.activeStep = obj.step
      this.subStep = obj.subStep
      if (obj.success.length > 0) alert(obj.success)
      this.flushAllow()
    }
  }

  deleteElement(): void {
    if (!this.canvas) return
    this.canvas.deleteElement()
  }

  /**
   * ** New
   * Merge multiple Domain.
   */
  merge(): void {
    if (this.canvas) {
      this.canvas.merge()
    }
  }

  editShape(shape: Shape): void {
    this.editingShape = shape
    this.$nextTick(() => {
      this.onEditShape = true
    })
  }

  editLine(line: Line): void {
    this.onEditLine = true
    this.editingLine = line
    // @ts-ignore
    this.$refs['line-editor'].preSet(line)
  }

  endEditShape(): void {
    this.onEditShape = false
    this.editingShape.flush()
  }

  endEditLine(): void {
    this.onEditLine = false
    if (!this.editingLine) return
    this.editingLine = undefined
  }

  giveWarn(message: string) {
    alert(message)
  }

  flushAllow(): void {
    this.procedure.getAllow().forEach((item, index) => {
      this.pens[index].allow = item
    })
  }

  upload() {
    let inputObj = document.createElement('input')
    inputObj.setAttribute('id', 'file')
    inputObj.setAttribute('type', 'file')
    inputObj.setAttribute('name', 'file')
    inputObj.click()
    inputObj.onchange = e => {
      // @ts-ignore
      let files = e.target.files

      let fr = new FileReader()
      fr.onload = e => {
        // @ts-ignore
        let r = JSON.parse(e.target.result)
        this.projectDescription = r.projectName
        this.activeStep = r.step
        this.subStep = r.subStep
        this.canvas = Canvas.load(this, r)
        this.procedure = new Procedure(this.canvas, r.step, r.subStep)
        /* ** New: Load the rule set. */
        for (let item in r.ruleSet) {
          Procedure.ruleSet[item] = r.ruleSet[item]
        }
        this.flushAllow()
      }
      fr.readAsText(files[0])
    }
  }

  download() {
    let final = {
      projectName: this.projectName,
      step: this.activeStep,
      subStep: this.subStep,
      componentsCount: this.canvas.componentsCount,
      machine: this.canvas.machine.toSerializable(),
      domainList: this.canvas.domainList.map(e => e.toSerializable()),
      domainCount: this.canvas.domainCount,
      /* ** New: Export a list of requirements. */
      requirementList: this.canvas.requirementList.map(e => e.toSerializable()),
      requirementCount: this.canvas.requirementCount,
      interfaceList: this.canvas.interfaceList.map(e => e.toSerializable()),
      interfaceCount: this.canvas.interfaceCount,
      referenceList: this.canvas.referenceList.map(e => e.toSerializable()),
      referenceCount: this.canvas.referenceCount,
      constraintList: this.canvas.constraintList.map(e => e.toSerializable()),
      constraintCount: this.canvas.constraintCount,
      phenomenonList: Phenomenon.PhenomenonList.map(e => e.toSerializable()),
      /* ** New: Save the rule set. */
      ruleSet: Procedure.ruleSet
    }
    let buffer = JSON.stringify(final)
    let downloadBlobURL = URL.createObjectURL(
      new Blob([buffer], {
        type: 'text/json'
      })
    )
    let tmpNode = document.createElement('a')
    tmpNode.setAttribute('href', downloadBlobURL)
    tmpNode.setAttribute('download', this.projectName + '.json')
    tmpNode.click()
  }

  downloadPNG(): void {
    this.canvas.exportImage()
  }

  newProject(): void {
    Canvas.init(this)
    this.canvas = new Canvas()
    this.newDialog = false
    this.procedure = new Procedure(this.canvas)
    this.flushAllow()
  }
}
</script>
