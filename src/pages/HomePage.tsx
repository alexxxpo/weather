import React from 'react'
import WeatherCard from '../components/WeatherCard'
import useDebounce from '../hooks/useDebounce'
import useHandleError from '../hooks/useHandleError'
import { useGetCurrentWeatherQuery } from '../redux/weather/weather.api'
import NotFound from './NotFound'

export default function HomePage() {

    const [search, setSearch] = React.useState('')
    const debounced = useDebounce(search, 500)
    const { isError: searchIsError, error: searchError, data: searchData, isLoading: searchIsLoading } = useGetCurrentWeatherQuery(debounced, { skip: debounced.length < 3 })
    const { isError: ipIsError, error: ipError, data: ipData, isLoading: ipIsLoading } = useGetCurrentWeatherQuery('auto:ip')
    const err = useHandleError(searchError)
    const tempC = searchData ? searchData.current.temp_c : 0
    const city = searchData ? searchData.location.name : ''
    const country = searchData ? searchData.location.country : ''

    if (err.status === 404) {
        return <NotFound />
    }

    return (
        <div className="home container pt-24 px-10 pb-10 mx-auto">

            <WeatherCard/>

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
                {searchIsLoading && (<h1>Информация загружается...</h1>)}
                {!searchIsError && !searchData && (<div className="weather_info">
                    <div>Приветствуем вас на нашем метео-портале!</div>
                    <div>Посмотрите погоду в своем городе прямо сейчас!</div>
                </div>)}
                {!searchIsError && searchData && (<div className="weather_info">
                    <div>Погода в городе  {city}, {country}</div>
                    <div>Температура воздуха: {tempC} &deg;C</div>
                    <div className="flex items-center">
                        <div>{searchData?.current.condition.text} </div>
                        <img src={searchData?.current.condition.icon} alt="cond" />
                    </div>
                </div>)}
                {searchIsError && (<div>{err.message}</div>)}

                <div className="ipCurrentWeather">
                    <div>Вы находитесь в городе {ipData?.location.name}</div>
                    <div>сейчас там {ipData?.current.temp_c} &deg;C</div>
                    <div className="flex items-center">
                        <div>{ipData?.current.condition.text} </div>
                        <img src={ipData?.current.condition.icon} alt="cond" />
                    </div>


                </div>
            </div>
        </div>

    )
}
