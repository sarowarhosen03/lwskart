import Image from "next/image";

const ImageUpload = ({
  isEditing,
  imageInputRef,
  profile,
  handleImageChange,
}) => {
  return (
    <div>
      <h4 className="font-medium text-gray-700">Profile Image</h4>
      {isEditing ? (
        <div className="" onClick={() => imageInputRef.current.click()}>
          <input
            ref={imageInputRef}
            hidden={true}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full rounded border px-2 py-1"
          />
          <Image
            height={128}
            width={1431}
            alt="profile image"
            src={profile.imageUrl}
            className="mt-2 h-auto w-auto rounded-full object-cover p-2 ring-1 ring-primary"
            loading="lazy"
          />
          <button
            type="button"
            className="mt-3  rounded-md bg-primary px-2 text-white"
          >
            Update
          </button>
        </div>
      ) : (
        profile.imageUrl && (
          <Image
            height={50}
            width={50}
            alt="profile image"
            src={profile.imageUrl}
            className="mt-2 size-40 rounded-full object-cover p-2 text-center ring-1 ring-primary"
            loading="lazy"
          />
        )
      )}
    </div>
  );
};

export default ImageUpload;
