import { Sidebar } from "../components/company/Sidebar";
import { roleState } from "../atoms/roleState";
import { useRecoilValue } from "recoil";
import { componentState } from "../atoms/componentState";

export const Student = () => {
    const role = useRecoilValue(roleState);
    const component = useRecoilValue(componentState);
    return (
        <div className="flex p-10 justify-between bg-gray-200 h-screen overflow-hidden space-x-52">
            <Sidebar />
            <div className="-translate-x-[10rem] scrollbar-hide overflow-y-scroll">
                {component}
            </div>
        </div>
    );
}