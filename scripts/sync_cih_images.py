#!/usr/bin/env python3
"""Download real trek photos from campinhimalayas.com (own site) and wire up
full galleries on the matching Junegiri packages."""
import json, os, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(ROOT, "public", "images")
PKG = os.path.join(ROOT, "data", "packages.json")
BASE = "https://campinhimalayas.com/wp-content/uploads"

# trek_key -> (slug, prefix, [source urls (first = hero)])
TREKS = {
    "sarpass": ("sar-pass-trek-4n-5d", "sarpass", [
        f"{BASE}/2025/08/Sar-Pass-Trek-Campin-Himalayas-{i}.jpg" for i in range(1, 8)
    ]),
    "kedarkantha": ("kedarkantha-trek-5n-6d", "kedarkantha", [
        f"{BASE}/2025/08/20221217_181845.webp",
        f"{BASE}/2025/08/20221228_071056_1_11zon-scaled.webp",
        f"{BASE}/2025/08/20240216_174848_3_11zon-scaled.webp",
        f"{BASE}/2025/08/DJI_0691_6_11zon-scaled.webp",
        f"{BASE}/2025/08/IMG-20241228-WA0046_15_11zon-scaled.webp",
        f"{BASE}/2025/08/IMG-20241228-WA0072_16_11zon-scaled.webp",
        f"{BASE}/2025/08/IMG_4374_7_11zon-scaled.webp",
        f"{BASE}/2025/08/IMG_7723_9_11zon-scaled.webp",
    ]),
    "kuari_pass": ("kuari-pass-trek-4n-5d", "kuari_pass", [
        f"{BASE}/2025/09/Kuari-Pass-trek-campin-himalaya-{i}.jpg" for i in (1, 2, 3, 4, 6, 7)
    ]),
    "ebc": ("everest-base-camp-trek-13n-14d", "ebc", [
        f"{BASE}/2025/08/Everest-Base-Camp-Trek-Campin-Himalaya-{i}.jpg" for i in range(1, 9)
    ]),
    "hampta": ("hamta-pass-trek-4n-5d", "hampta", [
        f"{BASE}/2025/09/Hampta-pass-with-chandratal-lake-trek-Campin-Himalaya-{i}.jpg" for i in range(1, 9)
    ]),
    "vof": ("valley-of-flowers-trek-4n-5d", "vof", [
        f"{BASE}/2025/09/Valley-of-flowers-trek-campin-himalayas-{i}.jpg" for i in range(1, 8)
    ]),
    "harkidun": ("har-ki-dun-trek-5n-6d", "harkidun", [
        f"{BASE}/2025/09/Har-ki-dun-trek-campin-himalaya-1.jpg",
        f"{BASE}/2025/09/Har-ki-dun-trek-campin-himalaya-2.jpg",
        f"{BASE}/2025/09/Har-ki-dun-trek-campin-himalaya-3.jpg",
        f"{BASE}/2025/09/Har-ki-dun-trek-campin-himalaya-4-scaled.jpg",
        f"{BASE}/2025/09/Har-ki-dun-trek-campin-himalaya-5.jpg",
        f"{BASE}/2025/09/Har-ki-dun-trek-campin-himalaya-6.jpg",
        f"{BASE}/2025/09/Har-ki-dun-trek-campin-himalaya-7.jpg",
        f"{BASE}/2025/09/Har-ki-dun-trek-campin-himalaya-8.jpg",
    ]),
}

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"

def download(url, dest):
    r = subprocess.run(["curl", "-fsSL", "-A", UA, "-o", dest, url])
    if r.returncode != 0 or not os.path.exists(dest) or os.path.getsize(dest) < 1000:
        print(f"  ! FAILED {url}")
        return False
    return True

# local web paths per trek (in order)
local = {}
for key, (slug, prefix, urls) in TREKS.items():
    local[key] = []
    for i, url in enumerate(urls, 1):
        ext = os.path.splitext(url)[1].split("?")[0]
        fname = f"{prefix}_{i}{ext}"
        dest = os.path.join(IMG_DIR, fname)
        if download(url, dest):
            local[key].append(f"/images/{fname}")
    print(f"{key}: {len(local[key])} images")

# Pangarchulla reuses Kuari photos
local["pangarchulla"] = local["kuari_pass"][:]

# update packages.json
data = json.load(open(PKG))
byslug = {p["slug"]: p for p in data}

def apply(slug, paths):
    p = byslug.get(slug)
    if not p or not paths:
        print(f"  skip {slug}")
        return
    p["hero_image"] = paths[0]
    p["gallery"] = paths[1:] if len(paths) > 1 else paths
    print(f"  {slug}: hero + {len(p['gallery'])} gallery")

for key, (slug, prefix, urls) in TREKS.items():
    apply(slug, local[key])
apply("kuari-pass-pangarchulla-6n-7d", local["pangarchulla"])

json.dump(data, open(PKG, "w"), indent=2, ensure_ascii=False)
print("packages.json updated.")
# emit a compact map for homepage wiring
print("HERO_MAP=" + json.dumps({k: local[k][0] for k in local if local[k]}))
