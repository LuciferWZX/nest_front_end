// @flow
import Rect, {FC} from 'react';
import {Button} from "antd";
import {Socket} from "socket.io-client";
import {useOutletContext,useSnapshot} from "umi";
import {state as userState} from "@/store/user";
type ContextProps={
    client:Socket|null
}

const HomePage: FC = () => {
    const {client}=useOutletContext<ContextProps>()
    const {username,id}=useSnapshot(userState)
    const enterRoom=()=>{
        if (client){
            client.emit("joinRoom",{
                roomId:"sss",
                uid:id
            })
        }
    }
    const leaveRoom=()=>{
        if (client){
            client.emit("leaveRoom",{
                roomId:"sss",
                uid:id
            })
        }
    }
    return (
        <div>
            {username}
            <Button onClick={enterRoom}>进入ROOM</Button>
            <Button onClick={leaveRoom}>离开ROOM</Button>
        </div>
    );
};
export default HomePage