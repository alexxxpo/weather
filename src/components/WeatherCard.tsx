import { useGetCurrentWeatherQuery } from '../redux/weather/weather.api'
import russianCities from '../cities_ru_en.json'


interface IWeatherCardProps {
    query?: string
}

export default function WeatherCard(props: IWeatherCardProps) {

    const checkCity = (city: string, list: string[][], country: string = 'Russia'): string => {
        console.log(country);
        
        if (country.toLowerCase() === 'russia' || country.toLowerCase() === 'россия') {
            return list.reduce((res: string, item: string[]): string => {
                if (item[1] === city) res = item[0]
                return res
            }, '')
        } else {
            return city
        }
    }
    const searchQuery = props.query ? props?.query.length < 3 ? 'auto:ip' : props?.query : 'auto:ip'
    const { isLoading, isError, data } = useGetCurrentWeatherQuery(searchQuery, { skip: searchQuery.length < 3 })

    const wind: string = data?.current.wind_kph ? ((data?.current.wind_kph / 3600) * 1000).toFixed(1).toString() : '-'
    const tempC: string = data?.current.temp_c ? (data?.current.temp_c).toString() : '-'
    const feelslike: string = data?.current.feelslike_c ? data?.current.feelslike_c.toString() : '-'
    const pres: string = data?.current.pressure_mb ? (data?.current.pressure_mb * 0.750064).toFixed(1).toString() : '-'
    const country = data ? data?.location.country === 'Russia' ? 'Россия' : data?.location.country : '-'
    const city: string = data ? checkCity(data?.location.name, russianCities, country) : ''
    const condition: string = data?.current.condition.text ? data?.current.condition.text : '-'
    const conditionImgSrc: string = data?.current.condition.icon ? data?.current.condition.icon : ''


    if (isError) return (
        <div className='weather_card'>
            <div className='error'>Что-то пошло не так</div>
        </div>
    )

    if (isLoading) return (
        <div className='weather_card'>
            <div className='loader'>Загрузка...</div>
        </div>
    )

    return (
        <div className='weather_card'>
            <h4 className="location">{country}, {city}</h4>
            <p className='weather_card__current_temp text-[5em]'>{tempC} &deg;C</p>
            <p>Ощущается как {feelslike} &deg;C</p>
            <img className='weather_card__condition_icon' src={conditionImgSrc} alt={condition} />
            <p className='weather_card__condition_text'>{condition}</p>
            <p>Влажность {data?.current.humidity} %</p>
            <p>Ощущается как {data?.current.feelslike_c}</p>
            <p>Скорость ветра {wind} м/с</p>
            <p>Атмосферное давление {pres} мм рт. ст.</p>
        </div>
    )
}
