import {Random} from "mockjs"
import {proxy} from "umi";
import {Player} from "@/layouts/types";
type StateProps={
    id:number
    username:string
    players: Player[] //所有玩家
    round:number,//回合数
}
type StateActions={
    leaveRoom:()=>void
}
const initialState:StateProps = {
    id:Random.natural(),
    username:Random.cname(),
    players: [],//所有玩家
    round:1,//回合数
}
export const actions:StateActions= {
    leaveRoom:()=>{
        state.players = initialState.players
        state.round = initialState.round
    }
}
export const state = proxy(initialState)


