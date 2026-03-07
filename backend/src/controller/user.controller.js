const { User } = require("../../models");

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