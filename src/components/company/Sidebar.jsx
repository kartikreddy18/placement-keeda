import { Logo } from "../Logo"
import { roleState } from "../../atoms/roleState"
import { useRecoilValue, useRecoilState } from "recoil";
import { Profile } from "../../routes/profile";
import { componentState } from "../../atoms/componentState"
import { Drives } from "../../routes/drives";
import { HiOutlineColorSwatch, HiOutlineCreditCard } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa"
import { MdLogout } from "react-icons/md"
import { userState } from "../../atoms/user";
import { tokenState } from "../../atoms/tokenState";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

export const Sidebar = () => {
    const role = useRecoilValue(roleState);
    const [component, setComponent] = useRecoilState(componentState);
    const [user, setUser] = useRecoilState(userState);
    const [token, setToken] = useRecoilState(tokenState);
    const navigate = useNavigate();
    const [image, setImage] = useState("");
    const upload = useRef();
    const uploader = useRef();

    const handleChange = (event) => {
        if (event.target.files.length) {
            setImage(event.target.files[0]);
            setUser({
                ...user,
                image: image
            })
        }
    }

    return (
        <div className="-translate-x-10 -translate-y-10 px-20 min-h-screen bg-gray-900 text-white font-semibold p-10">
            <Logo />
            <div className="mt-8 -ml-10 p-2 grid place-items-center gap-5 select-none" >
                <div className="cursor-pointer group" ref={uploader} onClick={() => {
                    upload.current.click();
                }}>
                    {(image) ? <img src={URL.createObjectURL(image)} alt="" id="image" className="rounded-full w-48 h-48 ml-5 object-cover  ring-4 " />
                        : <FaUserAstronaut className="h-56 w-56 bg-gray-200 p-5 rounded-full text-gray-800 group-hover:bg-gray-300" />}
                    <input type="file" className="hidden" id="upload" onChange={handleChange} ref={upload} />
                </div>
                <h1 className="text-xl " > {user.name} </h1>
            </div>

            <div className="mt-8 ml-2 p-2 space-y-5">
                <div
                    className="flex space-x-2 items-center cursor-pointer"
                    onClick={() => setComponent(<Profile />)}
                >
                    <HiOutlineCreditCard className="h-6 w-6" />
                    <h1>Profile</h1>
                </div>
                <div
                    className="flex space-x-2 items-center cursor-pointer"
                    onClick={() => setComponent(<Drives />)}
                >
                    <HiOutlineColorSwatch className="h-6 w-6" />
                    <h1>Drives</h1>
                </div>
                <div
                    className="flex space-x-2 items-center cursor-pointer"
                    onClick={() => {
                        setToken("");
                        navigate("/")
                    }}
                >
                    <MdLogout className="h-6 w-6" />
                    <h1>Logout</h1>
                </div>
            </div>
        </div>
    );
}