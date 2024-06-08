"use client";

import { useState } from "react";

export default function SendMessage() {
  const [sent, setSent] = useState(false);
  //message sent feature is not implemented yet
  return !sent ? (
    <button
      onClick={() => setSent(true)}
      className="rounded-md bg-primary px-6 py-2 font-bold text-white transition duration-300 hover:border-primary hover:bg-white hover:text-primary"
    >
      Send Message
    </button>
  ) : (
    <div className="rounded-md bg-primary px-6 py-2 font-bold text-white transition duration-300 hover:border-primary ">
      Message sent successfully
    </div>
  );
}
