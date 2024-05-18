import Image from "next/image";

export default function Ads() {
    return (
        <div className="container pb-16">
            <a href="#">
                <Image height={100} width={100} src="/assets/images/offer.jpg" alt="ads" className="w-full" />
            </a>
        </div>
    )
}
