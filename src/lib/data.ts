import type { Package, Hub } from '@/types';
import packagesData from '../../data/packages.json';
import hubsData from '../../data/hubs.json';

export function getAllPackages(): Package[] {
  return packagesData as Package[];
}

export function getPackageBySlug(slug: string): Package | undefined {
  return (packagesData as Package[]).find((p) => p.slug === slug);
}

export function getAllHubs(): Hub[] {
  return hubsData as Hub[];
}

export function getHubBySlug(slug: string): Hub | undefined {
  return (hubsData as Hub[]).find((h) => h.slug === slug);
}

export function getAllPackageSlugs(): string[] {
  return (packagesData as Package[]).map((p) => p.slug);
}

export function getAllHubSlugs(): string[] {
  return (hubsData as Hub[]).map((h) => h.slug);
}
