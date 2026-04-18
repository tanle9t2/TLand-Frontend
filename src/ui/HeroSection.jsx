import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TRUST_BADGES = [
    { icon: "🔒", text: "Xác thực chủ sở hữu" },
    { icon: "⚡", text: "Đăng tin nhanh chóng" },
    { icon: "🤖", text: "AI tư vấn thông minh" },
    { icon: "📍", text: "Tìm kiếm theo vị trí" },
];



function HeroSection() {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 80);
        return () => clearTimeout(t);
    }, []);

    return (
        <section
            aria-label="Trang chủ TLand - Nền tảng bất động sản hàng đầu Việt Nam"
            className="relative w-full min-h-[520px] md:min-h-[600px] overflow-hidden rounded-2xl"
        >

            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1800&q=80&auto=format"
                    alt="Bất động sản cao cấp Việt Nam"
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchpriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-900/60 to-gray-800/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
            </div>


            <div
                className="relative z-10 flex flex-col justify-center h-full min-h-[520px] md:min-h-[600px] max-w-[1440px] mx-auto px-6 md:px-12 py-16"
                style={{
                    opacity: loaded ? 1 : 0,
                    transform: loaded ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
                }}
            >

                <div className="inline-flex items-center gap-2 bg-rose-500/20 backdrop-blur-sm border border-rose-400/30 text-rose-300 rounded-full px-4 py-1.5 text-[1.2rem] font-medium w-fit mb-6">
                    <span className="w-2 h-2 bg-rose-400 rounded-full animate-pulse" />
                    Nền tảng bất động sản #1 Việt Nam
                </div>


                <h1 className="text-white font-black leading-tight mb-4 max-w-2xl" style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)" }}>
                    Tìm ngôi nhà{" "}
                    <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #f59e0b, #ef4444)" }}>
                        mơ ước
                    </span>{" "}
                    của bạn
                </h1>

                <p className="text-gray-300 text-[1.6rem] mb-8 max-w-xl leading-relaxed">
                    Hơn <strong className="text-white">50,000+</strong> bất động sản đang chờ bạn khám phá.
                    Mua, bán, cho thuê — tất cả trong một nền tảng.
                </p>


                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => navigate("/search")}
                        className="bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl px-8 py-3 text-[1.5rem] transition-all duration-200 hover:shadow-lg hover:shadow-rose-500/30 hover:-translate-y-0.5 active:translate-y-0"
                        aria-label="Tìm kiếm bất động sản"
                    >
                        🔍 Tìm kiếm ngay
                    </button>
                    <button
                        onClick={() => navigate("/search?type=RENT")}
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl px-8 py-3 text-[1.5rem] border border-white/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                        aria-label="Xem bất động sản cho thuê"
                    >
                        Cho thuê
                    </button>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-4 mt-8">
                    {TRUST_BADGES.map(({ icon, text }) => (
                        <div key={text} className="flex items-center gap-1.5 text-[1.25rem] text-gray-300">
                            <span>{icon}</span>
                            <span>{text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom gradient fade to page bg */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
        </section>
    );
}



export default HeroSection
