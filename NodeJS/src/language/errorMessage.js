require('colors');

const COMMAND_NOT_RECOGNIZED_ERROR =
	'Some of commands in the file are not recognized, please check the file'.red;

const FAILED_TO_PROCESS_TRANSACTION_RECORD =
	'Sorry, we are failed to read to column data, please validate all the records in the file';

const NO_FILE_NAME_ERROR = `No file name found, please enter a valid file name use command ${
	'npm run start filename.txt'.green
} `;

module.exports = {
	COMMAND_NOT_RECOGNIZED_ERROR,
	FAILED_TO_PROCESS_TRANSACTION_RECORD,
	NO_FILE_NAME_ERROR,
};
