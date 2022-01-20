# Snipe-IT Kiosk
This is a small web-application which provides a kiosk-view for [Snipe-IT](https://github.com/snipe/snipe-it).
It envolved around an idea to interact with the API without another backend in between. Because of that, it can be deployed on any webserver, but please read the security notes before deploying!
**This project is in alpha-state.**
## Requirements
- kiosk-like computer, maybe a Raspberry-Pi including a touchscreen
- Barcode-reader, which acts like a keyboard
- RFID-chip scanner, to allow logging in using an RFID-tag

## Installation
### Debian / Ubuntu / Raspberry Pi OS
- Install a webserver like `nginx` or `apache2` using `apt install nginx ` (or `apache2`)
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
To add a new key, open the Credentials-Generator.
If you already have a key, you can simply login using your existing key as superuser and open it from the menu.
Otherwise, open `http://<deploy-address>/#/generator`. Then scan a badge, and follow the on-screen instructions.

## Security
Because there is no backend-server involved, authentication is quite a challenge.
Everything is build around the idea of a kiosk - nobody can submit HTTP-requests against the kiosk-computer.

There is only a single local HTTP-server, which listens only on localhost.
So please keep those points in mind:
* Keys are placed in public sight (inside `keys/`) - do not allow access from non-localhost-adresses!
* Disable directory listing on whole webroot - at least the keys-directory.
* Keys are inside files, which are hashed values from the login badge. These keys are salted with a salt inside `config.json`, to prevent basic brute force attacks. Of course,
when somebody can read your config-file, the salt can be extracted. So - NEVER ALLOW ACCESS FROM NON-LOCALHOST.

Maybe some time I'll build a small backend which handles authentication a bit better, but for now this was an experiment for me to do it like that.
There is a password protection planned for the API-keys.