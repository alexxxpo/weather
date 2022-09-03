import React from 'react'
import WeatherCard from '../components/WeatherCard'
import { useAppSelector } from '../hooks/reduxHooks'
import useDebounce from '../hooks/useDebounce'
import useHandleError from '../hooks/useHandleError'
import { useGetCurrentWeatherQuery } from '../redux/weather/weather.api'
import NotFound from './NotFound'

export default function HomePage() {

    const search = useAppSelector((state) => state.setSearchWeather.search)
    const debounced = useDebounce(search, 500)
    const { isError: searchIsError, error: searchError, data: searchData, isLoading: searchIsLoading } = useGetCurrentWeatherQuery(debounced, { skip: debounced.length < 3 })
    const err = useHandleError(searchError)
    const tempC = searchData ? searchData.current.temp_c : 0
    const city = searchData ? searchData.location.name : ''
    const country = searchData ? searchData.location.country : ''

    if (err.status === 404) {
        return <NotFound />
    }

    return (
        <div className="home container pt-24 px-10 pb-10 mx-auto">

            <WeatherCard query={debounced}/>

                    
        </div>

    )
}
