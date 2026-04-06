const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("userIdInput");
const status = document.getElementById("statusMessage");
const results = document.getElementById("resultContainer");

// Add event listener to the button
searchBtn.addEventListener("click", runSearch);

// --- The Function ---
async function runSearch() {
    const userId = searchInput.value.trim();

    // Clear previous results and status
    results.innerHTML = '';
    status.innerHTML = '';

    // If input is empty, show a message and stop
    if (!userId) {
        status.innerHTML = '<p class="error">Please enter a user ID.</p>';
        return; // Stops further execution
    }

    // --- Step 6: Build the API URL with the Search Term ---
    const apiUrl = `https://jsonplaceholder.typicode.com/posts?userId=${encodeURIComponent(userId)}`;

    // --- Step 7: Fetch the Data with async/await ---
    // Show loading state
    status.innerHTML = '<p class="loading">Loading...</p>';

    try {
        // Fetches posts for specific user
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const posts = await response.json();

        // Check if user exists/has posts
        if (posts.length === 0) {
            status.innerHTML = '<p>No posts found for this user.</p>';
            return;
        }

        // --- Step 8: Display the Results on the Page ---
        // Update status with count
        status.textContent = `Found ${posts.length} post(s) for User ${userId}.`;

        // Map data to HTML and inject into container
        results.innerHTML = posts.map(post => `
            <div class="post-card" style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
                <h3>${post.title}</h3>
                <p><strong>Post ID:</strong> ${post.id}</p>
                <p>${post.body}</p>
            </div>
        `).join("");

    } catch (error) {
        // Show error state
        status.innerHTML = `<p class="error">Something went wrong. Please try again.</p>`;
        console.error("Fetch error:", error);
    } finally {
        // Clear loading message regardless of success or failure
        if (status.innerHTML.includes('Loading...')) {
            status.innerHTML = '';
        }
    }
}
