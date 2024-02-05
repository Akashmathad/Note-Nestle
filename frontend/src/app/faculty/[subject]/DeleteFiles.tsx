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
import { Checkbox } from '@/components/ui/checkbox';

import React, { useState } from 'react';
import toast from 'react-hot-toast';

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

    try {
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
      if (req.ok) {
        toast.success('Files deleted, refresh the page', {
          className: 'toast toast-success',
        });
      }
    } catch {
      toast.error('Something went wrong, refresh the page!', {
        className: 'toast toast-fail',
      });
    }
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className="text-[1.5rem] font-fontPrimary text-center tracking-[1.5px]">
          Delete Files ({unitName})
        </AlertDialogTitle>
        <AlertDialogDescription className="text-[1rem]">
          Select the files you want to delete from {unitName}.
        </AlertDialogDescription>

        <form onSubmit={handleDelete}>
          <div className="flex flex-col gap-[0.4rem]">
            {files.map((file) => (
              <label
                key={file._id}
                className="text-[1rem] flex gap-[0.5rem] items-center"
              >
                <Checkbox
                  checked={selectedFiles.includes(file._id)}
                  onCheckedChange={() => handleCheckboxChange(file._id)}
                />
                {file.title}
              </label>
            ))}
          </div>
          <AlertDialogFooter className="mt-[1.5rem]">
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
