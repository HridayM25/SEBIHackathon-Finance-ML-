import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profession: "",
  ageGroup: "",
}

export const userSlice = createSlice({
  name: 'profession',
  initialState,
  reducers: {
    setProfession: (state, action) => {
      state.profession = action.payload
    },
    setAgeGroup: (state, action) => {
        state.ageGroup = action.payload
      },
  },
})

// Action creators are generated for each case reducer function
export const { setProfession,setAgeGroup } = userSlice.actions

export default userSlice.reducer