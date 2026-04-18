import { useEffect, useState } from "react";
import { useInView } from "../hooks/useInView";

const STATS = [
    { value: 50000, suffix: "+", label: "Bất động sản đang niêm yết" },
    { value: 120000, suffix: "+", label: "Khách hàng tin tưởng" },
    { value: 63, suffix: "", label: "Tỉnh / Thành phố phủ sóng" },
    { value: 98, suffix: "%", label: "Khách hàng hài lòng" },
];
function AnimatedCounter({ target, suffix = "" }) {
    const [count, setCount] = useState(0);
    const [ref, inView] = useInView(0.3);

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const duration = 1600;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(start);
        }, 16);
        return () => clearInterval(timer);
    }, [inView, target]);

    return (
        <span ref={ref} className="tabular-nums">
            {count.toLocaleString("vi-VN")}{suffix}
        </span>
    );
}

function StatsSection() {
    const [ref, inView] = useInView(0.2);

    return (
        <section
            ref={ref}
            aria-label="Thống kê TLand"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6"
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
            }}
        >
            {STATS.map(({ value, suffix, label }, i) => (
                <div
                    key={label}
                    className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                    style={{ transitionDelay: `${i * 80}ms` }}
                >
                    <div className="text-[2.8rem] md:text-[3.2rem] font-black text-rose-500 leading-tight">
                        <AnimatedCounter target={value} suffix={suffix} />
                    </div>
                    <p className="text-[1.3rem] text-gray-500 mt-1 leading-snug">{label}</p>
                </div>
            ))}
        </section>
    );

}

export default StatsSection
