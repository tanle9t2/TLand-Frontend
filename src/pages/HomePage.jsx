import { Link, useNavigate } from "react-router-dom";
import PostForRent from "../features/post/PostForRent";
import PostForSell from "../features/post/PostForSell";
import Section from "../ui/Section";
import MiniChatbox from "../features/chatbot/MiniChatbox";
import HeroSection from "../ui/HeroSection";
import StatsSection from "../ui/StatsSection";
import CategorySection from "../ui/CategorySection";
import CtaBanner from "../ui/CtaBanner";

function SectionHeader({ badge, title, href, hrefLabel }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-end justify-between mb-2 px-1 pt-2">
      <div>
        <p className="text-[1.2rem] text-rose-500 font-semibold uppercase tracking-widest mb-1">{badge}</p>
        <h2 className="text-[2.4rem] font-black text-gray-900 leading-tight">{title}</h2>
      </div>
      {href && (
        <button
          onClick={() => navigate(href)}
          className="text-[1.3rem] text-rose-500 hover:text-rose-600 font-semibold hidden md:flex items-center gap-1 transition-colors"
          aria-label={hrefLabel}
        >
          {hrefLabel} <span>→</span>
        </button>
      )}
    </div>
  );
}

function HomePage() {
  return (
    <>
      <main
        id="homepage-main"
        className="max-w-[1440px] mx-auto px-4 md:px-8 pb-16"
        aria-label="TLand - Kênh thông tin bất động sản mua bán cho thuê hàng đầu Việt Nam"
      >
        <div className="pt-4 mb-6">
          <HeroSection />
        </div>
        <StatsSection />
        <CategorySection />
        <Section>
          <div className="px-4">
            <SectionHeader
              badge="Cho thuê"
              title="Bất động sản cho thuê"
              href="/search?type=RENT"
              hrefLabel="Xem thêm"
            />
            <PostForRent />
          </div>
        </Section>


        <CtaBanner />


        <Section>
          <div className="px-4">
            <SectionHeader
              badge="Mua bán"
              title="Bất động sản mua bán"
              href="/search?type=SELL"
              hrefLabel="Xem thêm"
            />
            <PostForSell />
          </div>
        </Section>
      </main>
      <MiniChatbox />
    </>
  );
}

export default HomePage;
