'use client';
import Branch from '@/components/Branch';
import Feedback from '@/components/Feedback';
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
} from 'lucide-react';

const page = () => {
  const branches = [
    {
      branch: 'CSE',
      icon: <Laptop2 />,
      name: 'Computer Science',
      description:
        'Designs software and hardware systems, focusing on algorithms, programming, and artificial intelligence.',
    },
    {
      branch: 'ECE',
      icon: <Cpu />,
      name: 'Electronics and Communication',
      description:
        'Specializes in electronic circuits, communication systems, and signal processing for devices like smartphones.',
    },
    {
      branch: 'EEE',
      icon: <RadioTower />,
      name: 'Electrical and Electronics',
      description:
        'Deals with electrical systems, electronic devices, and integrated circuits, including power generation and control systems.',
    },
    {
      branch: 'ISE',
      icon: <Laptop2 />,
      name: 'Information Science',
      description:
        'Integrates computer science and information technology, emphasizing software development and database management.',
    },
    {
      branch: 'ME',
      icon: <Wrench />,
      name: 'Mechanical',
      description:
        'Applies physical principles to design and manufacture mechanical systems, including machines, robotics, and renewable energy.',
    },
    {
      branch: 'CV',
      icon: <Landmark />,
      name: 'Civil',
      description:
        'Focuses on planning, designing, and constructing infrastructure projects such as bridges, buildings, and transportation systems.',
    },
    {
      branch: 'AE',
      icon: <Plane />,
      name: 'Aeronautical',
      description:
        'Specializes in the design and development of aircraft and spacecraft, covering aerodynamics, avionics, and propulsion systems.',
    },
    {
      branch: 'PHY',
      icon: <Rocket />,
      name: 'Phycics',
      description:
        'Explores fundamental principles of matter and energy, including classical mechanics, electromagnetism, quantum mechanics.',
    },
    {
      branch: 'CHE',
      icon: <FlaskConical />,
      name: 'Chemistry',
      description:
        "Studies matter's properties, composition, and behavior, including organic and inorganic chemistry, biochemistry, and materials science.",
    },
    {
      branch: 'MAT',
      icon: <Infinity />,
      name: 'Mathematics',
      description:
        'Investigates abstract structures through logical reasoning, covering algebra, calculus, geometry.',
    },
  ];

  return (
    <main className="bg-bgN">
      <section
        id="hero-section "
        className="  lg:min-h-screen pb-[9.6rem] bg-bgN"
      >
        <div className=" container grid grid-col-1 lg:grid-cols-2 ">
          <div className="text-center justify-center items-center pt-[2.5rem] lg:pt-[10rem]">
            <h1 className="text-title text-[3rem] lg:text-[4.5rem] font-fontPrimary text-center">
              Note Nestle
            </h1>
            <h2 className=" text-[1.5rem] lg:text-[2.25rem] mb-2 lg:mb-5 font-medium ">
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
      <section
        id="Branches"
        className="min-h-screen pb-[9.6rem] bg-bgA text-titleA"
      >
        <div className="container pt-[2.25rem] text-center">
          <h2 className="text-[2.5rem] lg:text-[3rem] font-fontPrimary lg:pb-[1.5rem]">
            Branches
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-[3rem]">
            {branches.map((branch) => (
              <Branch branch={branch} key={branch.branch} />
            ))}
          </div>
        </div>
      </section>
      <section
        id="feedback"
        className="min-h-screen pb-[9.6rem] bg-bgN text-title"
      >
        <div className="container">
          <h2 className="text-5xl text-om font-fontPrimary">
            FeedBack section
          </h2>
          <Feedback />
        </div>
      </section>
    </main>
  );
};

export default page;
