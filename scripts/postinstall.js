const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };

function findPackageNameFromSource(srcDir) {
  if (!fs.existsSync(srcDir)) return null;
  const entries = fs.readdirSync(srcDir, { withFileTypes: true, recursive: true });
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!entry.name.endsWith('.java') && !entry.name.endsWith('.kt')) continue;
    const filePath = path.join(entry.parentPath, entry.name);
    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(/^package\s+([\w.]+)/m);
    if (match) return match[1];
  }
  return null;
}

for (const [name] of Object.entries(allDeps)) {
  const pkgPath = path.join(projectRoot, 'node_modules', name);
  if (!fs.existsSync(pkgPath)) continue;

  const configPath = path.join(pkgPath, 'react-native.config.js');
  const androidDir = path.join(pkgPath, 'android');

  if (!fs.existsSync(androidDir)) continue;

  const manifestPath = path.join(androidDir, 'src', 'main', 'AndroidManifest.xml');
  const buildGradle = path.join(androidDir, 'build.gradle');
  const buildGradleKts = path.join(androidDir, 'build.gradle.kts');

  if (!fs.existsSync(manifestPath)) continue;
  if (fs.existsSync(buildGradle) || fs.existsSync(buildGradleKts)) continue;

  const manifestContent = fs.readFileSync(manifestPath, 'utf8');
  if (manifestContent.includes('package=')) continue;

  let packageName = null;

  if (fs.existsSync(configPath)) {
    try {
      const config = require(configPath);
      packageName = config.dependency?.platforms?.android?.packageName;
    } catch {}
  }

  if (!packageName) {
    const srcDir = path.join(androidDir, 'src');
    packageName = findPackageNameFromSource(srcDir);
  }

  if (!packageName) {
    const known = {
      'react-native-reanimated': 'com.swmansion.reanimated',
      'react-native-gesture-handler': 'com.swmansion.gesturehandler',
      'react-native-screens': 'com.swmansion.rnscreens',
      'react-native-safe-area-context': 'com.th3rdwave.safeareacontext',
      'react-native-mmkv': 'com.reactnativemmkv',
    };
    packageName = known[name];
  }

  if (packageName) {
    const fixedManifest = manifestContent.replace(
      '<manifest',
      `<manifest package="${packageName}"`
    );
    fs.writeFileSync(manifestPath, fixedManifest);
    console.log(`  ✓ ${name} → package="${packageName}" added to AndroidManifest.xml`);
  } else {
    console.log(`  ? ${name} → could not determine package name`);
  }
}
