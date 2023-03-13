import {useState} from "react";
import {useIsomorphicLayoutEffect} from "ahooks";
import io, {Socket} from "socket.io-client"
import {state as userState} from "@/store/user"
import {Player} from "@/layouts/types";
const useWebsocket = () => {
    const [websocket,setWebsocket]=useState<Socket|null>(null)
    useIsomorphicLayoutEffect(()=>{
        console.log("进行链接")
        const socket = io("http://localhost:80/poker",{
            transports: ["websocket", "polling"],
            auth:{
                uid:userState.id.toString(),
                username:userState.username
            }
        })
        socket.on("connect", () => {
            console.log(userState.id); // x8WIv7-mJelg7on_ALbx
            console.log(socket.id); // x8WIv7-mJelg7on_ALbx
        });
        socket.on("message", (message) => {
            console.log(message);
        });
        //准备
        socket.on("prepare", (payload:{player: Player, players: Player[] }) => {
            const {player,players}=payload
            console.log("准备Player：",player.username,players);
            userState.players=players
        });
        //进入房间
        socket.on("joinRoom", (payload:{player: Player, players: Player[],round:number }) => {
            const {player,players,round}=payload
            console.log("进入房间的player：",player.username);
            //更新状态
            userState.players=players
            userState.round = round
        });
        //离开房间
        socket.on("leaveRoom", (payload:{player:Player,players:Player[]}) => {
            const {player,players}=payload
            console.log("离开房间的player：",player.username);
            //更新状态
            userState.players=players

        });
        socket.on("sendCards",(payload:{players:Player[]})=>{
            console.log("收到发牌：",payload.players)
            const {players}=payload

            userState.players=players.map(player=>{
                player.cards.sort((a,b)=>a.index-b.index)
                return player
            })
        })
        socket.on("disconnect", () => {
            console.log(socket.id); // undefined
        });
        setWebsocket(socket)
        return ()=>{
            if (websocket){
                websocket.disconnect()
                websocket.close()
            }
            setWebsocket(null)
        }
    },[])
    return {
        websocket
    }
}
export default useWebsocket