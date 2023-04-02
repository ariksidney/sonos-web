<script lang="ts">
import ApiService from '../services/api.service';
import Alert from './Alert.vue';
import Loader from './Loader.vue';

export default {
    components: { Alert, Loader },
    name: "SonosGroup",
    props: ['group'],
    data() {
        return {
            selectedHousehold: '',
            loading: false,
            playPauseAction: false,
            container: undefined,
            needsScroll: false
        }
    },
    async mounted() {
        this.selectedHousehold = localStorage.getItem('selectedHousehold') || '';
        if (this.group.playbackState === 'PLAYBACK_STATE_PLAYING') {
            await this.loadGroupMetadata(this.group.id);
        }
        this.needsScroll = this.isScrollable();
    },
    methods: {
        async loadGroupMetadata(groupId: string) {
            this.loading = true;
            const groupMetadataObj = await ApiService.getGroupMetadata(groupId);
            this.container = groupMetadataObj.data;
            this.loading = false;
            this.playPauseAction = false;
            this.needsScroll = this.isScrollable();
        },
        async pauseGroup(groupId: string) {
            try {
                this.playPauseAction = true;
                this.loading = true;
                await ApiService.setPlaybackState(this.selectedHousehold, groupId, 'pause')
                this.group.playbackState = 'PLAYBACK_STATE_PAUSED';
                this.loading = false;
                this.playPauseAction = false;
                this.needsScroll = this.isScrollable();
            } catch (err) {
                console.error(err)
            }
        },
        async playGroup(groupId: string) {
            try {
                this.playPauseAction = true;
                this.loading = true;
                await ApiService.setPlaybackState(this.selectedHousehold, groupId, 'play')
                this.loadGroupMetadata(groupId)
                this.group.playbackState = 'PLAYBACK_STATE_PLAYING';
            } catch (err) {
                console.error(err)
            }
        },
        async nextTrackInGroup(groupId: string) {
            try {
                this.loading = true;
                await ApiService.setPlaybackState(this.selectedHousehold, groupId, 'skipToNextTrack');
                this.loadGroupMetadata(groupId);
            } catch (err) {
                console.error(err);
            }
        },
        async changeVolume(groupId: string, volumeDelta: number) {
            try {
                this.playPauseAction = true;
                this.loading = true;
                await ApiService.setRelativeVolume(groupId, volumeDelta);
                this.loading = false;
                this.playPauseAction = true;
                this.needsScroll = this.isScrollable();
            } catch (err) {
                console.error(err);
            }
        },
        isScrollable(): boolean {
            const elementName = "trackName";
            const element = document.getElementById(elementName);
            if (element) {
                var overflowX = element.offsetWidth < element.scrollWidth,
                    overflowY = element.offsetHeight < element.scrollHeight;

                return (overflowX || overflowY);
            } else {
                return false;
            }

        }
    }
}
</script>

