# Memoir by BeatRoute — Instagram Master 4:5 Portrait Panorama Guide

This guide details the 4:5 portrait panoramic design framework, ultra-minimal typography, and copywriting kit for **Memoir by BeatRoute Band** Instagram posts (`@beat.route_`).

---

## 1. 4:5 Portrait Specs & Revamped Slide 2

- **Ideal Aspect Ratio**: `4:5` Portrait (`1080px × 1350px` per slide, total 5-slide panorama: `5400px × 1350px`).
- **Expansive Vertical Layout Scaling**: Expanded card heights, logo sizes (`125px` Memoir / `64px` BeatRoute), and element spacing so content spans naturally from top header (`Y = 65px`) to footer (`Y = 1295px`), filling 100% of the 1350px height with zero empty background voids.
- **Revamped Slide 2 (No Quotes or Artist Name)**:
  - Removed quote box, quotation marks, and `BeatRoute Band Artists` name.
  - Replaced with a high-impact luxury storytelling card:
    - **Headline** (`86px` font): *"Generic Gifts Fade. Original Songs Endure."*
    - **Story Card**: *"Beyond Physical Presents — Flowers wither, cards get misplaced, and luxury items gather dust. An original studio song written for your memories creates an emotional bond that lives forever."*

---

## 2. 5-Slide Ultra-Minimalist Narrative Arc

| Slide | Purpose | Content Focus |
|---|---|---|
| **Slide 1** | **Vertical Hero Brand Reveal** | **Vertical Lockup**: Memoir / BY / BeatRoute Band.<br>*"BeatRoute Has A New Story."* (86px font) |
| **Slide 2** | **The Emotional Premise (Revamped)** | *"Generic Gifts Fade. Original Songs Endure."* (86px font)<br>*Beyond Physical Presents — Flowers wither, cards get misplaced...* |
| **Slide 3** | **The 3-Step Experience** | *"3 Simple Steps."* (82px font)<br>01 Share Story &rarr; 02 Approve Lyrics &rarr; 03 Studio Track. |
| **Slide 4** | **The Emotional Legacy** | *"A Letter Fades. A Song Lives Forever."* (86px font)<br>💍 Weddings • ❤️ Anniversaries • 🎂 Birthdays • ✨ Tributes |
| **Slide 5** | **Invitation & Call To Action** | *"Let's Write Your Song."* (86px font)<br>Giant CTA Button: TAP LINK IN BIO TO BEGIN &rarr;<br>WhatsApp &amp; Email with Vector Icons |

---

## 3. Ready-To-Copy Instagram Caption

```text
Your favorite band has a new story to tell. 🎶✨

For years, we’ve taken the stage to perform for thousands of audiences. But over time, we realized something powerful: the most meaningful songs aren’t the ones on the radio—they’re the ones written about your life, your love, and your personal memories.

Today, we’re thrilled to introduce Memoir by BeatRoute Band. 🤍

Memoir is our new venture dedicated to creating 100% customized, studio-recorded original songs tailored exclusively to your milestones. Whether it’s an anniversary, a wedding surprise, a parent's milestone birthday, or a tribute to someone special—we sit down with your story, write custom lyrics, and record a studio track just for you.

Swipe through to see how we bring your memories to life. ➡️

✨ How the experience works:
1️⃣ Share your story, key dates, & memories via our website intake form
2️⃣ Review & approve your custom draft lyrics before recording
3️⃣ Receive your studio-mixed, high-fidelity original song

🔗 Visit the link in our bio (memoir-lime-five.vercel.app) to explore how it works and start your song questionnaire today.

With love,
BeatRoute Band 🎸

---
📞 WhatsApp: +91 81480 66421
✉️ Email: beatroutetheband@gmail.com
📸 Instagram: @beat.route_

#MemoirByBeatRoute #BeatRouteBand #NewVenture #CustomSong #PersonalizedGift #AnniversaryGift #WeddingMusic #CustomMusic #OriginalSong #IndianMusicians #LoveStoryInSong #StudioRecording
```

---

## 4. How To Re-render / Edit Panoramas

1. Edit [slides_src/panorama.html](file:///Users/jayachandranmd/Desktop/beatroute/instagram_templates/slides_src/panorama.html).
2. Execute the generator:
   ```bash
   python3 instagram_templates/generate_carousel.py
   ```
3. Exports 5 seamless 1080x1350 PNG files to `instagram_templates/first_post/`:
   - `slide1_cover.png`
   - `slide2_why.png`
   - `slide3_process.png`
   - `slide4_legacy.png`
   - `slide5_cta.png`
