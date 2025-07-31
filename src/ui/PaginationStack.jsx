import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";

function PaginationStack({ currentPage, totalPage, onClick }) {
    if (totalPage <= 1) return null;
    return (
        <Stack spacing={2}>
            <Pagination
                count={totalPage}
                page={currentPage + 1}
                shape="rounded"
                onChange={(e, v) => onClick(e, v)}
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
