import { useState } from 'react';
import FileDisplay from './FileDisplay';
import UploadFile from './UploadFile';
import DeleteFiles from './DeleteFiles';

function Unit({ id, unitId, units, setOpenUnit }) {
  const [openUpload, setOpenUpload] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const unit = units.filter((unit) => unit._id === unitId)[0];
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
      <div>
        <button onClick={() => setOpenUpload(true)}>Uplaod file</button>
      </div>
      <div>
        <button onClick={() => setOpenDelete(true)}>Delete Files</button>
      </div>
      <div>
        <button onClick={handleDeleteFolder}>Delete the Entire Foler</button>
      </div>
      <div>
        <button onClick={() => setOpenUnit(false)}>Back</button>
      </div>
      {openUpload && (
        <UploadFile id={id} unitId={unitId} setOpenUpload={setOpenUpload} />
      )}
      {openDelete && (
        <DeleteFiles
          files={files}
          setOpenDelete={setOpenDelete}
          id={id}
          unitId={unitId}
        />
      )}
    </div>
  );
}

export default Unit;
