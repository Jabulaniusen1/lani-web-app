
import { User } from "firebase/auth"
export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null

  signup: (email: string, password: string, phone: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  fetchUserProfile: (uid: string) => Promise<any>
  setUser: (user: User | null) => void
  clearError: () => void
}