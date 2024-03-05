import React from 'react';
import { Linkedin } from 'lucide-react';
import Image from 'next/image';
import SvgGitHub from './svgGitHub';
import SvgTwitter from './svgTwitter';

const teamMembers = [
  {
    id: 1,
    name: 'Akash Mathad',
    image: '/AkashM.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis nisi reprehenderit consectetur repudiandae, mollitia alias.',
    github: 'github 1',
    twitter: '',
    linkedIn: '',
  },
  {
    id: 1,
    name: 'Om Vasudev',
    image: '/OmV.jpg',
    description:
      'As a frontend developer, I developed the homepage of Notes Nestle using Next.js and Tailwind CSS, creating a user-friendly UI.',
    github: 'https://github.com/OmVasudev',
    twitter: 'https://twitter.com/OmVasudev3',
    linkedIn: 'https://www.linkedin.com/in/om-vasudev-a14109244',
  },
  {
    id: 1,
    name: 'Apurva Upadhye',
    image: '/ApurvaU.jpg',
    description:
      'I crafted a branches page with TypeScript. It offers enhanced functionality and robustness.',
    github: 'https://github.com/Apurva-Upadhye',
    twitter: 'https://twitter.com/ApurvaUpad96142',
    linkedIn: 'https://www.linkedin.com/in/apurva-upadhye-8b8786244',
  },
  {
    id: 1,
    name: 'Arham Mulla',
    image: '/ArhamM.jpg',
    description:
      'I designed the About Us page using Next.js for functionality and Tailwind CSS for a polished and responsive appearance.',
    github: 'https://github.com/ArhamMulla',
    twitter: 'https://twitter.com/Arham_Mulla_',
    linkedIn: 'https://in.linkedin.com/in/arham-mulla-b9ba2b246',
  },
  // Add more team members as needed
];

const AboutUs = () => {
  return (
    <section
      id="AboutUs"
      className="bg-bg text-primary-text font-para py-[2rem] min-h-[80vh]"
    >
      <div className="container text-center">
        <h2 className="text-[2.5rem] lg:text-[3rem] font-fontPrimary pb-[1.5rem]">
          Meet Our Team
        </h2>
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-8 mx-auto">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="inner border border-borderN p-[1rem] border-opacity-50 rounded-lg flex flex-col justify-center items-center"
            >
              <Image
                src={member.image}
                alt={'Image of ${member.name}'}
                width={100}
                height={100}
                className="w-27 h-27 object-cover rounded-full mt-2"
              />
              <h2 className="mt-4 text-2xl font-fontPrimary">{member.name}</h2>
              <p className="mt-2">{member.description}</p>

              <div className="icons flex justify-center items-center gap-2 mt-[2rem]">
                <a href={member.github}>
                  {/* <GithubIcon /> */}

                  <SvgGitHub />
                </a>
                <a href={member.twitter}>
                  <SvgTwitter />
                  {/* <Twitter /> */}
                </a>
                <a href={member.linkedIn}>
                  <Linkedin />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
