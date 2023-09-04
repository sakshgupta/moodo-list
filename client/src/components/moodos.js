import { useMoodos } from "@/util/store";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import EditPopup from "./editpopup";


function Moodos({ allMoodos }) {
    const { editMoodo, toggleMoodoAsCompleted, handleDeleteMoodo } = useMoodos();
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [editingMoodo, setEditingMoodo] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedTags, setEditedTags] = useState("");

    // filter for mooing and mooed
    const searchParams = useSearchParams();
    const moodosFilter = searchParams.get("moodos");

    let filteredMoodos = allMoodos;

    if (moodosFilter === "mooing") {
        filteredMoodos = allMoodos.filter((moodo) => !moodo.completed);
    } else if (moodosFilter === "mooed") {
        filteredMoodos = allMoodos.filter((moodo) => moodo.completed);
    }


    // for edit popup
    const openEditPopup = (moodo) => {
        setEditingMoodo(moodo);
        setEditedTitle(moodo.task);
        setEditedTags(moodo.tags.join(", "));
        setIsEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setIsEditPopupOpen(false);
        setEditingMoodo(null);
    };

    const saveEditedMoodo = async () => {
        if (!editedTitle) {
            alert("Title is required.");
            console.error("Title is required.");
            return;
        }

        const editedTagsArray = editedTags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "");

        if (editingMoodo) {
            try {
                // Call the editMoodo function from your store to update the Moodo
                await editMoodo(editingMoodo._id, editedTitle, editedTagsArray);

                // Close the edit popup
                closeEditPopup();
            } catch (error) {
                console.error("Error editing Moodo:", error);
            }
        }
    };



    return (
        <ul className="flex flex-wrap gap-6 ml-5 p-5">
            {filteredMoodos.map((moodo) => (
                <li key={moodo._id} className="group relative">
                    <div className="w-64 p-4 bg-[#1a1c1e] rounded-lg transition-transform transform hover:bg-[#ffc37c] hover:scale-105">
                        <div className="flex items-center bg-inherit gap-x-2 mb-2">
                            {/* Checkbox */}
                            <input
                                type="checkbox"
                                id={`moodo-${moodo._id}`}
                                checked={moodo.completed}
                                onChange={() => {
                                    toggleMoodoAsCompleted(moodo._id);
                                }}
                                className="mr-2 regular-checkbox"
                            />
                            <label
                                htmlFor={`moodo-${moodo._id}`}
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
                            onClick={() => openEditPopup(moodo)}
                            className="mt-4 mr-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Edit
                        </button>

                        <button
                            type="button"
                            onClick={() => handleDeleteMoodo(moodo._id)}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
            {isEditPopupOpen && (
                <EditPopup
                    editedTitle={editedTitle}
                    editedTags={editedTags}
                    setEditedTitle={setEditedTitle}
                    setEditedTags={setEditedTags}
                    saveEditedMoodo={saveEditedMoodo}
                    closeEditPopup={closeEditPopup}
                />
            )}
        </ul>
    );
}

export default Moodos;
