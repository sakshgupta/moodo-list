import { useState } from "react";

function FilterPopup({ tags, onFilter, onClose, onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [clickedTag, setClickedTag] = useState(null); // Add state for the clicked tag

    const handleTagClick = (tag) => {
        if (clickedTag === tag) {
            // If the same tag is clicked again, reset the state
            setClickedTag(null);
        } else {
            // Otherwise, set the clicked tag
            setClickedTag(tag);
            // Call the onFilter function with the selected tag
            onFilter(tag);
        }
    };

    const handleSearch = () => {
        onSearch(searchTerm);
        onClose();
    };

    const filteredTags = tags.filter((tag) =>
        tag.toLowerCase().includes("")
    );

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-[#1a1c1e] rounded-lg p-4 shadow-md z-10">
                <div className="flex justify-between mb-2 bg-inherit">
                    <h2 className="text-lg font-semibold bg-inherit">
                        Filter Tags
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        Close
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Search moodos"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full mb-2"
                />
                <button
                    onClick={handleSearch}
                    className="bg-[#ffc37c] text-black rounded-md px-4 py-2 font-bold cursor-pointer mb-2"
                >
                    Search
                </button>
                <div className="tag-list bg-inherit">
                    {filteredTags.map((tag, index) => (
                        <button
                            key={index}
                            className={`tag cursor-pointer px-2 py-1 rounded-md mr-2 mb-2 ${
                                clickedTag === tag
                                    ? "bg-[#ffc37c] text-white"
                                    : "bg-black text-[#984bc2]"
                            }`}
                            onClick={() => handleTagClick(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FilterPopup;
