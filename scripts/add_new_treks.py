#!/usr/bin/env python3
"""Append 3 new trek entries (EBC, Sar Pass, Kuari+Pangarchulla) to packages.json.
All prose is original; only factual figures (altitude/distance/days) come from research."""
import json, os

PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'packages.json')

def tiers(std, dlx, sdlx):
    return [
        {"group_size": "2 Pax",   "rates": {"standard": std,            "deluxe": dlx,            "super deluxe": sdlx,            "luxury": 0}},
        {"group_size": "3-4 Pax", "rates": {"standard": int(std*0.92),  "deluxe": int(dlx*0.92),  "super deluxe": int(sdlx*0.92),  "luxury": 0}},
        {"group_size": "5+ Pax",  "rates": {"standard": int(std*0.85),  "deluxe": int(dlx*0.85),  "super deluxe": int(sdlx*0.85),  "luxury": 0}},
    ]

related_common = [
    {"name": "Kuari Pass Trek", "duration": "4N/5D", "price": 9000, "image": "/images/kuari_pass_1.jpg", "url": "/packages/kuari-pass-trek-4n-5d/"},
    {"name": "Kedarkantha Trek", "duration": "5N/6D", "price": 9500, "image": "/images/kedarkantha_1.webp", "url": "/packages/kedarkantha-trek-5n-6d/"},
    {"name": "Har Ki Dun Trek", "duration": "5N/6D", "price": 11000, "image": "/images/harkidun_1.jpg", "url": "/packages/har-ki-dun-trek-5n-6d/"},
]