<template>
    <figure class="md:container mb-4 bg-slate-100 rounded-xl p-4 md:p-6 pt-6 dark:bg-slate-800 shadow-grey-800 shadow-md">
        <h2 class="font-semibold">{{ group.name }}</h2>
        <div class="flex flex-row flex-wrap items-center pt-2">
            <div class="basis-1/3 md:basis-1/3">
                <div v-if="(container && !loading) || (container && playPauseAction)">
                    <div v-if="container.container.imageUrl !== undefined">
                        <img class="w-24 h-24 lg:w-32 lg:h-32 rounded-full mx-auto" :src="container.container.imageUrl"
                            alt="" width="384" height="512">
                    </div>
                    <div v-else>
                        <img class="w-24 h-24 lg:w-32 lg:h-32 rounded-full mx-auto"
                            :src="container.currentItem.track.imageUrl" alt="playlist Image">
                    </div>
                </div>
                <div v-if="(loading && !playPauseAction) || (!container && loading)">
                    <div class="animate-pulse flex space-x-4">
                        <div class="rounded-full mx-auto lg:w-32 lg:h-32 bg-slate-200 dark:bg-slate-700 h-24 w-24">
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="(container && !loading) || (container && playPauseAction)"
                class="basis-2/3 md:basis-1/3 text-center md:text-center inline-block whitespace-nowrap overflow-hidden">
                <h3 id="trackName" :class="{ scroll: needsScroll }">{{ container.currentItem.track.name }}</h3>
                <div v-if="container.currentItem.track.artist">
                    <p>{{ container.currentItem.track.artist.name }}</p>
                </div>
                <div v-if="container.container.name">
                    <p>{{ container.container.name }}</p>
                </div>
                <div v-if="container.currentItem.track.podcast">
                    <p>{{ container.currentItem.track.podcast.name }}</p>
                </div>
            </div>
            <div v-if="(loading && !playPauseAction) || (!container && loading)"
                class="basis-2/3 md:basis-1/3 w-full mx-auto">
                <div class="flex-1 space-y-3 py-1">
                    <div class="h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div class="space-y-3">
                        <div class="grid grid-cols-3 gap-4">
                            <div class="h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></div>
                            <div class="h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-1"></div>
                        </div>
                        <div class="h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    </div>
                </div>
            </div>
            <div class="basis-full md:basis-1/3">
                <div class="flex md:flex-col h-max justify-center items-center gap-x-3">
                    <template v-if="loading">
                        <loader></loader>
                    </template>
                    <template v-else>
                        <template v-if="group.playbackState === 'PLAYBACK_STATE_PAUSED'">
                            <button @click="playGroup(group.id)">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="fill-black dark:fill-white dark:hover:fill-violet-400 dark:active:fill-violet-500 hover:fill-violet-500 active:fill-violet-600"
                                    height="25" width="25" viewBox="16 9.850000381469727 22 27.999998092651367">
                                    <path d="M16 37.85V9.85L38 23.85ZM19 23.85ZM19 32.4 32.45 23.85 19 15.3Z"></path>
                                </svg>
                            </button>
                        </template>
                        <template v-if="group.playbackState === 'PLAYBACK_STATE_PLAYING'">
                            <div>
                                <button @click="pauseGroup(group.id)" class="justify-self-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 96 960 960"
                                        class="inline align-middle fill-black dark:fill-white dark:hover:fill-violet-400 dark:active:fill-violet-500 hover:fill-violet-500 active:fill-violet-600">
                                        <path d="M575.334 856V296h133.332v560H575.334ZM252 856V296h133.333v560H252Z" />
                                    </svg>
                                </button>
                                <button @click="nextTrackInGroup(group.id)" class="justify-self-start">️️
                                    <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 96 960 960"
                                        class="inline align-middle fill-black dark:fill-white dark:hover:fill-violet-400 dark:active:fill-violet-500 hover:fill-violet-500 active:fill-violet-600">
                                        <path
                                            d="M673.334 816V336H740v480h-66.666ZM220 816V336l350.666 240L220 816Zm66.666-240Zm0 113.334L452.667 576 286.666 462.666v226.668Z" />
                                    </svg>
                                </button>
                            </div>
                            <div>
                                <button @click="changeVolume(group.id, -5)" class="justify-self-start">️️
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 96 960 960"
                                        class="inline align-middle fill-black dark:fill-white dark:hover:fill-violet-400 dark:active:fill-violet-500 hover:fill-violet-500 active:fill-violet-600">
                                        <path
                                            d="M200 696V456h160l200-200v640L360 696H200Zm440 40V414q45 21 72.5 65t27.5 97q0 53-27.5 96T640 736ZM480 450l-86 86H280v80h114l86 86V450ZM380 576Z" />
                                    </svg>
                                </button>
                                <button @click="changeVolume(group.id, 5)" class="justify-self-start">️️
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 96 960 960"
                                        class="inline align-middle fill-black dark:fill-white dark:hover:fill-violet-400 dark:active:fill-violet-500 hover:fill-violet-500 active:fill-violet-600">
                                        <path
                                            d="M560 925v-82q90-26 145-100t55-168q0-94-55-168T560 307v-82q124 28 202 125.5T840 575q0 127-78 224.5T560 925ZM120 696V456h160l200-200v640L280 696H120Zm440 40V414q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560 736ZM400 450l-86 86H200v80h114l86 86V450ZM300 576Z" />
                                    </svg>
                                </button>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
        </div>
    </figure>
</template>

<style scoped>
.scroll {
    display: inline-block;
    animation-name: scroll-text;
    animation-duration: 15s;
    animation-timing-function: linear;
    animation-delay: 5s;
    animation-iteration-count: infinite;
    animation-direction: normal;
}

@keyframes scroll-text {
    20% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-100%);
    }
}
</style>
