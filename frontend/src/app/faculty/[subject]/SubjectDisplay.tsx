'use client';
import Link from 'next/link';

function SubjectDisplay({ link, name }) {
  return (
    <Link
      href={link}
      key={link}
      className="p-[2.5rem] bg-bgN flex items-center justify-center text-[1.2rem] rounded-[9px] border border-borderN cursor-pointer"
    >
      {name}
    </Link>
  );
}

export default SubjectDisplay;
