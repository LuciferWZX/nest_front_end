import React, {FC} from "react";
import styles from './index.less'
import {Card} from "@/types/poker/card";
import {PokerIndex, PokerSign} from "@/types/poker/type";

type Types = {
    card:Card
    style?:React.CSSProperties
}
const PokerCard:FC<Types> = ({card,style}) => {
    const {sign,index,show}=card
    const pokerSign = {
        [PokerSign.Heart]:"♥",
        [PokerSign.Diamond]:"♦",
        [PokerSign.Club]:"♣",
        [PokerSign.Spade]:"♠",
    }
    const pokerIndex = {
        [PokerIndex.Ace]:"A",
        [PokerIndex.Two]:"2",
        [PokerIndex.Three]:"3",
        [PokerIndex.Four]:"4",
        [PokerIndex.Five]:"5",
        [PokerIndex.Six]:"6",
        [PokerIndex.Seven]:"7",
        [PokerIndex.Eight]:"8",
        [PokerIndex.Nine]:"9",
        [PokerIndex.Ten]:"10",
        [PokerIndex.Jack]:"J",
        [PokerIndex.Queen]:"Q",
        [PokerIndex.King]:"K",
    }
    return(
        <div className={styles.cardContent} style={style}>
            <div>{pokerSign[sign]}</div>
            <div>{pokerIndex[index]}</div>
        </div>
    )
}
export default PokerCard