const fs = require('fs');
const { BALANCE, LOAN, PAYMENT } = require('../language/inputCommands');
const { COMMAND_NOT_RECOGNIZED_ERROR } = require('../language/errorMessage');

/**
 *This is the function used to read data from file path provided
 * @param { String } filename
 * @returns { Array } content of the file or jump off the process
 */
const readDataFromFile = async (filename) => {
	//Read the content in file
	try {
		const arr = [];

		const inputCommands = [BALANCE, LOAN, PAYMENT];

		const dataList = fs.readFileSync(filename, 'utf8').toString().split('\r\n');

		for (i in dataList) {
			//check whether all the commands are matched or not.
			if (inputCommands.indexOf(dataList[i].split(' ')[0]) === -1) {
				throw new Error(COMMAND_NOT_RECOGNIZED_ERROR);
			}
			arr.push(dataList[i].split(' ').map((item) => Number(item) || item));
		}
		return arr;
	} catch (error) {
		console.error(error.message);
		process.exit(1);
	}
};

module.exports = readDataFromFile;
