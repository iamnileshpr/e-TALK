import axios from 'axios'
import { create } from 'zustand'
import Signup from '../pages/Signup'
export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,

    checkAuth: async() => {
        try {
            const { data } = await axios.get('/users/check')
            set({ authUser: data })
        } catch (error) {
            console.log("error in authcheck", error)
            set({
                authUser: null
            })
        } finally {
            set({ isCheckingAuth: false })
        }
    },
    Signup: async(data) => {
        set({
            isSigningUp: true
        });

        try {
            const res = await axios.post('/users/signup', data)
            set({
                authUser: res.data
            })
            toast.success(res.data.message)

        } catch (error) {
            console.log("error in signup", error);
            toast.success(error.response.data.message)
        } finally {
            set({ isSigningUp: false })
        }
    }
}))