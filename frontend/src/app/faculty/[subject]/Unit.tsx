import FileDisplay from './FileDisplay';

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
      <div>
        <button
          onClick={() => {
            setAddUnitId(unitId);
            setOpenAddFile(true);
          }}
        >
          Add files
        </button>
      </div>
      <button
        onClick={() => {
          setAddUnitId(unitId);
          setOpenDeleteFile(true);
        }}
      >
        Delete files
      </button>
    </div>
  );
}

export default Unit;
