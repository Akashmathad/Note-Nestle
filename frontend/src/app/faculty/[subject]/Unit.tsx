import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import FileDisplay from './FileDisplay';
import UploadFile from './UploadFile';

import DeleteFiles from './DeleteFiles';

function Unit({ id, unitId, unit }) {
  const files = unit.files;

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
