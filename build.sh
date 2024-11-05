# Make sure you're in the root directory where you see both client and server folders
echo '#!/bin/bash

# Build client
echo "Building client..."
cd client
npm install
npm run build

# Build server
echo "Building server..."
cd ../server
npm install
npm run build' > build.sh