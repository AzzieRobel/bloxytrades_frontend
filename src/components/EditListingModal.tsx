import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { ImageUploadModal } from './ImageUploadModal';

interface EditFormData {
  title: string;
  price: string;
  rap: string;
  quantity: string;
  estimatedDeliveryTime: string;
  imageUrl: string;
  paymentMethods: {
    crypto: boolean;
    paypal: boolean;
    card: boolean;
  };
}

interface EditListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: EditFormData;
  onFormChange: (data: EditFormData) => void;
  onUpdate: () => void;
  isLoading?: boolean;
  isImageUploadModalOpen: boolean;
  onImageUploadModalOpen: () => void;
  onImageUploadModalClose: () => void;
  onImageChange: (url: string) => void;
}

export const EditListingModal = ({
  isOpen,
  onClose,
  formData,
  onFormChange,
  onUpdate,
  isLoading = false,
  isImageUploadModalOpen,
  onImageUploadModalOpen,
  onImageUploadModalClose,
  onImageChange,
}: EditListingModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-[#1a1625] border border-white/10 rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <h2 className="text-white text-xl font-bold mb-6">Edit Listing</h2>
          <div className="space-y-4">
            <div>
              <div className="mb-2">
                <label className="block text-sm text-gray-300 mb-1 text-left">Title : </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => onFormChange({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-black border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/60"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm text-gray-300 mb-1 text-left">Listing Image</label>
                <div className="flex items-center gap-3">
                  {formData.imageUrl ? (
                    <div className="flex items-center gap-3">
                      <img
                        src={formData.imageUrl}
                        alt="Listing preview"
                        className="w-16 h-16 object-cover rounded border border-white/10"
                      />
                      <button
                        type="button"
                        onClick={onImageUploadModalOpen}
                        className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-sm text-sm transition-colors"
                      >
                        Change Image
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={onImageUploadModalOpen}
                      className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-sm text-sm transition-colors"
                    >
                      <ImageIcon className="w-4 h-4" />
                      Upload Image
                    </button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <label className="block text-sm text-gray-300 mb-1 text-left">Price (USD) : </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => onFormChange({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 bg-black border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/60"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1 text-left">RAP : </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.rap}
                    onChange={(e) => onFormChange({ ...formData, rap: e.target.value })}
                    className="w-full px-4 py-2 bg-black border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/60"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <label className="block text-sm text-gray-300 mb-1 text-left">Quantity : </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => onFormChange({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-2 bg-black border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/60"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="mb-2">
                <label className="block text-sm text-gray-300 mb-1 text-left">Estimated Delivery Time (hours) : </label>
                <input
                  type="number"
                  min="1"
                  value={formData.estimatedDeliveryTime}
                  onChange={(e) => onFormChange({ ...formData, estimatedDeliveryTime: e.target.value })}
                  className="w-full px-4 py-2 bg-black border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/60"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 text-left mb-1">Accepted Payment Methods : </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={formData.paymentMethods.crypto}
                        onChange={(e) =>
                          onFormChange({
                            ...formData,
                            paymentMethods: { ...formData.paymentMethods, crypto: e.target.checked },
                          })
                        }
                        className="w-5 h-5 rounded border-2 border-white/20 bg-transparent checked:bg-primary checked:border-primary cursor-pointer transition-all duration-200 hover:border-primary/50 focus:ring-2 focus:ring-primary/50 focus:outline-none appearance-none"
                      />
                      {formData.paymentMethods.crypto && (
                        <svg className="absolute top-0 left-0 w-5 h-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-300 text-sm group-hover:text-white transition-colors">Crypto</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={formData.paymentMethods.paypal}
                        onChange={(e) =>
                          onFormChange({
                            ...formData,
                            paymentMethods: { ...formData.paymentMethods, paypal: e.target.checked },
                          })
                        }
                        className="w-5 h-5 rounded border-2 border-white/20 bg-transparent checked:bg-primary checked:border-primary cursor-pointer transition-all duration-200 hover:border-primary/50 focus:ring-2 focus:ring-primary/50 focus:outline-none appearance-none"
                      />
                      {formData.paymentMethods.paypal && (
                        <svg className="absolute top-0 left-0 w-5 h-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-300 text-sm group-hover:text-white transition-colors">PayPal</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={formData.paymentMethods.card}
                        onChange={(e) =>
                          onFormChange({
                            ...formData,
                            paymentMethods: { ...formData.paymentMethods, card: e.target.checked },
                          })
                        }
                        className="w-5 h-5 rounded border-2 border-white/20 bg-transparent checked:bg-primary checked:border-primary cursor-pointer transition-all duration-200 hover:border-primary/50 focus:ring-2 focus:ring-primary/50 focus:outline-none appearance-none"
                      />
                      {formData.paymentMethods.card && (
                        <svg className="absolute top-0 left-0 w-5 h-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-300 text-sm group-hover:text-white transition-colors">Card</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                onClick={onUpdate}
                disabled={isLoading}
                className="flex-1 px-6 py-2.5 rounded-sm bg-primary text-white font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Updating..." : "Update Listing"}
              </button>
              <button
                onClick={onClose}
                disabled={isLoading}
                className="px-6 py-2.5 rounded-sm bg-gray-600 text-white font-semibold hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Upload Modal */}
      <ImageUploadModal
        isOpen={isImageUploadModalOpen}
        onClose={onImageUploadModalClose}
        currentImageUrl={formData.imageUrl}
        onImageChange={onImageChange}
      />
    </>
  );
};

