'use client';
import { useRouter } from 'next/navigation';
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

const DeleteSubject = ({ id, name }) => {
  const router = useRouter();

  async function handleDelete() {
    const req = await fetch(
      `http://localhost:3000/api/v1/note-nestle/subjects/deleteSubject/${id}`,
      {
        method: 'DELETE',
      }
    );
    console.log(req.ok);
    router.push('/faculty');
  }

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          You want to delete {name}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
};
export default DeleteSubject;
