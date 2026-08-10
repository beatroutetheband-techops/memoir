#!/usr/bin/env python3
import subprocess
import os
from PIL import Image

def render_panorama_carousel():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    slides_src = os.path.join(script_dir, "slides_src")
    out_dir = os.path.join(script_dir, "first_post")
    
    os.makedirs(out_dir, exist_ok=True)
    
    chrome_path = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    panorama_html = f"file://{os.path.join(slides_src, 'panorama.html')}"
    temp_panorama_png = os.path.join(out_dir, "_temp_panorama.png")
    
    print("🎨 Rendering 5400x1350 4:5 Portrait Panorama in Headless Chrome...")
    
    cmd = [
        chrome_path,
        "--headless=new",
        "--disable-gpu",
        "--force-device-scale-factor=2",
        f"--screenshot={temp_panorama_png}",
        "--window-size=5400,1350",
        panorama_html
    ]
    
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if res.returncode != 0 or not os.path.exists(temp_panorama_png):
        print(f"  ✗ Failed to render panorama: {res.stderr.decode()}")
        return

    print("  ✓ Full 5400x1350 portrait panorama screenshot captured successfully.")
    print("✂️ Slicing panorama into 5 seamless, perfectly aligned 4:5 portrait (1080x1350) slides...")

    panorama_img = Image.open(temp_panorama_png)
    full_width, full_height = panorama_img.size
    
    # 5 slides slicing
    slide_width = full_width // 5
    slide_names = [
        "slide1_cover.png",
        "slide2_why.png",
        "slide3_process.png",
        "slide4_legacy.png",
        "slide5_cta.png"
    ]

    for idx, name in enumerate(slide_names):
        left = idx * slide_width
        right = (idx + 1) * slide_width
        crop_box = (left, 0, right, full_height)
        
        slide_img = panorama_img.crop(crop_box)
        
        # Resize to standard crisp 1080x1350 if 2x scale was applied
        if slide_img.size != (1080, 1350):
            slide_img = slide_img.resize((1080, 1350), Image.Resampling.LANCZOS)
            
        out_path = os.path.join(out_dir, name)
        slide_img.save(out_path, "PNG", quality=95)
        
        size_kb = os.path.getsize(out_path) / 1024
        print(f"  ✓ Slice {idx+1}/5 -> {name} ({size_kb:.1f} KB)")

    # Clean up temporary full panorama screenshot
    if os.path.exists(temp_panorama_png):
        os.remove(temp_panorama_png)

    print("\n✨ All 5 Portrait 4:5 (1080x1350) Carousel Slides exported cleanly to instagram_templates/first_post/")

if __name__ == "__main__":
    render_panorama_carousel()
