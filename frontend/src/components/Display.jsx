function Display({ data, selectedSubject }) {
	const groupedData = data.reduce((acc, item) => {
		const { branch, name } = item;
		if (!acc[branch]) {
			acc[branch] = [];
		}
		acc[branch].push({ name });
		return acc;
	}, {});

	console.log(groupedData);

	const filteredData = data.filter((item) => item.name === selectedSubject);
	console.log(filteredData);
	return (
		<div>
			{selectedSubject ? (
				filteredData.length > 0 ? (
					filteredData.map((item) => (
						<div key={item.branch}>
							<h2>{item.branch}</h2>
							<ul>
								<li>{item.name}</li>
							</ul>
						</div>
					))
				) : (
					<div>
						<h2>No Subject found</h2>
					</div>
				)
			) : (
				Object.entries(groupedData).map(([branch, subjects]) => (
					<div key={branch}>
						<h2>{branch}</h2>
						<ul>
							{subjects.map((subjectItem, index) => (
								<li key={index}>{subjectItem.name}</li>
							))}
						</ul>
					</div>
				))
			)}
		</div>
	);
}

export default Display;
