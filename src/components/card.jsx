
export const Card = ({ _id, title, percentage, endDate, jobDescript, branch, gap, ctc, loc, batchYear, applyLink, handleUpdate, handleDelete }) => {
    return (
        <div className="w-96 bg-gray-900 space-y-5 text-white p-2 h-[30rem] overflow-y-scroll scrollbar-hide rounded shadow-2xl cursor-pointer">
            <div className="space-y-5 flex flex-col items-center pt-10" onClick={() => handleUpdate(_id, title, percentage, endDate, jobDescript, branch, gap, ctc, loc, batchYear, applyLink)}>
                <h1 className="font-semibold relative border-b-2 border-double border-b-green-500 before:content-[''] before:border-double before:border-b-2 before:absolute before:-bottom-2 rounded before:border-b-green-500 before:left-2 before:w-full">{title}</h1>
                <p className="text-gray-300 mx-auto px-2 text-center">{jobDescript}</p>
                <div className="grid place-items-center font-semibold space-x-3">
                    <p className="mx-auto text-center">{branch}</p>
                    {/* <p className="text-xl -translate-y-1">|</p> */}
                    <p>Gap: {gap}</p>
                </div>
                <p>Eligibility Criteria: {percentage}%</p>
                <p>LastDate: {endDate.slice(0, 10)}</p>
                <div className="grid place-items-center font-semibold space-x-3">
                    <p>CTC: {ctc} LPA</p>
                    {/* <p className="text-xl -translate-y-1">|</p> */}
                    <p>{loc}</p>
                </div>
                <div className="grid place-items-center font-semibold space-x-3">
                    <p>{batchYear}</p>
                    {/* <p className="text-xl -translate-y-1">|</p> */}
                    <p className="text-blue-500">
                        <a href={applyLink}>{applyLink}</a>
                    </p>
                </div>
            </div>
            <div className="w-full flex justify-end -translate-y-3">
                <button className="bg-red-500 p-5 font-semibold text-xl rounded text-gray-200 hover:bg-red-600" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}