import { useState } from "react";
import { useExerciseContext } from "../contexts/ExerciseContext";

const Form = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");
  const [errorFields, setErrorFields] = useState([]);
  const { exercises, setExercises } = useExerciseContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const exercise = { title, load, reps };

    try {
      const response = await fetch("/api/exercises", {
        method: "POST",
        body: JSON.stringify(exercise),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Parse the JSON response
      const result = await response.json();

      if (!response.ok) {
        console.log("response is ", result.errorFields);
        setErrorFields(result.errorFields);
        return; // Exit early if there was an error
      }

      setExercises([result, ...exercises]);
      setErrorFields([]);
    } catch (error) {
      // Handle network errors or unexpected issues
      console.error("Error occurred:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <h1 className="font-bold text-xl mb-8">Add new exercise</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="title" className="font-semibold mb-2">
            Exercise Title:
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="load" className="font-semibold mb-2">
            Load (in kg):
          </label>
          <input type="text" name="load" value={load} onChange={(e) => setLoad(e.target.value)} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="reps" className="font-semibold mb-2">
            Numer of reps:
          </label>
          <input type="text" name="reps" value={reps} onChange={(e) => setReps(e.target.value)} />
        </div>
        <button
          type="submit"
          className="bg-green-800 text-white font-semibold py-2 px-4 rounded-md mt-4"
        >
          Add Exercise
        </button>
        {errorFields.length > 0 && (
          <p className="bg-red-600 font-bold p-4 text-white rounded-md">
            {errorFields.map((error) => (
              <p>{error}</p>
            ))}
          </p>
        )}
      </form>
    </>
  );
};

export default Form;
