"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";

export default function EditForm({ userInfo }) {
  const imageInputRef = useRef();

  const [isPending, startTransition] = useTransition();
  const { name, email, image, phone, address } = userInfo;
  const [srcImg, setSrcImg] = useState(image);
  const billingAddress = address?.billingAddress;
  const shippingAddress = address?.shippingAddress;
  const [isEditing, setIsEditing] = useState(false);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const { update } = useSession();
  let fallbackImage = '/user/avatar-svgrepo-com.svg'
  const [profile, setProfile] = useState({
    name,
    email,
    phone,
    imageUrl: image ? `/user/${srcImg}` : fallbackImage,
    shippingAddress: {
      name: shippingAddress?.name || name,
      address: shippingAddress?.address,
      postalCode: shippingAddress?.postalCode,
      phone: shippingAddress?.phone,
    },
    billingAddress: {
      name: billingAddress?.name,
      address: billingAddress?.address,
      postalCode: billingAddress?.postalCode,
      phone: billingAddress?.phone,
    },
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e, section, field) => {
    const value = e.target.value;
    if (section === "personal") {
      setProfile((prev) => ({ ...prev, [field]: value }));
    } else {
      setProfile((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSameAddressChange = (e) => {
    setIsSameAddress(e.target.checked);
    if (e.target.checked) {
      setProfile((prev) => ({
        ...prev,
        shippingAddress: {
          ...prev.shippingAddress,
          name: prev.billingAddress.name,
          address: prev.billingAddress.address,
          postalCode: prev.billingAddress.postalCode,
          phone: prev.billingAddress.phone,
        },
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const formData = new FormData();
        const file = imageInputRef?.current?.files?.[0];
        if (file) {
          formData.append("file", file);
        }
        formData.append(
          "profile",
          JSON.stringify({
            ...profile,
            image: image,
          }),
        );

        // Replace the following URL with your actual API endpoint
        const response = await fetch("/api/user", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to update profile");
        }
        toast.success("Profile updated successfully");
        const {
          data: { name, email, image: imageUrl },
        } = await response.json();
        await update({ name, email, image: imageUrl });

        setIsEditing(false);
      } catch (error) {
        toast.error("Error updating profile");
      }
    });
  };
  const renderSection = (title, section, fields) => (
    <div className="rounded bg-white px-4 pb-8 pt-6 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
      </div>
      <div className="space-y-1">
        {fields.map(({ label, field, type = "text", readOnly = false }) => (
          <div key={field}>
            <h4 className="font-medium text-gray-700">{label}</h4>
            {isEditing ? (
              <input
                readOnly={readOnly}
                type={type}
                value={
                  section === "personal"
                    ? profile[field] || ""
                    : profile[section][field] || ""
                }
                placeholder={`Enter ${label.toLowerCase()}`}
                onChange={(e) => handleChange(e, section, field)}
                className="w-full rounded border px-2 py-1"
                required
                minLength={field === "phone" ? 11 : 2}
              />
            ) : (
              <p className="text-gray-800">
                {section === "personal"
                  ? profile[field] || "Not Set Yet"
                  : profile[section][field] || "Not Set Yet"}
              </p>
            )}
          </div>
        ))}
        {section === "personal" && (
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
                  height={50}
                  width={50}
                  alt="profile image"
                  src={profile.imageUrl}
                  className="mt-2 h-20 w-20 rounded-full object-cover p-2 ring-1 ring-primary"
                  loading="lazy"
                />

                <button
                  type="button"
                  className="mt-3  rounded-md bg-primary px-2 text-white"
                >
                  {" "}
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
                  className="mt-2 h-20 w-20 rounded-full object-cover p-2 ring-1 ring-primary"
                  loading="lazy"
                />
              )
            )}
          </div>
        )}
        {section === "shippingAddress" && (
          <div>
            <h4 className="font-medium text-gray-700">
              Same as Billing Address
            </h4>
            <input
              type="checkbox"
              checked={isSameAddress}
              onChange={handleSameAddressChange}
              className="rounded border px-2 py-1"
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Breadcrumb />
      <div className="container items-start gap-6 pb-16 pt-4">
        <form onSubmit={handleSubmit}>
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {renderSection("Personal Profile", "personal", [
                { label: "Name", field: "name" },
                {
                  label: "Email",
                  field: "email",
                  readOnly: true,
                  type: "email",
                },
                { label: "Phone", field: "phone", type: "number" },
              ])}
              {renderSection("Shipping address", "shippingAddress", [
                { label: "Name", field: "name" },
                { label: "Address", field: "address" },
                { label: "Postal Code", field: "postalCode" },
                { label: "Phone", field: "phone" },
              ])}
              {renderSection("Billing address", "billingAddress", [
                { label: "Name", field: "name" },
                { label: "Address", field: "address" },
                { label: "Postal Code", field: "postalCode" },
                { label: "Phone", field: "phone" },
              ])}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={isPending}
                onClick={(e) => {
                  if (!isEditing) {
                    e.preventDefault();
                    setIsEditing(true);
                  }
                }}
                className="rounded bg-primary px-4 py-2 text-center text-white hover:bg-white hover:text-primary disabled:bg-red-400 disabled:text-white"
              >
                {isEditing ? "Save Changes" : "Edit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
