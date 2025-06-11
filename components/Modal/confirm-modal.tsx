"use client";
interface ConfirmModalProps {
    isOpen: boolean;
    title?: string;
    message?: string;
    onClose: () => void;
    onConfirm: () => void;
}

export default function ConfirmModal({ isOpen, title, message, onClose, onConfirm }: ConfirmModalProps) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold">
                    {title ?
                        <span>{title}</span>
                        :
                        <span>กรุณายืนยัน</span>
                    }
                </h2>
                <p className="mt-2">
                    {message ?
                        <span>{message}</span>
                        :
                        <span>คุณต้องการดำเนินการใช่หรือไม่</span>
                    }
                </p>
                <div className="mt-4 flex justify-end space-x-2">
                    <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>ยกเลิก</button>
                    <button className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded" onClick={onConfirm}>ยืนยัน</button>
                </div>
            </div>
        </div>
    );
}