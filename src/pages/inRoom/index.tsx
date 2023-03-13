import React,{FC} from "react";
import {Avatar, Button, Space} from "antd";
import {useOutletContext, useSnapshot} from "@@/exports";
import {actions, state as userState} from "@/store/user";
import {ContextProps, ROOM} from "@/pages";
import {Player, PlayerStatus} from "@/layouts/types";
import PokerCard from "@/components/pokerCard";

const InRoom:FC = () => {
    const {client}=useOutletContext<ContextProps>()
    const {username,id,players}=useSnapshot(userState)
    const leaveRoom=()=>{
        if (client){
            client.emit("leaveRoom",{
                roomId:ROOM,
                uid:id
            })
            actions.leaveRoom()
            userState.inRoom = false
        }
    }
    const prepare=()=>{
        if (client){
            client.emit("prepare")
        }
    }
    return(
        <div>
            {username}

            <Button onClick={leaveRoom}>离开ROOM</Button>
            <Button onClick={prepare}>准备</Button>
            <div>
                <Space wrap={true}>
                    {players.map(player=>{
                        return(
                            <UserBox player={player as Player} key={player.uid} />
                        )
                    })}
                </Space>
            </div>
        </div>
    )
}
type PlayerBox = {
    player:Player

}
const UserBox:FC<PlayerBox> = (props) => {
    const {player} = props

    return(
        <div style={{height:100,width:100,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div>
                <Avatar key={player.uid} shape={"square"} src={player.uid} style={{background:player.isLeave?"grey":"green"}} />
                <div>{player.username}</div>
                <div>{player.status === PlayerStatus.ready?"已准备":"准备"}</div>
                <div style={{position:"relative"}}>
                    {player.cards.map((card,index)=>
                    <PokerCard style={{position:"absolute",left:0+index*20}} key={index} card={card}/>)}
                </div>
            </div>
        </div>
    )
}
export default InRoom