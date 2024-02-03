'use client';
import Branch from '@/components/Branch';
import Feedback from '@/components/Feedback';

const page = () => {
  const branches = [
    { branch: 'CSE', name: 'Computer Science' },
    { branch: 'ECE', name: 'Electronics and Communication' },
    { branch: 'EEE', name: 'Electrical and Electronics' },
    { branch: 'ISE', name: 'Information Science' },
    { branch: 'ME', name: 'Mechanical' },
    { branch: 'CV', name: 'Civil' },
    { branch: 'AE', name: 'Aeronautical' },
    { branch: 'PHY', name: 'Phycics' },
    { branch: 'CHE', name: 'Chemistry' },
    { branch: 'MAT', name: 'Mathematics' },
  ];

  return (
    <main>
      <section
        id="hero-section "
        className="text-3xl min-h-screen text-center mt-10"
      >
        Hero Section
      </section>
      <section id="Branches">
        <h2>Branches</h2>
        {branches.map((branch) => (
          <Branch branch={branch} key={branch.branch} />
        ))}
      </section>
      <section id="feedback">
        <h2 className="text-5xl text-om font-fontPrimary">FeedBack section</h2>
        <Feedback />
      </section>
    </main>
  );
};

export default page;
