import React,{FC} from "react";
import {Button} from "antd";
import {state as userState} from "@/store/user";
import {useOutletContext, useSnapshot} from "@@/exports";
import { ContextProps, ROOM } from "..";
import styles from './index.less'
const OutRoom:FC = () => {
    const {client}=useOutletContext<ContextProps>()
    const {id}=useSnapshot(userState)
    const enterRoom=()=>{
        if (client){
            client.emit("joinRoom",{
                roomId:ROOM,
                uid:id
            })
            userState.inRoom = true
        }
    }
    return(
        <div className={styles.outRoomBox}>
            <Button onClick={enterRoom}>进入房间</Button>
        </div>
    )
}
export default OutRoom