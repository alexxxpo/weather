import React from "react"
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks"
import { RootState } from "../redux"
import { setSearch } from "../redux/weather/weatherSlice"

export default function Search() {
    const search = useAppSelector((state: RootState) => state.setSearchWeather.search)
    const dispatch = useAppDispatch()
    const searchHandler = (query: string) => {
        dispatch(setSearch(query))
    }

    return (        
        <div className="search flex flex-1 justify-center items-center max-w-[560px]">
            <input
                type="text"
                className='border rounded-md border-gray-300 h-[42px] w-full px-5 outline-none'
                placeholder='Начните вводить название города'
                value={search}
                onChange={e => searchHandler(e.target.value)}
            />
        </div>        
    )
}
