export async function getUserProfile({ id }) {
    const users = {
        1: { id: 1, name: "Alice", email: "alice@example.com" },
        2: { id: 2, name: "Bob", email: "bob@example.com" },
    };

    return users[id] || { error: "User not found" };
}