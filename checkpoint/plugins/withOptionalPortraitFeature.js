const { withAndroidManifest } = require('@expo/config-plugins');

const PORTRAIT_FEATURE = 'android.hardware.screen.portrait';

function withOptionalPortraitFeature(config) {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults.manifest;
    const usesFeatures = manifest['uses-feature'] || [];
    const portraitFeature = usesFeatures.find(
      (feature) =>
        feature.$ && feature.$['android:name'] === PORTRAIT_FEATURE
    );

    if (portraitFeature) {
      portraitFeature.$['android:required'] = 'false';
    } else {
      usesFeatures.push({
        $: {
          'android:name': PORTRAIT_FEATURE,
          'android:required': 'false',
        },
      });
    }

    manifest['uses-feature'] = usesFeatures;
    return config;
  });
}

module.exports = withOptionalPortraitFeature;
