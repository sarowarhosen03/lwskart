"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { useSession } from "next-auth/react";
import { useRef, useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormSection from "./FormSection";
import ImageUpload from "./ImageUpload.jsx";

export default function EditUser({
  userInfo,
  profileDict: { personal, shipping, billing, edit },
  personal: personalDict,
  addressDict,
}) {
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
      imageUrl: !image ? "/user/avatar-svgrepo-com.svg" : image,
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
                  notSet={personalDict.notSet}
                  title={personal}
                  section="personal"
                  setValue={setValue}
                  fields={[
                    { label: personalDict.name, field: "name" },
                    {
                      label: personalDict.email,
                      field: "email",
                      readOnly: email !== null,
                      type: "email",
                    },
                    {
                      label: personalDict.phone,
                      field: "phone",
                      type: "number",
                    },
                    {
                      label: personalDict.company,
                      field: "company",
                      required: false,
                    },
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
                  title={shipping}
                  section="shippingAddress"
                  fields={[
                    { label: addressDict.address, field: "address" },
                    { label: addressDict.PostalCode, field: "postalCode" },
                    { label: addressDict.phone, field: "phone" },
                    { label: addressDict.country, field: "country" },
                    { label: addressDict.state, field: "state" },
                    { label: addressDict.city, field: "city" },
                  ]}
                  isEditing={isEditing}
                  isSameAddress={isSameAddress}
                  handleSameAddressChange={handleSameAddressChange}
                />
                <FormSection
                  title={billing}
                  section="billingAddress"
                  fields={[
                    { label: addressDict.address, field: "address" },
                    { label: addressDict.PostalCode, field: "postalCode" },
                    { label: addressDict.phone, field: "phone" },
                    { label: addressDict.country, field: "country" },
                    { label: addressDict.state, field: "state" },
                    { label: addressDict.city, field: "city" },
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
                  {isEditing ? "Save Changes" : edit}
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
