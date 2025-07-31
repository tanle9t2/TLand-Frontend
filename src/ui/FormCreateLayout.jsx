import { Outlet } from "react-router-dom"
import Button from "./Button"

function FormCreateLayout() {
    return (
        <div className="bg-white grid grid-cols-[0.6fr_0.4fr] gap-15 p-5 space-y-8">
            <Outlet />

        </div>
    )
}

export default FormCreateLayout
