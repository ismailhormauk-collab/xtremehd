import { CLUSTER_BASICS } from "./blog/cluster-basics";
import { CLUSTER_BRAND } from "./blog/cluster-brand";
import { CLUSTER_FIRESTICK } from "./blog/cluster-firestick";
import { CLUSTER_SMARTTV_ANDROID } from "./blog/cluster-smarttv-android";
import { CLUSTER_PLAYERS } from "./blog/cluster-players";
import { CLUSTER_TROUBLESHOOTING } from "./blog/cluster-troubleshooting";
import { CLUSTER_REVIEWS } from "./blog/cluster-reviews";

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
