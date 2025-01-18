"use client"
import GetClotchesByCategory from "./usecases/get_clothes_by_category"

export default function HomePage() {
    return <>
        <div className="content-grid">
            <GetClotchesByCategory ctx={"head"}/>
            <GetClotchesByCategory ctx={"upper_body"}/>
            <GetClotchesByCategory ctx={"bottom_body"}/>
            <GetClotchesByCategory ctx={"footwear"}/>
        </div>
    </>
}