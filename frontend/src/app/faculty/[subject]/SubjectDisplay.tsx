'use client';
import Link from 'next/link';

function SubjectDisplay({ link, name }) {
  return (
    <div>
      <Link href={link} key={link}>
        {name}
      </Link>
    </div>
  );
}

export default SubjectDisplay;
