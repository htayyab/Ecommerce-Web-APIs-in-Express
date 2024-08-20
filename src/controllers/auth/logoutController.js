const logout = (req, res) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send({
            message: 'No token provided',
        });
    }
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict"
    });

    return res.status(200).json({
        message: "Logged out successfully"
    });
};

export default logout;
