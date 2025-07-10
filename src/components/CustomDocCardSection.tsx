import React from "react";
import DocCard from "@theme/DocCard";
import { findSidebarItem } from "@site/src/sidebarUtils";
import styles from "./CustomDocCardSection.module.css";

type Props = {
  title: string;
  description: string;
  itemPaths: string[];
  fullWidth?: boolean;
  secondDescription?: string;
  secondItemPaths?: string[];
  svg?: React.ReactNode;
};

export default function CustomDocCardSection({ title, description, itemPaths, fullWidth, secondDescription, secondItemPaths, svg }: Props) {
  const items = itemPaths.map((path) => findSidebarItem(path)).filter(Boolean);
  const secondItems = secondItemPaths?.map((path) => findSidebarItem(path)).filter(Boolean) ?? [];

  return (
    <div className={`${styles.customCard} ${fullWidth ? styles.fullWidth : ""}`}>
      <div className={`${fullWidth && styles.cardContentFlex}`}>
      {svg && (
        <div className={styles.animatedSvgWrapper}>
      {svg}
    </div>
  )}
        <div className={`${fullWidth && styles.halfWidth}`}>
            <h2>{title}</h2>
            <p>{description}</p>
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
