import { useNavigate } from "react-router-dom";
import { useInView } from "../hooks/useInView";

function CtaBanner() {
    const [ref, inView] = useInView(0.2);
    const navigate = useNavigate();

    return (
        <section
            ref={ref}
            aria-label="Đăng tin bất động sản"
            className="relative rounded-2xl overflow-hidden my-6"
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
        >
            <div className="bg-gradient-to-r from-rose-600 to-orange-500 px-8 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6">

                <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
                <div className="absolute -bottom-8 right-24 w-32 h-32 bg-white/5 rounded-full" />

                <div className="relative text-center md:text-left">
                    <h2 className="text-[2.4rem] md:text-[3rem] font-black text-white mb-2 leading-tight">
                        Bạn muốn đăng tin?
                    </h2>
                    <p className="text-white/80 text-[1.5rem]">
                        Tiếp cận hàng triệu khách hàng tiềm năng — miễn phí, nhanh chóng.
                    </p>
                </div>

                <div className="relative flex flex-col sm:flex-row gap-3 shrink-0">
                    <button
                        onClick={() => navigate("/create-post")}
                        className="bg-white text-rose-600 font-bold rounded-xl px-8 py-3.5 text-[1.5rem] hover:bg-gray-50 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap"
                        aria-label="Đăng tin bất động sản miễn phí"
                    >
                        📢 Đăng tin miễn phí
                    </button>
                </div>
            </div>
        </section>
    );
}

export default CtaBanner
