#!/bin/bash

# Build client
echo "Building client..."
cd client
npm install
npm run build

# Build server
echo "Building server..."
cd ../server
npm install
npm run build