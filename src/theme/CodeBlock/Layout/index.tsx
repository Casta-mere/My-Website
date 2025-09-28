import { useCodeBlockContext } from "@docusaurus/theme-common/internal";
import { Icon } from "@site/src/components/Icon";
import Buttons from "@theme/CodeBlock/Buttons";
import Container from "@theme/CodeBlock/Container";
import Content from "@theme/CodeBlock/Content";
import type { Props } from "@theme/CodeBlock/Layout";
import Title from "@theme/CodeBlock/Title";
import clsx from "clsx";
import React, { type ReactNode } from "react";

import styles from "./styles.module.css";

export default function CodeBlockLayout({ className }: Props): ReactNode {
  const { metadata } = useCodeBlockContext();

  return (
    <Container as="div" className={clsx(className, metadata.className)}>
      {metadata.title && (
        <div className="tailwind">
          <div className={styles.codeBlockTitle}>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                {/* {icon} */}
                <Title>{metadata.title}</Title>
              </div>
              {metadata.language && (
                <div className="mr-3">
                  <Icon icon={metadata.language} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className={styles.codeBlockContent}>
        <Content />
        <Buttons />
      </div>
    </Container>
  );
}
