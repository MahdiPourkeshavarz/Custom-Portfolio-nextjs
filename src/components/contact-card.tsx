import Link from "next/link";
import { FaInstagram, FaTelegram, FaPhone } from "react-icons/fa";

type ContactCardProps = {
  icon: React.ReactNode;
  title: string;
  link: string;
  linkText: string;
};

function ContactCard({ icon, title, link, linkText }: ContactCardProps) {
  return (
    <div className="bg-white dark:bg-white/10 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4">
        <div className="text-2xl text-gray-700 dark:text-white/80">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {title}
          </h3>
          <Link
            href={link}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {linkText}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ContactCard;
