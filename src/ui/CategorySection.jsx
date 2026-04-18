import { useNavigate } from "react-router-dom";
import { useInView } from "../hooks/useInView";
const CATEGORIES = [
    { icon: "🏠", label: "Nhà ở", count: "12.4K tin", slug: "nha-o", color: "from-rose-50 to-orange-50", border: "border-rose-200" },
    { icon: "🏢", label: "Căn hộ / Chung cư", count: "8.7K tin", slug: "can-ho", color: "from-amber-50 to-yellow-50", border: "border-amber-200" },
    { icon: "🏗️", label: "Đất nền", count: "5.2K tin", slug: "dat-nen", color: "from-emerald-50 to-teal-50", border: "border-emerald-200" },
    { icon: "🏪", label: "Văn phòng / Mặt bằng", count: "3.1K tin", slug: "van-phong", color: "from-sky-50 to-blue-50", border: "border-sky-200" },
    { icon: "🏨", label: "Phòng trọ", count: "9.8K tin", slug: "phong-tro", color: "from-pink-50 to-rose-50", border: "border-pink-200" },
    { icon: "🏖️", label: "Biệt thự / Villa", count: "1.4K tin", slug: "biet-thu", color: "from-violet-50 to-fuchsia-50", border: "border-violet-200" },
];
function CategorySection() {
    const [ref, inView] = useInView(0.1);
    const navigate = useNavigate();

    return (
        <section ref={ref} aria-label="Danh mục bất động sản" className="mb-6">
            <div className="flex items-end justify-between mb-4 px-1">
                <div>
                    <p className="text-[1.2rem] text-rose-500 font-semibold uppercase tracking-widest mb-1">Khám phá</p>
                    <h2 className="text-[2.2rem] font-black text-gray-900 leading-tight">Danh mục bất động sản</h2>
                </div>
                <button
                    onClick={() => navigate("/search")}
                    className="text-[1.3rem] text-rose-500 hover:text-rose-600 font-semibold hidden md:flex items-center gap-1 transition-colors"
                    aria-label="Xem tất cả danh mục"
                >
                    Xem tất cả <span>→</span>
                </button>
            </div>

            <div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
                style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                }}
            >
                {CATEGORIES.map(({ icon, label, count, slug, color, border }, i) => (
                    <button
                        key={slug}
                        onClick={() => navigate(`/search?category=${slug}`)}
                        className={`bg-gradient-to-br ${color} border ${border} rounded-2xl p-4 text-left hover:shadow-md hover:-translate-y-1 transition-all duration-200 group cursor-pointer`}
                        style={{ transitionDelay: `${i * 60}ms` }}
                        aria-label={`Tìm kiếm ${label}`}
                    >
                        <span className="text-[2.8rem] block mb-2 group-hover:scale-110 transition-transform duration-200">{icon}</span>
                        <span className="text-[1.3rem] font-bold text-gray-800 leading-tight block">{label}</span>
                        <span className="text-[1.1rem] text-gray-500 mt-0.5 block">{count}</span>
                    </button>
                ))}
            </div>
        </section>
    );
}

export default CategorySection
