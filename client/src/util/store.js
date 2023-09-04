"use client";

import {
    createMoodoAPI,
    deleteMoodoAPI,
    toggleMoodoCompletionAPI,
    editMoodoAPI,
} from "@/util/apiUtils";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import Cookies from "universal-cookie";

export const moodosContext = createContext(null);

export function MoodosProvider({ children }) {
    const cookies = new Cookies();

    const URL = "http://localhost:5001";
    const [moodos, setMoodos] = useState([]);
    const [auth, setAuth] = useState(null);

    const email = cookies.get("email");

    useEffect(() => {
        // Fetch the initial Moodos data from your API when the component mounts
        fetchMoodosData();
    }, []);

    async function fetchMoodosData() {
        try {
            // Make an API call to fetch the Moodos data
            const response = await fetch(`${URL}/moodos/${email}/get`);
            if (!response.ok) {
                throw new Error("Failed to fetch Moodos data");
            }
            const data = await response.json();
            console.log(data);
            setMoodos(data);
        } catch (error) {
            console.error("Error fetching Moodos data:", error);
        }
    }

    async function fetchAuthData() {
        try {
            if (email) {
                setAuth(email);
                console.log(auth);
            } else {
                setAuth(null);
            }
        } catch (error) {
            console.error("Error checking email cookie:", error);
            setAuth(null);
        }
    }

    async function handleAddMoodo(task, tags) {
        try {
            // Make an API call to create a new Moodo
            const response = await createMoodoAPI(email, task, tags); // Adjust the API function as needed
            if (!response.ok) {
                throw new Error("Failed to create Moodo");
            }
            // Refresh the Moodos data after a new Moodo is created
            fetchMoodosData();
        } catch (error) {
            console.error("Error creating Moodo:", error);
        }
    }

    async function toggleMoodoAsCompleted(id) {
        try {
            // Make an API call to toggle Moodo completion
            const response = await toggleMoodoCompletionAPI(email, id); // Adjust the API function as needed
            if (!response.ok) {
                throw new Error("Failed to toggle Moodo completion");
            }
            // Refresh the Moodos data after toggling completion status
            fetchMoodosData();
        } catch (error) {
            console.error("Error toggling Moodo completion:", error);
        }
    }

    async function handleDeleteMoodo(id) {
        try {
            // Make an API call to delete a Moodo
            const response = await deleteMoodoAPI(email, id); // Adjust the API function as needed
            if (!response.ok) {
                throw new Error("Failed to delete Moodo");
            }
            // Refresh the Moodos data after deleting a Moodo
            fetchMoodosData();
        } catch (error) {
            console.error("Error deleting Moodo:", error);
        }
    }

    async function editMoodo(id, updatedTask, updatedTags) {
        try {
            const editedMoodo = await editMoodoAPI(
                email,
                id,
                updatedTask,
                updatedTags
            );

            // Update the Moodos state with the edited Moodo
            setMoodos((prevMoodos) => {
                return prevMoodos.map((moodo) => {
                    if (moodo._id === id) {
                        // Replace the old Moodo with the edited one
                        return editedMoodo;
                    }
                    return moodo;
                });
            });
        } catch (error) {
            console.error("Error editing Moodo:", error);
            // Handle error, e.g., show an error message to the user
        }
    }

    return (
        <moodosContext.Provider
            value={{
                moodos,
                handleAddMoodo,
                toggleMoodoAsCompleted,
                handleDeleteMoodo,
                editMoodo,
                fetchAuthData,
                auth,
            }}
        >
            {children}
        </moodosContext.Provider>
    );
}

export function useMoodos() {
    const moodosContextValue = useContext(moodosContext);
    if (!moodosContextValue) {
        throw new Error("useMoodos used outside of Provider");
    }

    return moodosContextValue;
}
