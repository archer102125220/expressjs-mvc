'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        const { database, dialectOptions } = queryInterface.sequelize.config;

        return queryInterface.sequelize.query(
            `ALTER DATABASE ${database}
          CHARACTER SET ${dialectOptions.charset} COLLATE ${dialectOptions.collate};`
        )
    },
    down: (queryInterface, Sequelize) => { }
}