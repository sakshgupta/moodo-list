const URL = "http://localhost:5001";
// Make an API call to create a new Moodo
export async function createMoodoAPI(email, task, tags) {
    const apiUrl = `${URL}/moodos/create`; 
    const requestBody = {
        task,
        tags,
        email,
    };

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    });

    return response;
}

// Make an API call to toggle Moodo completion status
export async function toggleMoodoCompletionAPI(email, id) {
    const apiUrl = `${URL}/moodos/${id}/toggle`; 
    const requestBody = {
        email, 
    };

    const response = await fetch(apiUrl, {
        method: "PUT", // Use the appropriate HTTP method for toggling
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    });

    return response;
}

// Make an API call to delete a Moodo by ID
export async function deleteMoodoAPI(email, id) {
    const apiUrl = `${URL}/moodos/${id}/delete`;
    const requestBody = {
        email, 
    };

    const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    });

    return response;
}

export async function editMoodoAPI(email, id, updatedTask, updatedTags) {
    try {
        const response = await fetch(`${URL}/moodos/${id}/edit`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                task: updatedTask,
                tags: updatedTags,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to edit Moodo");
        }

        const editedMoodo = await response.json();
        return editedMoodo;
    } catch (error) {
        console.error("Error editing Moodo:", error);
        throw error;
    }
}

export async function signupAPI(formData) {
    try {
        const response = await fetch(`${URL}/user/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        return response;
    } catch (error) {
        console.error("Error signing up:", error);
        throw error;
    }
}

export async function signinAPI(formData) {
    try {
        const response = await fetch(`${URL}/user/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        return response;
    } catch (error) {
        console.error("Error signing in:", error);
        throw error;
    }
}
