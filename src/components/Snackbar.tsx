import { useEffect } from 'react';

interface SnackbarProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Snackbar({ message, isOpen, onClose }: SnackbarProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <div
      className={`snackbar ${isOpen ? 'show' : ''}`}
      onClick={() => onClose()}
    >
      {message}
    </div>
  );
}
