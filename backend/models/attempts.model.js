module.exports = (sequelize, DataTypes) => {
  const Attempt = sequelize.define(
    "Attempt",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      audio_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      typed_text: {
        type: DataTypes.TEXT,
        allowNull: false
      },

      accuracy: {
        type: DataTypes.FLOAT,
        allowNull: false
      },

      score: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: "attempts",
      timestamps: true
    }
  );

  Attempt.associate = models => {
    Attempt.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE"
    });

    Attempt.belongsTo(models.Audio, {
      foreignKey: "audio_id",
      as: "audio",
      onDelete: "CASCADE"
    });
  };

  return Attempt;
};
