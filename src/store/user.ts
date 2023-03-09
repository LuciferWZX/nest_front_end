import {Random} from "mockjs"
import {proxy} from "umi";
type StateProps={
    id:number
    username:string
}
const initialState:StateProps = {
    id:Random.natural(),
    username:Random.cname()
}
export const state = proxy(initialState)

