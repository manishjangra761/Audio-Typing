const db = require("../../models");
const { Op, fn, col, where } = require("sequelize");


exports.getAllMessages = async (req, res) => {
    try {

        const { form_type, status } = req.query;

        let whereCondition = {};

        if (form_type) {
            whereCondition.form_type = form_type;
        }

        if (status) {
            whereCondition.status = status;
        }

        const messages = await db.Contact.findAll({
            where: whereCondition,
            order: [["created_at", "DESC"]]
        });

        return res.status(200).json({
            messages
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};



exports.addNewMessage = async (req, res) => {
    try {
        const { name, email, phone, message, form_type } = req.body;
        if (!name || !email || !phone || !message) {
            return res.status(400).json({ message: "Missing required fields" });
        }


        const newMessage = await db.ContactMessage.create(
            {
                name,
                email,
                phone,
                message,
                form_type,
            }
        );
        if (newMessage) {
            res.status(200).json({ message: "Message added successfully" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.markMessageRead = async (req, res) => {
    try {

        const { id } = req.params;

        const [updatedRows] = await db.Contact.update(
            { status: "read" },
            { where: { id } }
        );

        if (!updatedRows) {
            return res.status(404).json({ message: "Message not found" });
        }

        return res.json({ message: "Message marked as read" });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
