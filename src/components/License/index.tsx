import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@site/src/components/Link/Link";
import React from "react";
import { FaCreativeCommons } from "react-icons/fa";

const License = () => {
  const { i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;

  return (
    <div className="tailwind">
      <div className="flex gap-1 justify-end items-center text-xs">
        {currentLocale === "zh-Hans" ? (
          <>
            本文遵循
            <FaCreativeCommons />{" "}
            <Link
              title="CC 4.0 BY-SA"
              url="https://creativecommons.org/licenses/by-sa/4.0/"
            />{" "}
            版权协议，转载请标明出处
          </>
        ) : (
          <>
            This article is licensed under <FaCreativeCommons />{" "}
            <Link
              title="CC 4.0 BY-SA"
              url="https://creativecommons.org/licenses/by-sa/4.0/"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default License;
