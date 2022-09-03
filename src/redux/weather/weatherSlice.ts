import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IWeatherState {
    search: string
}

const initialState: IWeatherState = {
    search: ''
}

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
    },
})

export const { setSearch } = weatherSlice.actions

export default weatherSlice.reducer