<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">Interface Information</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-select
                                :items="['M', 'PD1']"
                                label="Initiator"
                                required
                        ></v-select>
                    </v-row>
                    <v-row>
                        <v-select
                                :items="['PD1', 'PD2']"
                                label="Reciever"
                                required
                        ></v-select>
                    </v-row>
                    <v-row>
                        <v-select
                                :items="['Causal', 'Biddable', 'Lexical']"
                                label="Phenomenon"
                                required
                        ></v-select>
                    </v-row>
                    <v-row>
                        <v-select
                                :items="['event', 'state', 'value']"
                                label="Type"
                                required
                        ></v-select>
                    </v-row>
                    <v-row>
                        <v-checkbox
                                v-model="checkbox"
                                :label="`constraint: ${checkbox.toString()}`"
                        ></v-checkbox>
                    </v-row>
                    <v-row>
                        <v-textarea
                                label="Text"
                                no-resize
                                rows="6"
                                :value="value"
                        ></v-textarea>
                    </v-row>
                </v-container>

            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Add</v-btn>
                <v-btn color="blue darken-1" text @click="dialog = false">Delete</v-btn>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "ConstraintEditor",
        data: () => ({
            value: 'mco laboris nisi ut aliquip ex ea commodo consequat.',
            checkbox: true,
            dialog: false,
        }),
    }
</script>

<style scoped>

</style>
