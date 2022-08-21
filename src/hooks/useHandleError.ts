import { SerializedError } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { HandledError, IErrorCurrentWeather } from '../redux/weather/weather.models'

export default function useHandleError(error: FetchBaseQueryError | SerializedError | undefined) {
    const handledError: HandledError = {
        code: undefined,
        message: undefined,
        status: ''
    }

    if (error) {
        if ('status' in error) {
            handledError.status = error.status
            const err: IErrorCurrentWeather = 'error' in error ? error.error : JSON.parse(JSON.stringify(error.data))
            if (err) {
                handledError.code = err.error.code ? err.error.code.toString() : ''
                handledError.message = err.error.message ? err.error.message : ''
            }

        }
        else {            
            handledError.message = error.message ? error.message : ''
            handledError.code = error.code ? error.code : ''
        }
    }



    return handledError
}