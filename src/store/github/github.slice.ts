import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const LS_FAV_KEY = 'rfk'

interface GithubState {
    favourites: any[]
}

const initialState: GithubState = {
    favourites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]')
}

export const githubSlice = createSlice({
    name: 'github',
    initialState,

    reducers: {
        addFavourite(state, action: PayloadAction<any>) {
            state.favourites.push(action.payload);
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites));
        },
        removeFavourite(state, action: PayloadAction<any>) {
            state.favourites = state.favourites.filter(f => f.id !== action.payload);
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites));
        }
    }
})

export const githunActions = githubSlice.actions
export const githubReducer = githubSlice.reducer