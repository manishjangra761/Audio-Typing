const { raw } = require("express");
const db = require("../../models");

exports.addResult = async (req, res) => {
  try {
    const { user_id } = req.user;
    const { typed_text, audio_id } = req.body;

    // 1️⃣ Get correct text
    const audioData = await db.Audio.findOne({
      where: { id: audio_id },
      attributes: ["correct_text"],
      raw: true,
    });

    if (!audioData) {
      return res.status(404).json({ message: "Audio not found" });
    }

    const correctText = audioData.correct_text || "";

    // 2️⃣ Normalize
    const normalize = (text) =>
      text
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s]/gu, "")
        .replace(/\s+/g, " ")
        .trim();

    const userText = normalize(typed_text || "");
    const originalText = normalize(correctText);

    // 3️⃣ Split
    const userWords = userText ? userText.split(" ") : [];
    const originalWords = originalText ? originalText.split(" ") : [];

    const totalWords = originalWords.length;

    // 4️⃣ Compare
    let correctWords = 0;

    for (let i = 0; i < totalWords; i++) {
      if (userWords[i] && userWords[i] === originalWords[i]) {
        correctWords++;
      }
    }

    const wrongWords = totalWords - correctWords;

    // 5️⃣ Accuracy safe
    const accuracy =
      totalWords > 0 ? ((correctWords / totalWords) * 100).toFixed(2) : "0.00";

    // 6️⃣ Score
    const score = correctWords;

    // 7️⃣ Attempt logic (get last attempt)
    const lastAttempt = await db.Attempt.findOne({
      where: { user_id, audio_id },
      order: [["attempt_type", "DESC"]],
      attributes: ["attempt_type"],
      raw: true,
    });

    let attempt_type = lastAttempt ? lastAttempt.attempt_type + 1 : 1;

    // 8️⃣ Save
    await db.Attempt.create({
      user_id,
      audio_id,
      attempt_type,
      typed_text,
      correct_words: correctWords,
      wrong_words: wrongWords,
      accuracy,
      score,
    });

    return res.status(200).json({
      message: "Result Added Successfully",
      totalWords,
      correctWords,
      wrongWords,
      accuracy,
      score,
      attempt_type,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

