import React from "react";
type Props = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pagination: number[];
};
function PaginationCard({ page, setPage, pagination }: Props) {
  return (
    <div className="p-2 mt-2 flex overflow-hidden pr-10">
    <div className="flex  border rounded-lg">
        <button
          className="border-r p-1"
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        {pagination.map((i) => (
          <button
            key={i + Math.random() * 10}
            className={`p-1 border-r px-4  ${
              page === i - 1 && "border border-blue-400"
            }`}
            onClick={(e) => setPage(i - 1)}
          >
            {i}
          </button>
        ))}
        <button
          className="p-1"
          disabled={page === pagination.length - 1}
          onClick={() => setPage((p) => p + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default PaginationCard;
