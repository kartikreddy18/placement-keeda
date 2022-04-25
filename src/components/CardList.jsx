import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../components/card"
import { userState } from "../atoms/user"
import { useRecoilValue } from "recoil";
import { CreateDrive } from "../routes/drives";
import { AiFillPlusCircle } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

export const CardList = () => {
    const [drives, setDrives] = useState([])
    const company = useRecoilValue(userState);
    const [showForm, setShowForm] = useState(false);
    const [drive, setDrive] = useState({})
    const [isUpdate, setISUpdate] = useState(false);
    useEffect(() => {
        getDrives();
    }, [drives])
    const getDrives = async () => {
        try {
            const drives = await axios.get("http://localhost:8080/api/drive")
            if (drives.status === 200) {
                const drivesList = drives.data.filter(drive => {
                    if (drive.cmpny._id === company._id)
                        return drive
                });
                setDrives(drivesList)
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    const handleDelete = async (_id) => {
        await axios.delete(`http://localhost:8080/api/drive/${_id}`)
            .then(res => {
                if (res.status === 200) {
                    toast.success(`Drive ${res.data.title} is deleted successfully!`);
                }
            }).catch(error => console.error(error))
    }
    const handleUpdate = (_id, title, percentage, endDate, jobDescript, branch, gap, ctc, loc, batchYear, applyLink) => {
        const driveDetails = {
            _id: _id,
            title: title,
            percentage: percentage,
            endDate: endDate.slice(0, 10),
            jobDescription: jobDescript,
            branch: branch,
            gap: gap,
            ctc: ctc,
            loc: loc,
            batchYear: batchYear,
            applyLink: applyLink
        }
        setDrive(driveDetails)
        setISUpdate(true)
        setShowForm(true)
    }
    return (
        <>
            <div className="grid grid-cols-2 gap-10">
                {
                    drives.map(({ _id, title, percentage, endDate, jobDescript, branch, gap, ctc, loc, batchYear, applyLink }) => {
                        return (
                            <Card
                                key={_id}
                                _id={_id}
                                title={title}
                                percentage={percentage}
                                endDate={endDate}
                                jobDescript={jobDescript}
                                branch={branch}
                                gap={gap}
                                ctc={ctc}
                                loc={loc}
                                batchYear={batchYear}
                                applyLink={applyLink}
                                handleUpdate={() => handleUpdate(_id, title, percentage, endDate, jobDescript, branch, gap, ctc, loc, batchYear, applyLink)}
                                handleDelete={() => handleDelete(_id)}
                            />
                        );
                    })
                }
                <div className="w-96 h-[30rem] border-dashed rounded-sm border-green-500 p-2 border-2 grid place-items-center cursor-pointer" onClick={() => {
                    setDrive({
                        _id: "",
                        title: "",
                        percentage: 0,
                        endDate: "",
                        jobDescription: "",
                        branch: [],
                        gap: "",
                        ctc: "",
                        loc: "",
                        batchYear: "",
                        applyLink: ""
                    })
                    setShowForm(true);
                    setISUpdate(false);
                }}>
                    <AiFillPlusCircle className="w-24 h-24 text-green-500" />
                </div>
            </div>

            {
                (showForm) ? <div className="backdrop-blur p-2 w-[50.5rem] min-h-screen -top-10 absolute"><CreateDrive setShowForm={setShowForm} driveDetails={drive} isUpdate={isUpdate} /></div> : ""
            }
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    );
}
