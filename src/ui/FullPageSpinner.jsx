import { MoonLoader } from "react-spinners";

function FullPageSpinner() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50/95 to-gray-100/95 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-5 p-10 rounded-3xl bg-white/60 shadow-lg shadow-black/5 border border-white/80">
                <MoonLoader size={52} color="#e11d48" speedMultiplier={0.8} />
                <p className="text-[1.4rem] font-medium text-gray-500 tracking-wide animate-pulse">
                    Đang xử lý...
                </p>
            </div>
        </div>
    );
}

export default FullPageSpinner
