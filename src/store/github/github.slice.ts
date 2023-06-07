import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface GithubState {
    favourites: string[]
}

const initialState: GithubState = {
    favourites: []
}

export const githubSlice = createSlice({
    name: 'github',
    initialState,

    reducers: {
        addFavourite(state, action: PayloadAction<string>) {
            state.favourites.push(action.payload)
        },
        removeFavourite(state, action: PayloadAction<string>) {
            
        }
    }
})