import qrcode

# Replace with your local server link
url = "http://88.197.65.57:8000"

# Generate QR code
img = qrcode.make(url)
img.save("quiz_qr.png")
print("QR code saved as quiz_qr.png")