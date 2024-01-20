// import { Link } from "react-router-dom";
import { useContext, useState } from 'react';
import PageNav from '../utils/PageNav';
import Search from '../utils/Search';
import Display from '../utils/Display';
import Footer from '../utils/Footer';
import Login from '../features/Authorization/Login';
import { AuthContext } from '../App';

const subjects = [
  {
    id: '1',
    name: 'Computer Networks',
    branch: 'Computer Science',
  },
  {
    id: '2',
    name: 'Operating Systems',
    branch: 'Computer Science',
  },
  {
    id: '3',
    name: 'Computer Networks',
    branch: 'EC',
  },
  {
    id: '4',
    name: 'Operating Systems',
    branch: 'EC',
  },
];

export default function Homepage() {
  const [subject, setSubject] = useState('');
  const [data, setData] = useState(subjects);
  const { login } = useContext(AuthContext);

  return (
    <main>
      {login && <Login />}
      <PageNav />
      <section>
        <div>
          <h1>Knowledge Nest</h1>
          <h2>
            Discover Wisdom, Accessible Notes. Your Gateway to Knowledge Sharing
          </h2>
        </div>
        <Search subject={subject} setSubject={setSubject} />
        <Display data={data} selectedSubject={subject} />
      </section>
      <Footer />
    </main>
  );
}
