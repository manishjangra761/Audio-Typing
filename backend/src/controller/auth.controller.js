const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const jwt_config = require('../../config/jwt.config')
const refreshTokenSecret = jwt_config.refreshTokenSecret
const accessTokenSecret = jwt_config.accessTokenSecret
const saltRounds = jwt_config.saltRounds
const jwt_timeout = jwt_config.jwt_timeout

exports.login = async (req, res) => {

    try {
        const { email, pass } = req.body;

        let accessToken;
        let refreshToken;

        if (!email || !pass) {
            return res.status(400).json({ message: "Missing email or password", accessToken: null, refreshToken: null });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        if (user.status !== "active") {
            return res.status(403).json({ message: "Account inactive" });
        }

        if (user) {
            let match;
            let password = pass

            // if (person.isTempPassExists == true) {
            //     match = password == user.password
            //     // if (match) {
            //     //     const { userId } = EncryptedIDForOneTimeUser(person.id)
            //     //     return res.json({ redirectTo: `/forget-password?id=${userId.encryptedId}&iv=${userId.iv}&reset_password=${true}&email=${email}` });
            //     // }
            // } else {
            match = await bcrypt.compare(password, user.password);

            // }

            if (match) {
                const payload = {
                    user_id: user.id,
                    role: user.type
                }
                accessToken = jwt.sign(payload, accessTokenSecret, { expiresIn: jwt_timeout })
                refreshToken = jwt.sign(payload, refreshTokenSecret, { expiresIn: '7d' });
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",          // true in production
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000
                })
                    .set("Authorization", `Bearer ${accessToken}`)
                    .status(200)
                    .json({ message: "Login successful", accessToken: accessToken, refreshToken: refreshToken });
            } else {
                return res.status(401).json({ message: "Invalid email or password" });
            }
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });

    }
}

exports.logout = (req, res) => {

    console.log(req.headers , "================")
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    return res.status(200).json({ message: "Logged out successfully" });
};




exports.addSuperAdmin = async (req, res) => {
    try {
        const { name, email, phone, password, type, status } = req.body;

        const salt = jwt_config.saltRounds;

        let newHashedPassword = await bcrypt.hash(password, salt);

        const newSuperAdmin = await User.create({
            name,
            email,
            phone,
            password: newHashedPassword,
            type,
            status,
        });

        if (newSuperAdmin) {
            return res.status(200).json({ message: "Super admin added successfully" });
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
    }
}
