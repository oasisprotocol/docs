import React from 'react';
import Link from '@docusaurus/Link';


type LinkItem = {
  title: string;
  description: string;
  href: string;
};

type CardSectionProps = {
  title: string;
  description: string;
  image?: React.ReactNode;
  links: LinkItem[];
};

export default function CardSection({ title, description, image, links }: CardSectionProps) {
  return (
    <div className="card mt-10 w-1/2 bg-gradient-to-b from-indigo-100 to-white pt-0">
      {image && (
        <div>
          {image}
        </div>
      )}
      <div className='p-6'>
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <div className="space-y-4">
            {links.map((link) => (
            <Link
                key={link.href}
                to={link.href}
            >
                <div>
                <div className="text-lg font-medium">{link.title}</div>
                <p className="card-description">{link.description}</p>
                </div>
            </Link>
            ))}
        </div>
      </div>
    </div>
  );
}