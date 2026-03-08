const { User } = require("../../models");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            where: {
                type: "user"
            },
            attributes: ["id", "name", "email", "phone", "type", "status"]
        });
        return res.status(200).json({ users });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
    }
}


exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.destroy({
            where: { id }
        });
        if (deletedUser) {
            return res.status(200).json({ message: "User deleted successfully" });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const whereClause = {
            id
        }

        if (req.body.email || req.body.phone) {
            const orConditions = [];

            if (req.body.email) {
                orConditions.push({ email: req.body.email });
            }

            if (req.body.phone) {
                orConditions.push({ phone: req.body.phone });
            }

            const duplicate = await User.findOne({
                where: {
                    id: { [Op.ne]: id },
                    [Op.or]: orConditions
                }
            });

            if (duplicate) {
                return res.status(400).json({
                    message: "Email or Mobile already exists"
                });
            }
        }

        const updatedUser = await User.update(req.body, { where: whereClause });
        if (updatedUser) {
            return res.status(200).json({ message: "User updated successfully" });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
        }
    }