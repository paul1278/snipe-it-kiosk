# Snipe-IT Kiosk
This is a small web-application which provides a kiosk-view for [Snipe-IT](https://github.com/snipe/snipe-it).

## Requirements
- kiosk-like computer, maybe a Raspberry-Pi including a touchscreen
- Barcode-reader, which acts like a keyboard
- RFID-chip scanner, to allow logging in using an RFID-tag

## Installation
### Debian / Ubuntu / Raspberry Pi OS
- Install a webserver like `nginx` or `apache2` using `apt install nginx `
- Download a release or build it from source, then place the files into your webroot. On a fresh installation, this should be located at `/var/www/html`
- Copy the `config.default.json` to `config.json` and set the correct values
- Add keys to log in & start a browser in kiosk-mode (like `chromium-browser`)

### Building from source
To build the code from source, you need some requirements:
- `nodejs` - tested with v14
- `npm`
- `git`
`run the following commands:
```bash
git clone https://github.com/paul1278/snipe-it-kiosk.git
cd snipe-it-kiosk
npm i
npm run build
```

The build-output is located under `dist/`

### Adding keys
TODO

## Security
Because there is no backend-server involved, authentication is quite a challenge.
Everything is build around the idea of a kiosk - nobody can submit HTTP-requests against the kiosk-computer.
There is only a single local HTTP-server, which listens only on localhost.