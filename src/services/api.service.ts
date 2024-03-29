import { TokenService } from "./token.service";
import AuthService from "./auth.service";
import { genericSonosRequest } from "./firebase.service";
import { households } from "../sonos/household";
import { GroupData } from "../sonos/group";
import { favoritesList } from "../sonos/favorites";
import { PlayModes, Playback } from "../sonos/playback";

const ApiService = {

    async getHousholds(): Promise<households> {
        await AuthService.refreshToken();
        const householdObj = await genericSonosRequest({
            url: '/control/api/v1/households',
            method: "GET",
            accessToken: TokenService.getToken(),
        });
        return <households>householdObj.data;
    },

    async getGroups(household: string): Promise<GroupData> {
        await AuthService.refreshToken();
        const resp = await genericSonosRequest({
            url: `/control/api/v1/households/${household}/groups`,
            method: "GET",
            accessToken: TokenService.getToken(),
        })
        this.validateResponse(resp);
        const data = <GroupData>resp.data;
        return data
    },

    async setPlaybackState(household: string, groupId: string, state: string) {
        await AuthService.refreshToken();
        const resp = await genericSonosRequest({
            url: `/control/api/v1/households/${household}/groups/${groupId}/playback/${state}`,
            method: "POST",
            accessToken: TokenService.getToken(),
        })
        this.validateResponse(resp);
        return resp
    },

    async getGroupMetadata(groupId: string) {
        await AuthService.refreshToken();
        const resp = await genericSonosRequest({
            url: `/control/api/v1/groups/${groupId}/playbackMetadata`,
            method: "GET",
            accessToken: TokenService.getToken(),
        })
        this.validateResponse(resp);
        return resp;
    },

    async getGroupPlayback(groupId: string): Promise<Playback> {
        await AuthService.refreshToken();
        const resp = await genericSonosRequest({
            url: `/control/api/v1/groups/${groupId}/playback`,
            method: "GET",
            accessToken: TokenService.getToken(),
        })
        this.validateResponse(resp);
        return <Playback>resp.data;
    },

    async setPlayModes(groupId: string, playModes: PlayModes) {
        await AuthService.refreshToken();
        const resp = await genericSonosRequest({
            url: `/control/api/v1/groups/${groupId}/playback/playMode`,
            method: "Post",
            body: `{"playModes": ${JSON.stringify(playModes)}}`,
            accessToken: TokenService.getToken(),
        })
        this.validateResponse(resp);
        return <Playback>resp.data;
    },

    async setRelativeVolume(groupId: string, volumeDelta: number) {
        await AuthService.refreshToken();
        const resp = await genericSonosRequest({
            url: `/control/api/v1/groups/${groupId}/groupVolume/relative`,
            method: "POST",
            body: `{"volumeDelta": ${volumeDelta}}`,
            accessToken: TokenService.getToken(),
        })
        this.validateResponse(resp);
        return resp;
    },

    async getFavorites(householdId: string): Promise<favoritesList> {
        await AuthService.refreshToken();
        const resp = await genericSonosRequest({
            url: `/control/api/v1/households/${householdId}/favorites`,
            method: "GET",
            accessToken: TokenService.getToken(),
        })
        this.validateResponse(resp);
        return <favoritesList>resp.data;
    },

    async playFavorite(groupId: string, favoriteId: number) {
        await AuthService.refreshToken();
        const resp = await genericSonosRequest({
            url: `/control/api/v1/groups/${groupId}/favorites`,
            method: "POST",
            body: `{
                "favoriteId": "${favoriteId}",
                "playOnCompletion": true,
                "queueAction": "replace",
                "playModes": {
                    "shuffle": false
                }
            }`,
            accessToken: TokenService.getToken(),
        })
        this.validateResponse(resp);
    },

    async setGroupMembers(groupId: string, playerIds: string[]) {
      await AuthService.refreshToken();
      const resp = await genericSonosRequest({
        url: `/control/api/v1/groups/${groupId}/groups/setGroupMembers`,
        method: "POST",
        body: `{
          "playerIds": [${playerIds.map(i => `"${i}"`).join(',')}]
        }`,
        accessToken: TokenService.getToken(),
      })
      this.validateResponse(resp);
    },

    validateResponse(response: object) {
        if (response['data']['fault']) {
            AuthService.signOut();
        }
    }

}

export default ApiService;
