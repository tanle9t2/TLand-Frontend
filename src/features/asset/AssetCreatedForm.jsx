import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ModalSelectAddress from "../../ui/ModalSelectAddress";
import AssetCreateFormDetail from "./HouseFormDetail";
import Button from "../../ui/Button";
import { Controller } from "react-hook-form";
import ErrorMessage from "../../ui/ErrorMessage";
import ModalSelectCategory from "../../ui/ModalSelectCategory";
import HouseFormDetail from './HouseFormDetail';
import ApartmentFormDetail from "./ApartmentFormDetail "
import LandFormDetail from './LandFormDetail';
function AssetCreatedForm({ register, errors, handleOnChangeAddress, watch, setCategory }) {

    return (
        <div className="p-4">
            {/* Category */}
            <div>
                <ModalSelectCategory category={watch("category")} setCategory={setCategory} />
                {errors.category && (
                    <ErrorMessage message={errors.category.message} />
                )}
            </div>

            {/*Address*/}
            <div className="my-5">
                <h1 className="text-3xl font-bold mb-2">Địa chỉ BĐS</h1>
                <ModalSelectAddress address={watch("address")} setAddress={handleOnChangeAddress} />
                {errors.address && (
                    <ErrorMessage message={errors.address.message} />
                )}
            </div>

            {/*form detail*/}
            {watch("category") && <div className='space-y-3'>
                {watch("category").name === "Nhà ở" && <HouseFormDetail category={watch("category")} register={register} errors={errors} />}
                {watch("category").name === "Căn hộ/Chung cư" && <ApartmentFormDetail category={watch("category")} register={register} errors={errors} />}
                {watch("category").name === "Đất" && <LandFormDetail category={watch("category")} register={register} errors={errors} />}

            </div>}

        </div>

    )
}

export default AssetCreatedForm
