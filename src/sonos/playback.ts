export interface Playback {
    playbackState: string,
    isDucking: boolean,
    positionMillis: number,
    previousPositionMillis: number,
    playModes: PlayModes,
    availablePlaybackActions: AvailablePlaybackActions,
}

export interface PlayModes {
    repeat?: boolean,
    repeatOne?: boolean,
    shuffle?: boolean,
    crossfade?: boolean,
}

export interface AvailablePlaybackActions {
    canSkip: boolean,
    canSkipBack: boolean,
    canSeek: boolean,
    canPause: boolean,
    canStop: boolean,
    canRepeat: boolean,
    canRepeatOne: boolean,
    canCrossfade: false,
    canShuffle: boolean,
}