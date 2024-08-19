
const logout=(req, res) => {
    // Fetch the token from cookies
    const token = req.cookies.token;

    if (!token) {
        return res.status(400).json({ message: 'User is not logged in' });
    }

    // Clear the token cookie
    res.clearCookie('token');

    // Send a success message
    return res.status(200).json({ message: 'Logged out successfully' });
}
export default logout;