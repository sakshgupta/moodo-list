"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect,
} from "react";
import dummyMoodos from "./dummyMoodos";

export const moodosContext = createContext(null);

export function MoodosProvider({ children }) {
    const [moodos, setMoodos] = useState([]);

    useEffect(() => {
        // Initialize moodos with dummyMoodos when the component mounts
        setMoodos(dummyMoodos);
        console.log(moodos);
    }, []);

    function handleAddMoodo(task, tags) {
        setMoodos((prev) => {
            const newMoodos = [
                {
                    id: Math.floor(Math.random() * 100) + 1, // Random ID between 1 and 100
                    task,
                    tags, // Store tags in the Moodo object
                    completed: false,
                    createdAt: new Date(),
                },
                ...prev,
            ];
            localStorage.setItem("moodos", JSON.stringify(newMoodos));
            return newMoodos;
        });
    }


    const toggleMoodoAsCompleted = (id) => {
        setMoodos((prev) => {
            const newMoodos = prev.map((task) => {
                if (task.id === id) {
                    return { ...task, completed: !task.completed };
                }
                return task;
            });
            localStorage.setItem("moodos", JSON.stringify(newMoodos));
            return newMoodos;
        });
    };

    function handleDeleteMoodo(id) {
        setMoodos((prev) => {
            const newMoodos = prev.filter((task) => task.id !== id);
            localStorage.setItem("moodos", JSON.stringify(newMoodos));
            return newMoodos;
        });
    }

    return (
        <moodosContext.Provider
            value={{
                moodos,
                handleAddMoodo,
                toggleMoodoAsCompleted,
                handleDeleteMoodo,
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
