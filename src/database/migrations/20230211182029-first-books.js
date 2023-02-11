'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up( queryInterface, Sequelize ) {
		return queryInterface.createTable( 'first-books', {
			id: {
				type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
			}, page_foreword: {
				type: Sequelize.TEXT, defaultValue: null
			}, foreword_author: {
				type: Sequelize.STRING, defaultValue: null
			}, page_chapter: {
				type: Sequelize.STRING, defaultValue: null
			}, page_title: {
				type: Sequelize.STRING, defaultValue: null
			}, page_text: {
				type: Sequelize.TEXT, defaultValue: null
			}, page_message: {
				type: Sequelize.TEXT, defaultValue: null
			},
		} );
	},

	async down( queryInterface, Sequelize ) {
		return queryInterface.dropTable( 'first-books' );
	}
};