export const tagLoader = async (method, endpoint, data = null) => {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        ...(data && { body: JSON.stringify(data) }),
    };

    try {
        const response = await fetch(endpoint, options);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server Error: ${response.status} - ${errorText}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Failed to load data:", error);
        throw error;
    }
};

// Fetch all tags
export const fetchTags = () => tagLoader('GET', '/api/tags/all');

// Fetch tags by pin Id
export const fetchTagsByPinId = (pinId) => tagLoader('GET', `/api/tags/pin/${pinId}`)  ;

// Create a new tag
export const createTag = (data) => tagLoader('POST', '/api/tags/new', data);

// Add (multiple) tag(s) to a pin
export const addTagsToPin = (pinId, tagIds) => {
    return tagLoader('POST', `/api/pintags/pin/${pinId}/tags/add`, { tag_ids: tagIds });
  };

// Edit an existing tag
export const updateTag = (tagId, data) => tagLoader('PUT', `/api/tags/${tagId}`, data);

// Delete tag(s) from a pin
export const removeTagsFromPin = (pinId, tagIds) => {
    return tagLoader('DELETE', `/api/pintags/pin/${pinId}/tags/delete`, { tag_ids: tagIds });
  };

// Delete a user-created tag
export const deleteUserCreatedTag = (tagId) => tagLoader('DELETE', `/api/tags/${tagId}`);
