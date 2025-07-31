import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ErrorMessage from '../../ui/ErrorMessage';
import { Controller } from 'react-hook-form';
function PostFrormDetail({ control, register, errors }) {
    return (
        <div className="w-full">
            {/* Check type */}
            <section className="my-5 ">
                <FormControl>
                    <FormLabel sx={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "black"
                    }}
                        id="demo-row-radio-buttons-group-label">Loại hình</FormLabel>
                    <Controller
                        name="type"
                        control={control}
                        rules={{ required: "Vui lòng chọn loại hình" }}
                        render={({ field }) => (
                            <RadioGroup row {...field}>
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
                                    sx={{ "& .MuiFormControlLabel-label": { fontSize: "20px" } }}
                                />
                                <FormControlLabel
                                    value="SALE"
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
                                    sx={{ "& .MuiFormControlLabel-label": { fontSize: "20px" } }}
                                />
                            </RadioGroup>
                        )}
                    />

                    {errors.type && (
                        <ErrorMessage message={errors.type.message} />
                    )}
                </FormControl>
            </section>
            <section>
                <h2 className="text-3xl font-bold mb-4">Tiêu đề tin đăng và Mô tả chi tiết</h2>
                <div className="text-2xl grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                        <input
                            type="text"
                            {...register("title", { required: "Vui lòng nhập tiêu đề" })}
                            className="p-3 border rounded w-full"
                            placeholder="Tiêu đề"
                        />
                        {errors.title && (
                            <ErrorMessage message={errors.title.message} />
                        )}
                    </div>
                    <div className="md:col-span-2">
                        <textarea
                            {...register("description", { required: "Vui lòng nhập mô tả" })}
                            className="p-3 border rounded w-full h-64"
                            placeholder="Nên có: Loại nhà ở, vị trí, tiện ích, diện tích, số phòng, thông tin pháp lý, nội thất, v.v.

Ví dụ: Nhà mặt tiền số 58 Phan Chu Trinh, Q.Bình Thạnh, 120m2. Khu dân cư an ninh. Giấy tờ chính chủ."
                        />
                        {errors.description && (
                            <ErrorMessage message={errors.description.message} />
                        )}
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-bold mb-4">Giá bán</h2>
                <div className="text-2xl grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                        <input
                            type="number"
                            {...register("price", { required: "Vui lòng nhập giá" }, { valueAsNumber: true },)}
                            className="p-3 border rounded w-full"
                            placeholder="Giá"
                        />
                        {errors.price && (
                            <ErrorMessage message={errors.price.message} />
                        )}
                    </div>

                </div>
            </section>
        </div>
    )
}

export default PostFrormDetail
