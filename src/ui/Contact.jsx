import { useNavigate } from "react-router-dom";
import { getTimeDifferenceFromNow } from "../utils/helper";
import Button from "./Button";
import Section from "./Section"
import { HiOutlinePhone, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

function Contact({ userInfo }) {
    const { id, avtUrl, firstName, lastName, phoneNumber, createdAt, lastAccess } = userInfo
    const fullName = `${firstName} ${lastName}`
    const navigate = useNavigate()

    return (
        <Section>
            <div className="p-5">
                <div
                    onClick={() => navigate(`/user/${id}`)}
                    className="flex items-center gap-4 cursor-pointer group mb-5"
                >
                    <img
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 shadow-sm bg-white"
                        src={avtUrl || '/default-avt.png'}
                        alt={fullName}
                    />
                    <div className="flex-1 min-w-0">
                        <h3 className="text-[1.5rem] font-bold text-gray-900 group-hover:text-rose-600 transition-colors truncate">
                            {fullName}
                        </h3>
                        <p className="text-[1.2rem] text-gray-500 font-medium">Môi giới</p>
                    </div>
                </div>

                <div className="space-y-2 mb-5 text-[1.25rem] text-gray-500">
                    <p className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"></span>
                        Hoạt động {getTimeDifferenceFromNow(lastAccess)} trước
                    </p>
                    <p className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0"></span>
                        {getTimeDifferenceFromNow(createdAt)} trên TLand
                    </p>
                </div>

                <div className="space-y-3">
                    <Button variant="primary" className="w-full !py-3.5 flex items-center justify-center gap-2 shadow-md shadow-rose-500/15">
                        <HiOutlinePhone className="text-[1.6rem]" />
                        <span>{phoneNumber}</span>
                    </Button>
                    <Button variant="secondary" className="w-full !py-3.5 flex items-center justify-center gap-2">
                        <HiOutlineChatBubbleLeftRight className="text-[1.6rem]" />
                        <span>Chat với người bán</span>
                    </Button>
                </div>
            </div>
        </Section>
    );
};

export default Contact
