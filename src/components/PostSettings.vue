<template>
    <v-row dense class="px-3">
        <v-col>
            <v-alert
                    border="left"
                    color="blue-grey"
                    dark
                    icon="mdi-numeric-3-box"
                    dense
            >Содержание поста

                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-spacer></v-spacer> <v-btn x-small color="primary" dark v-on="on">Подсказка</v-btn>
                    </template>
                    <span>Подсказка</span>
                </v-tooltip>
            </v-alert>

                <v-textarea
                        v-model="gameData.post_text"
                        solo
                        background-color="blue lighten-5"
                        ref="post_text"
                        label="Напишите текст поста, который появится в Вашей группе при публикации игры."
                        value="text"
                        auto-grow
                        class="dense-textarea"

                        persistent-hint
                        hint="
                            {ссылка} — подставится ссылка на архив,
                            {min} — левая граница,
                            {max} — правая граница"
                >
                    <template v-slot:append>
                        <emoji-picker @emoji="append"   >
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
                            <div slot="emoji-picker" slot-scope="{ emojis, insert,  }">
                                <div :style="{ top: 1 + 'px', left: 500 + 'px' }" class="emoji-picker">
                                    <div class="emojis" :key="category" v-for="(emojiGroup, category) in emojis">
<!--                                        <h5>{{ category }}</h5>-->

                        <span
                                :key="emojiName"
                                :title="emojiName"
                                @click="insert(emoji)"
                                v-for="(emoji, emojiName) in emojiGroup"
                        >{{ emoji }}</span>

                                    </div>
                                </div>
                            </div>
                        </emoji-picker>
                    </template>
                </v-textarea>
            </v-col>
    </v-row>

</template>

<script>
    import EmojiPicker from 'vue-emoji-picker'
    export default {
        model: {
            prop: 'gameData',
        },
        props: ['gameData'],
        data() {
            return {
                min: "10",
                text: '',
            }
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
        },
        methods: {
            append(emoji) {
                let area=this.$refs.post_text.$el.querySelector('textarea')
                if ((area.selectionStart)||(area.selectionStart === 0)) {
                    let p_start=area.selectionStart;
                    let p_end=area.selectionEnd;
                    this.gameData.post_text = this.gameData.post_text.substring(0,p_start) + emoji + this.gameData.post_text.substring(p_end,area.value.length)
                }
                area.setRangeText(emoji, area.selectionStart, area.selectionEnd, "end");
                area.focus();
                if (document.selection) {
                    area.focus();
                    let sel = document.selection.createRange();
                    sel.text = emoji;
                }
                if (this.gameData.post_text === '') {
                    this.gameData.post_text += emoji
                }
            }
        }
    }
</script>

<style scoped>

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
        position: absolute;
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
        fill: #b1c6d0;
    }

    .emoji-picker {
        position: absolute;
        z-index: 1;
        border: 1px solid #ccc;
        width: 15rem;
        height: 20rem;
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
</style>