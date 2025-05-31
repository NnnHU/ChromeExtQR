# Website QR Code Generator Chrome Extension

A Chrome extension that displays a QR code for the current webpage in the bottom right corner with the following features:
- QR code size is 256x256 pixels
- Website logo displayed in the center of the QR code
- Domain name and title (up to 15 characters) shown below the QR code

[中文版本](./READMECN.md)

## Installation

1. Open Chrome browser and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked extension"
4. Select the folder containing this extension

## Usage

After installation, whenever you visit any webpage, a QR code for that page will automatically appear in the bottom right corner. The QR code includes:
- The complete webpage URL
- Website logo (if available)
- Website domain name
- Webpage title (up to 15 characters)

## File Description

- `manifest.json`: Extension configuration file
- `content.js`: Main functionality implementation code
- `styles.css`: Stylesheet file
- `qrcode.min.js`: QR code generation library
- `icon48.png` and `icon128.png`: Extension icons

## Notes

- Some websites may restrict access to favicons due to security policies
- If a website doesn't have a suitable favicon, the QR code will not display a logo
- The extension requires permission to access webpage content to function properly 