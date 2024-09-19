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
            <button className="button button--secondary" onClick={onAddClick}>
              🙏 Add your site
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
