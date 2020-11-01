<template>
    <v-textarea
            id="bot_responses"
            ref="text_emoji"
            rows="1"
            auto-grow
            :label='label'
            :value='value'
            :rules="rules_answer"
            validate-on-blur
            class="caption relative dense-textarea mb-n2"
            no-resize
            v-on:input="$emit('input', $event)"
    >

        <template v-slot:label>
            <p><b>{{ label }}</b></p>
        </template>
        <template v-slot:append-outer>
            <div v-if="!mobile">
            <emoji-picker  @emoji="append">
                <div
                        @click.stop="clickEvent"
                        class="emoji-invoker"
                        slot="emoji-invoker"
                        slot-scope="{ events: { click: clickEvent } }"
                >
                    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                    </svg>
                </div>
                <div  slot="emoji-picker" slot-scope="{ emojis, insert,  }">
                    <div  class="emoji-picker">
                        <div :key="category" v-for="(emojiGroup, category) in emojis">
<!--                            <h5>{{ category }}</h5>-->
                            <div class="emojis">
                        <span
                                :key="emojiName"
                                :title="emojiName"
                                @click="insert(emoji)"
                                v-for="(emoji, emojiName) in emojiGroup"
                        >{{ emoji }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </emoji-picker>
            </div>
        </template>
    </v-textarea>
</template>

<script>
    import EmojiPicker from 'vue-emoji-picker'

    export default {
        model: {
            prop: 'value',
        },
        props: [
            'label',
            'value',
            'tooltip',
            'mobile',
            'list_of_variables_for_rules',
            'id'

        ],
        data: () => ({
            height: 80,
            mdi: 'mdi-alert-circle-outline',
        }),
        computed: {
            rules_answer () {
                // console.log(this.id)
                if (!this.list_of_variables_for_rules.length) {
                    return [v => (v && v.length <= 2000) || 'Не более 2000 символов']
                }
                let result = this.value.matchAll(/\{([0-9A-Za-z_]+)\}/g)
                result = Array.from(result)
                result = result.map(match => match[1])
                result = new Set(result)
                let list_of_variables_for_rules = new Set(this.list_of_variables_for_rules)
                let outcome = [...result].filter(x => !list_of_variables_for_rules.has(x))
                if (this.id === 'message_repost_desc' || this.id === 'message_join_group_desc' ||
                    this.id === 'message_join_partner_group_desc' || this.id === 'message_enable_notifications_desc') {
                    return [
                        v => (v && v.length <= 300) || 'Не более 300 символов',
                        () => !outcome.length || `Переменную ${outcome[0]} нельзя использовать в данном поле`
                    ]
                } else {
                    return [
                        v => (v && v.length <= 2000) || 'Не более 2000 символов',
                        () => !outcome.length || `Переменную ${outcome[0]} нельзя использовать в данном поле`
                    ]
                }
            },
        },
        methods: {
            append(emoji) {
                let area=this.$refs.text_emoji.$el.querySelector('textarea')
                if ((area.selectionStart)||(area.selectionStart === 0)) {
                    let p_start=area.selectionStart;
                    let p_end=area.selectionEnd;
                    this.$emit('input', this.value.substring(0,p_start) + emoji + this.value.substring(p_end,area.value.length))
                }
                area.setRangeText(emoji, area.selectionStart, area.selectionEnd, "end")
                area.focus()
                // if (document.selection) {
                //     area.focus();
                // let sel=document.selection.createRange();
                // sel.text=emoji;
                // }
                // if (this.value === '') {
                //     this.$emit('input', this.value + emoji)
                // }

            },
        },

        components: {
            EmojiPicker,
        },
        directives: {
            focus: {
                inserted(el) {
                    el.focus()
                },
            },
        }
    }
</script>


<style>
    .relative {
        position: relative;
    }

       .regular-input {
        padding: 0.5rem 1rem;
        border-radius: 3px;
        width: 20rem;
        height: 10rem;
        outline: none;
    }

    .regular-input:focus {
        box-shadow: 0 0 0 3px rgba(66, 153, 225, .5);
    }

    .emoji-invoker {
        /*position: absolute;*/

        top: 0.5rem;
        right: 0.5rem;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.2s;
    }

    .emoji-invoker:hover {
        transform: scale(1.1);
    }

    .emoji-invoker > svg {
        fill: #d3deed;
    }

    .emoji-picker {
        position: absolute;
        right: 0px;
        top: -15rem;

        z-index: 1;
        border: 1px solid #ccc;
        width: 20rem;
        height: 15rem;
        overflow: scroll;
        padding: 1rem;
        box-sizing: border-box;
        background: #fff;
        box-shadow: 1px 1px 8px #c7dbe6;
        overflow-x: hidden;
        scroll-padding: 5px;
    }

    .emoji-picker h5 {
        margin-bottom: 0;
        color: #b1b1b1;
        text-transform: uppercase;
        font-size: 0.8rem;
        cursor: default;
    }

    .emoji-picker .emojis {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .emoji-picker .emojis:after {
        content: "";
        flex: auto;
    }

    .emoji-picker .emojis span {
        padding: 0.2rem;
        cursor: pointer;
        border-radius: 5px;
        width: 27px;
        height: 27px;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: scale(1.2);

    }

    .emoji-picker .emojis span:hover {
        background: #ececec;
        cursor: pointer;
    }

    #bot_responses {
        max-width: 95% !important;
    }

</style>