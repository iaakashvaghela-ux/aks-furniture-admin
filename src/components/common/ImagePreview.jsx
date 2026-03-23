import React from 'react'
import { RxCross2 } from 'react-icons/rx'

export default function ImagePreview({ previewImage, setPreviewImage }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">

            <div className="relative">

                <button
                    onClick={() => setPreviewImage(null)}
                    className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full p-2"
                >
                    <RxCross2 size={20} />
                </button>

                <img
                    src={previewImage}
                    className="max-h-[80vh] max-w-[90vw] rounded-lg"
                />

            </div>

        </div>
    )
}
