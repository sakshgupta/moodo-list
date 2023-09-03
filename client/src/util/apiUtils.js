const URL = "http://localhost:5001";
// Make an API call to create a new Moodo
export async function createMoodoAPI(task, tags) {
    const apiUrl = `${URL}/moodos/create`; // Replace with your actual API endpoint
    const requestBody = {
        task,
        tags,
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
export async function toggleMoodoCompletionAPI(id) {
    const apiUrl = `${URL}/moodos/${id}/toggle`; // Replace with your actual API endpoint

    const response = await fetch(apiUrl, {
        method: "PUT", // Use the appropriate HTTP method for toggling
    });

    return response;
}

// Make an API call to delete a Moodo by ID
export async function deleteMoodoAPI(id) {
    const apiUrl = `${URL}/moodos/${id}/delete`; // Replace with your actual API endpoint

    const response = await fetch(apiUrl, {
        method: "DELETE",
    });

    return response;
}
