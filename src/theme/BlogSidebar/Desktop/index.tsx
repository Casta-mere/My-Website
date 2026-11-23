import React, {memo, useRef} from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import {useLocation} from '@docusaurus/router';
import useIsomorphicLayoutEffect from '@docusaurus/useIsomorphicLayoutEffect';
import {
  useVisibleBlogSidebarItems,
  BlogSidebarItemList,
} from '@docusaurus/plugin-content-blog/client';
import BlogSidebarContent from '@theme/BlogSidebar/Content';
import type {Props as BlogSidebarContentProps} from '@theme/BlogSidebar/Content';
import type {Props} from '@theme/BlogSidebar/Desktop';

import styles from './styles.module.css';

const ListComponent: BlogSidebarContentProps['ListComponent'] = ({items}) => {
  return (
    <BlogSidebarItemList
      items={items}
      ulClassName={clsx(styles.sidebarItemList, 'clean-list')}
      liClassName={styles.sidebarItem}
      linkClassName={styles.sidebarItemLink}
      linkActiveClassName={styles.sidebarItemLinkActive}
    />
  );
};

// Every blog route remounts the sidebar, so its scroll offset lives at module scope (#68).
let savedScrollTop = 0;

function centerActiveLinkIfHidden(nav: HTMLElement): void {
  const link = nav.querySelector('a[aria-current="page"]');
  if (!link) {
    return;
  }
  const linkBox = link.getBoundingClientRect();
  const top = linkBox.top - nav.getBoundingClientRect().top + nav.scrollTop;
  const bottom = top + linkBox.height;
  if (top < nav.scrollTop || bottom > nav.scrollTop + nav.clientHeight) {
    nav.scrollTop = top + linkBox.height / 2 - nav.clientHeight / 2;
  }
}

function BlogSidebarDesktop({sidebar}: Props) {
  const items = useVisibleBlogSidebarItems(sidebar.items);
  const navRef = useRef<HTMLElement>(null);
  const {pathname} = useLocation();
  useIsomorphicLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) {
      return;
    }
    nav.scrollTop = savedScrollTop;
    centerActiveLinkIfHidden(nav);
  }, [pathname]);
  return (
    <aside className="col col--3">
      <nav
        ref={navRef}
        onScroll={(e) => {
          savedScrollTop = e.currentTarget.scrollTop;
        }}
        className={clsx(styles.sidebar, 'thin-scrollbar')}
        aria-label={translate({
          id: 'theme.blog.sidebar.navAriaLabel',
          message: 'Blog recent posts navigation',
          description: 'The ARIA label for recent posts in the blog sidebar',
        })}>
        <div className={clsx(styles.sidebarItemTitle, 'margin-bottom--md')}>
          {sidebar.title}
        </div>
        <BlogSidebarContent
          items={items}
          ListComponent={ListComponent}
          yearGroupHeadingClassName={styles.yearGroupHeading}
        />
      </nav>
    </aside>
  );
}

export default memo(BlogSidebarDesktop);
