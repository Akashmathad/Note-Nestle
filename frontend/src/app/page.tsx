'use client';
import Branch from '@/components/Branch';
import Feedback from '@/components/Feedback';

const page = () => {
  const branches = [
    { branch: 'CSE', name: 'Computer Science and Engineering' },
    { branch: 'ECE', name: 'Electronics and Communication Engineering' },
    { branch: 'EEE', name: 'Electrical and Electronics Engineering' },
    { branch: 'ISE', name: 'Information Science and Engineering' },
    { branch: 'ME', name: 'Mechanical Engineering' },
    { branch: 'CV', name: 'Civil Engineering' },
    { branch: 'AE', name: 'Auronautical Engineering' },
    { branch: 'PHY', name: 'Phycics Departmant' },
    { branch: 'CHE', name: 'Chemistry Department' },
    { branch: 'MAT', name: 'Mathematics Department' },
  ];

  return (
    <main>
      <section id="hero-section" className="text-3xl">
        Hero Section
      </section>
      <section id="Branches">
        <h2>Branches</h2>
        {branches.map((branch) => (
          <Branch branch={branch} key={branch.branch} />
        ))}
      </section>
      <section id="feedback">
        <h2>Feedback Section</h2>
        <Feedback />
      </section>
    </main>
  );
};

export default page;
