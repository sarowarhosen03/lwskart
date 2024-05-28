"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
    const pathName = usePathname()
    const pathItems = pathName.split("/").splice(2);
    let cumulativePath = "";

    const paths = pathItems.map((pathItem, i) => {
        cumulativePath += (i > 0 ? "/" : "") + pathItem;
        return {
            text: pathItem,
            path: cumulativePath
        };
    });


    return (
        <div className="container py-4 flex items-center gap-3">
            <Link href="/index.html" className="text-primary text-base">
                <i className="fa-solid fa-house"></i>
            </Link>
            <span className="text-sm text-gray-400">
                <i className="fa-solid fa-chevron-right"></i>
            </span>
            {
                paths.map((path, i) => {
                    if (i - 1 === paths.length) {
                        return (<p key={i} className="text-gray-600 font-medium ">{path.text}</p>)

                    }
                    return (<Link href={`/${path.path}`} key={i} className="text-gray-600 font-medium hover:text-primary">{path.text}</Link>)

                })
            }
        </div>
    )
}
