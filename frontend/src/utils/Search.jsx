function Search({ subject, setSubject }) {
	return (
		<div>
			<input
				type="text"
				placeholder="Search Subject"
				onChange={(e) => setSubject(e.target.value)}
				value={subject}
			/>
		</div>
	);
}

export default Search;
