'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import React, { useState } from 'react';

function DeleteFiles({ id, unitId, files, unitName }) {
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

  async function handleDelete(e) {
    e.preventDefault();
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
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Files ({unitName})</AlertDialogTitle>
        <AlertDialogDescription>
          Select the files you want to delete from {unitName}.
        </AlertDialogDescription>

        <form onSubmit={handleDelete}>
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
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              disabled={selectedFiles.length === 0}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogHeader>
    </AlertDialogContent>
  );
}

export default DeleteFiles;
