const url = process.env.NEXT_PUBLIC_URL;
export async function getBranchSubjects(jwt, branch) {
  if (!jwt || !branch) {
    return;
  }

  try {
    const req = await fetch(
      `${url}/api/v1/note-nestle/subjects?branch=${branch}&fields=_id,name`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${jwt}`,
        },
      }
    );
    const data = await req.json();
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error('Branches could not be loaded');
  }
}

export async function getSubject(jwt, subject) {
  if (!jwt) {
    return;
  }
  try {
    const req = await fetch(
      `${url}/api/v1/note-nestle/subjects?_id=${subject}`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${jwt}`,
        },
      }
    );
    const data = await req.json();
    return data.data[0];
  } catch (error) {
    console.log(error);
    throw new Error('Branches could not be loaded');
  }
}

export async function addUnit(id, name) {
  const data = {
    name,
  };
  try {
    const req = await fetch(
      `${url}/api/v1/note-nestle/subjects/createUnit/${id}`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error('Branches could not be loaded');
  }
}

export async function deleteUnit(id, unitId: string) {
  try {
    await fetch(
      `${url}/api/v1/note-nestle/subjects/deleteUnit/${id}/${unitId}`,
      {
        method: 'DELETE',
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error('Unit cannot be deleted');
  }
}

export async function addFile(id, unitId, title, file, name) {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
    formData.append('ownerName', name);

    await fetch(`${url}/api/v1/note-nestle/subjects/upload/${id}/${unitId}`, {
      method: 'POST',
      body: formData,
    });
  } catch (error) {
    console.log(error);
    throw new Error('File cannot be added');
  }
}

export async function deleteFiles(id, unitId, data) {
  try {
    await fetch(
      `${url}/api/v1/note-nestle/subjects/deleteFiles/${id}/${unitId}`,
      {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error('Files cannot be deleted');
  }
}
