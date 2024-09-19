import Comment from "@site/src/components/Comment/Comment";
import Layout from "@theme/Layout";
import React from "react";
import { RoughNotation } from "react-rough-notation";
import FriendCards from "./_components/FriendCards";

export default function Friends() {
  const onAddClick = () => {
    const commentTarget = document.querySelector("#comment-anchor");
    commentTarget.scrollIntoView({ behavior: "smooth" });
    window.gtag?.("event", "add_friend_click");
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col col--9 col--offset-1">
            <h1 className="hero__title  padding-top--lg">友链 🔗</h1>
            <p className="hero__subtitle">朋友是生活中的阳光☀️</p>
            <p className="">
              <RoughNotation
                type="underline"
                show={true}
                color="#32CD32"
                strokeWidth={3}
                animationDelay={2500}
              >
                请通过评论留下你的网站
              </RoughNotation>
            </p>
            <button className="button button--secondary" onClick={onAddClick}>
              🙏 添加你的网站
            </button>
            <FriendCards />

            <div id="comment-anchor" />
            <Comment />
          </div>
        </div>
      </div>
    </Layout>
  );
}
