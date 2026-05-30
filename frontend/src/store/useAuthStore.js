import axios from 'axios'
import { create } from 'zustand'
import Signup from '../pages/Signup'
export const useAuthStore = create((set) => ({
    authUser: null,
    isLoadingUp: false,
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
    Signup: async() => {
        try {

        } catch (error) {
            console.log("error in signup", error);
            set({ authUser: null });
        } finally {
            set(isSi)
        }
    }
}))