"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

interface LoginFormProps {
  onSuccess: () => void
  onSwitchToSignUp: () => void
}

export default function LoginForm({ onSuccess, onSwitchToSignUp }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)

  const handleLogin = () => {
    if (email && password) {
      onSuccess()
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Status Bar */}
      <div className="px-4 pt-3 pb-2 flex justify-between items-center text-xs text-muted-foreground">
        <span>9:41</span>
        <div className="flex gap-1">
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-4 py-8 justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-8">Login Screen</h1>

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
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Checkbox */}
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

          <button className="text-sm text-primary font-semibold hover:underline mb-8">Forgot password?</button>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <Button
            onClick={handleLogin}
            disabled={!email || !password}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 rounded-lg disabled:opacity-50"
          >
            Login
          </Button>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">Or log in with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="flex gap-3">
            <button className="flex-1 h-12 border border-muted rounded-lg flex items-center justify-center hover:bg-muted/50">
              <span className="text-xl">🔍</span>
            </button>
            <button className="flex-1 h-12 border border-muted rounded-lg flex items-center justify-center hover:bg-muted/50">
              <span className="text-xl">f</span>
            </button>
            <button className="flex-1 h-12 border border-muted rounded-lg flex items-center justify-center hover:bg-muted/50">
              <span className="text-xl">🍎</span>
            </button>
          </div>

          <div className="text-center mt-4">
            <span className="text-sm text-muted-foreground">Don't have an account? </span>
            <button onClick={onSwitchToSignUp} className="text-sm text-primary font-semibold hover:underline">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
