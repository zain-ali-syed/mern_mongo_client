import { useEffect } from "react";
import Exercise from "../components/Exercise";
import Form from "../components/Form";
import { useExerciseContext } from "../contexts/ExerciseContext";

const Home = () => {
  //we have lifted state up to a the ExerciseProvider
  // State for exercises is now managed by the ExerciseContextProvider
  // and can be shared across components using the useExerciseContext hook
  const { exercises, setExercises } = useExerciseContext();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        //note added a proxy to the vite config file
        const response = await fetch("/api/exercises");
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

        const exercises = await response.json();
        setExercises(exercises);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, [setExercises]);

  return (
    <div className="md:flex gap-8">
      <div className="md:w-3/4">
        <h1 className="font-bold text-2xl mb-8">Exercises</h1>
        <div>
          {exercises.map(({ title, load, reps, createdAt, _id }) => (
            <Exercise title={title} load={load} reps={reps} createdAt={createdAt} _id={_id} />
          ))}
        </div>
      </div>
      <div className="md:w-1/4">
        <Form />
      </div>
    </div>
  );
};

export default Home;
