import { useState } from "react"
import ModalCreate from "../../ui/ModalCreate"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ModalSelectAddress from "../../ui/ModalSelectAddress";

function PostCreatedForm() {
    const [catgory, setCategory] = useState(null)
    return (
        <div className="p-4">
            <ModalCreate category={catgory} setCategory={setCategory} />

            {/* Check type */}
            <div className="my-5 ">
                <FormControl>
                    <FormLabel sx={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "black"
                    }}
                        id="demo-row-radio-buttons-group-label">Loại hình</FormLabel>
                    <RadioGroup
                        row

                        name="row-radio-buttons-group"
                        sx={{
                            fontSize: "20px"
                        }}

                    >
                        <FormControlLabel
                            value="RENT"
                            control={
                                <Radio
                                    sx={{
                                        color: '#e11d48',
                                        '&.Mui-checked': {
                                            color: '#e11d48',
                                        },
                                    }}
                                />
                            }
                            label="Cho thuê"
                            sx={{ '& .MuiFormControlLabel-label': { fontSize: '20px' } }}
                        />
                        <FormControlLabel
                            value="SALE"
                            control={
                                <Radio
                                    sx={{
                                        color: '#e11d48',
                                        '&.Mui-checked': {
                                            color: '#e11d48',
                                        },
                                    }}
                                />
                            }
                            label="Bán"
                            sx={{ '& .MuiFormControlLabel-label': { fontSize: '20px' } }}
                        />

                    </RadioGroup>
                </FormControl>
            </div>
            <div className="my-5">
                <h1 className="text-3xl font-bold">Địa chỉ BĐS</h1>
                <ModalSelectAddress />
            </div>
        </div>
    )
}

export default PostCreatedForm
