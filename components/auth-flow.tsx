"use client"

import { useState, useEffect } from "react"
import SignUpForm from "@/components/auth/sign-up-form"
import LoginForm from "@/components/auth/login-form"
import OTPVerification from "@/components/auth/otp-verification"
import VerificationSuccess from "@/components/auth/verification-success"
import { auth, db } from "@/lib/firebase"
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  UserCredential,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { toast } from "sonner"
import { useAuthStore } from "@/store/authStore"
import {Spinner} from "@/components/ui/spinner"

type AuthStep = "login" | "signup" | "otp" | "success"

interface AuthFlowProps {
  onComplete: () => void
}

export default function AuthFlow({ onComplete }: AuthFlowProps) {
  const [currentStep, setCurrentStep] = useState<AuthStep>("login")
  const [fullName, setFullName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userPhone, setUserPhone] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [confirmationResult, setConfirmationResult] = useState<any>(null)
  const [firebaseError, setFirebaseError] = useState("")
  const [checking, setChecking] = useState(true)

  // Zustand store
  const {  setUser, login, } = useAuthStore()

  //  Auto-login if Firebase session exists
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
        const userData = userDoc.exists() ? userDoc.data() : {}

        setUser(firebaseUser)
        toast.success(`Welcome back, ${userData?.fullName || firebaseUser.displayName || "User"}!`)
        onComplete()
      }
      setChecking(false)
    })
    return () => unsubscribe()
  }, [setUser, onComplete])

  const handleSignUpNext = async (fullName: string, email: string, phone: string, password: string) => {
    setFullName(fullName)
    setUserEmail(email)
    setUserPhone(phone)
    setUserPassword(password)
    setFirebaseError("")

    try {
      const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", { size: "invisible" })
      const result = await signInWithPhoneNumber(auth, phone, recaptchaVerifier)
      setConfirmationResult(result)
      setCurrentStep("otp")
      toast.success("OTP sent successfully to your phone number!")
    } catch (err: any) {
      console.error(err)
      setFirebaseError(err.message)
      toast.error("Failed to send OTP. Please try again.")
    }
  }

  const handleOTPVerify = async (code: string) => {
    if (!confirmationResult) return
    try {
      await confirmationResult.confirm(code)

      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, userEmail, userPassword)
      const firebaseUser = userCredential.user

      await updateProfile(firebaseUser, { displayName: fullName })
      await sendEmailVerification(firebaseUser)

      await setDoc(doc(db, "users", firebaseUser.uid), {
        fullName,
        email: userEmail,
        phone: userPhone,
        createdAt: new Date(),
      })

         await setDoc(doc(db, "user_profiles", firebaseUser.uid), {
        userId: firebaseUser.uid,
        fullName,
        phone: "",
        address: "",
        photoURL: "",
      updatedAt: new Date().toISOString(),
    })

      setUser(firebaseUser)
      toast.success("Your account has been verified successfully 🎉")
      setCurrentStep("success")
    } catch (err: any) {
      console.error(err)
      setFirebaseError(err.message)
      toast.error("Invalid OTP or verification failed.")
    }
  }

  const handleLogin = async (email: string, password: string) => {
    try {
      await setPersistence(auth, browserLocalPersistence)
      await login(email, password)

      if (useAuthStore.getState().user) {
        toast.success("Login successful. Welcome back! 🍽️")
        onComplete()
      }
    } catch (error: any) {
      console.error(error)
      toast.error("Login failed. Please check your credentials.")
    }
  }

  const handleSwitchToLogin = () => setCurrentStep("login")
  const handleSwitchToSignUp = () => setCurrentStep("signup")
  const handleSuccessComplete = () => onComplete()

  if (checking) {
    return (
      <div className="flex items-center justify-center h-screen">
      <Spinner className='w-6 h-6 text-primary'/>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <div id="recaptcha-container" />

      {currentStep === "login" && (
        <LoginForm onSuccess={handleLogin} onSwitchToSignUp={handleSwitchToSignUp} />
      )}

      {currentStep === "signup" && (
        <SignUpForm onNext={handleSignUpNext} onSwitchToLogin={handleSwitchToLogin} />
      )}

      {currentStep === "otp" && confirmationResult && (
        <OTPVerification
          confirmationResult={confirmationResult}
          onVerify={handleOTPVerify}
          error={firebaseError}
        />
      )}

      {currentStep === "success" && <VerificationSuccess onComplete={handleSuccessComplete} />}
    </div>
  )
}
