'use client';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const DeleteSubject = ({ id, name }) => {
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_URL;

  async function handleDelete() {
    try {
      const req = await fetch(
        `${url}/api/v1/note-nestle/subjects/deleteSubject/${id}`,
        {
          method: 'DELETE',
        }
      );
      console.log(req.ok);
      router.push('/faculty');
      toast.success('Subject deleted', {
        className: 'toast toast-success',
      });
    } catch {
      toast.error('Something went wrong, refresh the page', {
        className: 'toast toast-fail',
      });
    }
  }

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle className="text-[1.5rem] font-fontPrimary text-center tracking-[1.5px]">
          Are you absolutely sure?
        </AlertDialogTitle>
        <AlertDialogDescription className="text-[1.1rem] text-center">
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
