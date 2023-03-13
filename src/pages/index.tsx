// @flow
import React, {FC} from 'react';
import {Avatar, Button, Space} from "antd";
import {Socket} from "socket.io-client";
import {useOutletContext, useSnapshot} from "umi";
import {actions, state as userState} from "@/store/user";
import {Player, PlayerStatus} from "@/layouts/types";

type ContextProps={
    client:Socket|null
}
const ROOM="room1"
const HomePage: FC = () => {
    const {client}=useOutletContext<ContextProps>()
    const {username,id,players}=useSnapshot(userState)
    const enterRoom=()=>{
        if (client){
            client.emit("joinRoom",{
                roomId:ROOM,
                uid:id
            })
        }
    }
    const leaveRoom=()=>{
        if (client){
            client.emit("leaveRoom",{
                roomId:ROOM,
                uid:id
            })
            actions.leaveRoom()
        }
    }
    const prepare=()=>{
        if (client){
            client.emit("prepare")
        }
    }
    return (
        <div>
            {username}
            <Button onClick={enterRoom}>进入ROOM</Button>
            <Button onClick={leaveRoom}>离开ROOM</Button>
            <Button onClick={prepare}>准备</Button>
            <div>
                <Space wrap={true}>
                    {players.map(player=>{
                        return(
                            <UserBox player={player} key={player.uid} />
                        )
                    })}
                </Space>
            </div>
        </div>
    );
};
type PlayerBox = {
    player:Player

}
const UserBox:FC<PlayerBox> = (props) => {
    const {player} = props
    return(
        <div style={{height:200,width:200,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Avatar key={player.uid} shape={"square"} src={player.uid} style={{background:player.isLeave?"grey":"green"}} />
            <div>{player.username}</div>
            <div>{player.status === PlayerStatus.ready?"已准备":"准备"}</div>
        </div>
    )
}
export default HomePage