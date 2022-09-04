import WeatherCard from '../components/WeatherCard'
import { useAppSelector } from '../hooks/reduxHooks'
import useDebounce from '../hooks/useDebounce'

export default function HomePage() {

    const search = useAppSelector((state) => state.setSearchWeather.search)
    const debounced = useDebounce(search, 500)
    

    return (
        <div className="home container pt-24 px-10 pb-10 mx-auto">
            <WeatherCard query={debounced} />
        </div>
    )
}
