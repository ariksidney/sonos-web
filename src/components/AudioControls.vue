<script lang="ts">
import ApiService from '../services/api.service';
import Loader from './Loader.vue';
import { PlayModes, Playback } from '../sonos/playback';

let playback: Playback

export default {
    components: { Loader },
    name: 'AudioControls',
    props: ['playbackState', 'groupId', 'canSkip'],
    emits: ['play-media', 'pause-media', 'next-media', 'change-volume'],
    data() {
        return {
            playback: playback,
            loading: false
        }
    },
    methods: {
        async showMenu() {
            this.loading = true
            this.playback = await ApiService.getGroupPlayback(this.groupId);
            this.loading = false
        },
        async toggleShuffe(currentShuffleState: boolean) {
            const newShuffleState = !currentShuffleState
            const playmode: PlayModes = {
                shuffle: newShuffleState,
            }
            await ApiService.setPlayModes(this.groupId, playmode)
            this.playback.playModes.shuffle = newShuffleState
        },
        async toggleRepeat(currentRepeatState: boolean) {
            const newRepeatState = !currentRepeatState
            const playmode: PlayModes = {
                repeat: newRepeatState,
            }
            await ApiService.setPlayModes(this.groupId, playmode)
            this.playback.playModes.repeat = newRepeatState
        }
    }
}
</script>

