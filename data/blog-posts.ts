import { CLUSTER_BASICS } from "./blog/cluster-basics";
import { CLUSTER_BRAND } from "./blog/cluster-brand";
import { CLUSTER_FIRESTICK } from "./blog/cluster-firestick";
import { CLUSTER_SMARTTV_ANDROID } from "./blog/cluster-smarttv-android";
import { CLUSTER_PLAYERS } from "./blog/cluster-players";
import { CLUSTER_TROUBLESHOOTING } from "./blog/cluster-troubleshooting";
import { CLUSTER_REVIEWS } from "./blog/cluster-reviews";
import { CLUSTER_APPLE_DESKTOP } from "./blog/cluster-apple-desktop";
import { CLUSTER_ACCOUNT } from "./blog/cluster-account";
import { CLUSTER_TROUBLESHOOTING2 } from "./blog/cluster-troubleshooting2";
import { CLUSTER_FEATURES } from "./blog/cluster-features";

export type { BlogPost } from "./blog/types";
export { CATEGORIES, CATEGORY_STYLE, DEFAULT_CATEGORY_STYLE } from "./blog/types";

import type { BlogPost } from "./blog/types";

export const blogPosts: BlogPost[] = [
  ...CLUSTER_BASICS,
  ...CLUSTER_BRAND,
  ...CLUSTER_FIRESTICK,
  ...CLUSTER_SMARTTV_ANDROID,
  ...CLUSTER_PLAYERS,
  ...CLUSTER_TROUBLESHOOTING,
  ...CLUSTER_REVIEWS,
  ...CLUSTER_APPLE_DESKTOP,
  ...CLUSTER_ACCOUNT,
  ...CLUSTER_TROUBLESHOOTING2,
  ...CLUSTER_FEATURES,
];

export const getBlogPost = (slug: string): BlogPost | undefined =>
  blogPosts.find(p => p.slug === slug);

export const getFeaturedPosts = (): BlogPost[] =>
  blogPosts.filter(p => p.featured);

export const getPostsByCategory = (category: string): BlogPost[] =>
  blogPosts.filter(p => p.category === category);

export const getRelatedPosts = (currentSlug: string, currentCategory = '', limit = 3): BlogPost[] => {
  const sameCat = blogPosts.filter(p => p.slug !== currentSlug && p.category === currentCategory);
  const others = blogPosts.filter(p => p.slug !== currentSlug && p.category !== currentCategory);
  return [...sameCat, ...others].slice(0, limit);
};
