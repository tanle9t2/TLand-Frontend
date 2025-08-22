import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";

function PaginationStack({ currentPage, totalPage }) {
    const [searchParams, setSerachParams] = useSearchParams()
    if (totalPage <= 1) return null;
    function handleOnClickPagniation(e, v) {
        searchParams.set("page", v - 1)
        setSerachParams(searchParams)
    }

    return (
        <Stack spacing={2}>
            <Pagination
                count={totalPage}
                page={currentPage + 1}
                shape="rounded"
                onChange={(e, v) => handleOnClickPagniation(e, v)}
                sx={{
                    "& .MuiPaginationItem-root": {
                        fontSize: "16px",
                    },
                    "& .MuiPaginationItem-root.Mui-selected": {
                        backgroundColor: "oklch(58.6% 0.253 17.585)",
                        color: "#fff",
                        "&:hover": {
                            backgroundColor: "oklch(51.4% 0.222 16.935)",
                        },
                    },
                }}
            />
        </Stack>
    );
}

export default PaginationStack;
