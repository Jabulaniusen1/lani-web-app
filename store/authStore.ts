import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { auth, db } from "@/lib/firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import type { AuthState } from "@/types/index"

//  safe storage (avoids Next.js SSR issues)
const safeStorage = createJSONStorage(() => {
  if (typeof window !== "undefined") return localStorage
  return {
    getItem: (_key: string) => null,
    setItem: (_key: string, _value: string) => {},
    removeItem: (_key: string) => {},
    length: 0,
    clear: () => {},
    key: (_index: number) => null,
  } as Storage
})

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,

      //  Sign up user and create Firestore profile
      signup: async (email: string, password: string, phone: string) => {
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
          set({ error: error.message || "Signup failed", loading: false })
        }
      },

      // Login user
      login: async (email: string, password: string) => {
        set({ loading: true, error: null })
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password)
          set({ user: userCredential.user, loading: false })
        } catch (error: any) {
          console.error("Login error:", error)
          set({ error: error.message || "Login failed", loading: false })
        }
      },

      // Logout user
      logout: async () => {
        try {
          await signOut(auth)
          set({ user: null })
        } catch (error: any) {
          set({ error: error.message || "Logout failed" })
        }
      },

      //  Fetch Firestore profile
      fetchUserProfile: async (uid: string) => {
        try {
          const snapshot = await getDoc(doc(db, "users", uid))
          return snapshot.exists() ? snapshot.data() : null
        } catch (error: any) {
          console.error("Profile fetch error:", error)
          set({ error: error.message || "Failed to fetch profile" })
          return null
        }
      },

      // Set user manually (e.g., after login)
      setUser: (user: User | null) => set({ user }),

      // Clear error messages
      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-store",
      storage: safeStorage, // prevents persist warning
      partialize: (state) => ({ user: state.user }), // store only user
    }
  )
)

//  Sync Zustand with Firebase auth state
onAuthStateChanged(auth, (user) => {
  const { setUser } = useAuthStore.getState()
  setUser(user)
})
