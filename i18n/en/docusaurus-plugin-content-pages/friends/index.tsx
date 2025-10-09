import Comment from "@site/src/components/Comment/Comment";
import { JumpToComment } from "@site/src/components/Comment/GoToComment";
import FriendCards from "@site/src/components/Friends/FriendCards";
import Layout from "@theme/Layout";
import React from "react";
import { RoughNotation } from "react-rough-notation";

export default function Friends() {
  return (
    <Layout>
      <div className="container">
        <h1 className="hero__title  padding-top--lg">Friends 🔗</h1>
        <p className="hero__subtitle">Friends are the Family we choose☀️</p>
        <p className="">
          <RoughNotation
            type="underline"
            show={true}
            color="#32CD32"
            strokeWidth={3}
            animationDelay={2500}
          >
            Leave Ur site in the comment section below
          </RoughNotation>
        </p>
        <button className="button button--secondary" onClick={JumpToComment}>
          🙏 Add your site
        </button>
        <FriendCards />

        <Comment />
      </div>
    </Layout>
  );
}
