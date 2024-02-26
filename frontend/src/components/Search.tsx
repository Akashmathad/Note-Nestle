'use client';
import { Input } from '@/components/ui/input';

const Search = ({ subjects, setFinalList }) => {
  function handleSearchChange(searchString) {
    if (subjects) {
      const finalList = subjects.filter((subject) =>
        subject.name.toLowerCase().includes(searchString.toLowerCase())
      );
      console.log(finalList);
      setFinalList(finalList);
    }
  }

  return (
    <Input
      className="w-full"
      type="text"
      onChange={(e) => handleSearchChange(e.target.value)}
      placeholder="Search for subject"
    />
  );
};

export default Search;
