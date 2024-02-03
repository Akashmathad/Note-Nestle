import { Download } from 'lucide-react';

function FileDisplay({ id, unitId, file }) {
  console.log(id, unitId, file);
  async function fileDownload() {
    const req = await fetch(
      `http://localhost:3000/api/v1/note-nestle/subjects/file/${id}/${unitId}/${file._id}`
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
  }

  return (
    <div className="bg-bgN py-[1.5rem] flex flex-col items-center justify-center gap-[1rem] relative rounded-[9px] border border-borderN">
      <h3 className="text-[1.5rem]">{file.title}</h3>
      <div>
        <p className="text-para">{file.ownerName}</p>
        <Download
          size={44}
          className="absolute bottom-2 right-2 text-[3rem] bg-secondary p-[0.4rem] rounded-[9px] cursor-pointer"
          onClick={fileDownload}
        />
      </div>
    </div>
  );
}

export default FileDisplay;
