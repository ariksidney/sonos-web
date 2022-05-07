export interface Id {
    serviceId: string;
    objectId: string;
    accountId: string;
}

export interface Service {
    name: string;
    id: string;
    images: any[];
}

export interface Image {
    url: string;
    height: number;
    width: number;
}

export interface Container2 {
    name: string;
    type: string;
    id: Id;
    service: Service;
    imageUrl: string;
    images: Image[];
    explicit: boolean;
}

export interface Image2 {
    url: string;
    height: number;
    width: number;
}

export interface Album {
    name: string;
    explicit: boolean;
}

export interface Artist {
    name: string;
    explicit: boolean;
}

export interface Id2 {
    serviceId: string;
    objectId: string;
    accountId: string;
}

export interface Service2 {
    name: string;
    id: string;
    images: any[];
}

export interface Quality {
    bitDepth: number;
    sampleRate: number;
    lossless: boolean;
    immersive: boolean;
}

export interface Track {
    type: string;
    name: string;
    imageUrl: string;
    images: Image2[];
    album: Album;
    artist: Artist;
    id: Id2;
    service: Service2;
    durationMillis: number;
    explicit: boolean;
    advertisement: boolean;
    quality: Quality;
}

export interface Policies {
    canSkip: boolean;
    canSkipBack: boolean;
    limitedSkips: boolean;
    canSeek: boolean;
    canSkipToItem: boolean;
    canRepeat: boolean;
    canRepeatOne: boolean;
    canCrossfade: boolean;
    canShuffle: boolean;
    canResume: boolean;
    pauseAtEndOfQueue: boolean;
    refreshAuthWhilePaused: boolean;
    showNNextTracks: number;
    showNPreviousTracks: number;
    isVisible: boolean;
    notifyUserIntent: boolean;
    pauseTtlSec: number;
    playTtlSec: number;
    pauseOnDuck: boolean;
    skipsRemaining: number;
}

export interface CurrentItem {
    track: Track;
    deleted: boolean;
    policies: Policies;
}

export interface Image3 {
    url: string;
    height: number;
    width: number;
}

export interface Album2 {
    name: string;
    explicit: boolean;
}

export interface Artist2 {
    name: string;
    explicit: boolean;
}

export interface Id3 {
    serviceId: string;
    objectId: string;
    accountId: string;
}

export interface Service3 {
    name: string;
    id: string;
    images: any[];
}

export interface Quality2 {
    bitDepth: number;
    sampleRate: number;
    lossless: boolean;
    immersive: boolean;
}

export interface Track2 {
    type: string;
    name: string;
    imageUrl: string;
    images: Image3[];
    album: Album2;
    artist: Artist2;
    id: Id3;
    service: Service3;
    durationMillis: number;
    explicit: boolean;
    advertisement: boolean;
    quality: Quality2;
}

export interface Policies2 {
    canSkip: boolean;
    canSkipBack: boolean;
    limitedSkips: boolean;
    canSeek: boolean;
    canSkipToItem: boolean;
    canRepeat: boolean;
    canRepeatOne: boolean;
    canCrossfade: boolean;
    canShuffle: boolean;
    canResume: boolean;
    pauseAtEndOfQueue: boolean;
    refreshAuthWhilePaused: boolean;
    showNNextTracks: number;
    showNPreviousTracks: number;
    isVisible: boolean;
    notifyUserIntent: boolean;
    pauseTtlSec: number;
    playTtlSec: number;
    pauseOnDuck: boolean;
    skipsRemaining: number;
}

export interface NextItem {
    track: Track2;
    deleted: boolean;
    policies: Policies2;
}

export interface Container {
    container: Container2;
    currentItem: CurrentItem;
    nextItem: NextItem;
}

export interface Group {
    id: string;
    name: string;
    coordinatorId: string;
    playbackState: string;
    playerIds: string[];
    container: Container;
}

export interface Player {
    id: string;
    name: string;
    websocketUrl: string;
    softwareVersion: string;
    apiVersion: string;
    minApiVersion: string;
    isUnregistered: boolean;
    capabilities: string[];
    deviceIds: string[];
}

export interface GroupData {
    groups: Group[];
    players: Player[];
    partial: boolean;
}


