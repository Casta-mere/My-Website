// Author: Casta-mere
// Docusaurus plugin that injects the Umami tracker script and publishes
// { host, websiteId, shareId, startAt } as global data for client components.

const PLUGIN_NAME = 'docusaurus-plugin-umami';

function requireOption(value, name) {
  if (!value) {
    throw new Error(`${PLUGIN_NAME}: option '${name}' is required`);
  }
}

function umamiPlugin(context, options = {}) {
  requireOption(options.host, 'host');
  requireOption(options.websiteId, 'websiteId');

  const host = options.host.replace(/\/+$/, '');
  const {
    websiteId,
    shareId,
    startAt = 0,
    scriptName = 'script.js',
    enableInDev = false,
    autoTrack,
    domains,
    excludeHash,
    excludeSearch,
    doNotTrack,
    tag,
  } = options;

  return {
    name: PLUGIN_NAME,

    contentLoaded({ actions }) {
      actions.setGlobalData({ host, websiteId, shareId: shareId ?? null, startAt });
    },

    injectHtmlTags() {
      // Read at call time so the environment can change between calls (tests).
      if (process.env.NODE_ENV === 'development' && !enableInDev) return;

      const attributes = {
        defer: true,
        src: `${host}/${scriptName}`,
        'data-website-id': websiteId,
      };
      // Attribute names match the keys read by the Umami tracker's config().
      if (autoTrack === false) attributes['data-auto-track'] = 'false';
      if (Array.isArray(domains) && domains.length > 0) attributes['data-domains'] = domains.join(',');
      if (excludeHash) attributes['data-exclude-hash'] = 'true';
      if (excludeSearch) attributes['data-exclude-search'] = 'true';
      if (doNotTrack) attributes['data-do-not-track'] = 'true';
      if (tag) attributes['data-tag'] = tag;

      return {
        headTags: [
          { tagName: 'link', attributes: { rel: 'preconnect', href: `${host}/` } },
          { tagName: 'script', attributes },
        ],
      };
    },
  };
}

module.exports = umamiPlugin;
