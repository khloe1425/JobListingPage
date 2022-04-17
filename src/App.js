import { useState, useEffect } from 'react';
import data from './assets/data.json';
import JobBoardComponent from './components/JobBoardComponent';

function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => setJobs(data), []);

  const filterFunc = ({role, level, tools, languages}) => {
    if (filters.length === 0) {
      return true;
    }
    const tags = [role, level];
    if (tools) {
      console.log(tools);
      tags.push(...tools);
    }
    if (languages) {
      console.log(languages);
      tags.push(...languages);
    }

    return filters.every((filter) => tags.includes(filter));
  };

  const handleTagClick = (tag) => {
    if (filters.includes(tag)) return;

    setFilters([...filters, tag]);
  };

  const handleFilterClick = (passedFilter) => {
    setFilters(filters.filter((f) => f !== passedFilter));
  };

  const clearFilter = () => {
    setFilters([]);
  };

  const filteredJob = jobs.filter(filterFunc);
  
  return (
    <div>
      <header>
        <img src="./images/bg-header-desktop.svg" alt="bg-ima" />
      </header>
      <div className="container m-auto">
        <div className={`cursor-pointer flex bg-white shadow-md my-16 mx-10 p-6 rounded`}>
          {filters.length > 0 &&
            filters.map((filter) => (
              <span
                className="mr-4 mb-4 rouded font-bold text-teal-500 bg-teal-100 p-2 sm:mb-0"
                onClick={() => handleFilterClick(filter)}
              >
                ✕ {filter}
              </span>
            ))}
          <button className="font-bold text-gray-700 ml-auto" onClick={clearFilter}>
            Clear
          </button>
        </div>
        {jobs.length === 0 ? (
          <p>Jobs are fetching...</p>
        ) : (
          filteredJob.map((job) => (
            <JobBoardComponent key={job.id} job={job} handleTagClick={handleTagClick} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
