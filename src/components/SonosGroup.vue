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
        },
        async pauseGroup(groupId: string) {
            try {
                this.playPauseAction = true;
                this.loading = true;
                await ApiService.setPlaybackState(this.selectedHousehold, groupId, 'pause')
                this.group.playbackState = 'PLAYBACK_STATE_PAUSED';
                this.loading = false;
                this.playPauseAction = false;
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
    <figure
        class="md:container mb-4  bg-slate-100 rounded-xl p-4 md:p-6 pt-6 dark:bg-slate-800 shadow-grey-800 shadow-md">
        <h2>{{ group.name }}</h2>
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
                class="basis-2/3 md:basis-1/3 text-left md:text-center inline-block whitespace-nowrap overflow-hidden">
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
                <div class="flex h-max justify-center items-center gap-x-3">
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
                            <button @click="pauseGroup(group.id)" class="justify-self-end">
                                <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="12 10 24 28"
                                    class="fill-black dark:fill-white dark:hover:fill-violet-400 dark:active:fill-violet-500 hover:fill-violet-500 active:fill-violet-600">
                                    <path d="M28.25 38V10H36V38ZM12 38V10H19.75V38Z" />
                                </svg>
                            </button>
                            <button @click="nextTrackInGroup(group.id)" class="justify-self-start">️️
                                <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="11 12 26 24"
                                    class="inline align-middle fill-black dark:fill-white dark:hover:fill-violet-400 dark:active:fill-violet-500 hover:fill-violet-500 active:fill-violet-600">
                                    <path d="M34 36V12H37V36ZM11 36V12L28.3 24ZM14 24ZM14 30.25 23.05 24 14 17.75Z" />
                                </svg>
                            </button>
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