import { AuthContext } from '@/context/AuthContextContainer';
import { Download, Eye } from 'lucide-react';
import { useContext } from 'react';
import toast from 'react-hot-toast';

function FileDisplay({ id, unitId, file }) {
  const url = process.env.NEXT_PUBLIC_URL;
  const { jwt } = useContext<any>(AuthContext);

  async function fileDownload() {
    toast.success('Downloading started...', {
      className: 'toast toast-success',
    });
    try {
      const req = await fetch(
        `${url}/api/v1/note-nestle/subjects/file/${id}/${unitId}/${file._id}`
      );

      // Get the filename from the Content-Disposition header
      const contentDisposition = req.headers.get('Content-Disposition');
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1]
        : file.title;

      // Assuming the response contains a Blob representing the file
      const blob = await req.blob();

      // Create a Blob URL for the file
      const blobUrl = URL.createObjectURL(blob);

      // Create a hidden anchor element
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename.trim(); // Set the desired file name

      // Append the anchor to the document and trigger a click event
      document.body.appendChild(link);
      link.click();

      // Remove the anchor from the document
      document.body.removeChild(link);

      // Revoke the Blob URL to free up resources
      URL.revokeObjectURL(blobUrl);
    } catch {
      toast.error('Something went wrong', {
        className: 'toast toast-fail',
      });
    }
  }

  async function viewFile() {
    try {
      const req = await fetch(
        `${url}/api/v1/note-nestle/subjects/viewFile/${id}/${unitId}/${file._id}`,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const data = await req.json();
      console.log(data.link);
      if (data.link) {
        // Open the URL in a new tab
        window.open(data.link);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong', {
        className: 'toast toast-fail',
      });
    }
  }

  return (
    <div className="bg-bgN py-[1.5rem] flex flex-col items-center justify-center gap-[1rem] relative rounded-[9px] border border-borderN">
      <h3 className="text-[2rem] lg:text-[1.5rem]">{file.title}</h3>
      <div>
        <p className="text-para text-[1.5rem] lg:text-[1rem]">
          {file.ownerName}
        </p>
        <Eye
          size={44}
          className="absolute top-3 right-2 text-[3rem] dark:bg-[#ffffff40] bg-[#00000040] p-[0.4rem] rounded-[9px] cursor-pointer"
          onClick={viewFile}
        />
        <Download
          size={44}
          className="absolute bottom-3 right-2 text-[3rem] dark:bg-[#ffffff40] bg-[#00000040] p-[0.4rem] rounded-[9px] cursor-pointer"
          onClick={fileDownload}
        />
      </div>
    </div>
  );
}

export default FileDisplay;
