<template>
  <div class="flex flex-col md:flex-row">
    <navigation></navigation>
    <main class="text-slate-900 dark:text-white w-full pr-4 pl-4 pb-4 md:p-4">
      <div v-if="this.selectedHousehold === ''">
        No household selected
      </div>
      <div v-else>
        <div v-for="(value, name) in this.favoritesByType">
          <figure
            class="md:container mb-4 bg-slate-100 rounded-xl p-4 md:p-6 pt-6 dark:bg-slate-800 shadow-grey-800 shadow-md">
            <h2 class="font-semibold">{{ name }}S</h2>
            <div v-for="favorite in value">
              <div class="flex flex-row flex-wrap items-center pt-2">
                <div class="basis-1/3 md:basis-1/3">
                  <img class="w-20 lg:h-20 rounded-full mx-auto" :src="favorite.imageUrl" alt="Favorite Image">
                </div>
                <div class="basis-1/3">
                  <div class="flex flex-col">
                    <div id="text-start">
                      {{ favorite.name }}
                    </div>
                    <div class="text-slate-500">
                      {{ favorite.service.name }}
                    </div>
                  </div>
                </div>
                <div class="basis-1/3 md:basis-1/3 w-full mx-auto">
                  <button @click="showGroupModal(favorite.id)">
                    <svg xmlns="http://www.w3.org/2000/svg"
                      class="fill-black dark:fill-white dark:hover:fill-violet-400 dark:active:fill-violet-500 hover:fill-violet-500 active:fill-violet-600"
                      height="25" width="25" viewBox="16 9.850000381469727 22 27.999998092651367">
                      <path d="M16 37.85V9.85L38 23.85ZM19 23.85ZM19 32.4 32.45 23.85 19 15.3Z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </figure>
        </div>

        <Modal title="Select Group" ref="modal">
          <template v-if="!loading">
            <div v-for="group in this.groups">
              <button @click="playFavorite(group.id)"
                class="text-gray-900 hover:text-gray-600 active:text-grey-700 dark:text-slate-100 dark:hover:text-slate-400 p-2">
                {{ group.name }}
              </button>
            </div>
          </template>
          <template v-else>
            <Loader></Loader>
          </template>
        </Modal>

      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import Navigation from './Navigation.vue';
import Loader from './Loader.vue';
import ApiService from '../services/api.service';
import { favoritesList, favoritesByType } from '../sonos/favorites';
import { Group } from '../sonos/group';
import Modal from './Modal.vue';

const modal = ref(0);

export default {
  name: "Favorites",
  components: { Navigation, Loader, Modal },
  data() {
    return {
      selectedHousehold: "",
      favoritesList: [] as favoritesList[],
      favoritesByType: {} as favoritesByType[],
      groups: [] as Array<Group>,
      selectedFavoriteId: 0,
      loading: false
    }
  },
  async mounted() {
    this.selectedHousehold = localStorage.getItem('selectedHousehold') || '';
    this.loadFavorites(this.selectedHousehold)
    this.loadGroups()
  },
  methods: {
    async loadFavorites(housholdId: string) {
      const favoritesList = await ApiService.getFavorites(housholdId);
      this.favoritesList = favoritesList;
      for (var favorite of favoritesList.items) {
        if (!(favorite.resource.type in this.favoritesByType)) {
          this.favoritesByType[favorite.resource.type] = []
        }
        this.favoritesByType[favorite.resource.type].push(favorite)
      }
    },
    async loadGroups() {
      this.loading = true;
      if (this.selectedHousehold === '') {
        await this.getHousehold();
      } else {
        const groupObj = await ApiService.getGroups(this.selectedHousehold)
        this.groups = groupObj.groups
      }
      this.loading = false;
    },
    showGroupModal(favoriteId: number) {
      this.selectedFavoriteId = favoriteId;
      this.$refs.modal.show();
    },
    async playFavorite(groupId: string) {
      this.loading = true;
      await ApiService.playFavorite(groupId, this.selectedFavoriteId);
      this.loading = false;
      this.$refs.hide();
    },
  }
}
</script>
