<script lang="ts">

export default {
    components: {},
    name: 'AudioControls',
    props: ['playbackState', 'groupId', 'canSkip'],
    emits: ['play-media', 'pause-media', 'next-media', 'change-volume']
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
            <button v-if="canSkip" @click="$emit('next-media', groupId)" class="justify-self-start">️️
                <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 96 960 960"
                    class="inline align-middle fill-black dark:fill-white dark:hover:fill-violet-400 dark:active:fill-violet-500 hover:fill-violet-500 active:fill-violet-600">
                    <path
                        d="M673.334 816V336H740v480h-66.666ZM220 816V336l350.666 240L220 816Zm66.666-240Zm0 113.334L452.667 576 286.666 462.666v226.668Z" />
                </svg>
            </button>
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
