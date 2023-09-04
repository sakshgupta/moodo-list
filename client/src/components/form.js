import FilterPopup from "@/components/filterpopup";
import { useMoodos } from "@/util/store";
import { useState } from "react";

function Form({ handleFilter, clearFilter, handleSearch }) {
    const [moodo, setMoodo] = useState("");
    const [tags, setTags] = useState("");
    const { moodos, handleAddMoodo } = useMoodos();

    const [showFilterPopup, setShowFilterPopup] = useState(false);
    const [isFilterActive, setIsFilterActive] = useState(false);

    const allTags = Array.from(new Set(moodos.flatMap((moodo) => moodo.tags)));

    const onClose = () => {
        setShowFilterPopup(false);
    };

    function handleFormSubmit(e) {
        e.preventDefault();

        // Split the tags input by comma and trim each tag
        const tagArray = tags.split(",").map((tag) => tag.trim());

        // Check if both moodo and tags are not empty
        if (moodo.trim() !== "" && tagArray.length > 0) {
            // Pass the moodo and tags to handleAddMoodo
            handleAddMoodo(moodo, tagArray);

            // Clear the inputs
            setMoodo("");
            setTags("");
        } else {
            // Handle validation error (e.g., show an error message)
            console.error("Both Moodo and Tags are required.");
        }
    }

    const handleClearFilter = () => {
        // Reset the filter
        setIsFilterActive(false);
        // Clear the input fields
        setMoodo("");
        setTags("");
        // Call the handleFilter function with an empty string to show all moodos
        clearFilter();
    };

    const handleFilterButtonClick = () => {
        // When the "Filter" button is clicked, set the filter as active
        setIsFilterActive(true);
        // Show the filter popup
        setShowFilterPopup(true);
    };

    return (
        <div>
            <form className="md:space-x-2" onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    placeholder="Write your moodo"
                    value={moodo}
                    onChange={(e) => setMoodo(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 max-w-96 mt-2 md:my-4 text-white"
                    required
                />
                <input
                    type="text"
                    placeholder="Tags (comma-separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 max-w-96 my-2 md:my-4 text-white"
                    required
                />
                <button
                    type="submit"
                    className="bg-[#ffc37c] text-black rounded-md px-4 py-2 mb-2 sm:m-2 font-bold cursor-pointer"
                >
                    ADD
                </button>
            </form>
            <button
                onClick={handleFilterButtonClick}
                className="bg-[#ffc37c] text-black rounded-md px-4 py-2 font-bold cursor-pointer mr-2"
            >
                Filter
            </button>
            {isFilterActive && (
                <button
                    onClick={handleClearFilter}
                    className="bg-[#ffc37c] text-black rounded-md px-4 py-2 font-bold cursor-pointer"
                >
                    Clear Filter
                </button>
            )}
            {showFilterPopup && (
                <FilterPopup
                    tags={allTags}
                    onFilter={handleFilter}
                    onClose={onClose}
                    onSearch={handleSearch}
                />
            )}
        </div>
    );
}

export default Form;
