/**
 * 解析站点 URL 为域名段
 * @returns {string[]} e.g. ["yeann", "cn"]
 */
export const parseSiteUrl = (url) => {
  if (!url) return "imsyy.top".split(".");
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url.replace(/^(https?:\/\/)/, "").split(".");
  }
  return url.split(".");
};
