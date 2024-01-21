import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import Subject from "../features/Teacher Panel/Subject";
import SubjectDisplay from "../features/Teacher Panel/SubjectDisplay";
import AddSubject from "../features/Teacher Panel/AddSubject";

function Teacherpage() {
  const { user, jwt } = useContext(AuthContext);
  const [branch, setBranch] = useState("");
  const [subjects, setSubjects] = useState();
  const [id, setId] = useState();
  const [openSubject, setOpenSubject] = useState(false);
  const [openAddSubject, setOpenAddSubject] = useState(false);

  useEffect(
    function () {
      async function fetchData() {
        if (!jwt || !branch) {
          return;
        }
        const req = await fetch(
          `http://localhost:3000/api/v1/note-nestle/subjects?branch=${branch}&fields=_id,name`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${jwt}`,
            },
          }
        );
        const data = await req.json();
        setSubjects(data.data);
      }
      fetchData();
    },
    [jwt, branch]
  );

  return (
    <div>
      <h1>Welcome, {user ? user.name : ""} </h1>
      <select value={branch} onChange={(e) => setBranch(e.target.value)}>
        <option value="">Select Branch</option>
        <option value="CSE">CSE</option>
        <option value="ECE">ECE</option>
        <option value="EEE">EEE</option>
        <option value="ME">ME</option>
        <option value="AE">AE</option>
        <option value="CE">CE</option>
      </select>
      <button onClick={() => setOpenAddSubject(true)}>Add Subject</button>
      {!openSubject &&
        (subjects && subjects.length > 0 ? (
          subjects.map((subject) => (
            <SubjectDisplay
              subject={subject}
              setId={setId}
              setOpenSubject={setOpenSubject}
            />
          ))
        ) : (
          <p>No Subjects available</p>
        ))}
      {openSubject && <Subject id={id} setOpenSubject={setOpenSubject} />}
      {openAddSubject && <AddSubject setOpenAddSubject={setOpenAddSubject} />}
    </div>
  );
}

export default Teacherpage;
