#!/bin/bash

# Build AAB (Android App Bundle) script for Birds on Earth Radio Globe
# Usage: ./build-aab.sh [debug|release]

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default build type
BUILD_TYPE=${1:-debug}

echo -e "${GREEN}🌍 Building Birds on Earth Radio Globe AAB${NC}"
echo -e "${YELLOW}Build type: $BUILD_TYPE${NC}"

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi

if ! command -v java &> /dev/null; then
    echo -e "${RED}❌ Java is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites check passed${NC}"

# Step 1: Build web assets
echo -e "${YELLOW}📦 Building web assets...${NC}"
npm run build:web

# Step 2: Sync to Android
echo -e "${YELLOW}🔄 Syncing to Android...${NC}"
npm run build:android

# Step 3: Build AAB
echo -e "${YELLOW}🏗️  Building Android App Bundle...${NC}"
cd android

if [ "$BUILD_TYPE" = "release" ]; then
    echo -e "${YELLOW}Building release AAB...${NC}"
    ./gradlew bundleRelease
    AAB_PATH="app/build/outputs/bundle/release/app-release.aab"
else
    echo -e "${YELLOW}Building debug AAB...${NC}"
    ./gradlew bundleDebug
    AAB_PATH="app/build/outputs/bundle/debug/app-debug.aab"
fi

cd ..

# Check if AAB was created
if [ -f "android/$AAB_PATH" ]; then
    echo -e "${GREEN}✅ AAB successfully created!${NC}"
    echo -e "${GREEN}📍 Location: android/$AAB_PATH${NC}"
    
    # Show file size
    AAB_SIZE=$(du -h "android/$AAB_PATH" | cut -f1)
    echo -e "${GREEN}📏 Size: $AAB_SIZE${NC}"
    
    echo -e "${YELLOW}📋 Next steps:${NC}"
    echo -e "   1. Upload android/$AAB_PATH to Google Play Console"
    echo -e "   2. Configure app listing and metadata"
    echo -e "   3. Set up content rating and pricing"
    echo -e "   4. Review and publish"
    
else
    echo -e "${RED}❌ AAB creation failed!${NC}"
    echo -e "${RED}Expected location: android/$AAB_PATH${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Build completed successfully!${NC}"