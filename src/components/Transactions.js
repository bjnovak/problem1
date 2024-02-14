import * as React from 'react';
import moment from 'moment';
import Overview from './Overview';
import './Transactions.css';

export default function Transactions() {
	const [data, setData] = React.useState([]);
	const [totals, setTotals] = React.useState([]);
	const [totalsMonth, setTotalsMonth] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		async function fetchTransactions() {
			try {
				const response = await fetch('transactions.json');
				const jsonData = await response.json();
				setData(jsonData.data);
				setTotals(jsonData.totals);
				setTotalsMonth(jsonData.totalsByMonth);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}

		fetchTransactions();
	}, []);

	return (
		<div className="Transactions">
			{loading ? (
				<div>{'loading...'}</div>
			) : (
				<React.Fragment>
					<Overview
						totals={totals}
						totalsMonth={totalsMonth}
					/>

					<div className="Head">
						<div>{'Transaction ID'}</div>
						<div>{'Customer ID'}</div>
						<div>{'Amount'}</div>
						<div>{'Points'}</div>
						<div>{'Date'}</div>
					</div>

					{data.map((ts, index) => (
						<div key={ts.id} className="Ts">
							<div>{index+1}</div>
							<div>{ts.customerId}</div>
							<div>{`$${ts.amount}.00`}</div>
							<div>{ts.points > 0 ? ts.points : ''}</div>
							<div>{moment(ts.date).format('MM-DD-YYYY')}</div>
						</div>
					))}
				</React.Fragment>
			)}
		</div>
	)
}