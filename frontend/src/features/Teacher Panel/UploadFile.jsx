import { useContext, useState } from 'react';
import { AuthContext } from '../../App';

function UploadFile({ id, unitId, setOpenUpload }) {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState();
  const [file, setFile] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !file) {
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
    formData.append('ownerName', user.name);

    const req = await fetch(
      `http://localhost:3000/api/v1/note-nestle/subjects/upload/${id}/${unitId}`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const data = await req.json();
    console.log(data);
  }

  console.log(file);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UploadFile;
