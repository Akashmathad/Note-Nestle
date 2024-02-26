const subjects = [
  { _id: '65dc19c55fdb2c768d0462e8', name: 'Computer Networks' },
  { _id: '65db0e973ddb0b77243707b6', name: 'DBMS' },
  { _id: '65dc17ee5fdb2c768d0462d6', name: 'DSA' },
  { _id: '65dc1ac65fdb2c768d0462f9', name: 'Microcontroller' },
  { _id: '65dc1b155fdb2c768d0462fc', name: 'Oops with Java' },
  { _id: '65dc194a5fdb2c768d0462dc', name: 'Operating system' },
  { _id: '65dc17785fdb2c768d0462c7', name: 'Python' },
  { _id: '65dc19fd5fdb2c768d0462f4', name: 'Software Engineering' },
];

const searchString = 'o';

function handleSearchChange() {
  const finalList = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchString.toLowerCase())
  );

  console.log(finalList);
}

handleSearchChange();
