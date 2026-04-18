import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

function PaginationStack({ currentPage, totalPage }) {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleOnClickPagination = useCallback((e, v) => {
        searchParams.set("page", v - 1);
        setSearchParams(searchParams);
    }, [searchParams, setSearchParams]);

    if (totalPage <= 1) return null;

    return (
        <Stack spacing={2} alignItems="center" className="py-2">
            <Pagination
                count={totalPage}
                page={currentPage + 1}
                shape="rounded"
                onChange={handleOnClickPagination}
                sx={{
                    "& .MuiPaginationItem-root": {
                        fontSize: "1.4rem",
                        fontWeight: "500",
                        color: "#4b5563", // text-gray-600
                        height: "40px",
                        minWidth: "40px",
                        borderRadius: "10px",
                        transition: "all 0.2s ease-in-out",
                        margin: "0 4px",
                        "&:hover": {
                            backgroundColor: "#fff1f2", // hover:bg-rose-50
                            color: "#e11d48", // hover:text-rose-600
                        },
                    },
                    "& .MuiPaginationItem-root.Mui-selected": {
                        backgroundColor: "#f43f5e !important", // bg-rose-500
                        color: "#ffffff",
                        boxShadow: "0 4px 14px 0 rgba(244, 63, 94, 0.39)",
                        "&:hover": {
                            backgroundColor: "#e11d48 !important", // hover:bg-rose-600
                        },
                    },
                    "& .MuiPaginationItem-ellipsis": {
                        color: "#9ca3af",
                    },
                    "& .MuiPaginationItem-icon": {
                        fontSize: "2rem",
                    }
                }}
            />
        </Stack>
    );
}

export default PaginationStack;
