#!/bin/bash

set -x
set -e

make
rm -f jitsi-meet.tar.bz2
rm -rf jitsi-meet
npm install lib-jitsi-meet --force
make source-package
tar -xjf jitsi-meet.tar.bz2
sudo cp -r jitsi-meet/* /usr/share/jitsi-meet/
sudo systemctl restart nginx