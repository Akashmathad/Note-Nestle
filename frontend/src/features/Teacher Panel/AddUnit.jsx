import { useState } from 'react';

function AddUnit({ id, setOpenAddFolder }) {
  const [name, setName] = useState();

  async function handleSubmit() {
    const data = { name };
    const req = await fetch(
      `http://localhost:3000/api/v1/note-nestle/subjects/createUnit/${id}`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    console.log(req.ok);
  }

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Title"
      />
      <button onClick={() => setOpenAddFolder(false)}>Cancel</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default AddUnit;
