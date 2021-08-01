const { BALANCE, LOAN, PAYMENT } = require('../language/inputCommands');

const ceilAmount = (amount) => Math.ceil(amount);

const floorAmount = (amount) => Math.floor(amount);

/**
 *
 * @param {Array} transactionRecords the list of all the transactions.
 * @returns {Array} an array map to each balance command.
 */

const calculateResult = (transactionRecords) => {
	const arr = [];
	transactionRecords.forEach((record) => {
		if (record[0] === BALANCE) {
			//find out the customer name of balance checking command.
			const cusomterName = record[2];

			//find out loan record according to customer name
			const loanRecord = transactionRecords.find(
				(item) => item[0] === LOAN && item[2] === cusomterName
			);
			let [, bankName, borrowerName, initialAmount, initialYears, loadRate] =
				loanRecord;

			let initialMonths = initialYears * 12;

			//total amount paid
			let amountPaid = 0;
			//emi numbers paid so far
			let emiNo = 0;

			let totalDue = ceilAmount(
				initialAmount * ((initialYears * loadRate) / 100 + 1)
			);

			let monthlyPay = ceilAmount(totalDue / initialMonths);

			transactionRecords.forEach((lumpSumPayment) => {
				//if it is a payment ealier than balance check and belong to the balance check customer
				if (
					lumpSumPayment[0] === PAYMENT &&
					lumpSumPayment[4] <= record[3] &&
					lumpSumPayment[2] === cusomterName
				) {
					amountPaid += monthlyPay * record[3] + lumpSumPayment[3];

					initialMonths -= floorAmount(lumpSumPayment[3] / monthlyPay);

					emiNo = lumpSumPayment[4];
				}
			});

			const totalMoneyPaid = amountPaid || monthlyPay * record[3];

			const totalMonthLeft = initialMonths - record[3];

			arr.push(
				[
					bankName,
					borrowerName,
					totalMoneyPaid < totalDue ? totalMoneyPaid : totalDue,
					totalMonthLeft > 0 ? totalMonthLeft : 0,
				].join(' ')
			);
		}
	});

	return arr;
};

module.exports = calculateResult;
