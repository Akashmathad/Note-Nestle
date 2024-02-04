import FileDisplay from '@/app/faculty/[subject]/FileDisplay';

function Unit({ id, unitId, unit }) {
  const files = unit.files;

  return (
    <div className="p-[1rem] border border-borderN rounded-[11px]">
      <h2 className="text-[1.5rem] font-bold">{unit.name}</h2>
      <div className="pt-[1rem] grid  lg:grid-cols-4 gap-[1rem]">
        {files.map((file) => (
          <FileDisplay id={id} unitId={unitId} file={file} key={file._id} />
        ))}
      </div>
    </div>
  );
}

export default Unit;