<template>
    <template v-if="playbackState === 'PLAYBACK_STATE_PAUSED'">
        <button @click="$emit('play-media', groupId)" class="justify-self-center">
            <svg xmlns="http://www.w3.org/2000/svg"
                class="fill-black dark:fill-white dark:hover:fill-violet-400 dark:active:fill-violet-500 hover:fill-violet-500 active:fill-violet-600"
                height="25" width="25" viewBox="16 9.850000381469727 22 27.999998092651367">
                <path d="M16 37.85V9.85L38 23.85ZM19 23.85ZM19 32.4 32.45 23.85 19 15.3Z"></path>
            </svg>
        </button>
    </template>
    <template v-if="playbackState === 'PLAYBACK_STATE_PLAYING'">
        <div>
            <button @click="$emit('pause-media', groupId)" class="justify-self-start">
                <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 96 960 960"
                    class="inline align-middle fill-black dark:fill-white dark:hover:fill-violet-400 dark:active:fill-violet-500 hover:fill-violet-500 active:fill-violet-600">
                    <path d="M575.334 856V296h133.332v560H575.334ZM252 856V296h133.333v560H252Z" />
                </svg>
            </button>
            <button v-if="canSkip" @click="$emit('next-media', groupId)" class="justify-self-start">
                <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 96 960 960"
                    class="inline align-middle fill-black dark:fill-white dark:hover:fill-violet-400 dark:active:fill-violet-500 hover:fill-violet-500 active:fill-violet-600">
                    <path
                        d="M673.334 816V336H740v480h-66.666ZM220 816V336l350.666 240L220 816Zm66.666-240Zm0 113.334L452.667 576 286.666 462.666v226.668Z" />
                </svg>
            </button>

            <span class="dropdown contents">
                <button @click="showMenu" class="dropdown justify-self-start" tabindex="0">
                    <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="40"
                        class="inline align-middle fill-black dark:fill-white dark:hover:fill-violet-400 dark:active:fill-violet-500 hover:fill-violet-500 active:fill-violet-600">
                        <path
                            d="M479.906 896q-24.239 0-41.406-17.261-17.166-17.261-17.166-41.499 0-24.239 17.261-41.406 17.261-17.166 41.499-17.166 24.239 0 41.406 17.261 17.166 17.261 17.166 41.499 0 24.239-17.261 41.405Q504.144 896 479.906 896Zm0-261.334q-24.239 0-41.406-17.261-17.166-17.261-17.166-41.499 0-24.239 17.261-41.406 17.261-17.166 41.499-17.166 24.239 0 41.406 17.261 17.166 17.261 17.166 41.499 0 24.239-17.261 41.406-17.261 17.166-41.499 17.166Zm0-261.334q-24.239 0-41.406-17.261-17.166-17.261-17.166-41.499 0-24.239 17.261-41.405Q455.856 256 480.094 256q24.239 0 41.406 17.261 17.166 17.261 17.166 41.499 0 24.239-17.261 41.406-17.261 17.166-41.499 17.166Z" />
                    </svg>
                </button>
                <div class="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95"
                    tabindex="0">
                    <div class="absolute right-0 w-40 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                        aria-labelledby="menu-button-1" id="menu-items-117" role="menu" tabindex="0">
                        <div class="py-1" tabindex="0">
                            <span v-if="this.playback?.availablePlaybackActions?.canShuffle" tabindex="0">
                                <a href="javascript:void(0)" @click="toggleShuffe(this.playback.playModes.shuffle)"
                                    tabindex="0" v-bind:class="{
                                        'text-violet-600': this.playback?.playModes?.shuffle,
                                    }"
                                    class="text-gray-700 flex w-full items-center px-4 py-2 text-sm leading-5 text-left"
                                    role="menuitem">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        v-bind:class="{ 'fill-violet-600': this.playback?.playModes?.shuffle }" height="24"
                                        viewBox="0 96 960 960" width="24">
                                        <path
                                            d="M560 896v-80h104L537 689l57-57 126 126V656h80v240H560Zm-344 0-56-56 504-504H560v-80h240v240h-80V392L216 896Zm151-377L160 312l56-56 207 207-56 56Z" />
                                    </svg>
                                    <span class="pl-1">Shuffle</span>
                                </a>
                            </span>
                            <span v-if="this.playback?.availablePlaybackActions?.canRepeat">
                                <a href="javascript:void(0)" @click="toggleRepeat(this.playback.playModes.repeat)"
                                    tabindex="1" v-bind:class="{
                                        'text-violet-600': this.playback?.playModes?.repeat,
                                    }" class="text-gray-700 flex items-center w-full px-4 py-2 text-sm leading-5 text-left"
                                    role="menuitem">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        v-bind:class="{ 'fill-violet-600': this.playback?.playModes?.repeat }" height="24"
                                        viewBox="0 96 960 960" width="24">
                                        <path
                                            d="M280 976 120 816l160-160 56 58-62 62h406V616h80v240H274l62 62-56 58Zm-80-440V296h486l-62-62 56-58 160 160-160 160-56-58 62-62H280v160h-80Z" />
                                    </svg>
                                    <span class="pl-1">Repeat</span>
                                </a>

                            </span>
                            <span
                                v-if="!this.playback?.availablePlaybackActions?.canRepeat && !this.playback?.availablePlaybackActions?.canShuffle">
                                <a tabindex="0"
                                    class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-center"
                                    role="menuitem">No media actions</a>
                            </span>
                        </div>
                    </div>
                </div>
            </span>
        </div>
        <div>
            <button @click="$emit('change-volume', groupId, -5)" class="justify-self-start">️️
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 96 960 960"
                    class="inline align-middle fill-black dark:fill-white dark:hover:fill-violet-400 dark:active:fill-violet-500 hover:fill-violet-500 active:fill-violet-600">
                    <path
                        d="M200 696V456h160l200-200v640L360 696H200Zm440 40V414q45 21 72.5 65t27.5 97q0 53-27.5 96T640 736ZM480 450l-86 86H280v80h114l86 86V450ZM380 576Z" />
                </svg>
            </button>
            <button @click="$emit('change-volume', groupId, 5)" class="justify-self-start">️️
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 96 960 960"
                    class="inline align-middle fill-black dark:fill-white dark:hover:fill-violet-400 dark:active:fill-violet-500 hover:fill-violet-500 active:fill-violet-600">
                    <path
                        d="M560 925v-82q90-26 145-100t55-168q0-94-55-168T560 307v-82q124 28 202 125.5T840 575q0 127-78 224.5T560 925ZM120 696V456h160l200-200v640L280 696H120Zm440 40V414q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560 736ZM400 450l-86 86H200v80h114l86 86V450ZM300 576Z" />
                </svg>
            </button>
        </div>
    </template>
</template>

<style scoped>
.dropdown:focus-within .dropdown-menu {
    opacity: 1;
    transform: translate(0) scale(1);
    visibility: visible;
}
</style>
