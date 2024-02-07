import { Button } from '@/components/ui/button';
import FileDisplay from './FileDisplay';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import UploadFile from './UploadFile';
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

import DeleteFiles from './DeleteFiles';

function Unit({
  id,
  unitId,
  unit,
  setOpenAddFile,
  setAddUnitId,
  setOpenDeleteFile,
}) {
  // const [openUpload, setOpenUpload] = useState(false);
  // const [openDelete, setOpenDelete] = useState(false);
  const url = process.env.NEXT_PUBLIC_URL;

  const files = unit.files;

  async function handleDeleteFolder() {
    const req = await fetch(
      `${url}/api/v1/note-nestle/subjects/deleteUnit/${id}/${unitId}`,
      {
        method: 'DELETE',
      }
    );
    console.log(req.ok);
  }

  return (
    <div className="p-[1.5rem] border border-border rounded-[11px]">
      <div className="flex justify-between items-center">
        <h2 className="text-[1.5rem] font-bold">{unit.name}</h2>
        <div className="flex gap-[1rem]">
          <Sheet>
            <SheetTrigger>
              <Button>Add Files</Button>
            </SheetTrigger>
            <SheetContent>
              <UploadFile id={id} unitId={unitId} unitName={unit.name} />
            </SheetContent>
          </Sheet>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Files</Button>
            </AlertDialogTrigger>
            <DeleteFiles
              id={id}
              unitId={unitId}
              files={files}
              unitName={unit.name}
            />
          </AlertDialog>
        </div>
      </div>
      <div className="pt-[1.2rem] grid  lg:grid-cols-4 gap-[1.2rem]">
        {files.map((file) => (
          <FileDisplay id={id} unitId={unitId} file={file} key={file._id} />
        ))}
      </div>
    </div>
  );
}

export default Unit;
