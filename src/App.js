import logo from "./logo.svg";
import "./App.css";
import OuterCard from "./components/OuterCard";
import { useEffect } from "react";
import { useState } from "react";

function App() {
	const [tickets, setTickets] = useState([]);
	const [currentGrouping, setCurrentGrouping] = useState("Priority");
	const statusTicketsMap = {
		"In progress": [],
		Todo: [],
		Backlog: [],
	};
	const userTicketsMap = {};
	const priorityTicketsMap = {};
	const ticketsIdMap = {};

	async function callApi() {
		try {
			const response = await fetch(
				"https://api.quicksell.co/v1/internal/frontend-assignment"
			);
			const data = await response.json();
			setTickets(data.tickets);
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(function () {
		callApi();
		for (let i = 0; i < tickets.length; i++) {
			userTicketsMap[tickets[i].userId] = [];
			priorityTicketsMap[tickets[i].priority] = [];
			statusTicketsMap[tickets[i].status].push(tickets[i].id);
		}
		for (let i = 0; i < tickets.length; i++) {
			userTicketsMap[tickets[i].userId].push(tickets[i].id);
		}

		for (let i = 0; i < tickets.length; i++) {
			priorityTicketsMap[tickets[i].priority].push(tickets[i].id);
			ticketsIdMap[tickets[i].id] = tickets[i];
		}
		console.log(ticketsIdMap);
		console.log(priorityTicketsMap);
	}, []);

	function handleGroupingChange(e) {
		const group = e.target.value;
		setCurrentGrouping(group);
		console.log("Ishaaaaaaaaaaaa " + group);
	}

	return (
		<div className="App">
			<div>
				<div>
					<span>Grouping</span>
					<select onChange={handleGroupingChange}>
						<option value="Priority">Priority</option>
						<option value="User">User</option>
						<option value="Status">Status</option>
					</select>
				</div>
				<div>
					<span>Ordering</span>
					<select>
						<option value="Priority">Priority</option>
						<option value="User">User</option>
					</select>
				</div>
			</div>
			<div>
				{currentGrouping === "Priority" &&
					Object.keys(priorityTicketsMap).map((item) => {
						return (
							<div>
								<OuterCard
									title={item}
									tickets={priorityTicketsMap[item].map(
										(ticketId) => {
											return ticketsIdMap[ticketId];
										}
									)}
								/>
							</div>
						);
					})}
				{currentGrouping === "User" &&
					Object.keys(userTicketsMap).map((item) => {
						return (
							<div>
								<OuterCard
									title={item}
									tickets={userTicketsMap[item].map(
										(ticketId) => {
											return ticketsIdMap[ticketId];
										}
									)}
								/>
							</div>
						);
					})}
				{currentGrouping === "Status" &&
					Object.keys(statusTicketsMap).map((item) => {
						return (
							<div>
								<OuterCard
									title={item}
									tickets={statusTicketsMap[item].map(
										(ticketId) => {
											return ticketsIdMap[ticketId];
										}
									)}
								/>
							</div>
						);
					})}
			</div>
			<ul></ul>
			{/* {tickets &&
				tickets.map((item) => {
					return (
						<>
							<div>{item.title}</div>
							<div>{item.title}</div>
							<div>{item.userId}</div>
						</>
					);
				})} */}
		</div>
	);
}

export default App;

// id -> tick

// user_id -> user
// user_id -> vector<id>
