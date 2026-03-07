const { User } = require("../../models");

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.user_id, {
            attributes: ["id", "name", "email", "phone", "type", "status"]
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const admins = await User.findAll({
            where: {
                type: "user"
            },
            attributes: ["id", "name", "email", "phone", "type", "status"]
        });
        return res.status(200).json({ admins });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
    }
}