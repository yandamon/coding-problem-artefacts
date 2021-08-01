require('colors');

const { NO_FILE_NAME_ERROR } = require('../language/errorMessage');

/**
 *Function used to validate whether file name is provided or not
 * @param {String} command
 * @returns {Boolean} filename exist or not
 */
const validateInputFile = (command) => {
	//Check filename exist in command line
	if (!command || command.length < 3) {
		console.log(NO_FILE_NAME_ERROR);
		return false;
	}

	return true;
};

module.exports = validateInputFile;
