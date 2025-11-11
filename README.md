# ❤️ Heart 🎵 Beats Art 🎨

On January 17, 2025, my grandmother passed away, and to this day I carry the weight of her absence. For years she faced the consequences of a hemorrhagic stroke, and if I had created this solution sooner, I could have recorded her last hour of life. Heart Beats Art doesn't seek to explain the inexplicable, but rather to offer comfort—inviting people to sensitively perceive the end and, at the same time, the intensity of the emotions experienced in special moments.

![Screenshot](https://ik.imagekit.io/fredsrocha/github/rp/cloud-run-2025/screenshot-4.png?updatedAt=1762807437507)

> *"There are moments when we lose our breath and speech… but the heart, however, always moves — with rhythm, pauses, waves of excitement and silence."* - Fred Rocha.

**Share App Link's**

- [Google AI Studio](https://ai.studio/apps/drive/109vgpBuJbkGQlxGC8bD5Qzx7bDuN6pHI)
- [Google Cloud Run](https://heart-beats-art-17187387181.us-west1.run.app)
- [Demo Pitch on YouTube](https://youtu.be/5KGzqkeHbwE)
- [Article on LinkedIn](https://www.linkedin.com/pulse/heart-beats-art-frederico-stefano-rocha--12v7f)

## 💥 The Problem

In moments of profound emotion—whether joy, love, or grief—our hearts beat in rhythms that silently record the intensity of what we feel. Yet these rhythms remain invisible, lost in data streams from wearables or fading memories.

## ✨ The Solution

Heart Beats Art was lovingly crafted through vibe coding with AI Studio and seamlessly deployed on Cloud Run Serverless, a creation designed to transform heartbeat data into timeless digital art that preserves emotion in every beat.

## 🤔 How Does It Work?

The user sends a CSV file containing beats per minute (BPMs), exported from wearable devices. This data, which translates the intensity of experienced emotions, is processed by the serverless application with `gemini-2.5-flash` in Cloud Run and transformed into a unique work of art using the powerful `imagen-4.0-generate-001` model.

## 🎯 Architecture Diagram

![Architecture Diagram](https://ik.imagekit.io/fredsrocha/github/rp/cloud-run-2025/architecture-diagram.png?updatedAt=1762812079972)

**See how different models behave when generating images using a common prompt:** *An ultra-high quality, abstract image. A fluid and organic masterpiece, dominated by the essence of blue. It captures a harmonious feeling with fragmented forms. A strong, blown-out flash of pure light radiates from the center, creating a broad spectrum of light. The entire composition is hazy and dreamlike. There are absolutely no lines, text, or numbers visible. Focus on pure color, light, and emotion.*

**Gemini 2.5 Flash Image (Nano Banana 🍌):**

![Nano Banana](https://ik.imagekit.io/fredsrocha/github/rp/cloud-run-2025/art/nano-banana.png?updatedAt=1762807311677)

**Chat GPT (OpenAI 🤔🤷‍♂️):**

![Chat GPT](https://ik.imagekit.io/fredsrocha/github/rp/cloud-run-2025/art/chat-gpt.png?updatedAt=1762807311592)

What's missing from these images? Emotion! With **Heart Beats Art**, you can transform the heartbeats (BPMs) recorded in the last hour of someone's life.

![Heart Beats Art](https://ik.imagekit.io/fredsrocha/github/rp/cloud-run-2025/art/heart-beats-art.jpeg?updatedAt=1762807311085)

or a simple walk through something unforgettable…

![Heart Beats Art](https://ik.imagekit.io/fredsrocha/github/rp/cloud-run-2025/art/heart-beats-art-walk.jpeg?updatedAt=1762816171591)

*Heart Beats Art uses the effort of the heart as an artist, transforming the movement of life into art. Share what you felt with us. Thank you!*

## 🆓 License

This project is licensed under the **Apache-2.0** license. See the [LICENSE](LICENSE) file for more details.

![Screenshot 1](https://ik.imagekit.io/fredsrocha/github/rp/cloud-run-2025/screenshot-2.png?updatedAt=1762807437064)

![Screenshot 2](https://ik.imagekit.io/fredsrocha/github/rp/cloud-run-2025/screenshot-4.png?updatedAt=1762807437507)

![Screenshot 3](https://ik.imagekit.io/fredsrocha/github/rp/cloud-run-2025/screenshot-5.jpeg?updatedAt=1762807437408)

![Screenshot 4](https://ik.imagekit.io/fredsrocha/github/rp/cloud-run-2025/screenshot-6.png?updatedAt=1762807437465)

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/109vgpBuJbkGQlxGC8bD5Qzx7bDuN6pHI

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
