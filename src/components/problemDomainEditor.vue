<template>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">ProblemDomain Information</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-text-field label="description" v-model="description" />
                        </v-row>
                        <v-row>
                            <v-text-field label="shortname" v-model="shortname" />
                        </v-row>
                        <v-row>
                            <v-select
                                    :items="['GivenDomain', 'DesignDomain']"
                                    label="Physical Property"
                                    required
                            ></v-select>
                        </v-row>
                        <v-row>
                            <v-select
                                    :items="['Causal', 'Biddable', 'Lexical']"
                                    label="DomainType"
                                    required
                            ></v-select>
                        </v-row>
                    </v-container>

                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
</template>

<script>
    export default {
        name: "problemDomainEditor",
        data: () => ({
            dialog: false,
        }),
    }
</script>

<style scoped>

</style>