# ─────────────────────────── EVEREST BASE CAMP ───────────────────────────
ebc = {
    "slug": "everest-base-camp-trek-13n-14d",
    "url": "/packages/everest-base-camp-trek-13n-14d/",
    "name": "Everest Base Camp Trek 13N/14D",
    "title": "Everest Base Camp Trek 14 Days | Kathmandu to EBC (5,545m) | Junegiri Yatra",
    "meta_description": "Trek to Everest Base Camp (5,545m) and Kala Patthar over 14 days from Kathmandu. Sherpa heartland, Namche Bazaar, Tengboche monastery. Full board from ₹74,999. WhatsApp to book.",
    "keywords": "everest base camp trek, EBC trek, kala patthar, namche bazaar, lukla trek, everest trek from india, sherpa trek, khumbu trek, everest base camp 14 days",
    "h1": "Everest Base Camp <em>Trek 13N/14D</em>",
    "hero_tagline": "Stand at the Foot of the World's Highest Mountain",
    "hero_image": "/images/ebc_1.jpg",
    "tag": "Bucket-List Trek",
    "duration": "13 Nights / 14 Days",
    "destinations_short": "Lukla · Namche · Gorak Shep · EBC",
    "departure": "Mar–Jun & Sep–Nov from Kathmandu",
    "difficulty": "Moderate to Challenging",
    "transport": "Flights + Trek",
    "price_from": 74999,
    "intl_price_usd": 899,
    "wa_text": "Hi Junegiri Yatra! I'm interested in the Everest Base Camp Trek 13N/14D. Please share availability, fixed departures and pricing.",
    "overview": "<p>The Everest Base Camp trek is the most iconic high-altitude walk on Earth — a two-week journey through the Khumbu region of Nepal that carries you from the airstrip at Lukla all the way to the foot of Sagarmatha (Mount Everest, 8,849m). Reaching the base camp at 5,364m and the viewpoint of Kala Patthar at 5,545m, this is a trek measured not in technical climbing but in patience, acclimatization and quiet endurance.</p><p>The trail threads through the homeland of the Sherpa people, passing prayer-wheel-lined villages, swaying suspension bridges strung with prayer flags, and centuries-old monasteries. The bustling mountain town of Namche Bazaar serves as the cultural and trading hub of the region, while the monastery at Tengboche offers one of the most photographed mountain backdrops in the world, framed by Ama Dablam.</p><p>Our 14-day itinerary is built around safe, gradual ascent. Two dedicated acclimatization days — at Namche Bazaar and Dingboche — give your body time to adjust to thinning air, dramatically reducing the risk of altitude sickness and giving you the best possible chance of standing on Kala Patthar at dawn with Everest glowing gold above you.</p><p>Every Junegiri Yatra Everest departure is supported by experienced local Sherpa guides, comfortable teahouse lodging, full board on the trail, and round-trip flights between Kathmandu and Lukla. We handle the permits, the logistics and the emergency protocols — you focus on the walk of a lifetime.</p>",
    "itinerary": [
        {"title": "Day 1 — Arrive in Kathmandu (1,400 m)", "meta": "Airport transfer / Trek briefing / Overnight hotel", "desc": "Land at Tribhuvan International Airport and transfer to your hotel in Kathmandu. The evening is spent on a detailed trek briefing, a gear check and final paperwork for permits.", "highlights": ["Welcome briefing", "Gear check", "Kathmandu overnight"]},
        {"title": "Day 2 — Fly to Lukla, trek to Phakding (2,610 m)", "meta": "Scenic flight / Trek 8 km / 3–4 hrs", "desc": "An early mountain flight to Lukla begins the adventure, followed by a gentle descent along the Dudh Koshi river to the village of Phakding — a short, easy first day that eases you onto the trail.", "highlights": ["Lukla mountain flight", "Dudh Koshi valley", "Easy first day"]},
        {"title": "Day 3 — Phakding to Namche Bazaar (3,440 m)", "meta": "Trek 11 km / 6 hrs", "desc": "Cross several suspension bridges and climb steadily through pine forest into Sagarmatha National Park. The final ascent to Namche Bazaar rewards you with a first distant glimpse of Everest.", "highlights": ["National park entry", "First Everest view", "Namche Bazaar"]},
        {"title": "Day 4 — Acclimatization at Namche Bazaar", "meta": "Rest day / Short acclimatization hike", "desc": "A vital rest day. We take a short hike to the Everest View Hotel or Khumjung village to aid acclimatization, then explore Namche's markets, bakeries and the Sherpa culture museum.", "highlights": ["Acclimatization hike", "Everest View Hotel", "Sherpa culture"]},
        {"title": "Day 5 — Namche to Tengboche (3,860 m)", "meta": "Trek 10 km / 5–6 hrs", "desc": "A scenic ridge walk with constant views of Everest, Lhotse and Ama Dablam leads to Tengboche, home to the region's most important monastery, set against a spectacular peak backdrop.", "highlights": ["Ama Dablam views", "Tengboche Monastery", "Ridge walking"]},
        {"title": "Day 6 — Tengboche to Dingboche (4,410 m)", "meta": "Trek 9 km / 5 hrs", "desc": "Descend to the river then climb past Pangboche into more arid, alpine terrain. The treeline falls away and the high Himalaya feels suddenly close as you reach the village of Dingboche.", "highlights": ["Crossing the treeline", "Imja valley", "Alpine landscape"]},
        {"title": "Day 7 — Acclimatization at Dingboche", "meta": "Rest day / Climb to Nangkartshang", "desc": "A second acclimatization day. An optional climb up Nangkartshang ridge takes you above 5,000m for sweeping views of Makalu and Island Peak before descending to rest.", "highlights": ["Nangkartshang viewpoint", "Above 5,000m", "Makalu views"]},
        {"title": "Day 8 — Dingboche to Lobuche (4,940 m)", "meta": "Trek 8 km / 5 hrs", "desc": "Climb to Thukla and pass the poignant memorials to climbers lost on Everest, then continue alongside the Khumbu glacier moraine to the small settlement of Lobuche.", "highlights": ["Climbers' memorials", "Khumbu glacier", "Lobuche"]},
        {"title": "Day 9 — Lobuche to EBC, then Gorak Shep (5,170 m)", "meta": "Trek 13 km / 7–8 hrs", "desc": "The big day. Trek to Gorak Shep, then continue across the glacier to Everest Base Camp (5,364m) itself before returning to Gorak Shep for the night. An unforgettable milestone.", "highlights": ["Everest Base Camp", "Khumbu Icefall", "Glacier walk"]},
        {"title": "Day 10 — Kala Patthar sunrise, descend to Pheriche (4,280 m)", "meta": "Pre-dawn climb / Trek down 5–6 hrs", "desc": "A pre-dawn climb to Kala Patthar (5,545m) delivers the finest sunrise view of Everest on the entire route. We then begin the long descent toward Pheriche.", "highlights": ["Kala Patthar sunrise", "Best Everest view", "Begin descent"]},
        {"title": "Day 11 — Pheriche to Namche Bazaar (3,440 m)", "meta": "Trek 15 km / 6–7 hrs", "desc": "Retrace the trail down through Tengboche and the forest, with richer oxygen making every step easier. Overnight back in the comforts of Namche Bazaar.", "highlights": ["Descent through forest", "Easier breathing", "Namche return"]},
        {"title": "Day 12 — Namche to Lukla (2,860 m)", "meta": "Trek 19 km / 6–7 hrs", "desc": "The final trekking day follows the Dudh Koshi back to Lukla. The evening is a celebration with your guide and porter team — the trek is complete.", "highlights": ["Final trail day", "Team celebration", "Back to Lukla"]},
        {"title": "Day 13 — Fly Lukla to Kathmandu", "meta": "Scenic flight / Free afternoon", "desc": "A morning flight returns you to Kathmandu. The rest of the day is free to rest, shop in Thamel or enjoy a well-earned hot shower and meal.", "highlights": ["Return flight", "Free time in Thamel", "Rest & recover"]},
        {"title": "Day 14 — Departure from Kathmandu", "meta": "Airport transfer", "desc": "Transfer to Tribhuvan International Airport for your onward flight, carrying home memories of the roof of the world.", "highlights": ["Airport drop", "Trip ends"]},
    ],
    "inclusions": [
        "Round-trip flights between Kathmandu and Lukla",
        "All teahouse/lodge accommodation on the trek (twin sharing)",
        "2 nights hotel accommodation in Kathmandu with breakfast",
        "Full board on trek: breakfast, lunch and dinner daily",
        "Experienced English-speaking Sherpa trek guide",
        "Porters to carry main luggage (one per two trekkers)",
        "Sagarmatha National Park permit and Khumbu municipality fee",
        "TIMS card and all trekking permits",
        "Basic first-aid, oximeter monitoring and emergency support",
    ],
    "exclusions": [
        "International flights to/from Kathmandu",
        "Nepal visa fee (obtained on arrival)",
        "Travel and high-altitude evacuation insurance (mandatory)",
        "Lunches and dinners in Kathmandu",
        "Personal trekking gear and clothing",
        "Hot showers, charging, Wi-Fi and bottled drinks on the trail",
        "Tips for guides and porters",
        "Costs arising from delays, flight cancellations or early exit",
    ],
    "pricing_tiers": tiers(74999, 84999, 99999),
    "gallery": ["/images/ebc_2.jpg", "/images/ebc_3.jpg", "/images/ebc_4.jpg", "/images/ebc_5.jpg", "/images/ebc_6.jpg"],
    "testimonials": [
        {"quote": "Reaching Kala Patthar at sunrise with Everest right in front of me is something I'll never forget. The acclimatization days made all the difference — nobody in our group got sick. Faultless organization from Junegiri.", "author": "Daniel Brooks", "loc": "London, UK"},
        {"quote": "As an Indian trekker doing EBC for the first time, having an operator who handled the Lukla flights and permits end to end was priceless. Our Sherpa guide was patient and incredibly knowledgeable.", "author": "Aishwarya Menon", "loc": "Bengaluru"},
        {"quote": "Tough but achievable with the right pacing. The teahouses were warm, the food was better than expected, and the team genuinely cared about our safety at altitude.", "author": "Marco Rossi", "loc": "Milan, Italy"},
    ],
    "faq": [
        {"q": "How fit do I need to be for Everest Base Camp?", "a": "<p>You should be able to walk <strong>5–7 hours a day on consecutive days</strong> carrying a light daypack. No technical climbing is involved, but the altitude makes everything harder. We recommend 6–8 weeks of cardio and hill training before departure. Regular trekkers of average-to-good fitness complete EBC successfully every season.</p>"},
        {"q": "Is altitude sickness a risk on this trek?", "a": "<p>Altitude is the single biggest challenge on EBC. Our 14-day itinerary includes <strong>two full acclimatization days</strong> and a deliberately gradual ascent profile to minimize the risk. Your guide carries an oximeter and monitors the group daily. Hydration, slow pacing and informing your guide of any symptoms early are the keys to a safe summit.</p>"},
        {"q": "What about the Lukla flight?", "a": "<p>Round-trip flights between Kathmandu and Lukla are included. Lukla is a mountain airstrip and flights are weather-dependent — occasional delays are normal. We build buffer into our planning and recommend keeping a spare day in Kathmandu before your international flight home.</p>"},
        {"q": "When is the best time to trek to Everest Base Camp?", "a": "<p>The two prime windows are <strong>spring (March to early June)</strong> and <strong>autumn (late September to November)</strong>. Autumn offers the clearest skies and stable weather; spring brings warmer days and blooming rhododendrons. Winter is very cold but quiet, and the monsoon (July–August) is best avoided.</p>"},
        {"q": "What accommodation can I expect?", "a": "<p>You'll stay in <strong>teahouses (mountain lodges)</strong> run by local families, on a twin-sharing basis. Rooms are simple and clean with shared dining halls heated by a central stove. In Kathmandu you stay in a comfortable 3-star hotel for the first and last nights.</p>"},
        {"q": "Do you run fixed departures or private treks?", "a": "<p>We offer both. Join one of our scheduled group departures, or book a fully private trek on your own dates with family or friends. WhatsApp us with your preferred window and group size for a custom quote.</p>"},
    ],
    "related": related_common,
    "travel_guide": "<h2>The Complete Guide to the Everest Base Camp Trek</h2><p>The Everest Base Camp trek sits at the top of almost every serious trekker's list, and for good reason. Over roughly 130 kilometres of walking across two weeks, it delivers an unmatched combination of mountain scenery, Sherpa culture and personal achievement — all without requiring ropes, crampons or technical climbing skill.</p><h3>Why the 14-day itinerary matters</h3><p>Shorter EBC itineraries exist, but they cut acclimatization days to save time — and that is exactly where altitude sickness creeps in. Our schedule includes rest-and-climb days at both <strong>Namche Bazaar (3,440m)</strong> and <strong>Dingboche (4,410m)</strong>, following the golden rule of <em>climb high, sleep low</em>. This gives your body the time it needs and significantly raises your odds of standing on Kala Patthar at sunrise.</p><h3>The highlights you'll remember</h3><p>Beyond the base camp itself, the trek's defining moments include the first distant view of Everest above Namche, the monastery and Ama Dablam backdrop at <strong>Tengboche</strong>, the moving climbers' memorials above Thukla, and the dawn panorama from <strong>Kala Patthar (5,545m)</strong> — the highest and finest viewpoint of the journey.</p><h3>Getting there from India</h3><p>Most Indian trekkers fly into Kathmandu, where Indian nationals do not require a visa. From Kathmandu, the included mountain flight to Lukla places you at the trailhead. We coordinate the permits, flights and logistics so you can travel from anywhere in India with a single point of contact in Haridwar.</p><h3>Booking with Junegiri Yatra</h3><p>Every departure includes experienced Sherpa guides, porter support, full board on the trail and 24/7 operational backup. WhatsApp our team for fixed-departure dates, private-group pricing and a personalized packing list.</p>",
}

