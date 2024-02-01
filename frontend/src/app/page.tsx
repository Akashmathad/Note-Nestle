'use client';
import Branch from '@/components/Branch';
import Feedback from '@/components/Feedback';

const page = () => {
  const branches = [
    {
      branch: 'CSE',
      name: 'Computer Science',
      description:
        'Designs and advances software and hardware systems, including areas like algorithms, programming languages, and artificial intelligence.',
    },
    {
      branch: 'ECE',
      name: 'Electronics and Communication',
      description:
        'Focuses on electronic circuits, communication systems, and signal processing for devices like smartphones and efficient communication networks.',
    },
    {
      branch: 'EEE',
      name: 'Electrical and Electronics',
      description:
        'Deals with electrical systems, electronic devices, and integrated circuits, spanning power generation, distribution, and control systems.',
    },
    {
      branch: 'ISE',
      name: 'Information Science',
      description:
        'Integrates computer science and information technology, emphasizing software development, database management, and information systems.',
    },
    {
      branch: 'ME',
      name: 'Mechanical',
      description:
        'Applies physical principles to design and manufacture mechanical systems, including engines, machines, robotics, and renewable energy technologies.',
    },
    {
      branch: 'CV',
      name: 'Civil',
      description:
        'Focuses on planning, designing, and constructing infrastructure projects such as bridges, buildings, and transportation systems.',
    },
    {
      branch: 'AE',
      name: 'Auronautical',
      description:
        'Specializes in the design and development of aircraft and spacecraft, covering aerodynamics, avionics, and propulsion systems.',
    },
    {
      branch: 'PHY',
      name: 'Phycics',
      description:
        'Investigates fundamental principles of matter, energy, space, and time, covering classical and quantum mechanics, electromagnetism, and astrophysics.',
    },
    {
      branch: 'CHE',
      name: 'Chemistry',
      description:
        'Explores the composition, properties, and reactions of substances to understand the principles governing matter.',
    },
    {
      branch: 'MAT',
      name: 'Mathematics',
      description:
        'Studies abstract structures, patterns, and relationships using logical reasoning, including pure mathematics and applied mathematics.',
    },
  ];

  return (
    <main>
      <section
        id="hero-section"
        className="grid grid-cols-1 text-white text-center min-h-screen bg-black p-10 pt-15"
      >
        <div className="pt-36 mt-20">
          <h1 className="text-7xl mb-10 font-heading">Note-Nestle</h1>
          <h2 className="text-4xl mb-5 font-para font-medium">
            Elevate Your Learning Experience
          </h2>
          <h2 className="text-2xl mb-5 font-para text-zinc-400">
            Dive into Note-Nestle's World of Wisdom.
          </h2>
        </div>
      </section>
      <section className="min-h-screen pt-12">
        <h1 className="text-3xl font-heading text-center">Statastics</h1>
      </section>
      <section
        className="p-10 pt-15 min-h-screen text-white bg-black"
        id="Branches"
      >
        <h2 className="text-center m-5 mb-10 text-white text-3xl font-heading ">
          Branches
        </h2>
        <div className="grid grid-cols-3 gap-10">
          {branches.map((branch) => (
            <Branch branch={branch} key={branch.branch} />
          ))}
        </div>
      </section>
      <section className="min-h-screen p-15 pt-10" id="feedback">
        <h2 className="text-3xl font-heading text-center">Feedback</h2>
        <div className="grid grid-cols-2 mt-20 ml-20">
          <Feedback />
        </div>
      </section>
    </main>
  );
};

export default page;
