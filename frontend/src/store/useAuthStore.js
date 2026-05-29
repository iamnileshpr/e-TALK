import axios from 'axios'
import { create } from 'zustand'
const useAuthStore = create((set) => ({
    authUser: null,
    isLoadingUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,

    checkAuth: async() => {
        try {
            const { data } = await axios.get('/users/check')
        } catch (error) {
            console.log("error in authcheck", error)
            set({
                authUser: null
            })
        }
    }

}))