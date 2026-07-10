"use client";

type ShowGraphPopupProps = {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
};

export default function ShowGraphPopup({
  isOpen,
  imageUrl,
  onClose,
}: ShowGraphPopupProps) {
  if (!isOpen || !imageUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xl font-bold text-gray-600 hover:text-black"
          aria-label="Close graph popup"
        >
          ×
        </button>

        <h2 className="mb-4 text-2xl font-bold">Function graph</h2>

        <div className="flex justify-center">
          <img
            src={imageUrl}
            alt="Function graph"
            className="max-h-[70vh] w-auto rounded-lg border"
          />
        </div>
      </div>
    </div>
  );
}
