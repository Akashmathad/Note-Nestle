import FileDisplay from '@/app/faculty/[subject]/FileDisplay';

function Unit({ id, unitId, unit }) {
  const files = unit.files;

  return (
    <div>
      <h2>{unit.name}</h2>
      <div>
        {files.map((file) => (
          <FileDisplay id={id} unitId={unitId} file={file} key={file._id} />
        ))}
      </div>
    </div>
  );
}

export default Unit;
