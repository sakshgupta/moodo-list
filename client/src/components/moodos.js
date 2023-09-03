import { useMoodos } from "@/util/store";
import { useSearchParams } from "next/navigation";

function Moodos({ allMoodos }) {
    const { toggleMoodoAsCompleted, handleDeleteMoodo } = useMoodos();

    const searchParams = useSearchParams();
    const moodosFilter = searchParams.get("moodos");

    let filteredMoodos = allMoodos;

    if (moodosFilter === "active") {
        filteredMoodos = allMoodos.filter((moodo) => !moodo.completed);
    } else if (moodosFilter === "completed") {
        filteredMoodos = allMoodos.filter((moodo) => moodo.completed);
    }

    return (
        <ul className="flex flex-wrap gap-6 ml-5 p-5">
            {filteredMoodos.map((moodo) => (
                <li key={moodo.id} className="group relative">
                    <div className="w-64 p-4 bg-[#1a1c1e] rounded-lg transition-transform transform hover:bg-[#ffc37c] hover:scale-105">
                        <div className="flex items-center bg-inherit gap-x-2 mb-2">
                            {/* Checkbox */}
                            <input
                                type="checkbox"
                                id={`moodo-${moodo.id}`}
                                checked={moodo.completed}
                                onChange={() => {
                                    toggleMoodoAsCompleted(moodo.id);
                                }}
                                className="mr-2 regular-checkbox"
                            />
                            <label
                                htmlFor={`moodo-${moodo.id}`}
                                className="custom-checkbox"
                            ></label>
                            {/* Created At */}
                            <p className="text-xs bg-inherit text-gray-300 group-hover:text-black">
                                {new Date(moodo.createdAt).toLocaleString()}{" "}
                                {/* Assuming `createdAt` exists in moodo */}
                            </p>
                        </div>

                        {/* Task title */}
                        <h3
                            className={`mb-4 bg-inherit ${
                                moodo.completed ? "line-through text-white" : ""
                            } group-hover:text-black`}
                        >
                            {moodo.task}
                        </h3>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 bg-inherit">
                            {moodo.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-2 text-sm text-[#984bc2] rounded-lg group-hover:text-white"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => handleDeleteMoodo(moodo.id)}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default Moodos;