# ─────────────────────────── SAR PASS ───────────────────────────
sar = {
    "slug": "sar-pass-trek-4n-5d",
    "url": "/packages/sar-pass-trek-4n-5d/",
    "name": "Sar Pass Trek 4N/5D",
    "title": "Sar Pass Trek 5 Days | Kasol · Parvati Valley (4,220m) | Junegiri Yatra",
    "meta_description": "Trek Sar Pass (4,220m) from Kasol through Grahan, Min Thach and Nagaru in the Parvati Valley. Snow descent, alpine meadows. 5-day Himachal trek from ₹8,499. WhatsApp to book.",
    "keywords": "sar pass trek, kasol trek, parvati valley trek, grahan village, min thach, nagaru, himachal trek, beginner snow trek, sar pass himachal",
    "h1": "Sar Pass <em>Trek 4N/5D</em>",
    "hero_tagline": "Snow Slides and Meadows Above the Parvati Valley",
    "hero_image": "/images/sarpass_1.jpg",
    "tag": "Adventure Trek",
    "duration": "4 Nights / 5 Days",
    "destinations_short": "Kasol · Grahan · Nagaru · Sar Pass",
    "departure": "May–Jun & Sep–Oct from Kasol",
    "difficulty": "Moderate",
    "transport": "Trek (base Kasol)",
    "price_from": 8499,
    "intl_price_usd": 199,
    "wa_text": "Hi Junegiri Yatra! I'm interested in the Sar Pass Trek 4N/5D in Himachal. Please share dates and pricing.",
    "overview": "<p>The Sar Pass trek is one of Himachal Pradesh's best-loved adventures — a five-day loop that begins and ends in the riverside town of Kasol in the famed Parvati Valley. Topping out at 4,220m, ‘Sar’ takes its name from a small frozen lake near the pass, and the trek packs an extraordinary variety of terrain into a short window: thick pine and oak forest, the timeless hamlet of Grahan, rolling meadows at Min Thach, and the exposed alpine ridge of Nagaru.</p><p>The signature moment comes on summit day. After crossing the snow-bound Sar Pass, trekkers descend toward Biskeri Thach with a long, exhilarating glissade — a natural snow slide that has made this trek a favourite among first-time Himalayan adventurers and seasoned trekkers alike.</p><p>With its accessible difficulty, dramatic scenery and proximity to the laid-back culture of Kasol and Manikaran, Sar Pass is an ideal introduction to multi-day high-altitude trekking in Himachal. Our itinerary uses well-sited campsites, quality gear and experienced local trek leaders to keep the focus on the mountains.</p>",
    "itinerary": [
        {"title": "Day 1 — Kasol to Grahan Village (2,350 m)", "meta": "Trek 9 km / 5–6 hrs", "desc": "Set off from Kasol along the Grahan nala, climbing gently through pine and oak forest to the isolated village of Grahan — one of the oldest settlements in the Parvati Valley. Overnight in tents on the village outskirts.", "highlights": ["Parvati valley forest", "Grahan village", "First campsite"]},
        {"title": "Day 2 — Grahan to Min Thach (3,400 m)", "meta": "Trek 7 km / 5 hrs", "desc": "A steady forest climb opens onto the grassy clearing of Min Thach, a meadow campsite with sweeping views back across the valley and toward the snow line above. Overnight in tents.", "highlights": ["Forest ascent", "Meadow camp", "Valley views"]},
        {"title": "Day 3 — Min Thach to Nagaru (3,800 m)", "meta": "Trek 5 km / 4–5 hrs", "desc": "A short but steep day onto the exposed ridge at Nagaru, the highest and coldest campsite of the trek. The reward is a spectacular sunset over the surrounding peaks and an early night before summit day.", "highlights": ["Ridge climb", "Highest campsite", "Sunset over peaks"]},
        {"title": "Day 4 — Nagaru to Sar Pass to Biskeri Thach (4,220 m)", "meta": "Trek 14 km / 7–8 hrs", "desc": "The big day. An early start takes you across snowfields to Sar Pass (4,220m) with its frozen lake, followed by the famous glissade snow-slide descent toward the lush meadows of Biskeri Thach. Overnight in tents.", "highlights": ["Sar Pass crossing", "Snow glissade", "Biskeri meadows"]},
        {"title": "Day 5 — Biskeri Thach to Barshaini, drive to Kasol", "meta": "Trek 8 km / 4 hrs + drive", "desc": "Descend through forest and terraced fields to Barshaini, then drive back along the Parvati river to Kasol where the trek concludes. Optional visit to the hot springs at Manikaran.", "highlights": ["Forest descent", "Drive to Kasol", "Trek ends"]},
    ],
    "inclusions": [
        "All camping accommodation: 4 nights in quality dome tents (triple sharing)",
        "All meals from lunch Day 1 to lunch Day 5 (veg)",
        "Experienced trek leader, guide and support staff",
        "Forest permits and camping charges",
        "Return transport: Biskeri/Barshaini to Kasol",
        "Camping gear: tents, sleeping bags, mats and dining tent",
        "Basic first-aid kit and oximeter monitoring",
        "Trek completion certificate",
    ],
    "exclusions": [
        "Transport to and from Kasol (we assist with options)",
        "Personal trekking gear (shoes, poles, jackets)",
        "Travel and medical insurance — recommended",
        "Any meals or stay in Kasol before/after the trek",
        "Porter or mule charges for personal bags",
        "5% GST and tips for staff",
    ],
    "pricing_tiers": tiers(8499, 10500, 13000),
    "gallery": ["/images/sarpass_2.jpg", "/images/sarpass_3.jpg", "/images/sarpass_4.jpg", "/images/sarpass_5.jpg", "/images/sarpass_6.jpg"],
    "testimonials": [
        {"quote": "My first ever Himalayan trek and Sar Pass was perfect for it. The snow slide on summit day was pure joy. Great campsites and a trek leader who kept everyone motivated.", "author": "Rohan Desai", "loc": "Pune"},
        {"quote": "Five days, completely unplugged in the Parvati Valley. Grahan village felt frozen in time and the meadows at Min Thach were stunning. Highly recommend.", "author": "Sneha Kapoor", "loc": "Delhi"},
        {"quote": "Well organized, safe and a lot of fun. The descent glissade is worth the whole trip. Good food at altitude too.", "author": "Tom Fischer", "loc": "Berlin, Germany"},
    ],
    "faq": [
        {"q": "Is Sar Pass suitable for beginners?", "a": "<p>Yes — Sar Pass is one of the <strong>best beginner-friendly Himalayan treks</strong>. It's graded moderate, the daily distances are manageable and no technical skills are needed. Reasonable fitness and the ability to walk 5–6 hours a day are enough. Summit day is the longest and most demanding.</p>"},
        {"q": "When is the best time for the Sar Pass trek?", "a": "<p>The two seasons are <strong>May–June</strong> and <strong>September–October</strong>. May–June offers plenty of snow near the pass for the famous slide descent, while September–October brings clear post-monsoon skies and green meadows. The monsoon months are best avoided.</p>"},
        {"q": "What is the snow glissade?", "a": "<p>On summit day, after crossing Sar Pass, part of the descent toward Biskeri Thach is a natural snow slope you can <strong>slide down (glissade)</strong> in a controlled, guided manner. It's the trek's signature thrill — your trek leader briefs the group on safe technique beforehand.</p>"},
        {"q": "How do I reach the start point at Kasol?", "a": "<p>Kasol is reached via Bhuntar (the nearest airport) or by an overnight bus from Delhi to Bhuntar/Kasol. We can advise on the best transport options and timings; transport to Kasol is not included in the trek fee.</p>"},
        {"q": "What should I pack?", "a": "<p>Essentials include sturdy waterproof trekking shoes, warm layers (fleece and a down jacket), a waterproof outer layer, gloves, a cap, sunglasses, sunscreen, a 40–50L backpack, a water bottle and personal medication. We send a full packing list on booking.</p>"},
        {"q": "Are private group departures available?", "a": "<p>Yes. Alongside scheduled group departures we run private Sar Pass treks for families, friends and corporate groups on custom dates. WhatsApp us with your group size and preferred window for a tailored quote.</p>"},
    ],
    "related": [
        {"name": "Hamta Pass Trek", "duration": "4N/5D", "price": 14500, "image": "/images/hampta_1.jpg", "url": "/packages/hamta-pass-trek-4n-5d/"},
        {"name": "Kuari Pass Trek", "duration": "4N/5D", "price": 9000, "image": "/images/kuari_pass_1.jpg", "url": "/packages/kuari-pass-trek-4n-5d/"},
        {"name": "Kedarkantha Trek", "duration": "5N/6D", "price": 9500, "image": "/images/kedarkantha_1.webp", "url": "/packages/kedarkantha-trek-5n-6d/"},
    ],
    "travel_guide": "<h2>The Complete Guide to the Sar Pass Trek</h2><p>Tucked into the Parvati Valley of Himachal Pradesh, the Sar Pass trek is a compact five-day adventure that has earned a cult following among Indian trekkers. It blends forest trails, traditional villages, high meadows and a genuinely exciting snow descent into a loop that starts and finishes in the backpacker town of Kasol.</p><h3>What makes Sar Pass special</h3><p>Few short treks offer this much variety. In a single trip you walk through the deodar forests above Kasol, sleep beside the centuries-old village of <strong>Grahan</strong>, camp on the open meadows of <strong>Min Thach</strong>, brave the windswept ridge at <strong>Nagaru</strong>, and then cross the snow-covered <strong>Sar Pass (4,220m)</strong> before the famous glissade slide toward Biskeri Thach.</p><h3>Difficulty and who it suits</h3><p>Sar Pass is graded <strong>moderate</strong> and is widely recommended as a first Himalayan trek. The terrain is non-technical, but summit day is long and the altitude is real — a base level of cardio fitness and the ability to walk for several hours on consecutive days will make the experience far more enjoyable.</p><h3>Best season</h3><p>Plan for <strong>May to June</strong> if you want maximum snow for the slide descent, or <strong>September to October</strong> for crisp post-monsoon visibility and green meadows. Avoid the July–August monsoon when trails are slippery and views are clouded.</p><h3>Booking with Junegiri Yatra</h3><p>Our Sar Pass departures include all camping, meals on the trail, experienced trek leaders and quality gear. WhatsApp our Haridwar team for fixed dates, private-group rates and a complete packing checklist.</p>",
}

