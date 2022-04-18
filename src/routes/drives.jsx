import { Card } from "../components/card";
import axios from "axios"
import { useState } from "react"
import {
    AiFillPlusCircle,
    AiOutlinePlusCircle
} from "react-icons/ai"

export const CreateDrive = () => {
    return(
        <div className="">
            <form action="" method="post">
                This is a form!
            </form>
        </div>
    );
}

export const Drives = () => {
    const [drives, setDrives] = useState(() => {
        axios.get("https://localhost:8080/api/drive")
            .then(res => {
                return res.data
            })
    });
    console.log(drives)
    return (
        <div className="grid grid-cols-2 gap-x-20 gap-y-10 p-5 -translate-x-32 w-full">
            {(drives) ? <Card /> : ""}
            <div className="w-96 h-96 border-dashed rounded-sm border-green-500 p-2 border-2 grid place-items-center cursor-pointer" onClick={CreateDrive}>
                <AiFillPlusCircle className="w-24 h-24 text-green-500" />
            </div>

        </div>
    );
}