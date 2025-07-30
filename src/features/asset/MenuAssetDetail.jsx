import Button from "../../ui/Button";
import Section from "../../ui/Section";

function MenuAssetDetail() {
    return (
        <Section>
            <h1 className="px-5 py-3 text-3xl font-bold">Thao tác</h1>
            <div className="flex items-center p-4">
                <div className="mt-2 w-full">
                    <Button variant="primary" className="w-full">
                        Đăng bán
                    </Button>
                    <Button className="w-full" variant="secondary">
                        Chỉnh sửa
                    </Button>
                </div>
            </div>
        </Section>
    );
}

export default MenuAssetDetail
