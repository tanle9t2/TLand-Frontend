import { useNavigate } from "react-router-dom";
import { getTimeDifferenceFromNow } from "../utils/helper";
import Button from "./Button";
import Section from "./Section"

function Contact({ userInfo }) {
    const { id, avtUrl, firstName, lastName, phoneNumber, createdAt, lastAccess } = userInfo
    const fullName = `${firstName} ${lastName}`
    const navigate = useNavigate()
    return (
        <Section>
            <div onClick={() => navigate(`/user/${id}`)} className="flex items-center p-4">
                <img
                    className="w-24 h-24 rounded-full mr-4"
                    src={avtUrl}
                    alt={fullName}
                />
                <div>
                    <h3 className="font-bold">{fullName}</h3>
                    <p className="text-gray-600 text-xl font-semibold">Môi Giới</p>
                </div>
            </div>
            <div className="p-4 border-t">
                <p className="text-gray-600">
                    {`• Hoạt động ${getTimeDifferenceFromNow(lastAccess)} trước`}
                </p>

                <p className="text-gray-600">{`• ${getTimeDifferenceFromNow(createdAt)} trên TLand bất động sản`}</p>
                <div className="mt-5">
                    <Button variant="primary" className="w-full">
                        ☎️ {phoneNumber}
                    </Button>
                    <Button className="w-full" variant="secondary">
                        💬 Chat trực tiếp
                    </Button>
                </div>
            </div>
        </Section>
    );
};


export default Contact
