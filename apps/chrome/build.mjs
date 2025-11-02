#!/usr/bin/env node
/**
 * Selecto Browser Extension - Build Script
 *
 * @what esbuild bundler for Chrome extension
 * @why Bundles content script with css-selector-generator dependency
 */

import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

const watch = process.argv.includes('--watch');

async function build() {
  console.log('🔨 Building Fogó browser extension...');

  // Clean dist directory
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true });
  }
  fs.mkdirSync('dist', { recursive: true });

  // Bundle content script with css-selector-generator
  await esbuild.build({
    entryPoints: ['src/content/picker.js'],
    bundle: true,
    outfile: 'dist/content/picker.js',
    format: 'iife',
    platform: 'browser',
    target: ['chrome89', 'firefox88'],
    minify: false, // Keep readable for debugging
    sourcemap: true,
    logLevel: 'info',
  });

  // Bundle background script (no dependencies to bundle)
  await esbuild.build({
    entryPoints: ['src/background.js'],
    bundle: true,
    outfile: 'dist/background.js',
    format: 'iife',
    platform: 'browser',
    target: ['chrome89', 'firefox88'],
    minify: false,
    sourcemap: true,
    logLevel: 'info',
  });

  // Copy static files
  console.log('📦 Copying static files...');

  // Copy manifest.json
  fs.cpSync('static/manifest.json', 'dist/manifest.json');

  // Copy icons
  fs.mkdirSync('dist/icons', { recursive: true });
  fs.cpSync('static/icons', 'dist/icons', { recursive: true });

  // Copy content CSS
  fs.mkdirSync('dist/content', { recursive: true });
  fs.cpSync('src/content/app.css', 'dist/content/app.css');

  // Copy documentation (optional)
  if (fs.existsSync('static/README.md')) {
    fs.cpSync('static/README.md', 'dist/README.md');
  }
  if (fs.existsSync('static/CHANGELOG.md')) {
    fs.cpSync('static/CHANGELOG.md', 'dist/CHANGELOG.md');
  }
  if (fs.existsSync('static/QUICK_START.md')) {
    fs.cpSync('static/QUICK_START.md', 'dist/QUICK_START.md');
  }

  console.log('✅ Build complete! Extension ready in dist/');
  console.log('');
  console.log('📍 Load in Chrome:');
  console.log('   1. Open chrome://extensions/');
  console.log('   2. Enable "Developer mode"');
  console.log('   3. Click "Load unpacked"');
  console.log('   4. Select: apps/selecto-extension/dist/');
  console.log('');
}

// Run build
try {
  await build();

  if (watch) {
    console.log('👀 Watching for changes...');
    // TODO: Implement watch mode with esbuild watch API
  }
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
