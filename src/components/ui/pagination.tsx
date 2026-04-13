
"use client";
type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
  hasMore: boolean;
};

export default function Pagination({ page, setPage, hasMore }: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-3 mt-8">

      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className={`px-5 py-2 rounded-xl border shadow-sm text-sm transition ${
          page === 1
            ? "text-gray-300 border-gray-100 cursor-not-allowed"
            : "text-gray-600 border-gray-200 hover:bg-gray-100"
        }`}
      >
        ← Prev
      </button>

      <span className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-xl text-sm font-semibold shadow-sm">
        {page}
      </span>

      <button
        onClick={() => setPage(page + 1)}
        disabled={!hasMore}
        className={`px-5 py-2 rounded-xl border shadow-sm text-sm transition ${
          !hasMore
            ? "text-gray-300 border-gray-100 cursor-not-allowed"
            : "text-gray-600 border-gray-200 hover:bg-gray-100"
        }`}
      >
        Next →
      </button>

    </div>
  );
}





