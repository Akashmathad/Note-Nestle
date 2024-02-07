'use client';
import Branch from '@/components/Branch';
import Feedback from '@/components/Feedback';
import Statastic from '@/components/Statastic';
import { AuthContext } from '@/context/AuthContextContainer';
import {
  Laptop2,
  Cpu,
  RadioTower,
  Wrench,
  Landmark,
  Plane,
  Rocket,
  FlaskConical,
  Infinity,
  UserRoundCheck,
  Users,
  BookOpenCheck,
  FileBarChart,
  Laptop,
} from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const data1 = [
  {
    id: 'teacherCount',
    category: 'Total Teachers',
    count: 120,
    icon: <UserRoundCheck size={48} />,
  },
  {
    id: 'studentCount',
    category: 'Total Students',
    count: 200,
    icon: <Users size={48} />,
  },
  {
    id: 'subjectCount',
    category: 'Total Subjects',
    count: 100,
    icon: <BookOpenCheck size={48} />,
  },
  {
    id: 'pdfCount',
    category: 'Total Files',
    count: 250,
    icon: <FileBarChart size={48} />,
  },
];
const branches1 = [
  {
    branch: 'CSE',
    icon: <Laptop2 size={48} strokeWidth={1} />,
    name: 'Computer Science',
    description: 'Algorithmic problem-solving, data computation nexus.',
  },
  {
    branch: 'ECE',
    icon: <Cpu size={48} strokeWidth={1} />,
    name: 'Electronics and Communication',
    description: 'Electrical systems, circuits, communication technology.',
  },
  {
    branch: 'EEE',
    icon: <RadioTower size={48} strokeWidth={1} />,
    name: 'Electrical and Electronics',
    description: 'Electricity, electronics, energy, systems, circuits.',
  },
  {
    branch: 'ISE',
    icon: <Laptop size={48} strokeWidth={1} />,
    name: 'Information Science',
    description: 'Software, algorithms, systems, programming, innovation.',
  },
  {
    branch: 'ME',
    icon: <Wrench size={48} strokeWidth={1} />,
    name: 'Mechanical Engg',
    description: 'Machines, systems, mechanics, design, manufacturing.',
  },
  {
    branch: 'CV',
    icon: <Landmark size={48} strokeWidth={1} />,
    name: 'Civil Engg',
    description: 'Infrastructure, construction, structures, design, planning.',
  },
  {
    branch: 'AE',
    icon: <Plane size={48} strokeWidth={1} />,
    name: 'Aeronautical Engg',
    description: 'Aircraft, aerospace, design, propulsion, aerodynamics.',
  },
  {
    branch: 'PHY',
    icon: <Rocket size={48} strokeWidth={1} />,
    name: 'Phycics',
    description: "Nature's fundamental laws, forces, energy, matter.",
  },
  {
    branch: 'CHE',
    icon: <FlaskConical size={48} strokeWidth={1} />,
    name: 'Chemistry',
    description: 'Molecules, reactions, elements, compounds, chemical concepts',
  },
  {
    branch: 'MAT',
    icon: <Infinity size={48} strokeWidth={1} />,
    name: 'Mathematics',
    description: 'Numbers, equations, patterns, logic, abstraction.',
  },
];

const Page = () => {
  const [data, setData] = useState(data1);
  const [branches] = useState(branches1);
  const { jwt } = useContext<any>(AuthContext);
  const [color, setColor] = useState<string>();
  const url = process.env.NEXT_PUBLIC_URL;

  useEffect(
    function () {
      async function fetchData() {
        try {
          const req = await fetch(`${url}/api/v1/note-nestle/subjects/stats`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              authorization: `Bearer ${jwt}`,
            },
          });
          const data2 = await req.json();
          const about = data2.data;
          const updatedData = data.map((item) => ({
            ...item,
            count: about[item.id] !== undefined ? about[item.id] : item.count,
          }));
          setData(updatedData);
        } catch {
          toast.error('Something went wrong, refresh the page', {
            className: 'toast toast-fail',
          });
        }
      }
      fetchData();
    },
    [jwt]
  );

  useEffect(() => {
    const handleSvgLoad = () => {
      const html = document.documentElement;
      if (html.classList.contains('dark')) {
        setColor('dark');
      } else {
        setColor('light');
      }
    };

    // Initial setup
    handleSvgLoad();

    // Create a MutationObserver
    const observer = new MutationObserver(() => {
      handleSvgLoad();
    });

    // Configure and start observing changes to the documentElement
    const config = { attributes: true, attributeFilter: ['class'] };
    observer.observe(document.documentElement, config);

    // Cleanup the observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className="bg-bgN">
      <section id="hero-section " className="pb-[6rem] lg:pb-[9.6rem] bg-bgN">
        <div className=" container grid grid-col-1 lg:grid-cols-2 ">
          <div className="text-center justify-center items-center pt-[2.5rem] lg:pt-[10rem]">
            <h1 className="text-title text-[3rem] mb-[1.5rem] lg:text-[4.5rem] font-fontPrimary text-center">
              Note Nestle
            </h1>
            <h2 className="text-[1.3rem] lg:text-[1.5rem] lg:mb-5 text-para">
              Elevate your learning journey. A centralized hub for engineering
              resources—lectures, presentations, and more. Empowering educators
              to share knowledge, enabling students to access, learn, and
              succeed.
            </h2>
          </div>
          <div className="text-center justify-center items-end text-title flex pt-[2.25rem]  lg:pt-[4rem]">
            <div className=" w-[50%] lg:w-[70%]">
              {color === 'dark' && (
                <img src="main-page-img.svg" alt="Main page photo" />
              )}
              {color === 'light' && (
                <img src="main-page-img1.svg" alt="Main page photo" />
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="py-[5rem] bg-bgA  text-titleA">
        <div className="container  text-center">
          <h2 className="text-[2.5rem] lg:text-[3rem] font-fontPrimary pb-[3rem]">
            Statastics
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2rem] lg:gap-[3rem] ">
            {data.map((stat) => (
              <Statastic data={stat} key={stat.category} />
            ))}
          </div>
        </div>
      </section>
      <section id="Branches" className="bg-bgN text-title py-[5rem]">
        <div className="container  text-center">
          <h2 className="text-[2.5rem] lg:text-[3rem] font-fontPrimary pb-[1.5rem]">
            Branches
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[2rem] lg:gap-[3rem]">
            {branches.map((branch) => (
              <Branch branch={branch} key={branch.branch} />
            ))}
          </div>
        </div>
      </section>
      <section id="feedback" className="bg-bgA text-titleA py-[2.5rem]">
        <div className="container  text-center p-[2.5rem]">
          <h2 className="text-[3rem] font-fontPrimary mb-[1.5rem]">
            Your Feedback Matters!
          </h2>
          <Feedback />
        </div>
      </section>
      <Toaster toastOptions={{ duration: 5000 }} />
    </main>
  );
};

export default Page;
