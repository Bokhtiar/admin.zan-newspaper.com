export const SkeletonTable = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <table className="w-full h-full border-collapse">
                <tbody className="w-full h-full flex flex-col justify-center space-y-4">
                    <tr className="flex justify-center space-x-4">
                        <td className="animate-pulse rounded-full bg-slate-200 h-4 w-60 p-4"></td>
                        <td className="animate-pulse rounded-full bg-slate-200 h-4 w-60 p-4"></td>
                        <td className="animate-pulse rounded-full bg-slate-200 h-4 w-60 p-4"></td>
                        <td className="animate-pulse rounded-full bg-slate-200 h-4 w-60 p-4"></td>
                    </tr>
                    <tr className="flex justify-center space-x-4">
                        <td className="animate-pulse rounded-full bg-slate-200 h-4 w-60 p-4"></td>
                        <td className="animate-pulse rounded-full bg-slate-200 h-4 w-60 p-4"></td>
                        <td className="animate-pulse rounded-full bg-slate-200 h-4 w-60 p-4"></td>
                        <td className="animate-pulse rounded-full bg-slate-200 h-4 w-60 p-4"></td>
                    </tr>
                    <tr className="flex justify-center space-x-4">
                        <td className="animate-pulse rounded-full bg-slate-200 h-4 w-60 p-4"></td>
                        <td className="animate-pulse rounded-full bg-slate-200 h-4 w-60 p-4"></td>
                        <td className="animate-pulse rounded-full bg-slate-200 h-4 w-60 p-4"></td>
                        <td className="animate-pulse rounded-full bg-slate-200 h-4 w-60 p-4"></td>
                    </tr>
                    <tr className="flex justify-center space-x-4">
                        <td className="animate-pulse rounded-full bg-slate-200 h-4 w-60 p-4"></td>
                        <td className="animate-pulse rounded-full bg-slate-200 h-4 w-60 p-4"></td>
                        <td className="animate-pulse rounded-full bg-slate-200 h-4 w-60 p-4"></td>
                        <td className="animate-pulse rounded-full bg-slate-200 h-4 w-60 p-4"></td>
                    </tr>
                    <tr className="flex justify-center space-x-4">
                        <td className="animate-pulse rounded-full bg-slate-200 h-4 w-60 p-4"></td>
                        <td className="animate-pulse rounded-full bg-slate-200 h-4 w-60 p-4"></td>
                        <td className="animate-pulse rounded-full bg-slate-200 h-4 w-60 p-4"></td>
                        <td className="animate-pulse rounded-full bg-slate-200 h-4 w-60 p-4"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};



export const SkeletonForm = () => {
    return <>
        <section className="my-5">
            <div className="h-5 bg-slate-200 rounded col-span-1 w-96"></div>
            <div className="grid grid-cols-3 gap-4 my-5">
                <div className="h-5 bg-slate-200 rounded col-span-1"></div>
                <div className="h-5 bg-slate-200 rounded col-span-1"></div>
                <div className="h-5 bg-slate-200 rounded col-span-1"></div>
            </div>

            <div className="grid grid-cols-3 gap-4 my-5">
                <div className="h-5 bg-slate-200 rounded col-span-1"></div>
                <div className="h-5 bg-slate-200 rounded col-span-1"></div>
                <div className="h-5 bg-slate-200 rounded col-span-1"></div>
            </div>

            <div className="grid grid-cols-3 gap-4 my-5">
                <div className="h-5 bg-slate-200 rounded col-span-1"></div>
                <div className="h-5 bg-slate-200 rounded col-span-1"></div>
                <div className="h-5 bg-slate-200 rounded col-span-1"></div>
            </div>

            <div className="grid grid-cols-3 gap-4 my-5">
                <div className="h-5 bg-slate-200 rounded col-span-1"></div>
                <div className="h-5 bg-slate-200 rounded col-span-1"></div>
                <div className="h-5 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className='text-center'>
                <button className="h-7 bg-slate-200 w-32 rounded col-span-1"></button>
            </div>
        </section>
    </>
}