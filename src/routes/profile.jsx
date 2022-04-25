import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil"
import { userState } from "../atoms/user"
import { tokenState } from "../atoms/tokenState"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

export const Profile = () => {
    const token = useRecoilValue(tokenState);
    const [user, setUser] = useRecoilState(userState);
    const [id, setId] = useState(user._id);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passwd, setPasswd] = useState(user.password);
    const [webLink, setWebLink] = useState(user.webLink);
    const [address, setAddress] = useState(user.address);
    const [contactNo, setContactNo] = useState(user.contactNo);
    const [eye, setEye] = useState(false);

    return (
        <div className="">
            <form action="post" className="grid  space-y-10 mt-10 text-xl font-semibold">
                <div className="grid grid-cols-2 space-x-20">
                    <div className="space-y-10">
                        <div>
                            <p>Id</p>
                            <div className="select-none bg-gray-100 p-2 rounded font-semibold">{id}</div>
                        </div>
                        <div>
                            <p>Name</p>
                            <input type="text" value={name}
                                onChange={e => setName(e.target.value)}
                                className="p-2 rounded font-semibold"
                                required={true}
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <p>Email</p>
                            <input type="email" value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="p-2 rounded font-semibold"
                                required={true}
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <p>Password</p>
                            {
                                (!eye) ?
                                    <div className="flex space-x-2 items-center">
                                        <input type="password" value={passwd}
                                            onChange={e => setPasswd(e.target.value)}
                                            className="p-2 rounded font-semibold"
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
                                            required={true}
                                            autoComplete="off"
                                        />
                                        <HiOutlineEye onClick={() => setEye(false)} className="h-6 w-6 cursor-pointer" />
                                    </div>
                            }

                        </div>
                        <div>
                            <p>WebLink</p>
                            <input type="text" value={webLink}
                                onChange={e => setWebLink([e.target.value])}
                                className="p-2 rounded font-semibold"
                                required={true}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>Address</p>
                            <textarea cols="30" rows="10" value={address}
                                onChange={e => setAddress(e.target.value)}
                                className="p-2 rounded font-semibold"
                                required={true}
                                autoComplete="off"
                            ></textarea>
                        </div>
                        <div>
                            <p>Contact No</p>
                            <input type="text" value={contactNo}
                                onChange={e => setContactNo(e.target.value)}
                                className="p-2 rounded font-semibold"
                                required={true}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 p-5 text-white"
                    onClick={(e) => {
                        e.preventDefault();
                        axios.put(`http://localhost:8080/api/cmpny/${id}`, {
                            name: name,
                            email: email,
                            password: passwd,
                            address: address,
                            webLink: webLink,
                            contactNo: contactNo
                        }).then(res => {
                            if (res.data && res.status === 200) {
                                setUser({
                                    ...res.data,
                                    password: passwd
                                });
                                toast.success("User Details Successfully Updated :)");
                            }
                            else
                                toast.error("Cannot Update the User :(")
                        }).catch(error => {
                            console.error(error)
                        })
                    }}
                >Save</button>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </form>
        </div>
    );
}