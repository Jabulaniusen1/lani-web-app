import { create } from "zustand";
import { db } from "@/lib/firebase";
import { doc,setDoc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthStore } from "@/store/authStore";

interface Profile {
  fullName: string;
  phone?: string;
  address?: string;
  photoURL?: string;
  userId?: string;
}

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;

  fetchProfile: () => Promise<void>;
  updateProfile: (
    data: Partial<Omit<Profile, "fullName">> & { fullName?: string }
  ) => Promise<void>;
  setProfile: (profile: Profile) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: null,
  loading: false,
  error: null,

  // 🔹 Fetch profile of the currently logged-in user
  fetchProfile: async () => {
    const authUser = useAuthStore.getState().user;
    if (!authUser) {
      set({ profile: null });
      return;
    }

    set({ loading: true, error: null });
    try {
      const docRef = doc(db, "user_profiles", authUser.uid);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        set({ profile: snapshot.data() as Profile, loading: false });
      } else {
        set({ profile: null, loading: false });
      }
    } catch (error: any) {
      console.error("Fetch profile error:", error);
      set({ error: error.message, loading: false });
    }
  },

  // 🔹 Update profile of the currently logged-in user
  updateProfile: async (data) => {
    const authUser = useAuthStore.getState().user;
    if (!authUser) {
      set({ error: "No logged-in user" });
      return;
    }

    set({ loading: true, error: null });

    try {
      const docRef = doc(db, "user_profiles", authUser.uid);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        // Document exists → update
        await updateDoc(docRef, {
          ...data,
          updatedAt: new Date().toISOString(),
        });
      } else {
        // Document does not exist → create
        await setDoc(docRef, {
          userId: authUser.uid,
          ...data,
          updatedAt: new Date().toISOString(),
        });
      }

      // Update local state
      set({
        profile: { ...(get().profile || {}), ...data } as Profile,
        loading: false,
      });
    } catch (error: any) {
      console.error("Update profile error:", error);
      set({ error: error.message, loading: false });
    }
  },

  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: null, error: null }),
}));
