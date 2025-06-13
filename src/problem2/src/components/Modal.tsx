import { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  const [animationClass, setAnimationClass] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setAnimationClass("opacity-100 scale-100"), 200);
    } else {
      setAnimationClass("opacity-0 scale-60");
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby={title}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity duration-300 ease-out"
        onClick={onClose}
      />
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div
          className={`relative transform overflow-hidden rounded-lg bg-gray-800 border border-gray-700 text-left shadow-xl transition-all duration-300 ease-out ${animationClass}`}
          style={{ maxWidth: "28rem" }}
        >
          <div className="border-b border-gray-700 px-6 py-4">
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>

          <div className="px-6 py-4">{children}</div>

          <button
            type="button"
            className="absolute top-3 right-3 rounded-full p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
