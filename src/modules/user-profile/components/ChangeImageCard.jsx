import { lineSpinner } from "ldrs"
import useChangeImage from "../hooks/useChangeImage"

lineSpinner.register()

const ChangeImageCard = () => {

    const { user, handleImageUploader, handleUpdateImage, isSending, fileInputRef } = useChangeImage()

    return (
        <div className="p-10 bg-white rounded-2xl shadow-sm w-[50%]">
            <div className="inline-block mb-5 space-y-3 text-center">
                <img
                    className="size-32 rounded-lg mb-5 object-cover mx-auto"
                    src={
                        user.profile_image
                            ? user.profile_image
                            : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
                    }
                    alt="user photo"
                />

                {/* Upload button with spinner */}
                <button
                    type="button"
                    onClick={handleImageUploader}
                    disabled={isSending}
                    className={`cursor-pointer w-full px-4 py-2 rounded-lg text-white transition font-medium ${isSending
                            ? 'bg-primary/60 cursor-not-allowed'
                            : 'bg-primary hover:bg-primary-dark focus:ring-4 focus:ring-primary/40'
                        }`}
                >
                    {isSending ? (
                        <div className="flex items-center justify-center gap-2">
                            <p>Uploading</p>

                            <l-line-spinner
                                size="16"
                                stroke="1"
                                speed="1"
                                color="white"
                            ></l-line-spinner>
                        </div>
                    ) : (
                        'Upload'
                    )}
                </button>
            </div>

            <input
                onChange={handleUpdateImage}
                ref={fileInputRef}
                className="hidden"
                type="file"
                id="profile_image"
            />
        </div>
    )
}

export default ChangeImageCard
