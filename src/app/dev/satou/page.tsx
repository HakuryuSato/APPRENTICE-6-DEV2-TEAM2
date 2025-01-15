'use client'
"use client";
import { CountDown } from "@/components/game/GamePage/CountDown";



export default function SatouPage() {
    const handleComplete = ()=>{
        console.log('カウントダウン終了後に呼ばれる')
    }
    return <CountDown seconds={5} onZero={handleComplete} />;
}
