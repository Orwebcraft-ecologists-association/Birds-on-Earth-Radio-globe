# Building AAB (Android App Bundle) for Google Play Console

This document explains how to build an Android App Bundle (AAB) file for the Birds on Earth Radio Globe app to upload to Google Play Console.

## Prerequisites

1. **Android SDK**: Make sure you have Android SDK installed
2. **Java**: Java 17 or higher
3. **Node.js**: Node.js 18 or higher
4. **Internet connection**: Required to download Android dependencies

## Project Structure

```
Birds-on-Earth-Radio-globe/
├── www/                    # Web assets (HTML, CSS, JS)
├── android/               # Android native project
├── capacitor.config.json  # Capacitor configuration
├── package.json          # Node.js dependencies and scripts
└── BUILD_AAB.md          # This documentation
```

## Build Commands

### Quick Build (Debug AAB)
```bash
npm run build:aab:debug
```

### Production Build (Release AAB)
```bash
npm run build:aab
```

### Manual Build Steps

1. **Build web assets**:
   ```bash
   npm run build:web
   ```

2. **Sync to Android**:
   ```bash
   npm run build:android
   ```

3. **Build AAB**:
   ```bash
   cd android
   ./gradlew bundleRelease  # For release AAB
   ./gradlew bundleDebug    # For debug AAB
   ```

## Output Location

The generated AAB files will be located at:
- **Debug AAB**: `android/app/build/outputs/bundle/debug/app-debug.aab`
- **Release AAB**: `android/app/build/outputs/bundle/release/app-release.aab`

## Google Play Console Upload

1. Sign in to [Google Play Console](https://play.google.com/console)
2. Create a new app or select existing app
3. Go to "Release" → "Production" (or "Internal testing" for testing)
4. Create new release
5. Upload the AAB file (`app-release.aab`)
6. Fill in release notes and other required information
7. Review and rollout

## Signing Configuration

### Debug Signing
The project is currently configured with debug signing for development purposes:
- Keystore: `android/app/keystore/debug.keystore`
- Store password: `android`
- Key alias: `androiddebugkey`
- Key password: `android`

### Production Signing
**⚠️ Important**: For production releases, you must:

1. Create a production keystore:
   ```bash
   keytool -genkey -v -keystore release.keystore -alias release -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Update `android/app/build.gradle` with your release signing config:
   ```gradle
   signingConfigs {
       release {
           storeFile file('keystore/release.keystore')
           storePassword 'your_store_password'
           keyAlias 'release'
           keyPassword 'your_key_password'
       }
   }
   
   buildTypes {
       release {
           signingConfig signingConfigs.release
           // ... other config
       }
   }
   ```

## Bundle Configuration

The AAB is configured with the following split settings:
- **Language splits**: Disabled (single language bundle)
- **Density splits**: Enabled (separate APKs for different screen densities)
- **ABI splits**: Enabled (separate APKs for different processor architectures)

## App Information

- **Package ID**: `com.birdsonearthradio.globe`
- **App Name**: Birds on Earth Radio Globe
- **Version Code**: 1
- **Version Name**: 1.0

## Troubleshooting

### Network Issues
If you encounter network issues during build:
1. Check internet connection
2. Try using a VPN if corporate firewall blocks access
3. Clear Gradle cache: `./gradlew clean`

### Build Failures
1. Check Java version: `java -version` (should be 17+)
2. Check Android SDK path
3. Clean and rebuild: `./gradlew clean bundleRelease`

### Capacitor Issues
1. Sync Capacitor: `npx cap sync android`
2. Update dependencies: `npm update`

## Security Notes

- **Never commit release keystores** to version control
- Store production passwords securely
- Use different keystores for debug and release
- Keep backup copies of your release keystore

## Support

For issues specific to this build setup, check:
1. [Capacitor Documentation](https://capacitorjs.com/docs)
2. [Android Developer Guide](https://developer.android.com/guide)
3. [Google Play Console Help](https://support.google.com/googleplay/android-developer)