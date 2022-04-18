import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil"
import { roleState } from "../atoms/roleState"
import toast, { Toaster } from 'react-hot-toast';
import { userState } from "../atoms/user"
import { tokenState } from "../atoms/tokenState"
import axios from "axios";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");
    const role = useRecoilValue(roleState);
    const [token, setToken] = useRecoilState(tokenState);
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userState);
    const [eye, setEye] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:8080/api/log${role}`, {
            email: email,
            password: passwd
        }).then(res => {
            if (res.data && res.status === 200) {
                setToken(res.data);
                currUser(res.data)
            }
            else
                toast.error("Invalid Email or Password!")
        }).catch(error => {
            console.error(error);
        })
    }

    const currUser = async (token) => {
        await axios.get(`http://localhost:8080/api/log${role}/me`, {
            headers: {
                "x-auth-token": token
            }
        }).then(res => {
            if (res.status === 200) {
                localStorage.setItem(`${role}`, JSON.stringify(res.data))
                setUser({
                    ...res.data,
                    password: passwd
                })
                navigate(`/${role}`);
            }
            else
                toast.error(`Access Denied. No token provided for ${role}`)

        }).catch(error => console.error(error))
    }

    return (
        <div className="bg-gray-200 w-full min-h-screen grid place-items-center">
            <div className="bg-gray-900 w-96 h-[30rem] rounded text-white shadow-2xl shadow-gray-800  grid place-items-center relative">
                <div className="leaf absolute -top-8 shadow-2xl">
                    <Link to="/">
                        <h1 className="text-white text-2xl font-semibold" role="link"><span className="text-gray-800">Placement</span> Keeda</h1>
                    </Link>
                </div>
                <div>
                    <form action="post" className="grid place-items-center ">
                        <div>
                            <h1 className="p-1 font-semibold">Email</h1>
                            <input type="email" placeholder="Email"
                                className="p-2 rounded text-gray-800 text-lg font-semibold"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required={true}
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <h1 className="p-1 font-semibold">Password</h1>
                            {
                                (!eye) ?
                                    <div className="flex space-x-2 items-center">
                                        <input type="password" value={passwd}
                                            onChange={e => setPasswd(e.target.value)}
                                            className="p-2 rounded font-semibold text-gray-800"
                                            placeholder="Password"
                                            required={true}
                                            autoComplete="off"
                                        />
                                        <HiOutlineEyeOff onClick={() => setEye(true)} className="h-6 w-6 cursor-pointer" />
                                    </div>
                                    :
                                    <div className="flex space-x-2 items-center">
                                        <input type="text" value={passwd}
                                            onChange={e => setPasswd(e.target.value)}
                                            className="p-2 rounded font-semibold text-gray-800"
                                            placeholder="Password"
                                            required={true}
                                            autoComplete="off"
                                        />
                                        <HiOutlineEye onClick={() => setEye(false)} className="h-6 w-6 cursor-pointer" />
                                    </div>
                            }

                        </div>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="p-5 bg-blue-500 rounded mt-5 font-semibold" >
                            Login
                        </button>
                        <Toaster
                            position="top-center"
                            reverseOrder={false}
                        />
                    </form>
                    <div className="grid place-items-center translate-y-10 hover:text-white text-gray-200">
                        <Link to="/signup">
                            <h1 role="link">
                                Create an Account
                            </h1>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
