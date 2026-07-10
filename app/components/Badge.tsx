interface AlertProps {
  message: string;
  onClose?: () => void;
}

export default function Alert({ message, onClose }: AlertProps) {
  return (
    <div
      role="alert"
      className="w-full rounded-md bg-red-50 border border-red-100 px-4 py-4 text-red-700"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-400 text-white">
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6 6L14 14M14 6L6 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="flex-1 text-sm leading-6">
          {message}
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-2 shrink-0 rounded p-1 text-red-500 hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
            aria-label="Close alert"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 6L14 14M14 6L6 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}