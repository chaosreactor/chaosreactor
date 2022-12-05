import create from 'zustand';

interface AppState {
  commandBarOpen: boolean;
  setCommandBarOpen: (open: boolean) => void;
}

const useAppStore = create<AppState>((set) => ({
  commandBarOpen: false,
  setCommandBarOpen: (open: boolean) => set({ commandBarOpen: open }),
}));

export default useAppStore;
