const path = require('path');
const db = require('../../models');

exports.addNewAudio = async (req, res) => {
  try {
    console.log(req.body , "=========-----------")
    const { category_id, language, correct_text, title, duration } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Audio file is required' });
    }

    // Save in DB
    const audio = await db.Audio.create({
      category_id,
      language,
      audio_file: req.file.filename, // saved filename
      audio_path: `audios/${req.file.filename}`, // relative path
      correct_text,
      title,
      duration,
    });

    return res.status(200).json({ message: 'Audio uploaded successfully', audio });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
