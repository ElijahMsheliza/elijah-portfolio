#!/usr/bin/env python3
"""
Generate QR Code for Elijah's Portfolio Website
"""

import qrcode
from PIL import Image
import os

# Your portfolio website URL
WEBSITE_URL = "https://elijahmsheliza.github.io/elijah-portfolio"

def generate_qr_code():
    """Generate a QR code for the portfolio website"""
    
    # Create QR code instance
    qr = qrcode.QRCode(
        version=1,  # Controls the size of the QR Code
        error_correction=qrcode.constants.ERROR_CORRECT_L,  # About 7% or less errors can be corrected
        box_size=10,  # Controls how many pixels each "box" of the QR code is
        border=4,  # Controls how many boxes thick the border should be
    )
    
    # Add data to the QR code
    qr.add_data(WEBSITE_URL)
    qr.make(fit=True)
    
    # Create an image from the QR Code instance
    qr_image = qr.make_image(fill_color="black", back_color="white")
    
    # Save the QR code image
    output_path = os.path.join("assets", "portfolio_qr_code.png")
    qr_image.save(output_path)
    
    print(f"✅ QR Code generated successfully!")
    print(f"📁 Saved to: {output_path}")
    print(f"🌐 QR Code links to: {WEBSITE_URL}")
    print(f"📱 Test by scanning with your phone camera")
    
    # Also create a smaller version for resume use
    small_qr = qr_image.resize((150, 150), Image.Resampling.LANCZOS)
    small_output_path = os.path.join("assets", "portfolio_qr_code_small.png")
    small_qr.save(small_output_path)
    
    print(f"📄 Small version (150x150px) for resume: {small_output_path}")

if __name__ == "__main__":
    generate_qr_code()