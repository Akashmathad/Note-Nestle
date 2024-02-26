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
import { deleteFiles } from '@/services/apiBranches';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import React, { useState } from 'react';
import toast from 'react-hot-toast';

function DeleteFiles({ id, unitId, files, unitName }) {
  const [selectedFiles, setSelectedFiles] = useState<Array<string>>([]);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: {}) => deleteFiles(id, unitId, data),
    onSuccess: () => {
      toast.success('Files deleted');
      queryClient.invalidateQueries({
        queryKey: [`${id}`],
      });
    },
    onError: (err) => toast.error(err.message),
  });

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
    mutate(data);
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
