export default function ShareProduct({ url, name }) {
  const socials = [
    {
      outlet: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      background: "#0050c2",
      color: "#0866ff",
      label: "Share on Facebook",
      icon: "fa-brands fa-facebook-f",
    },
    {
      outlet: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(name)}`,
      background: "#000",
      color: "black",
      label: "Share on Twitter",
      icon: "fa-brands fa-x",
    },
    {
      outlet: "LinkedIn",
      href: `https://www.linkedin.com/shareArticle?url=${url}&title=${encodeURIComponent(name)}`,
      background: "#03608f",
      color: "#03608f",
      label: "Share on LinkedIn",
      icon: "fa-brands fa-linkedin",
    },

    {
      outlet: "reddit",
      href: `http://www.reddit.com/submit?url=${url}&title=${encodeURI(name)}`,
      background: "#7bcb20",
      color: "#ff581a",
      label: "Share via SMS",
      icon: "fa-brands fa-reddit",
    },

    {
      outlet: "Email",
      href: `mailto:?subject=${encodeURIComponent(name)}&body=${url}`,
      background: "#dd4b39",
      color: "#dd4b39",
      label: "Share via Email",
      icon: "fa-solid fa-envelope",
    },

    {
      outlet: "SMS",
      href: `sms:?body=${url}`,
      background: "#7bcb20",
      color: "#7bcb20",
      label: "Share via SMS",
      icon: "fa-solid fa-message",
    },
  ];

  return (
    <div className="mt-4 flex gap-3">
      {socials.map((social) => (
        <a
          href={social.href}
          key={social.href}
          target="_blank"
          title={`Share Via ${social.outlet}`}
          className={
            "flex h-8 w-8 items-center justify-center rounded-full border border-gray-300  "
          }
          style={{
            color: social.color,
          }}
        >
          <i className={social.icon}></i>
        </a>
      ))}
    </div>
  );
}
