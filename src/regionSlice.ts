import {createSlice} from '@reduxjs/toolkit';

interface RegionModel {
    id?: string,
    name?: string;
    description?: string;
}

let regionState: RegionModel | any = null;

const regionSlice = createSlice({
    name: 'region',
    initialState: {
        region: regionState
    },
    reducers: {
        setRegion: (state, action) => void (state.region = action.payload),
    },
});

export const {setRegion} = regionSlice.actions;
export default regionSlice.reducer;
