import { useExerciseContext } from "../contexts/ExerciseContext";
import { formatToReadableDate } from "../utils/dateFormatter";
import { formatDistanceToNow } from "date-fns";
import { FaTrash } from "react-icons/fa";

interface Props {
  title: string;
  load: number;
  reps: number;
  createdAt: string;
  _id: string;
}

const Exercise = ({ title, load, reps, createdAt, _id }: Props) => {
  const { exercises, setExercises } = useExerciseContext();

  const deleteExercise = async (_id: string) => {
    const response = await fetch(`/api/exercises/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) return;

    const updatedExercises = exercises.filter((exercise) => exercise._id !== _id);
    setExercises(updatedExercises);
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-md px-8 py-4 mb-4 flex justify-between">
      <div>
        <h1 className="font-bold text-green-800 text-xl mb-2">{title}</h1>
        <p>
          <span className="font-semibold">Load: </span>
          {load}
        </p>
        <p>
          <span className="font-semibold">Reps: </span> {reps}
        </p>
        <p>
          <span className="font-semibold">Created on: </span>{" "}
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </p>
      </div>
      <div>
        <FaTrash onClick={() => deleteExercise(_id)} />
      </div>
    </div>
  );
};

export default Exercise;
