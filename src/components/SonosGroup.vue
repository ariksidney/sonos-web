<script lang="ts">
import ApiService from '../services/api.service';
import Alert from './Alert.vue';
import Loader from './Loader.vue';
import Music from './audioTypes/Music.vue'
import Audiobook from './audioTypes/Audiobook.vue'
import Podcast from './audioTypes/Podcast.vue'
import Station from './audioTypes/Station.vue'
import AudioControls from './AudioControls.vue';

export default {
    components: { Alert, Loader, Music, Audiobook, Podcast, Station, AudioControls },
    name: "SonosGroup",
    props: ['group'],
    emits: ["change-group"],
    data() {
        return {
            selectedHousehold: '',
            loading: false,
            playPauseAction: false,
            container: undefined,
            needsScroll: false,
            canSkip: true
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
                await this.loadGroupMetadata(groupId)
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
        <div class="flex flex-row">
          <div class="basis-full justify-center">
            <h2 class="font-semibold">{{ group.name }}</h2>
          </div>
          <!-- Sonos Groups -->
          <button @click="$emit('change-group', group.id)" class="justify-end">
            <svg xmlns="http://www.w3.org/2000/svg" class="fill-black dark:fill-white dark:hover:fill-violet-400 dark:active:fill-violet-500 hover:fill-violet-500 active:fill-violet-600" height="24" viewBox="0 -960 960 960" width="24"><path d="M400-280h360v-560H400v560Zm0 80q-33 0-56.5-23.5T320-280v-560q0-33 23.5-56.5T400-920h360q33 0 56.5 23.5T840-840v560q0 33-23.5 56.5T760-200H400Zm180-460q25 0 42.5-17.5T640-720q0-25-17.5-42.5T580-780q-25 0-42.5 17.5T520-720q0 25 17.5 42.5T580-660Zm0 340q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41Zm0-80q-25 0-42.5-17.5T520-460q0-25 17.5-42.5T580-520q25 0 42.5 17.5T640-460q0 25-17.5 42.5T580-400Zm60 360H240q-33 0-56.5-23.5T160-120v-640h80v640h400v80ZM400-840v560-560Z"/></svg>
          </button>
        </div>
        <div class="flex flex-row flex-wrap items-center pt-2">
            <!-- Picture -->
            <div class="basis-1/3 md:basis-1/3 lg:basis-1/6">
                <div v-if="(container && !loading) || (container && playPauseAction)">
                    <div v-if="container.container.imageUrl !== undefined">
                        <img class="w-24 h-24 lg:w-30 lg:h-30 rounded-full mx-auto" :src="container.container.imageUrl"
                            alt="playlist image" width="384" height="512">
                    </div>
                    <div
                        v-else-if="container.currentItem && container.currentItem.track && container.currentItem.track.imageUrl !== undefined">
                        <img class="w-24 h-24 lg:w-30 lg:h-30 rounded-full mx-auto"
                            :src="container.currentItem.track.imageUrl" alt="track Image">
                    </div>
                    <div v-else>
                        <div class="w-24 h-24 lg:w-30 lg:h-30 rounded-full mx-auto bg-slate-200 dark:bg-slate-700"
                            alt="placeholder for not found image">
                        </div>
                    </div>
                </div>
                <div v-if="(loading && !playPauseAction) || (!container && loading)">
                    <div class="animate-pulse flex space-x-4">
                        <div class="rounded-full mx-auto lg:w-30 lg:h-30 bg-slate-200 dark:bg-slate-700 h-24 w-24">
                        </div>
                    </div>
                </div>
            </div>
            <!-- Details -->
            <div
                class="basis-2/3 md:basis-1/3 lg:basis-4/6 text-center md:text-center inline-block whitespace-nowrap overflow-hidden">
                <div v-if="(container && !loading) || (container && playPauseAction)">
                    <div v-if="container.currentItem && container.currentItem.track.type === 'track'">
                        <Music :container="container" />
                    </div>
                    <div v-else-if="container.container.type === 'audiobook'">
                        <Audiobook :container="container" />
                    </div>
                    <div v-else-if="container.currentItem && container.currentItem.track.type === 'episode.podcast'">
                        <Podcast :container="container" />
                    </div>
                    <div v-else-if="container.container.type === 'station'">
                        <Station :container="container" />
                    </div>
                    <div v-else>
                         <!-- Type not yet supported, try with Music -->
                        <div v-if="container.currentItem && container.currentItem.track.type === 'track'">
                            <Music :container="container" />
                        </div>
                    </div>
                </div>
                <div v-if="(loading && !playPauseAction) || (!container && loading)"
                    class="basis-2/3 md:basis-1/3 lg:basis-4/6 w-full mx-auto">
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
            </div>
            <!-- Controls -->
            <div class="basis-full md:basis-1/3 lg:basis-1/6 pt-2 md:lg:pt-0">
                <div class="flex md:flex-col h-max justify-center items-center gap-x-3">
                    <template v-if="loading">
                        <loader></loader>
                    </template>
                    <template v-else>
                        <AudioControls :playbackState="group.playbackState" :groupId="group.id" :canSkip="canSkip"
                            @pause-media="pauseGroup" @play-media="playGroup" @next-media="nextTrackInGroup"
                            @change-volume="changeVolume">
                        </AudioControls>
                    </template>
                </div>
            </div>
        </div>
    </figure>
</template>
