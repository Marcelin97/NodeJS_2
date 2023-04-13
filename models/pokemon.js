module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hp: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cp: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      picture: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      types: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true, // permet d'indiquer que nous souhaitons modifier le comportement par défaut de sequelize
      createdAt: "created", // je renomme createAt en created
      updatedAt: false, // je désactive la date de modification
    }
  );
};
