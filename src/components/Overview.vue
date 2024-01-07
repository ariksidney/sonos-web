<script lang="ts">
import { defineComponent, ref } from 'vue';
import ApiService from '../services/api.service';
import Alert from './Alert.vue';
import Loader from './Loader.vue';
import Navigation from './Navigation.vue';
import SonosGroup from './SonosGroup.vue';
import { Group } from '../sonos/group';
import { Player } from '../sonos/device';
import Modal from './Modal.vue';

const modal = ref(0);

export default defineComponent({
  components: { Navigation, SonosGroup, Loader, Alert, Modal },
  name: 'Overview',
  data() {
    return {
      selectedHousehold: '',
      groups: [] as Array<Group>,
      players: [] as Array<Player>,
      checkedPlayers: [] as Array<string>,
      loading: false,
    }
  },
  created() {
    window.addEventListener("visibilitychange", this.loadOnVisible)
  },
  async mounted() {
    if (localStorage.getItem('selectedHousehold') != null) {
      this.selectedHousehold = localStorage.getItem('selectedHousehold') || '';
      await this.loadGroups();
    } else {
      try {
        await this.getHousehold();
        await this.loadGroups();
      } catch (err) {
        console.error('An error occurred while getting households', err)
      }
    }
  },
  methods: {
    async loadOnVisible() {
      if (document.visibilityState === "visible") {
        await this.loadGroups()
      }
    },
    async loadGroups() {
      this.loading = true;
      if (this.selectedHousehold === '') {
        await this.getHousehold();
      } else {
        const groupObj = await ApiService.getGroups(this.selectedHousehold)
        this.groups = groupObj.groups
        this.players = groupObj.players
      }
      this.loading = false;
    },
    async getHousehold() {
      const households = (await ApiService.getHousholds()).households
      if (households.length != 0) {
        this.selectedHousehold = households[0].id
        localStorage.setItem('selectedHousehold', this.selectedHousehold)
      }
    },
    async updateGroupPlayers() {
      this.loading = true;
      await ApiService.setGroupMembers(this.groupToChange, this.checkedPlayers);
      this.loading = false;
      await this.loadGroups()
      this.$refs.modal.hide();
    },
    showGroupModal(groupId: string) {
      this.groupToChange = groupId;
      const group = this.groups.filter((group: Group) => group.id === this.groupToChange);
      if (group.length != 1) {
        console.warn("Too Many groups found. Take 1st one")
      }
      this.checkedPlayers = group[0].playerIds
      this.$refs.modal.show();
    },
  },
})

</script>

<template>
  <div class="flex flex-col md:flex-row">
    <navigation></navigation>
    <main class="text-slate-900 dark:text-white w-full pr-4 pl-4 pb-4 md:p-4">
      <div v-if="loading">
        <loader></loader>
      </div>
      <div v-else>
        <SonosGroup v-for="group in this.groups" :key="group.id" :group="group" @change-group="showGroupModal" />
        <div v-if="!this.groups || !this.groups.length" class="m-6">
          No Sonos speakers found
        </div>
        <button @click="loadGroups()"
          class="h-10 px-6 font-semibold rounded-full bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white shadow-md"
          type="button">Refresh Groups</button>
      </div>
    </main>
  </div>
  <Modal title="Players" ref="modal">
    <template v-if="!loading">
      <div class="flex justify-center flex-col items-center">
        <div v-for="player in this.players" class="flex w-full">
          <div class="flex-1">
          </div>
          <div class="shrink-0 basis-1/3 text-left">
            <input type="checkbox" :id="player.id" :value="player.id" v-model="checkedPlayers"
              class="appearance-none w-4 h-4 border-2 mr-2 border-gray-950 dark:border-white rounded-full bg-transparent mt-1 shrink-0 checked:bg-gray-950 dark:checked:bg-white">
            <label :for="player.id" class="text-gray-900 dark:text-slate-100">
              {{ player.name }}
            </label>
          </div>
          <div class="flex-1">
          </div>
        </div>
      </div>
      <button @click="updateGroupPlayers()" type="button"
        class="h-8 px-6 font-semibold rounded-full bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white shadow-md mt-3">
        Set Group
      </button>
    </template>
    <template v-else>
      <Loader></Loader>
    </template>
  </Modal>
</template>

