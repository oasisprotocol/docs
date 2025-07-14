import React, { useEffect, useRef, useState } from "react";
import DocCard from "@theme/DocCard";
import { findSidebarItem } from "@site/src/sidebarUtils";
import styles from "./CustomDocCardSection.module.css";
import Link from "@docusaurus/Link";

type Props = {
  title: string;
  path:string;
  description: React.ReactNode;
  itemPaths: string[];
  fullWidth?: boolean;
  secondDescription?: string;
  secondItemPaths?: string[];
  svg: React.ReactNode;
};

export default function CustomDocCardSection({
  title,
  path,
  description,
  itemPaths,
  fullWidth,
  secondDescription,
  secondItemPaths,
  svg,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [animate, setAnimate] = useState(false);

  const items = itemPaths.map((path) => findSidebarItem(path)).filter(Boolean);
  const secondItems = secondItemPaths?.map((path) => findSidebarItem(path)).filter(Boolean) ?? [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`${styles.customCard} ${fullWidth ? styles.fullWidth : ""}`}
    >
      <div className={`${fullWidth && styles.cardContentFlex}`}>
        {svg && (
          <div
            className={`${styles.animatedSvgWrapper} ${
              animate ? styles.animateSvg : ""
            }`}
          >
            {svg}
          </div>
        )}
        <div className={`${fullWidth && styles.halfWidth}`}>
          <h2 className="section-title">
            <Link to={path}>{title}</Link>
          </h2>
          <p className={styles.cardDescription}>{description}</p>
        </div>

        <div className={`${styles.cardLinksList} ${fullWidth && styles.halfWidth}`}>
          {items.map((item, idx) => (
            <div key={idx} className={styles.cardItem} data-custom-doccard>
              <DocCard item={item} />
            </div>
          ))}
        </div>

        {secondDescription && <p>{secondDescription}</p>}

        <div className={styles.cardLinksList}>
          {secondItems.length > 0 && (
            <div className={styles.cardLinksList}>
              {secondItems.map((item, idx) => (
                <div key={idx} className={styles.cardItem} data-custom-doccard>
                  <DocCard item={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}