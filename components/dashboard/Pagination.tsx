type Props = {
  currentPage?: number;
};

export default function Pagination({ currentPage = 3 }: Props) {
  const pages = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="flex justify-end">
      <div className="flex items-center h-10 rounded-xl border border-gray-200 overflow-hidden bg-white">
        {/* Previous */}
        <button className="px-4 h-full inter-medium text-sm text-gray-700 hover:bg-gray-50">
          Previous
        </button>

        <Divider />

        {/* Page Numbers */}
        {pages.map((page) => (
          <div key={page} className="flex items-center h-full">
            <button
              className={`px-4 h-full inter-medium text-sm ${
                page === currentPage
                  ? "text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
            <Divider />
          </div>
        ))}

        {/* Ellipsis */}
        <button className="px-4 h-full inter-medium text-sm text-gray-500 cursor-default">
          …
        </button>

        <Divider />

        {/* Last */}
        <button className="px-4 h-full inter-medium text-sm text-gray-700 hover:bg-gray-50">
          99
        </button>

        <Divider />

        {/* Next */}
        <button className="px-4 h-full inter-medium text-sm text-gray-700 hover:bg-gray-50">
          Next
        </button>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="w-px h-full bg-gray-200" />;
}
