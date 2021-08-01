const calculateResult = require('./src/utils/calculateResult');
const readDataFromFile = require('./src/utils/readDataFromFile');
const validateInputFile = require('./src/utils/validateInputFile');
const {
	FAILED_TO_PROCESS_TRANSACTION_RECORD,
} = require('./src/language/errorMessage');

const filename = process.argv[2];

const geekTrsut = async () => {
	const isValidInput = validateInputFile(filename);

	try {
		if (isValidInput) {
			const data = await readDataFromFile(filename);

			const results = calculateResult(data);

			results.forEach((result) => console.log(result));
		}
	} catch (error) {
		console.error(FAILED_TO_PROCESS_TRANSACTION_RECORD);
	}
};

geekTrsut();
