const dbUsers = [
    { id: 1, email: "admin@gmail.com", password: "admin", role: "admin" },
    { id: 2, email: "salome@gmail.com", password: "salome", role: "user" }
]

function authenticate(email, password) {
    const user = dbUsers.find(u => u.email === email && u.password === password);
    if (!user) {
        return null;
    }
    return user;
};

module.exports = {
    authenticate
}
