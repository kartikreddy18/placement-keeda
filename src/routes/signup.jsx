import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { roleState } from "../atoms/roleState"
import { useRecoilValue, useRecoilState } from "recoil"
import { userState } from "../atoms/user"
import axios from "axios"
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

export const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");
    const [webLink, setWebLink] = useState([]);
    const [address, setAddress] = useState("");
    const [contactNo, setContactNo] = useState("");
    const role = useRecoilValue(roleState);
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userState);
    const [eye, setEye] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const baseUrl = "http://localhost:8080"
        await axios.post(`${baseUrl}/api/${role}`, {
            name: name,
            email: email,
            password: passwd,
            address: address,
            webLink: webLink,
            contactNo: contactNo
        }).then(res => {
            if (res.data) {
                setUser({
                    ...res.data,
                    password: passwd
                });
                console.log(res.data, user);
                navigate('/login');
            }
            return res
        }).catch(res => {
            if (res.status !== 200)
                toast.error(`${role} Already Exist!`)
        })
    }

    return (
        <div className="bg-gray-200 w-full min-h-screen p-10">
            <div className="leaf shadow-2xl">
                <Link to="/">
                    <h1 role="link" className="leaf text-2xl font-semibold p-2">Placement Keeda</h1>
                </Link>
            </div>
            <form action="post" className="mt-10 grid mx-10">
                <div className="grid grid-cols-2">
                    <div className="space-y-2">
                        <h1 className="p-1 font-semibold">Name</h1>
                        <input type="text" placeholder="Name"
                            className="p-2 rounded text-gray-800 text-lg font-semibold"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required={true}
                            autoComplete="off"
                        />

                        <h1 className="p-1 font-semibold">Email</h1>
                        <input type="email" placeholder="Email"
                            className="p-2 rounded text-gray-800 text-lg font-semibold"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required={true}
                            autoComplete="off"
                        />
                        <div>
                            <h1 className="p-1 font-semibold">Password</h1>
                            {
                                (!eye) ?
                                    <div className="flex space-x-2 items-center">
                                        <input type="password" value={passwd}
                                            onChange={e => setPasswd(e.target.value)}
                                            className="p-2 rounded font-semibold"
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
                                            className="p-2 rounded font-semibold"
                                            placeholder="Password"
                                            required={true}
                                            autoComplete="off"
                                        />
                                        <HiOutlineEye onClick={() => setEye(false)} className="h-6 w-6 cursor-pointer" />
                                    </div>
                            }

                        </div>
                        <h1 className="p-1 font-semibold">WebLink</h1>
                        <input type="url" placeholder="WebLink"
                            className="p-2 rounded text-gray-800 text-lg font-semibold"
                            value={webLink}
                            onChange={e => setWebLink([e.target.value])}
                            required={true}
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <textarea cols="30" rows="10"
                            placeholder="Address"
                            className="p-1 mt-10 font-semibold"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            required={true}
                            autoComplete="off"
                        ></textarea>
                        <h1 className="p-1 font-semibold">Contact No</h1>
                        <input type="text" placeholder="Contact No"
                            className="p-2 rounded text-gray-800 text-lg font-semibold"
                            value={contactNo}
                            onChange={e => setContactNo(e.target.value)}
                            required={true}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <button
                    className="p-5 bg-blue-500 rounded mt-5 font-semibold"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Sign Up
                </button>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </form>
            <Link to="/login">
                <h1 className="w-full grid place-items-center mt-10 font-semibold hover:text-gray-800" role="link">Already have an Account?</h1>
            </Link>
        </div>
    );
}