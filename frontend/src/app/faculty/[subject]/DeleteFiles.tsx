'use client';
import React, { useState } from 'react';

function DeleteFiles({ id, unitId, files, setOpenDeleteFile }) {
  const [selectedFiles, setSelectedFiles] = useState<Array<string>>([]);

  const handleCheckboxChange = (fileId) => {
    // Toggle the selection status of the file
    setSelectedFiles((prevSelectedFiles) => {
      if (prevSelectedFiles.includes(fileId)) {
        return prevSelectedFiles.filter((id) => id !== fileId);
      } else {
        return [...prevSelectedFiles, fileId];
      }
    });
  };

  async function handleDelete() {
    const data = { fileIds: selectedFiles };
    const req = await fetch(
      `http://localhost:3000/api/v1/note-nestle/subjects/deleteFiles/${id}/${unitId}`,
      {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    console.log(req.ok);
    setOpenDeleteFile(false);
  }

  return (
    <div>
      <h2>Select Files to Delete:</h2>
      <form>
        {files.map((file) => (
          <div key={file._id}>
            <label>
              <input
                type="checkbox"
                checked={selectedFiles.includes(file._id)}
                onChange={() => handleCheckboxChange(file._id)}
              />
              {file.title}
            </label>
          </div>
        ))}
      </form>
      <button onClick={() => setOpenDeleteFile(false)}>Cancel</button>
      <button onClick={handleDelete} disabled={selectedFiles.length === 0}>
        Delete Selected Files
      </button>
    </div>
  );
}

export default DeleteFiles;
