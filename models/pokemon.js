module.exports = (sequelize, Sequelize) => {
  const Pokemon = sequelize.define("Pokemon",{
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
        // Getter : Base de données => API Rest
        // Aller ==>
        get(){
           // ["Plante", "Poison"]
          return this.getDataValue('types').split(',')
        },
        // Setter : API Rest => Base de données
        // Retour <==
        set(types){
          this.setDataValue('types', types.join() ) // "Plante, Poison"
        }
      },
    },
    {
      timestamps: true, // permet d'indiquer que nous souhaitons modifier le comportement par défaut de sequelize
      createdAt: "created", // je renomme createAt en created
      updatedAt: false, // je désactive la date de modification
    }
  );
  return Pokemon;
};
