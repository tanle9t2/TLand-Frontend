import Logo from "./Logo";
import { FaFacebook, FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";

const footerLinks = {
  "Về TLand": [
    "Giới thiệu",
    "Quy chế hoạt động",
    "Tuyển dụng",
    "Liên hệ",
    "Báo chí",
  ],
  "Hỗ trợ khách hàng": [
    "Trung tâm trợ giúp",
    "Góp ý báo lỗi",
    "Bảng giá dịch vụ",
    "Hướng dẫn đăng tin",
    "Kiểm tra quy hoạch",
  ],
  "Dịch vụ chuyên nghiệp": [
    "TLand Business",
    "Dành cho môi giới",
    "Đăng ký đại lý",
    "Định giá bất động sản",
  ],
  "Quy định & Pháp lý": [
    "Điều khoản thỏa thuận",
    "Chính sách bảo mật",
    "Quy định đăng tin",
    "Quy định giải quyết khiếu nại",
  ],
};

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-[1440px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          <div className="lg:col-span-2 space-y-6">
            <div className="-ml-3 mt-[-20px]">
              <Logo />
            </div>
            <p className="text-[1.4rem] text-gray-500 leading-relaxed max-w-md">
              TLand - Nền tảng công nghệ bất động sản số 1 Việt Nam. Cung cấp giải pháp tìm kiếm, mua bán và cho thuê bất động sản an toàn, minh bạch và hiệu quả.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <FaFacebook className="text-[1.8rem]" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors">
                <FaYoutube className="text-[1.8rem]" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition-colors">
                <FaInstagram className="text-[1.8rem]" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-colors">
                <FaTiktok className="text-[1.8rem]" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, items], i) => (
            <div key={i}>
              <h4 className="text-[1.6rem] font-bold text-gray-900 mb-6">{title}</h4>
              <ul className="space-y-4">
                {items.map((item, j) => (
                  <li key={j}>
                    <a href="#" className="text-[1.4rem] text-gray-600 hover:text-rose-500 transition-colors inline-block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[1.3rem] text-gray-500 font-medium">
            © {new Date().getFullYear()} TLand, Inc. Bản quyền thuộc về TLand.
          </p>
          <div className="flex items-center gap-6 text-[1.3rem] text-gray-500">
            <a href="#" className="hover:text-rose-500 transition-colors">Ngôn ngữ: Tiếng Việt</a>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <a href="#" className="hover:text-rose-500 transition-colors">Cài đặt Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
