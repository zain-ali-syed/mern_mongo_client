import { createContext, useContext, useState } from "react";

type Exercise = {
  title: string;
  load: number;
  reps: number;
  createdAt: string;
  _id: string;
};

type ExerciseContextProviderProps = {
  children: React.ReactNode;
};

type ExerciseContextType = {
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
};

const ExerciseContext = createContext<ExerciseContextType | null>(null);

//PROVIDER
const ExerciseContextProvider = ({ children }: ExerciseContextProviderProps) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  return (
    <ExerciseContext.Provider value={{ exercises, setExercises }}>
      {children}
    </ExerciseContext.Provider>
  );
};

//CUSTOM USECONTEXT HOOK
// eslint-disable-next-line react-refresh/only-export-components
export const useExerciseContext = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error("Are you using the component outside the ExerciseContextProvider?");
  }

  return context;
};

export { ExerciseContext, ExerciseContextProvider };
