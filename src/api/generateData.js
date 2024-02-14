const fs = require('fs');
const path = require('path');
const moment = require('moment');

function randomAmount(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calcPoints(amount) {
	if (amount <= 50) return 0;
	else if (amount > 50 && amount <= 100) return amount - 50;
	else return ((amount - 100) * 2) + 50;
}

function calcTotalPoints(data) {
	const overview = {};

	data.reduce((acc, ts) => {
		if (acc[ts.customerId] !== undefined) {
			acc[ts.customerId] += ts.points;
		} else {
			acc[ts.customerId] = ts.points;
		}

		return acc;
	}, overview);

	return overview;
}

function calcTotalsByMonth(data) {
	const months = {};

	data.reduce((acc, ts) => {
		const month = moment(ts.date).format('MM-YYYY');

		if (acc[ts.customerId] !== undefined && acc[ts.customerId][month] !== undefined) {
			acc[ts.customerId][month] += ts.points;
		} else {
			if (acc[ts.customerId] === undefined) {
				acc[ts.customerId] = { [month]: ts.points };
			} else if (acc[ts.customerId][month] === undefined) {
				acc[ts.customerId][month] = ts.points;
			}
		}

		return acc;
	}, months);

	return months;
}

function generateData() {
	const data = [];
	const today = new Date();

	for (let i = 0; i < 90; i++) {
		for (let c = 0; c < 5; c++) {
			const amount = randomAmount(1, 500);
			data.push({
				id: `ts-${c+1}-${i+1}`,
				customerId: c+1,
				amount: amount,
				points: calcPoints(amount),
				date: new Date(today.getTime() - ((i+1) * 24 * 60 * 60 * 1000))
			});
		}
	}

	const jsonData = JSON.stringify({
		data: data,
		totalsByMonth: calcTotalsByMonth(data),
		totals: calcTotalPoints(data)
	}, null, 2);

	fs.writeFile(path.join('./public', 'transactions.json'), jsonData, (err) => {
		if (err) {
			console.error(err);
		} else {
			console.log("Generated new 'transactions.json' file successfully!");
		}
	});
}

generateData();