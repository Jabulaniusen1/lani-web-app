"use client"

import { useState } from "react"
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

interface LoginFormProps {
  onSuccess: (email: string, password: string) => void
  onSwitchToSignUp: () => void
}

export default function LoginForm({ onSuccess, onSwitchToSignUp }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resetting, setResetting] = useState(false)

  // 🔹 LOGIN HANDLER
  const handleLogin = async () => {
    if (!email || !password) return
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      toast.success(`Welcome back, ${user.displayName || "User"} 🎉`, {
        style: {
          backgroundColor: "#FFF5E6",
          color: "#C25E00",
          border: "1px solid #FFD8A8",
        },
      })

      if (keepLoggedIn) {
        localStorage.setItem("keepLoggedIn", "true")
      } else {
        localStorage.removeItem("keepLoggedIn")
      }

      onSuccess(email, password)
    } catch (err: any) {
      console.error("Login failed:", err)
      toast.error("Invalid email or password. Please try again.", {
        style: {
          backgroundColor: "#FFF5E6",
          color: "#C25E00",
          border: "1px solid #FFD8A8",
        },
      })
    } finally {
      setLoading(false)
    }
  }

  // 🔹 PASSWORD RESET HANDLER
  const handlePasswordReset = async () => {
    if (!email) {
      toast.error("Please enter your email first.", {
        style: {
          backgroundColor: "#FFF5E6",
          color: "#C25E00",
          border: "1px solid #FFD8A8",
        },
      })
      return
    }

    setResetting(true)
    try {
      await sendPasswordResetEmail(auth, email)
      toast.success("Password reset email sent. Check your inbox 📩", {
        style: {
          backgroundColor: "#FFF5E6",
          color: "#C25E00",
          border: "1px solid #FFD8A8",
        },
      })
    } catch (err: any) {
      console.error("Password reset failed:", err)
      toast.error("Failed to send reset email. Try again later.", {
        style: {
          backgroundColor: "#FFF5E6",
          color: "#C25E00",
          border: "1px solid #FFD8A8",
        },
      })
    } finally {
      setResetting(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="flex-1 flex flex-col px-4 py-8 justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-8">Login</h1>

          {/* Form Fields */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Email Address</label>
              <Input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-white border-muted rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-white border-muted rounded-lg pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Keep logged in */}
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="keep-logged"
              checked={keepLoggedIn}
              onChange={(e) => setKeepLoggedIn(e.target.checked)}
              className="w-4 h-4 rounded border-muted"
            />
            <label htmlFor="keep-logged" className="text-sm text-foreground">
              Keep me logged in
            </label>
          </div>

          <button
            type="button"
            onClick={handlePasswordReset}
            disabled={resetting}
            className="text-sm text-primary font-semibold hover:underline mb-8 disabled:opacity-50"
          >
            {resetting ? "Sending reset link..." : "Forgot password?"}
          </button>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <Button
            onClick={handleLogin}
            disabled={loading || !email || !password}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 rounded-lg disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">Or log in with</span>
            </div>
          </div>

          <div className="text-center mt-4">
            <span className="text-sm text-muted-foreground">Don’t have an account? </span>
            <button
              onClick={onSwitchToSignUp}
              className="text-sm text-primary font-semibold hover:underline"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
