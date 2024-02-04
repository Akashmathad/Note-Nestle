'use client';
import Branch from '@/components/Branch';
import Feedback from '@/components/Feedback';
import Statastic from '@/components/Statastic';
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

const page = () => {
  const data = [
    {
      category: 'Total Teachers',
      count: 120,
      icon: <UserRoundCheck size={48} />,
    },
    {
      category: 'Total Students',
      count: 200,
      icon: <Users size={48} />,
    },
    {
      category: 'Total Subjects',
      count: 100,
      icon: <BookOpenCheck size={48} />,
    },
    { category: 'Total Files', count: 250, icon: <FileBarChart size={48} /> },
  ];
  const branches = [
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
      name: 'Mechanical',
      description: 'Machines, systems, mechanics, design, manufacturing.',
    },
    {
      branch: 'CV',
      icon: <Landmark size={48} strokeWidth={1} />,
      name: 'Civil',
      description:
        'Infrastructure, construction, structures, design, planning.',
    },
    {
      branch: 'AE',
      icon: <Plane size={48} strokeWidth={1} />,
      name: 'Aeronautical',
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
      description:
        'Molecules, reactions, elements, compounds, chemical concepts',
    },
    {
      branch: 'MAT',
      icon: <Infinity size={48} strokeWidth={1} />,
      name: 'Mathematics',
      description: 'Numbers, equations, patterns, logic, abstraction.',
    },
  ];

  return (
    <main className="bg-bgN">
      <section id="hero-section " className="pb-[6rem] lg:pb-[9.6rem] bg-bgN">
        <div className=" container grid grid-col-1 lg:grid-cols-2 ">
          <div className="text-center justify-center items-center pt-[2.5rem] lg:pt-[10rem]">
            <h1 className="text-title text-[3rem] lg:text-[4.5rem] font-fontPrimary text-center">
              Note Nestle
            </h1>
            <h2 className=" text-[1.5rem] lg:text-[2.25rem] mb-2 lg:mb-5 font-medium">
              Elevate Your Learning Experience
            </h2>
            <h2 className="text-[1rem] lg:text-[1.5rem] lg:mb-5 text-zinc-500">
              Dive into Note-Nestle's World of Wisdom.
            </h2>
          </div>
          <div className="text-center justify-center items-end text-title flex pt-[2.25rem]  lg:pt-[4rem]">
            <div className=" w-[50%] lg:w-[70%]">
              <img src="main-page-img.svg" alt="..." />
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
            Feedback System
          </h2>
          <Feedback />
        </div>
      </section>
    </main>
  );
};

export default page;
