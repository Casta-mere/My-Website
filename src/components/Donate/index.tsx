import Translate from "@docusaurus/Translate";
import React from "react";
import { FaAlipay, FaWeixin } from "react-icons/fa";

const Donate = () => {
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
      </div>
    </div>
  );
};

export default Donate;
