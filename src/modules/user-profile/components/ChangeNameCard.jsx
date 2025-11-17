import { lineSpinner } from "ldrs"
import useChangeName from "../hooks/useChangeName"

lineSpinner.register()

const ChangeNameCard = () => {

    const { register, errors, handleSubmit, handleUpdateName, isSending } = useChangeName()

    return (
        <form
            onSubmit={handleSubmit(handleUpdateName)}
            className="p-10 flex gap-5 items-end bg-white rounded-2xl shadow-sm w-[50%]"
        >
            <div className="flex-1">
                <label
                    htmlFor="name"
                    className={`block mb-2 text-sm font-medium ${errors.name ? 'text-red-500' : 'text-gray-900'}`}
                >
                    Update Your Name
                </label>

                <input
                    type="text"
                    {...register('name', {
                        required: true,
                        minLength: 3,
                        maxLength: 20,
                    })}
                    className={`w-full bg-gray-50 border ${errors.name
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-primary focus:border-primary'
                        } text-gray-900 text-sm rounded-lg block p-2.5`}
                    placeholder="e.g. John Doe"
                />

                {errors.name?.type === 'required' && (
                    <p className="text-red-500 text-sm mt-1">Name is required</p>
                )}
                {errors.name?.type === 'minLength' && (
                    <p className="text-red-500 text-sm mt-1">Name must be greater than 3 characters</p>
                )}
                {errors.name?.type === 'maxLength' && (
                    <p className="text-red-500 text-sm mt-1">Name must be less than 20 characters</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSending}
                className="inline-flex gap-3 items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark disabled:bg-primary/60 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-primary/40 transition"
            >
                {isSending ? (
                    <div className="flex items-center gap-2">
                        <span>Updating</span>
                        <l-line-spinner
                            size="18"
                            stroke="2"
                            speed="1"
                            color="white"
                        ></l-line-spinner>
                    </div>
                ) : (
                    "Update"
                )}
            </button>
        </form>
    )
}

export default ChangeNameCard
