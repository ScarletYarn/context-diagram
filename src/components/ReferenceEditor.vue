<template>
  <v-dialog v-model="active" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Interface Information</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-select :items="['M', 'PD1']" label="Initiator" required />
          </v-row>
          <v-row>
            <v-select :items="['PD1', 'PD2']" label="Reciever" required />
          </v-row>
          <v-row>
            <v-select
              :items="['Causal', 'Biddable', 'Lexical']"
              label="Phenomenon"
              required
            />
          </v-row>
          <v-row>
            <v-select
              :items="['event', 'state', 'value']"
              label="Type"
              required
            />
          </v-row>
          <v-row>
            <v-checkbox
              v-model="checkbox"
              :label="`constraint: ${checkbox.toString()}`"
            />
          </v-row>
          <v-row>
            <v-textarea
              label="PhenomenonList"
              no-resize
              rows="6"
              :value="value"
            />
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="dialog = false">Add</v-btn>
        <v-btn color="blue darken-1" text @click="dialog = false">Delete</v-btn>
        <v-btn color="blue darken-1" text @click="cancel">Close</v-btn>
        <v-btn color="blue darken-1" text @click="submit">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class ReferenceEditor extends Vue {
  @Prop(Boolean) active!: boolean
  description: string = ''
  value: string =''
  checkbox: boolean = false

  submit() {
    this.$emit('end-edit-reference', {
      description: this.description
    })
  }

  cancel() {
    this.$emit('end-edit-reference')
  }

  preSet(description: string, shortName: string) {
    this.description = description
  }
}
</script>

<style scoped />
