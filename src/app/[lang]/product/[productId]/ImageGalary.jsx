"use client";
import Image from "next/image";
import { useState } from "react";

export default function ImageGalary({ image }) {
    const [selecTedImage, setSelecTedImage] = useState(image[0]);
    return (
        <div>
            <Image
                height={100}
                width={100}
                src={`/assets/images/products/${selecTedImage}`}
                alt="product thumbnail"
                className="w-full"
            />
            <div className="mt-4 grid grid-cols-5 gap-4">
                {
                    (image.map((img, i) => (
                        <Image
                            key={img}
                            src={`/assets/images/products/${img}`}
                            alt={img}
                            onClick={() => setSelecTedImage(img)}
                            className={`w-full cursor-pointer border ${selecTedImage === img ? "border-primary" : ""}`}
                            height={100}
                            width={100}
                        />
                    )))
                }
            </div>
        </div>
    );
}
