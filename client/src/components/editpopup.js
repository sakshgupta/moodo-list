import { useState } from "react";

function EditPopup({
    editedTitle,
    editedTags,
    setEditedTitle,
    setEditedTags,
    saveEditedMoodo,
    closeEditPopup,
}) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSave = () => {
        saveEditedMoodo();
    };

    // Split the tags string into an array for display
    const tagsArray = editedTags.split(",").map((tag) => tag.trim());

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-[#1a1c1e] rounded-lg p-4 shadow-md z-10">
                <div className="flex justify-between mb-2 bg-inherit">
                    <h2 className="text-lg font-semibold bg-inherit">
                        Edit Moodo
                    </h2>
                    <button
                        onClick={closeEditPopup}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        Close
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Edit title"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full mb-2"
                    required
                />
                <input
                    type="text"
                    placeholder="Edit tags (comma-separated)"
                    value={editedTags}
                    onChange={(e) => setEditedTags(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full mb-2"
                    required
                />
                {/* Display tags as separate divs */}
                <div className="flex flex-wrap py-2">
                    {tagsArray.map((tag, index) => (
                        <div
                            key={index}
                            className="px-3 py-2 text-sm text-[#984bc2] rounded-lg ml-2 bg-[#1a1c1e]"
                        >
                            {tag}
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleSave}
                    className="bg-[#ffc37c] text-black rounded-md px-4 py-2 font-bold cursor-pointer mt-2"
                >
                    Save
                </button>
            </div>
        </div>
    );
}

export default EditPopup;
