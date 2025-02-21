interface SearchBarProps {
  searchQuery: {
    studentName: string;
    studentId: string;
    facultyName: string;
  };
  setSearchQuery: (query: {
    studentName: string;
    studentId: string;
    facultyName: string;
  }) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    setSearchQuery({
      ...searchQuery,
      [field]: e.target.value,
    });
  };

  return (
    <div className="mb-4 flex gap-4">
      <input
        type="text"
        placeholder="Search by student name..."
        value={searchQuery.studentName}
        onChange={(e) => handleInputChange(e, "studentName")}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Search by student ID..."
        value={searchQuery.studentId}
        onChange={(e) => handleInputChange(e, "studentId")}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Search by faculty name..."
        value={searchQuery.facultyName}
        onChange={(e) => handleInputChange(e, "facultyName")}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
