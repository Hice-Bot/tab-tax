import requests
import base64
import os
from PIL import Image
import io

TOKEN = "HbAcYMZWhN9rF102ECRR33GKKObOJkMV"
API_URL = "https://api.deepinfra.com/v1/openai/images/generations"
HEADERS = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {TOKEN}"
}
OUT_DIR = "store"

def generate(prompt, filename, final_size):
    print(f"Generating {filename}...")
    payload = {
        "prompt": prompt,
        "size": "1024x1024",
        "model": "stabilityai/sdxl-turbo",
        "n": 1,
        "response_format": "b64_json"
    }
    r = requests.post(API_URL, headers=HEADERS, json=payload)
    r.raise_for_status()
    data = r.json()
    b64 = data["data"][0]["b64_json"]
    img = Image.open(io.BytesIO(base64.b64decode(b64))).convert("RGB")
    img = img.resize(final_size, Image.LANCZOS)
    out_path = os.path.join(OUT_DIR, filename)
    img.save(out_path, "PNG")
    print(f"  Saved → {out_path} ({final_size[0]}x{final_size[1]})")

SMALL_PROMPT = (
    "Chrome extension promo tile. Stark minimalist black and white brutalist graphic design poster. "
    "Bold giant uppercase text TAB TAX in heavy black letters dominates the center. "
    "Below it smaller text: EARN YOUR DISTRACTION. "
    "A strong horizontal black dividing line separates header from a simple icon of a brain with a STOP sign. "
    "Pure white background, jet black typography only. No gradients, no color, no photos. "
    "High contrast editorial design. Premium, punchy, dramatic."
)

MARQUEE_PROMPT = (
    "Wide panoramic Chrome extension promo banner. Stark black and white brutalist poster design. "
    "Left side: massive bold uppercase text TAB TAX, below it: BREAK THE CYCLE. EARN YOUR DISTRACTION. "
    "Right side: a bold minimalist graphic of a browser tab being intercepted by a thick black toll booth barrier arm. "
    "Pure white background, no color, no gradients. Extremely high contrast. "
    "Premium editorial magazine aesthetic. Bold slab serif font. Dramatic, confident, sharp."
)

generate(SMALL_PROMPT,   "promo_small_440x280.png",   (440, 280))
generate(MARQUEE_PROMPT, "promo_marquee_1400x560.png", (1400, 560))

print("\nDone! Both promo tiles saved to store/")
