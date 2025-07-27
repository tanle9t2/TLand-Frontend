import Button from "./Button";
import Section from "./Section"

function Contact() {
    return (
        <Section>
            <div className="flex items-center p-4">
                <img
                    className="w-24 h-24 rounded-full mr-4"
                    src="https://tland-bucket.s3.us-east-1.amazonaws.com/pain.png"
                    alt="User Avatar"
                />
                <div>
                    <h3 className="font-bold">Huy Môi Giới</h3>
                    <p className="text-gray-600 text-xl font-semibold">Môi Giới</p>
                </div>
            </div>
            <div className="p-4 border-t">
                <p className="text-gray-600">
                    • Hoạt động 1 ngày trước
                </p>

                <p className="text-gray-600">• 1 tin đăng • 7 năm trên Nhà Tốt</p>
                <div className="mt-5">
                    <Button variant="primary" className="w-full">
                        ☎️ 093593****
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
