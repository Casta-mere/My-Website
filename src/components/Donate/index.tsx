import Translate from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";
import { FaAlipay, FaCoffee, FaWeixin } from "react-icons/fa";
import { PiBeerBottleFill } from "react-icons/pi";

const Donate = () => {
  const { i18n } = useDocusaurusContext();
  return (
    <div className="tailwind">
      <div className="flex gap-5 justify-end items-center">
        <Translate>请作者喝可乐🥤:</Translate>
        <div className="dropdown dropdown--hoverable dropdown--right">
          <button className="button button--primary transition-all hover:translate-y-[-5px] hover:scale-[1.2]">
            <br />
            <FaAlipay color="#00a0e9" size="25" className="cursor-pointer" />
            <br />
          </button>
          <ul className="dropdown__menu">
            <li>
              <img
                width={200}
                height={200}
                src="/img/qrcode/alipay.jpg"
                className="rounded-sm"
                alt="alipay"
              />
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown--hoverable dropdown--right">
          <button className="button button--primary transition-all hover:translate-y-[-5px] hover:scale-[1.2]">
            <br />
            <FaWeixin color="#07c160" size="25" className="cursor-pointer" />
            <br />
          </button>
          <ul className="dropdown__menu">
            <li>
              <img
                width={200}
                height={200}
                src="/img/qrcode/wechat.png"
                className="rounded-sm"
                alt="wechat"
              />
            </li>
          </ul>
        </div>
        {i18n.currentLocale === "en" && (
          <div>
            <a
              href="https://ko-fi.com/casta_mere"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="button button--primary transition-all hover:translate-y-[-5px] hover:scale-[1.2]">
                <br />
                <FaCoffee
                  color="#6f4e37"
                  size="25"
                  className="cursor-pointer"
                />
                <br />
              </button>
            </a>
          </div>
        )}
        {i18n.currentLocale === "zh-Hans" && (
          <div>
            <a
              href="https://ko-fi.com/casta_mere"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="button button--primary transition-all hover:translate-y-[-5px] hover:scale-[1.2]">
                <br />
                <PiBeerBottleFill
                  color="#E61D2B"
                  size="25"
                  className="cursor-pointer"
                />
                <br />
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donate;
