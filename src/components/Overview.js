import * as React from 'react';
import './Overview.css';

export default function Overview({ totals, totalsMonth }) {
	return (
		<div className="Overview">
			<div className="Head">
				<div>{'Total Points Per Customer By Month'}</div>
				<div>{'Total Points Per Customer'}</div>
			</div>
			<div className="Results">
				<div className="TotalsMonth">
					{
						Object.keys(totalsMonth).map((customerId) => (
							<div key={customerId}>
								<div className="CustomerId">{`Customer #${customerId}`}</div>
								{Object.keys(totalsMonth[customerId]).map((month) => (
									<div key={`${customerId}-${month}`}>{month} = {totalsMonth[customerId][month]}</div>
								))}
							</div>
						))
					}
				</div>
				<div className="Totals">
					{
						Object.keys(totals).map((customerId) => (
							<div key={customerId}>
								<div className="CustomerId">{`Customer #${customerId}`}</div>
								<div>{totals[customerId]}</div>
							</div>
						))
					}
				</div>
			</div>
		</div>

	)
}