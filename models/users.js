module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define('Users', {
		FirstName: DataTypes.STRING,
		LastName: DataTypes.STRING,
		Username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		EncryptedPassword: {
			type: DataTypes.BLOB,
			allowNull: false
		},
		Salt: {
			type: DataTypes.BLOB,
			allowNull: false
		},
	},{
		timestamps: false
	});
	Users.associate = function(models) {
	  Users.hasMany(models.Bookmarks);
  };
  return Users
  }