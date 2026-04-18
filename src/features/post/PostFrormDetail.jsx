import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import ErrorMessage from '../../ui/ErrorMessage';
import { Controller } from 'react-hook-form';
import { formatWithDots, removeDots } from '../../utils/helper';
import { HiOutlineTag } from 'react-icons/hi';

const inputClasses = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-[1.4rem] outline-none focus:bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10 transition-all duration-200 placeholder:text-gray-400";
const labelClasses = "block text-[1.35rem] font-semibold text-gray-700 mb-2";

function PostFrormDetail({ setValue, watch, control, register, errors }) {
    return (
        <div className="space-y-7">
            {/* Post Type */}
            <div>
                <p className={labelClasses}>Loại hình đăng tin</p>
                <FormControl>
                    <Controller
                        name="type"
                        control={control}
                        rules={{ required: "Vui lòng chọn loại hình" }}
                        render={({ field }) => (
                            <RadioGroup row {...field}>
                                <FormControlLabel
                                    value="SELL"
                                    control={
                                        <Radio
                                            sx={{
                                                color: "#e11d48",
                                                "&.Mui-checked": {
                                                    color: "#e11d48",
                                                },
                                            }}
                                        />
                                    }
                                    label="Bán"
                                    sx={{ "& .MuiFormControlLabel-label": { fontSize: "1.5rem", fontWeight: 500 } }}
                                />
                                <FormControlLabel
                                    value="RENT"
                                    control={
                                        <Radio
                                            sx={{
                                                color: "#e11d48",
                                                "&.Mui-checked": {
                                                    color: "#e11d48",
                                                },
                                            }}
                                        />
                                    }
                                    label="Cho thuê"
                                    sx={{ "& .MuiFormControlLabel-label": { fontSize: "1.5rem", fontWeight: 500 } }}
                                />
                            </RadioGroup>
                        )}
                    />
                    {errors.type && <ErrorMessage message={errors.type.message} />}
                </FormControl>
            </div>

            {/* Title & Description */}
            <div>
                <p className={labelClasses}>Tiêu đề tin đăng</p>
                <input
                    type="text"
                    {...register("title", { required: "Vui lòng nhập tiêu đề" })}
                    className={inputClasses}
                    placeholder="VD: Bán nhà mặt tiền Quận 1, 120m², sổ đỏ chính chủ"
                />
                {errors.title && <ErrorMessage message={errors.title.message} />}
            </div>

            <div>
                <p className={labelClasses}>Mô tả chi tiết</p>
                <textarea
                    {...register("description", { required: "Vui lòng nhập mô tả" })}
                    className={`${inputClasses} h-48 resize-none`}
                    placeholder="Nên có: Loại nhà ở, vị trí, tiện ích, diện tích, số phòng, thông tin pháp lý, nội thất...

Ví dụ: Nhà mặt tiền số 58 Phan Chu Trinh, Q.Bình Thạnh, 120m². Khu dân cư an ninh. Giấy tờ chính chủ."
                />
                {errors.description && <ErrorMessage message={errors.description.message} />}
            </div>

            {/* Price */}
            <div>
                <p className={labelClasses}>
                    <span className="flex items-center gap-2">
                        <HiOutlineTag className="text-[1.5rem] text-gray-400" />
                        {watch("type") === "SELL" ? "Giá bán" : "Giá cho thuê theo tháng"}
                    </span>
                </p>
                <div className="relative">
                    <input
                        type="text"
                        inputMode="numeric"
                        {...register("price", {
                            required: "Vui lòng nhập giá",
                            setValueAs: (value) => Number(removeDots(value)),
                        })}
                        value={formatWithDots(watch("price"))}
                        onChange={(e) => {
                            const rawValue = removeDots(e.target.value);
                            if (!/^\d*$/.test(rawValue)) return;
                            setValue("price", rawValue);
                        }}
                        className={inputClasses}
                        placeholder="Nhập giá (VNĐ)"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[1.3rem] font-medium text-gray-400">
                        VNĐ
                    </span>
                </div>
                {errors.price && <ErrorMessage message={errors.price.message} />}
            </div>
        </div>
    )
}

export default PostFrormDetail
