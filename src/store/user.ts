import {Random} from "mockjs"
import {proxyWithComputed} from "umi";
import {Player, PlayerStatus} from "@/layouts/types";
type StateProps={
    id:string
    username:string
    players: Player[] //所有玩家
    round:number,//回合数
    inRoom:boolean,//是否在房间里
}
type ComputedStateProps={
    player:Player
}
type StateActions={
    leaveRoom:()=>void
}
const initialState:StateProps = {
    id:Random.natural().toString(),
    username:Random.cname(),
    players: [],//所有玩家
    round:1,//回合数
    inRoom:false //是否在房间里
}
export const actions:StateActions= {
    leaveRoom:()=>{
        state.players = initialState.players
        state.round = initialState.round
    }
}

export const state = proxyWithComputed<StateProps,ComputedStateProps>(initialState,{

    player:(_state): Player=>{
        const initPlayer:Player = {
            uid:_state.id.toString(),
            username:_state.username,
            status:PlayerStatus.unReady,
            isLeave:false,
            score:0,
            cards:[]
        }

        return _state.players.find(player=>player.uid === _state.id.toString()) as Player ?? initPlayer
    }
})


