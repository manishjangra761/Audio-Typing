const db = require("../../models");


exports.addNewCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = await db.Category.create({ name });
        if (newCategory) {
            return res.status(200).json({ message: "Category added successfully" });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error" });
    }
}