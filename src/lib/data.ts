import type { Package, Hub, City } from '@/types';
import packagesData from '../../data/packages.json';
import hubsData from '../../data/hubs.json';
import citiesData from '../../data/cities.json';

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

export function getAllCities(): City[] {
  return citiesData as City[];
}

export function getCityBySlug(slug: string): City | undefined {
  return (citiesData as City[]).find((c) => c.slug === slug);
}
