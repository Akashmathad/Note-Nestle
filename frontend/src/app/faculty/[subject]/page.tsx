'use client';
import { AuthContext } from '@/context/AuthContextContainer';
import { useContext } from 'react';
import AddUnit from './AddUnit';
import DeleteSubject from './DeleteSubject';
import DeleteUnit from './DeleteUnit';
import Unit from './Unit';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { getSubject } from '@/services/apiBranches';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const Subject = ({ params }) => {
  const { jwt } = useContext<any>(AuthContext);
  const id: string = params.subject;
  const { data: subjectDetails, isFetching } = useQuery({
    queryKey: [`${id}`],
    queryFn: () => getSubject(jwt, id),
    enabled: Boolean(jwt),
  });

  return (
    <div className="container flex-grow py-[2rem]">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-[1rem]">
        <h2 className="lg:text-[2.5rem] text-[1.8rem] font-fontPrimary leading-[1.2]">
          {subjectDetails && subjectDetails.name}
        </h2>
        <div className="flex gap-[1.5rem] items-center">
          <p className="text-[1.2rem]">
            <span className="font-bold">
              {subjectDetails && subjectDetails.branch}
            </span>
          </p>
          <Sheet>
            <SheetTrigger>
              <Button>Add Unit</Button>
            </SheetTrigger>
            <SheetContent>
              <AddUnit
                id={id}
                subjectName={subjectDetails && subjectDetails.name}
              />
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger>
              <Button variant="destructive">Delete Unit</Button>
            </SheetTrigger>
            <DeleteUnit id={id} subjectDetails={subjectDetails} />
          </Sheet>

          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant="destructive">Delete Subject</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <DeleteSubject
                id={id}
                name={subjectDetails && subjectDetails.name}
              />
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="py-[2rem] flex flex-col gap-[1.5rem]">
        {isFetching ? (
          <Loader2 className="mr-2 h-12 w-12 animate-spin" />
        ) : subjectDetails && subjectDetails.units.length !== 0 ? (
          subjectDetails.units.map((unit) => (
            <Unit id={id} unitId={unit._id} unit={unit} key={unit._id} />
          ))
        ) : (
          <p className="text-[1.2rem]">No units found</p>
        )}
      </div>
      <Toaster toastOptions={{ duration: 5000 }} />
    </div>
  );
};

export default Subject;