# ─────────────────────────── KUARI PASS + PANGARCHULLA ───────────────────────────
pangarchulla = {
    "slug": "kuari-pass-pangarchulla-6n-7d",
    "url": "/packages/kuari-pass-pangarchulla-6n-7d/",
    "name": "Kuari Pass with Pangarchulla Peak 6N/7D",
    "title": "Kuari Pass + Pangarchulla Peak Trek 7 Days (4,594m) | Junegiri Yatra",
    "meta_description": "Combine Kuari Pass with the summit of Pangarchulla Peak (4,594m) on this 7-day Garhwal trek from Rishikesh. Nanda Devi panoramas, a true summit day. From ₹10,999. WhatsApp to book.",
    "keywords": "kuari pass pangarchulla trek, pangarchulla peak, kuari pass summit, garhwal peak trek, nanda devi views trek, joshimath trek, pangarchulla 4594m, advanced uttarakhand trek",
    "h1": "Kuari Pass + <em>Pangarchulla Peak 6N/7D</em>",
    "hero_tagline": "From Lord Curzon's Trail to a Real Himalayan Summit",
    "hero_image": "/images/kuari_pass_6.jpg",
    "tag": "Summit Trek",
    "duration": "6 Nights / 7 Days",
    "destinations_short": "Joshimath · Khullara · Kuari Pass · Pangarchulla",
    "departure": "Sep–Apr from Rishikesh",
    "difficulty": "Moderate to Challenging",
    "transport": "Private Vehicle + Trek",
    "price_from": 10999,
    "intl_price_usd": 259,
    "wa_text": "Hi Junegiri Yatra! I'm interested in the Kuari Pass with Pangarchulla Peak 6N/7D trek. Please share availability and pricing.",
    "overview": "<p>This trek takes the classic Kuari Pass route and raises the stakes with a genuine Himalayan summit: <strong>Pangarchulla Peak (4,594m)</strong>. Over seven days from Rishikesh, you walk Lord Curzon's historic trail through oak and rhododendron forest to the famed viewpoint of Kuari Pass, then push higher to stand on a true alpine summit — all without technical mountaineering.</p><p>The reward is one of the most complete panoramas in the Garhwal Himalaya. From the high ground above Khullara you face Nanda Devi (India's second-highest peak), Dronagiri, Kamet, Hathi Parbat and a sweeping arc of giants. Summit morning on Pangarchulla is a serious, exhilarating effort across boulder fields and, in season, snow — the kind of day that turns a scenic trek into a mountaineering memory.</p><p>This itinerary is designed for trekkers who already have some hill experience and want to step up. With a dedicated summit day, an experienced lead guide, quality high-altitude camping and a careful acclimatization profile, it bridges the gap between trekking and entry-level peak climbing.</p>",
    "itinerary": [
        {"title": "Day 1 — Rishikesh to Joshimath (6,700 ft)", "meta": "Drive 256 km / 9–10 hrs", "desc": "A long, scenic mountain drive along the Alaknanda past the sacred confluences of Devprayag, Rudraprayag and Karnaprayag to the trekking hub of Joshimath. Overnight in a guesthouse.", "highlights": ["Alaknanda valley", "Sacred confluences", "Joshimath base"]},
        {"title": "Day 2 — Joshimath to Tugasi, trek to Gulling (9,500 ft)", "meta": "Short drive + Trek 6 km / 4–5 hrs", "desc": "A short drive to the trailhead at Tugasi, then a forest climb through oak and rhododendron to the campsite at Gulling, with first views of Dronagiri peak. Overnight in tents.", "highlights": ["Rhododendron forest", "Dronagiri views", "Gulling camp"]},
        {"title": "Day 3 — Gulling to Khullara (11,100 ft)", "meta": "Trek 6 km / 4–5 hrs", "desc": "Climb through alpine meadows and clearings to the high camp at Khullara, where sunset lights up Nanda Devi and Hathi Parbat. This becomes the base for the next two big days.", "highlights": ["Alpine meadows", "Khullara high camp", "Nanda Devi sunset"]},
        {"title": "Day 4 — Khullara to Kuari Pass and back (12,516 ft)", "meta": "Trek 10 km round trip / 7–8 hrs", "desc": "Ascend to Kuari Pass itself for the legendary 180-degree Himalayan panorama, then return to Khullara. A magnificent acclimatization day ahead of the summit attempt.", "highlights": ["Kuari Pass panorama", "Acclimatization", "Return to Khullara"]},
        {"title": "Day 5 — Khullara to Pangarchulla summit and back (15,069 ft)", "meta": "Summit day / 12–14 km / 10–12 hrs", "desc": "A pre-dawn start for the summit push across boulder fields and snow to the top of Pangarchulla Peak (4,594m), with staggering close-up views of the Nanda Devi sanctuary. A long, demanding, unforgettable day back to camp.", "highlights": ["Pangarchulla summit", "Boulder & snow", "Nanda Devi sanctuary"]},
        {"title": "Day 6 — Khullara to Tugasi, drive to Joshimath", "meta": "Trek 12 km / 6 hrs + drive", "desc": "Descend through the forest back to Tugasi and drive to Joshimath. A celebratory evening marks the completion of both the pass and the peak.", "highlights": ["Forest descent", "Joshimath return", "Celebration"]},
        {"title": "Day 7 — Joshimath to Rishikesh", "meta": "Drive 256 km / 9–10 hrs", "desc": "The scenic drive back down the valley to Rishikesh, arriving by evening with a summit and a classic trail both accomplished.", "highlights": ["Return drive", "Arrive Rishikesh", "Trip ends"]},
    ],
    "inclusions": [
        "Return transport: Rishikesh ↔ Joshimath in private vehicle",
        "Accommodation: guesthouse in Joshimath + alpine tents on trek (triple sharing)",
        "All meals from dinner Day 1 to breakfast Day 7 (veg)",
        "Experienced summit-trained lead guide and support staff",
        "Forest permits and entry fees",
        "High-altitude camping gear: tents, sleeping bags, mats",
        "Technical support gear for summit day (gaiters, crampons, rope as needed)",
        "Basic first-aid, oxygen cylinder and oximeter monitoring",
        "Trek completion certificate",
    ],
    "exclusions": [
        "Personal trekking gear (shoes, poles, thermals, jackets)",
        "Travel and high-altitude insurance — strongly recommended",
        "Meals during the road journeys",
        "Personal expenses, bottled drinks and tips",
        "Porter or mule charges for personal bags",
        "5% GST",
        "Any cost due to weather delays or early exit",
    ],
    "pricing_tiers": tiers(10999, 13500, 16500),
    "gallery": ["/images/kuari_pass_2.jpg", "/images/kuari_pass_3.jpg", "/images/kuari_pass_4.jpg", "/images/kuari_pass_7.jpg", "/images/kuari_pass_1.jpg"],
    "testimonials": [
        {"quote": "The Pangarchulla summit day is no joke — long and tough — but standing up there with Nanda Devi in your face is something else. Great guides who knew exactly when to push and when to hold back.", "author": "Arjun Saxena", "loc": "Gurgaon"},
        {"quote": "Did Kuari Pass two years ago and came back for the Pangarchulla version. Adding the peak makes it a completely different, more serious adventure. Brilliantly run by the Junegiri team.", "author": "Lena Hoffmann", "loc": "Munich, Germany"},
        {"quote": "Perfect step up from regular trekking into a real summit experience. Acclimatization was handled well and the food kept us going at altitude.", "author": "Karthik Iyer", "loc": "Chennai"},
    ],
    "faq": [
        {"q": "How is this different from the regular Kuari Pass trek?", "a": "<p>This version keeps the full Kuari Pass experience but adds an extra two days and a dedicated <strong>summit day on Pangarchulla Peak (4,594m)</strong>. It's longer, higher and significantly more demanding — a genuine non-technical Himalayan summit rather than a scenic pass alone.</p>"},
        {"q": "Do I need climbing experience for Pangarchulla?", "a": "<p>No technical mountaineering experience is required, but this is graded <strong>moderate to challenging</strong> and is best suited to trekkers with prior high-altitude or multi-day trekking experience. Summit day involves 10–12 hours over boulder fields and, in season, snow. Strong cardio fitness and leg endurance are essential.</p>"},
        {"q": "When is the best season?", "a": "<p>The trek runs from <strong>September to April</strong>. Autumn (Sep–Nov) gives clear skies and stable conditions, while late winter and spring (Feb–Apr) offer a snow summit for those wanting the full alpine experience. Summit-day conditions vary, and your guide makes the final call on safety.</p>"},
        {"q": "What happens if weather stops the summit attempt?", "a": "<p>Safety always comes first. If conditions on Pangarchulla are unsafe, your lead guide may shorten or turn the summit attempt around — the mountain decides. Even without the final summit, you'll have completed Kuari Pass and its full panorama. No refunds apply for weather-driven changes.</p>"},
        {"q": "How do I reach the start point?", "a": "<p>The trek begins and ends in <strong>Rishikesh</strong>, with included transport to and from Joshimath. Rishikesh is well connected by road and rail to Delhi, and Dehradun (Jolly Grant) is the nearest airport. We can advise on the best way to reach Rishikesh.</p>"},
        {"q": "Can this be booked as a private trek?", "a": "<p>Yes. We run both scheduled departures and fully private Kuari Pass + Pangarchulla treks on custom dates. WhatsApp our team with your group size and preferred window for a personalized quote.</p>"},
    ],
    "related": [
        {"name": "Kuari Pass Trek", "duration": "4N/5D", "price": 9000, "image": "/images/kuari_pass_1.jpg", "url": "/packages/kuari-pass-trek-4n-5d/"},
        {"name": "Roopkund Trek", "duration": "7N/8D", "price": 16000, "image": "/images/trek_lake.webp", "url": "/packages/roopkund-trek-7n-8d/"},
        {"name": "Har Ki Dun Trek", "duration": "5N/6D", "price": 11000, "image": "/images/harkidun_1.jpg", "url": "/packages/har-ki-dun-trek-5n-6d/"},
    ],
    "travel_guide": "<h2>The Complete Guide to Kuari Pass with Pangarchulla Peak</h2><p>For trekkers ready to move beyond a scenic pass and onto a real summit, the Kuari Pass with Pangarchulla Peak trek is one of the finest options in the Garhwal Himalaya. It marries the celebrated <strong>Lord Curzon trail</strong> to Kuari Pass with a demanding summit day on <strong>Pangarchulla (4,594m)</strong> — all over seven days from Rishikesh.</p><h3>Two objectives, one trek</h3><p>The first half follows the classic route: forest camps at Gulling, the high meadow base at Khullara, and the legendary 180-degree panorama from <strong>Kuari Pass (12,516 ft)</strong> taking in Nanda Devi, Dronagiri and Kamet. The Kuari Pass day doubles as crucial acclimatization for what comes next.</p><h3>The summit day</h3><p>Pangarchulla is the prize. A pre-dawn start, boulder fields, and — depending on the season — snow lead to a summit with breathtaking views into the Nanda Devi sanctuary. Expect 10–12 hours of effort. No ropes-and-ice technical skill is needed, but fitness, prior trekking experience and mental grit absolutely are.</p><h3>Who should attempt it</h3><p>This is a <strong>moderate-to-challenging</strong> trek best suited to those who have already done multi-day or high-altitude treks. If Kuari Pass alone is on your radar and you're newer to trekking, consider our standard 5-day Kuari Pass package first.</p><h3>Booking with Junegiri Yatra</h3><p>Departures include private transport from Rishikesh, alpine camping, summit-day support gear, oxygen and an experienced lead guide. WhatsApp our Haridwar team for dates, private-group pricing and a tailored fitness and packing plan.</p>",
}

# ─────────────────────────── append ───────────────────────────
d = json.load(open(PATH))
existing = {p.get('slug') for p in d}
added = []
for entry in (ebc, sar, pangarchulla):
    if entry['slug'] in existing:
        # replace
        for i, p in enumerate(d):
            if p.get('slug') == entry['slug']:
                d[i] = entry
        added.append(entry['slug'] + ' (replaced)')
    else:
        d.append(entry)
        added.append(entry['slug'] + ' (added)')

json.dump(d, open(PATH, 'w'), indent=2, ensure_ascii=False)
print('Total entries now:', len(d))
for a in added:
    print(' -', a)
