module.exports = (sequelize, DataTypes) => {
	const Bookmarks = sequelize.define('Bookmarks', {
		Name: DataTypes.STRING,
		url: DataTypes.STRING,
	}, {
		timestamps: false,
	});

	return Bookmarks;
};

