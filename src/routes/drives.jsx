import axios from "axios"
import { useState } from "react"
import {
    AiFillPlusCircle,
} from "react-icons/ai"
import { useRecoilValue } from "recoil"
import { userState } from "../atoms/user"
import { Toaster } from "react-hot-toast";
import { CardList } from "../components/CardList";

export const CreateDrive = ({ setShowForm, driveDetails, isUpdate }) => {
    const user = useRecoilValue(userState);
    const [title, setTitle] = useState(driveDetails.title);
    const [percentage, setPercentage] = useState(driveDetails.percentage);
    const [endDate, setEndDate] = useState(driveDetails.endDate);
    const [jobDescription, setJobDescription] = useState(driveDetails.jobDescription);
    const [branch, setBranch] = useState(driveDetails.branch);  //
    const [gap, setGap] = useState(driveDetails.gap);
    const [ctc, setCtc] = useState(driveDetails.ctc);
    const [loc, setLoc] = useState(driveDetails.loc);
    const [batchYear, setBatchYear] = useState(driveDetails.batchYear);
    const [applyLink, setApplyLink] = useState(driveDetails.applyLink);
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/api/drive", {
            title: title,
            companyId: user._id,
            percentage: percentage,
            endDate: endDate,
            jobDescript: jobDescription,
            branch: branch,
            gap: gap,
            ctc: ctc,
            loc: loc,
            batchYear: batchYear,
            applyLink: applyLink
        }).then(res => {
            if (res.status === 200) {
                setShowForm(false);
            }
        }).catch(error => console.error(error))
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        await axios.put(`http://localhost:8080/api/drive/${driveDetails._id}`, {
            title: title,
            percentage: percentage,
            endDate: endDate,
            jobDescript: jobDescription,
            branch: branch,
            gap: gap,
            ctc: ctc,
            loc: loc,
            batchYear: batchYear,
            applyLink: applyLink
        }).then(res => {
            if (res.status === 200) {
                setShowForm(false);
            }
        }).catch(error => console.error(error))
    }

    return (
        <div className="bg-[#1F2937] w-full minh-full text-white px-10 py-5 rounded">
            <div className="flex space-x-2">
                <div className="circle3 max-w-[50px] max-h-[50px]" />
                <div className="circle2 max-w-[50px] max-h-[50px]" />
                <div className="circle max-w-[50px] max-h-[50px]" />
            </div>
            <form action="" method="post" className="w-full">
                <div className="mt-5 flex justify-between">
                    <div className="grid space-y-5">
                        <div className="flex space-x-5 items-center">
                            <p className="font-semibold text-xl">Title: </p>
                            <input type="text" className="p-2 rounded text-gray-900 font-semibold text-xl" required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="flex space-x-5 items-center">
                            <p className="font-semibold text-xl">Percentage: </p>
                            <input type="number" className="p-2 rounded text-gray-900 font-semibold text-xl" required
                                value={percentage}
                                onChange={(e) => setPercentage(e.target.value)}
                            />
                        </div>
                        <div className="flex space-x-5 items-center">
                            <p className="font-semibold text-xl">End Date: </p>
                            <input type="date" className="p-2 rounded text-gray-900 font-semibold text-xl" required
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <div className="flex space-x-5 items-center">
                            <p className="font-semibold text-xl">Branch: </p>
                            <input type="text" className="p-2 rounded text-gray-900 font-semibold text-xl" required
                                value={branch}
                                onChange={(e) => setBranch([e.target.value])}
                            />
                        </div>
                        <div className="flex space-x-5 items-center">
                            <p className="font-semibold text-xl">Job Description: </p>
                            <textarea className="p-2 rounded text-gray-900 font-semibold text-xl" required
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid space-y-5">
                        <div className="flex space-x-5 items-center">
                            <p className="font-semibold text-xl">Gap: </p>
                            <input type="text" className="p-2 rounded text-gray-900 font-semibold text-xl" required
                                value={gap}
                                onChange={(e) => setGap(e.target.value)}
                            />
                        </div>
                        <div className="flex space-x-5 items-center">
                            <p className="font-semibold text-xl">CTC: </p>
                            <input type="text" className="p-2 rounded text-gray-900 font-semibold text-xl" required
                                value={ctc}
                                onChange={(e) => setCtc(e.target.value)}
                            />
                        </div>
                        <div className="flex space-x-5 items-center">
                            <p className="font-semibold text-xl">Location: </p>
                            <input type="text" className="p-2 rounded text-gray-900 font-semibold text-xl" required
                                value={loc}
                                onChange={(e) => setLoc(e.target.value)}
                            />
                        </div>
                        <div className="flex space-x-5 items-center">
                            <p className="font-semibold text-xl">Batch Year: </p>
                            <input type="text" className="p-2 rounded text-gray-900 font-semibold text-xl" required
                                value={batchYear}
                                onChange={(e) => setBatchYear(e.target.value)}
                            />
                        </div>
                        <div className="flex space-x-5 items-center">
                            <p className="font-semibold text-xl">Apply Link: </p>
                            <input type="url" className="p-2 rounded text-gray-900 font-semibold text-xl" required
                                value={applyLink}
                                onChange={(e) => setApplyLink(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full mt-10 flex justify-end">
                    <button type="submit" className="bg-blue-500 p-5 font-semibold text-xl rounded text-gray-200" onClick={(isUpdate) ? handleUpdate : handleSubmit}>Create Drive</button>
                </div>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </form>
        </div>
    );
}

export const Drives = () => {
    return (
        <div className="space-y-10">
            <CardList />
        </div>
    );
}