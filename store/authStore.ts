import { create } from "zustand"
import { persist } from "zustand/middleware"
import { auth, db } from "@/lib/firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import type {AuthState} from '@/types/index'



export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,

      // 🔹 Sign up user and create a Firestore profile
      signup: async (email, password, phone) => {
        set({ loading: true, error: null })
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password)
          const user = userCredential.user

          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email,
            phone,
            createdAt: new Date().toISOString(),
          })

          set({ user, loading: false })
        } catch (error: any) {
          console.error("Signup error:", error)
          set({ error: error.message, loading: false })
        }
      },

      // 🔹 Login user
      login: async (email, password) => {
        set({ loading: true, error: null })
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password)
          const user = userCredential.user
          set({ user, loading: false })
        } catch (error: any) {
          console.error("Login error:", error)
          set({ error: error.message, loading: false })
        }
      },

      // 🔹 Logout user
      logout: async () => {
        try {
          await signOut(auth)
          set({ user: null })
        } catch (error: any) {
          set({ error: error.message })
        }
      },

      // 🔹 Fetch profile (from Firestore)
      fetchUserProfile: async (uid) => {
        try {
          const docRef = doc(db, "users", uid)
          const snapshot = await getDoc(docRef)
          return snapshot.exists() ? snapshot.data() : null
        } catch (error: any) {
          console.error("Profile fetch error:", error)
          set({ error: error.message })
          return null
        }
      },

      // 🔹 Manually set user (useful for restoring auth state)
      setUser: (user) => set({ user }),

      // 🔹 Clear error
      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-store", // localStorage key
      partialize: (state) => ({ user: state.user }), // Persist only user
    }
  )
)

// Optional: Automatically sync Firebase auth state
onAuthStateChanged(auth, (user) => {
  const { setUser } = useAuthStore.getState()
  setUser(user)
})
