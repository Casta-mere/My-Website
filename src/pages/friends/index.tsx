import Comment from "@site/src/components/Comment/Comment";
import { JumpToComment } from "@site/src/components/Comment/GoToComment";
import FriendCards from "@site/src/components/Friends/FriendCards";
import Layout from "@theme/Layout";
import React from "react";
import { RoughNotation } from "react-rough-notation";

export default function Friends() {
  return (
    <Layout>
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
          <button className="button button--secondary" onClick={JumpToComment}>
            🙏 添加你的网站
          </button>
          <FriendCards />

          <Comment />
        </div>
      </div>
    </Layout>
  );
}
