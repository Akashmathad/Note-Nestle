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

  const files = unit.files;

  async function handleDeleteFolder() {
    const req = await fetch(
      `http://localhost:3000/api/v1/note-nestle/subjects/deleteUnit/${id}/${unitId}`,
      {
        method: 'DELETE',
      }
    );
    console.log(req.ok);
  }

  return (
    <div>
      <h2>{unit.name}</h2>
      <div>
        {files.map((file) => (
          <FileDisplay id={id} unitId={unitId} file={file} key={file._id} />
        ))}
      </div>

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
          <Button>Delete Files</Button>
        </AlertDialogTrigger>

        <DeleteFiles
          id={id}
          unitId={unitId}
          files={files}
          unitName={unit.name}
        />
      </AlertDialog>
    </div>
  );
}

export default Unit;
