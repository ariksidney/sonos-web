<script lang="ts">
import ApiService from '../services/api.service';
import Alert from './Alert.vue';
import Loader from './Loader.vue';
import Navigation from './Navigation.vue';
import SonosGroup from './SonosGroup.vue';
import { Group } from '../sonos/group';

export default {
  components: { Navigation, SonosGroup, Loader, Alert },
  name: 'Overview',
  data() {
    return {
      selectedHousehold: '',
      groups: [] as Array<Group>,
      loading: false,
    }
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
    async getHousehold() {
      const households = (await ApiService.getHousholds()).households
      if (households.length != 0) {
        this.selectedHousehold = households[0].id
        localStorage.setItem('selectedHousehold', this.selectedHousehold)
      }
    },
    visibilityChange(e) {
      if (document.visibilityState === 'visible') {
        console.log('visible!', document.visibilityState);
        this.loadGroups();
      }
    }
  },
}

</script>

<template>
  <div class="flex flex-col md:flex-row">
    <navigation></navigation>
    <main class="text-slate-900 dark:text-white w-full pr-4 pl-4 pb-4 md:p-4">
      <div v-if="loading">
        <loader></loader>
      </div>
      <div v-else>
        <SonosGroup v-for="group in this.groups" :key="group.id" :group="group"
          :selectedHoushold="this.selectedHousehold" />
        <div v-if="!this.groups.length" class="m-6">
          No Sonos speakers found
        </div>
        <button @click="loadGroups()"
          class="h-10 px-6 font-semibold rounded-full bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white shadow-md"
          type="button">Refresh Groups</button>
      </div>
    </main>
  </div>
</template>
