#!/bin/bash

echo "Starting build process..."

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

# Ensure dist directory exists and copy files
echo "Setting up server dist..."
mkdir -p dist

# Copy necessary files to run the server
echo "Build complete! Starting server..."

# Print directory structure for debugging
echo "Directory structure:"
ls -la
cd dist
ls -la