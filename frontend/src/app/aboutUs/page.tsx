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
      'Team lead, responsible for  Backend Architecture, Implemented backend using node JS and mongoDB. Responsible for overall Design of website, Implemented frontend using Next JS with Typescript.',
    github: 'https://github.com/Akashmathad',
    twitter: 'https://twitter.com/Akash_Mathad',
    linkedIn: 'https://www.linkedin.com/in/akash-mathad-389203238/',
  },
  {
    id: 1,
    name: 'Om Vasudev',
    image: '/OmV.jpg',
    description:
      'I contributed to crafting the homepage for Notes Nestle by utilizing Shadcn UI and Tailwind CSS to enhance the overall user interface.',
    github: 'https://github.com/OmVasudev',
    twitter: 'https://twitter.com/OmVasudev3',
    linkedIn: 'https://www.linkedin.com/in/om-vasudev-a14109244',
  },
  {
    id: 1,
    name: 'Apurva Upadhye',
    image: '/ApurvaU.jpg',
    description:
      'I contributed to the creation of the Branches for Notes Nestle using shad cn ui and Tailwind CSS.',
    github: 'https://github.com/Apurva-Upadhye',
    twitter: 'https://twitter.com/ApurvaUpad96142',
    linkedIn: 'https://www.linkedin.com/in/apurva-upadhye-8b8786244',
  },
  {
    id: 1,
    name: 'Arham Mulla',
    image: '/ArhamM.jpg',
    description:
      "As a frontend developer,designed the 'About Us' page with stylish and responsive design using Tailwind CSS and the ShadCN UI.",
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
              <h2 className="mt-4 text-3xl lg:text-2xl font-fontPrimary tracking-[2.5px]">
                {member.name}
              </h2>
              <p className="mt-2 sd:text-[1.3rem]">{member.description}</p>

              <div className="icons flex justify-center items-center gap-6 mt-[2rem] ">
                <a target="_blank" href={member.github}>
                  {/* <GithubIcon /> */}

                  <SvgGitHub />
                </a>
                <a target="_blank" href={member.twitter}>
                  <SvgTwitter />
                  {/* <Twitter /> */}
                </a>
                <a target="_blank" href={member.linkedIn}>
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
