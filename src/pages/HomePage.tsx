import React from 'react'
import useDebounce from '../hooks/useDebounce'
import useHandleError from '../hooks/useHandleError'
import { useGetCurrentWeatherQuery } from '../redux/weather/weather.api'
import NotFound from './NotFound'

export default function HomePage() {

    const [search, setSearch] = React.useState('')
    const debounced = useDebounce(search, 500)
    const { isError, error, data, isLoading } = useGetCurrentWeatherQuery(debounced, { skip: debounced.length < 3 })
    const err = useHandleError(error)
    const tempC = data ? data.current.temp_c : 0
    const city = data ? data.location.name : ''
    const country = data ? data.location.country : ''

    if (err.status === 404) {
        return <NotFound />
    }

    return (
        <div className="home container pt-24 px-10 pb-10 mx-auto">
            <div className="search flex justify-center items-center mx-auto mb-10 max-w-[560px]">
                <input
                    type="text"
                    className='border rounded-md border-gray-300 h-[42px] w-full px-5'
                    placeholder='Начните вводить название города'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <div className="weather_section flex justify-center items-center flex-col">
                {isLoading && (<h1>Информация загружается...</h1>)}
                {!isError && !data && (<div className="weather_info">
                    <div>Приветствуем вас на нашем метео-портале!</div>
                    <div>Посмотрите погоду в своем городе прямо сейчас!</div>
                </div>)}                
                {!isError && data && (<div className="weather_info">
                    <div>Погода в городе  {city}, {country}</div>
                    <div>Температура воздуха: {tempC} &deg;C</div>
                </div>)}
                {isError && (<div>{err.message}</div>)}
            </div>
        </div>

    )
}
