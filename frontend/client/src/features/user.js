import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const register = createAsyncThunk(
    'users/register',
    async ({ first_name, last_name, email, password }, thunkAPI) => {
        const body = JSON.stringify({
            first_name,
            last_name,
            email,
            password
        })

        try {
            const res = await fetch('/api/users/register', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body,
			});

            const data = await res.json();

            if (res.status === 201) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const login = createAsyncThunk(
    'users/login',
    async ({ email, password }, thunkAPI) => {
        const body = JSON.stringify({
            email,
            password
        })

        try {
            const res = await fetch('/api/users/login', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body,
			});

            const data = await res.json();

            if (res.status === 200) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    registered: false,
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetRegistered: state => {
            state.registered = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, state => {
                state.loading = true;
            })
            .addCase(register.fulfilled, state => {
                state.loading = false;
                state.registered = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(login.pending, state => {
                state.loading = true;
            })
            .addCase(login.fulfilled, state => {
                state.loading = false;
            })
            .addCase(login.rejected, state => {
                state.loading = false;
            })
    },
})

export const { resetRegistered } = userSlice.actions
export default userSlice.reducer