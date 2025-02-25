import { create } from "zustand";

type State = {
  step: number;
};

type Action = {
  setNextStep: (step: State["step"]) => void;
  setPrevStep: (step: State["step"]) => void;
};

export const useOnboardingStore = create<State & Action>((set) => ({
  step: 0,
  setNextStep: () => set((state) => ({ step: state.step + 1 })),
  setPrevStep: () => set((state) => ({ step: state.step - 1 })),
  resetForm: () => set((state) => ({ step: (state.step = 0) })),

  //   form
}));
