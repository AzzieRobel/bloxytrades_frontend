import React from 'react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  isLoading?: boolean;
}

export const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  isLoading = false,
}: DeleteConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1a1625] border border-white/10 rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-white text-xl font-bold mb-4">Confirm Delete</h2>
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete the listing "{itemName}"? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-6 py-2.5 rounded-sm bg-red-500 text-white font-semibold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-6 py-2.5 rounded-sm bg-gray-600 text-white font-semibold hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

