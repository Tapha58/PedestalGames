<template>
    <v-row>
        <v-col xs="12" sm="7" >
            <v-expansion-panels accordion class="px-0" dense>
                <v-expansion-panel
                        v-for="(textarea_block, name) in textarea_blocks"
                        :key="name"
                        @click="$emit('autoresize')"
                        >
                    <v-expansion-panel-header :ripple="{ class: 'primary--text' }" class="mb-0">
                        {{textarea_block.name}}
                        <template v-slot:actions>
                            <v-icon color="primary">$expand</v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content v-if="textarea_block.name === 'Игровая механика'">
                        <GameMessagesTextArea
                                v-for="textarea in textarea_block.textarea_content"
                                :key="textarea.id"
                                v-model="textarea_values.mechanics[textarea.id]"
                                :mobile="mobile"
                                :label='textarea.label'
                                :list_of_variables_for_rules='textarea.list_of_variables_for_rules'
                                :id='textarea.id'
                        ></GameMessagesTextArea>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content v-else>
                        <GameMessagesTextArea
                                v-for="textarea in textarea_block.textarea_content"
                                :key="textarea.id"
                                v-model="textarea_values.common[textarea.id]"
                                :mobile="mobile"
                                :label='textarea.label'
                                :list_of_variables_for_rules='textarea.list_of_variables_for_rules'
                                :id='textarea.id'
                        ></GameMessagesTextArea>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-col>
        <v-col xs="12" sm="5" >
            <v-sheet
                    class="d-flex"
                    color="blue lighten-5"
                    height="auto"
            >
                <div v-html='main_variables'></div>
            </v-sheet>
            <v-col align="center" cols="12">
                <v-btn @click="$emit('def_message_aply')" block color="primary" small>
<!--                <v-btn @click="def_messages" block color="primary" small>-->
                    Значения по умолчанию
                </v-btn>
            </v-col>
        </v-col>
    </v-row>
</template>

<script>
    import GameMessagesTextArea from "@/components/GameMessagesTextArea";

    export default {
        name: "GameMessages",
        model: {
            prop: 'textarea_values',
        },
        props: [
            'textarea_blocks',
            'textarea_values',
            'mobile',
            'def_message',
            'main_variables'
        ],
        components: {
            GameMessagesTextArea
        },
        data: () => ({

        }),
        computed: {

        },
        methods: {
            def_messages: function () {
                this.textarea_values = this.def_messages
            }
        },
        mounted() {
            // console.log(this.textarea_blocks)
        }
    }
</script>

<style scoped>

</style>