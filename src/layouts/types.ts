export enum PlayerStatus {
    unReady,
    ready,
}
export interface Player {
    uid: string;
    username: string;
    status: PlayerStatus;
    isLeave: boolean; //是否离开
    score: 0;
}