function SubjectDisplay({ subject, setId, setOpenSubject }) {
  return (
    <div
      key={subject._id}
      onClick={() => {
        setId(subject._id);
        setOpenSubject(true);
      }}
    >
      {subject.name}
    </div>
  );
}

export default SubjectDisplay;
