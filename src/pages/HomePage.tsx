import WeatherCard from '../components/WeatherCard'
import { useAppSelector } from '../hooks/reduxHooks'
import useDebounce from '../hooks/useDebounce'
import russianCities from '../cities_ru_en.json'

export default function HomePage() {

    const search = useAppSelector((state) => state.setSearchWeather.search)
    const debounced = useDebounce(search, 500)
    console.log(russianCities);
    

    return (
        <div className="home container pt-24 px-10 pb-10 mx-auto">
            <WeatherCard query={debounced} />
        </div>
    )
}
