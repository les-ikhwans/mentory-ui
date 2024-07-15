import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flexCenter mb-24">
      <div className="padding-container max-container flex w-full flex-col gap-14 mt-11">
        <div className="flex flex-col items-start justify-center gap-[10%] md:flex-row">
          <Link href="/" className="mb-12 ">
            <Image src="/Digital.png" alt="logo" width={100} height={100} />
          </Link>

          <div className="flex flex-wrap gap-10 sm:justify-between md:flex-1">
            {FOOTER_LINKS.map(
              (
                columns,
                index // Adding index as a key
              ) => (
                <FooterColumn key={index} title={columns.title}>
                  <ul className="regular-14 flex flex-col gap-4 text-gray-30">
                    {columns.links.map(
                      (
                        link,
                        idx // Adding idx as a key
                      ) => (
                        <li key={idx}>
                          <Link href="/">{link}</Link>
                        </li>
                      )
                    )}
                  </ul>
                </FooterColumn>
              )
            )}

            <div className="flex flex-col gap-5">
              <FooterColumn key="contact" title={FOOTER_CONTACT_INFO.title}>
                {FOOTER_CONTACT_INFO.links.map((link, idx) => (
                  <Link
                    href="/"
                    key={idx}
                    className="flex gap-4 md:flex-col lg:flex-row"
                  >
                    <p className="whitespace-nowrap">{link.label}:</p>
                    <p className="medium-14 whitespace-nowrap text-blue-70">
                      {link.value}
                    </p>
                  </Link>
                ))}
              </FooterColumn>
            </div>

            <div className="flex flex-col gap-5">
              <FooterColumn key="socials" title={SOCIALS.title}>
                <ul className="regular-14 flex gap-4 text-gray-30">
                  {SOCIALS.links.map((link, idx) => (
                    <li key={idx}>
                      <Link href="/">
                        <Image src={link} alt="logo" width={24} height={24} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            </div>
          </div>
        </div>

        <div className="border bg-gray-20" />
        <p className="regular-14 w-full text-center text-gray-30">
          2024 Mentory | All rights reserved
        </p>
      </div>
    </footer>
  );
};

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
};

const FooterColumn = ({ title, children }: FooterColumnProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="bold-18 whitespace-nowrap">{title}</h4>
      {children}
    </div>
  );
};

export default Footer;
