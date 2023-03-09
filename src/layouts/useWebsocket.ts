import {useState} from "react";
import {useIsomorphicLayoutEffect} from "ahooks";
import io, {Socket} from "socket.io-client"
import {state as userState} from "@/store/user"
const useWebsocket = () => {
    const [websocket,setWebsocket]=useState<Socket|null>(null)
    useIsomorphicLayoutEffect(()=>{
        console.log("进行链接")
        const socket = io("http://localhost:80/poker",{
            transports: ["websocket", "polling"],
            auth:{
                uid:userState.id.toString()
            }
        })
        socket.on("connect", () => {
            console.log(userState.id); // x8WIv7-mJelg7on_ALbx
            console.log(socket.id); // x8WIv7-mJelg7on_ALbx
        });
        socket.on("message", (message) => {
            console.log(message);
        });
        socket.on("rooms-group", (rooms) => {
            console.log(rooms);
        });
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