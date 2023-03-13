// @flow
import React, {FC} from 'react';
import {Avatar, Button, Space} from "antd";
import {Socket} from "socket.io-client";
import {useOutletContext, useSnapshot} from "umi";
import {actions, state as userState} from "@/store/user";
import {Player, PlayerStatus} from "@/layouts/types";
import InRoom from "@/pages/inRoom";
import OutRoom from "@/pages/outRoom";

export type ContextProps={
    client:Socket|null
}
export const ROOM="room1"
const HomePage: FC = () => {

    const {username,id,players,inRoom}=useSnapshot(userState)


    if (inRoom){
        return (
            <InRoom />
        )
    }
    return (
        <OutRoom/>
    )
};


export default HomePage