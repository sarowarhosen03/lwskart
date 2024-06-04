"use client";
import { redirectFromServer } from "@/lib/actions/redirect";
import { locales } from "@/lib/controler/internationalization";
import { getCookie, setCookie } from "@/utils/cookies";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLangPath = pathname?.split("/")[1];
  const languages = locales;
  const searchParams = useSearchParams();
  useEffect(() => {
    const lang = getCookie("lang");
    if (!lang || lang !== currentLangPath) {
      setCookie("lang", currentLangPath);
    }
  });
  const found = languages.find((lang) => lang.code === currentLangPath);
  const [selectedLanguage, setSelectedLanguage] = useState(
    found ?? languages[0],
  );

  const langDropDwonRef = useRef();
  function toggleMenu() {
    langDropDwonRef.current?.classList.toggle("hidden");
  }

  async function handleSwitchLanguage(lang) {
    //set preferred language in cookie
    setCookie("lang", lang.code);
    //i can parsist it via server-side cookie due to courese limitation i cant make any api call
    const newPathName = pathname.replace(
      `/${currentLangPath}`,
      `/${lang.code}`,
    );
    const params = new URLSearchParams(searchParams.toString());
    setSelectedLanguage(lang);
    toggleMenu();
    redirectFromServer(newPathName + "?" + params.toString());
  }

  const escapeMenu = useCallback((e) => {
    if (
      e.key === "Escape" &&
      !langDropDwonRef.current?.classList.contains("hidden")
    )
      toggleMenu();
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escapeMenu);
    return () => document.removeEventListener("keydown", escapeMenu);
  }, [escapeMenu]);

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="flex items-center gap-2">
        <Image
          className="max-w-8"
          src={selectedLanguage.image}
          height={20}
          width={20}
          alt={selectedLanguage.image}
        />
        {selectedLanguage.language}
      </button>

      <div ref={langDropDwonRef} className="hidden">
        <div
          onClick={toggleMenu}
          className="fixed inset-0  h-screen w-screen  "
        ></div>

        <div className="dark:bg-body absolute right-0 top-full z-10 mt-2 w-40 rounded-md bg-white p-2 shadow-lg   ">
          <ul>
            {languages
              ?.filter((lang) => lang.code !== found?.code)
              .map((lang, index) => (
                <li
                  key={index}
                  onClick={() => handleSwitchLanguage(lang)}
                  className="dark:hover:text-body flex cursor-pointer items-center justify-between gap-2 rounded-md p-2  hover:bg-red-400 hover:text-white "
                >
                  <Image
                    className="max-w-8"
                    src={lang.image}
                    alt={lang.image}
                    height={20}
                    width={20}
                  />
                  {lang.language}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LanguageSwitcher;
