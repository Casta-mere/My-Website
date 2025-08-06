import Translate from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { usePluginData } from "@docusaurus/useGlobalData";
import Link from "@site/src/components/Link/Link";
import { useIsClient } from "@site/src/hooks/useIsClient";
import React from "react";

interface Article {
  id: string;
  url: string;
  title: string;
  date: string;
}

function Articles() {
  const { i18n } = useDocusaurusContext();
  const isClient = useIsClient();

  // const globalData = useGlobalData();
  // console.log("全局数据:", globalData);
  const docsData = usePluginData("docs-enhance") as any;
  const blogsData = usePluginData("docusaurus-plugin-content-blog") as any;

  const latestArticles: Article[] = (blogsData?.latest || []).map((blog) => ({
    id: blog.metadata.id,
    url: blog.metadata.permalink,
    title: blog.metadata.title,
    date: blog.metadata.date,
  }));

  const recommendedBlogs: Article[] = (blogsData?.recommended || []).map(
    (blog) => ({
      id: blog.metadata.id,
      url: blog.metadata.permalink,
      title: blog.metadata.title,
      date: blog.metadata.date,
    })
  );

  const recommendedDocs: Article[] = docsData?.recommended.map((doc) => ({
    id: doc.id,
    url: doc.permalink,
    title: doc.title,
    date: new Date(doc.date).toISOString(),
  }));

  const allRecommendedArticles = [
    ...recommendedBlogs,
    ...(recommendedDocs || []),
  ];

  const shuffleArray = (array: Article[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const recommendedArticles = isClient
    ? shuffleArray(allRecommendedArticles)
        .slice(0, 5)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    : allRecommendedArticles
        .slice(0, 5)
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

  const date = (dateString: string) => {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    if (i18n.currentLocale === "en") {
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  };

  const ArticleTable = ({ Articles }: { Articles: Article[] }) => {
    return (
      <table className="table-auto w-full">
        <tbody>
          {Articles.map((Article, idx) => (
            <tr
              key={Article.id}
              className="w-full border-b border-gray-700 last:border-b-0 bg-transparent"
            >
              <td className="w-full px-2 py-3 align-middle bg-transparent">
                <Link
                  title={Article.title}
                  url={Article.url}
                  colorMode="custom"
                />
              </td>
              <td className="whitespace-nowrap px-2 py-1 text-sm text-right align-middle text-gray-400 bg-transparent">
                {date(Article.date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <section className="mt-4">
      <h2 className="text-2xl font-bold text-white mb-6">
        <Translate>文章</Translate>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            <Translate>推荐阅读</Translate>
          </h3>
          <ArticleTable Articles={recommendedArticles} />
        </div>
        <div className="w-full flex flex-col">
          <h3 className="text-xl font-semibold text-white mb-4">
            <Translate>最新博文</Translate>
          </h3>
          <ArticleTable Articles={latestArticles} />
        </div>
      </div>
    </section>
  );
}

export default Articles;
