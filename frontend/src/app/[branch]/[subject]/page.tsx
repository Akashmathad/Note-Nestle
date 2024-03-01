'use client';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/context/AuthContextContainer';
import { getSubject } from '@/services/apiBranches';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import Unit from './Unit';
import { Loader2 } from 'lucide-react';

const Subject = ({ params }) => {
  const { jwt } = useContext<any>(AuthContext);
  const router = useRouter();
  // const [subjectDetails, setSubjectDetails] = useState<any>();
  // const url = process.env.NEXT_PUBLIC_URL;

  const { data: subjectDetails, isFetching } = useQuery({
    queryKey: [`${params.subject}`],
    queryFn: () => getSubject(jwt, params.subject),
    enabled: Boolean(jwt),
  });

  // useEffect(
  //   function () {
  //     async function fetchData() {
  //       if (!jwt) {
  //         return;
  //       }
  //       try {
  //         const req = await fetch(
  //           `${url}/api/v1/note-nestle/subjects?_id=${params.subject}`,
  //           {
  //             method: 'GET',
  //             headers: {
  //               'content-type': 'application/json',
  //               authorization: `Bearer ${jwt}`,
  //             },
  //           }
  //         );
  //         const data = await req.json();
  //         setSubjectDetails(data.data[0]);
  //       } catch {
  //         toast.error('Something went wrong, Please refresh the page', {
  //           className: 'toast toast-fail',
  //         });
  //       }
  //     }
  //     fetchData();
  //   },
  //   [jwt, params]
  // );

  return (
    <div className="container flex-grow  py-[2rem]">
      <div className="flex justify-between items-center">
        <h2 className="lg:text-[2.5rem] text-[1.8rem] font-fontPrimary leading-[1.2]">
          {subjectDetails && subjectDetails.name}
        </h2>
        <Button onClick={() => router.push(`/${params.branch}`)}>Back</Button>
      </div>
      <div className="py-[1rem] flex flex-col gap-[1.5rem]">
        {isFetching ? (
          <Loader2 className="mr-2 h-12 w-12 animate-spin" />
        ) : subjectDetails && subjectDetails.units.length !== 0 ? (
          subjectDetails.units.map((unit) => (
            <Unit
              id={subjectDetails._id}
              unitId={unit._id}
              unit={unit}
              key={unit._id}
            />
          ))
        ) : (
          <p className="text-[1.2rem]">No units found</p>
        )}
      </div>
      <Toaster toastOptions={{ duration: 3000 }} />
    </div>
  );
};

export default Subject;
