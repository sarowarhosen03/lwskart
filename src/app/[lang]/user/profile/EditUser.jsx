"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { useSession } from "next-auth/react";
import { useRef, useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormSection from "./FormSection";
import ImageUpload from "./ImageUpload.jsx";

export default function EditUser({ userInfo }) {
  const imageInputRef = useRef();
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();
  const { name, email, image, phone, address, company } = userInfo;
  const billingAddress = address?.billingAddress;
  const shippingAddress = address?.shippingAddress;

  const methods = useForm({
    defaultValues: {
      name,
      email,
      phone,
      company,
      imageUrl: image ? `/user/${image}` : "/user/avatar-svgrepo-com.svg",
      shippingAddress: {
        name: shippingAddress?.name || name,
        address: shippingAddress?.address,
        country: shippingAddress?.country,
        postalCode: shippingAddress?.postalCode,
        phone: shippingAddress?.phone,
        city: shippingAddress?.city,
        state: shippingAddress?.state,
      },
      billingAddress: {
        name: billingAddress?.name || name,
        address: billingAddress?.address,
        country: billingAddress?.country,
        postalCode: billingAddress?.postalCode,
        phone: billingAddress?.phone,
        city: billingAddress?.city,
        state: billingAddress?.state,
      },
    },
  });

  const { setValue, watch, handleSubmit } = methods;
  const profile = watch();

  const [isEditing, setIsEditing] = useState(false);
  const [isSameAddress, setIsSameAddress] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("imageUrl", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSameAddressChange = (e) => {
    setIsSameAddress(e.target.checked);
    if (e.target.checked) {
      setValue("shippingAddress", profile.billingAddress);
    }
  };

  const onSubmit = async (data) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        const file = imageInputRef.current?.files?.[0];
        if (file) {
          formData.append("file", file);
        }
        formData.append("profile", JSON.stringify(data));

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

  return (
    <>
      <Breadcrumb />
      <div className="container items-start gap-6 pb-16 pt-4">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mx-auto max-w-5xl">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <FormSection
                  title="Personal Profile"
                  section="personal"
                  setValue={setValue}
                  fields={[
                    { label: "Name", field: "name" },
                    {
                      label: "Email",
                      field: "email",
                      readOnly: email !== null,
                      type: "email",
                    },
                    { label: "Phone", field: "phone", type: "number" },
                    { label: "Company", field: "company", required: false },
                  ]}
                  isEditing={isEditing}
                >
                  <ImageUpload
                    isEditing={isEditing}
                    imageInputRef={imageInputRef}
                    profile={profile}
                    handleImageChange={handleImageChange}
                  />
                </FormSection>
                <FormSection
                  title="Shipping address"
                  section="shippingAddress"
                  fields={[
                    { label: "Name", field: "name" },
                    { label: "Address", field: "address" },
                    { label: "Postal Code", field: "postalCode" },
                    { label: "Phone", field: "phone" },
                    { label: "Country", field: "country" },
                    { label: "City", field: "city" },
                    { label: "State", field: "state" },
                  ]}
                  isEditing={isEditing}
                  isSameAddress={isSameAddress}
                  handleSameAddressChange={handleSameAddressChange}
                />
                <FormSection
                  title="Billing address"
                  section="billingAddress"
                  fields={[
                    { label: "Name", field: "name" },
                    { label: "Address", field: "address" },
                    { label: "Postal Code", field: "postalCode" },
                    { label: "Phone", field: "phone" },
                    { label: "Country", field: "country" },
                    { label: "City", field: "city" },
                    { label: "State", field: "state" },
                  ]}
                  isEditing={isEditing}
                />
              </div>
              <div className="mt-4 flex justify-end gap-4">
                <button
                  type="submit"
                  disabled={isPending}
                  onClick={(e) => {
                    ``;
                    if (!isEditing) {
                      e.preventDefault();
                      setIsEditing(true);
                    }
                  }}
                  className="rounded bg-primary px-4 py-2 text-center text-white hover:bg-white hover:text-primary disabled:bg-red-400 disabled:text-white"
                >
                  {isEditing ? "Save Changes" : "Edit"}
                </button>
                {isEditing && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsEditing(false);
                    }}
                    className="rounded bg-primary px-4 py-2 text-center text-white hover:bg-white hover:text-primary disabled:bg-red-400 disabled:text-white"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
