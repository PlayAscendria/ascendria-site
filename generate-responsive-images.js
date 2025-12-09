/**
 * Generate Responsive Image Variants
 * Creates multiple sizes of WebP images for srcset implementation
 *
 * Usage: node generate-responsive-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration for responsive variants
const VARIANTS = [
  { suffix: '@400w', width: 400, quality: 90 },
  { suffix: '@800w', width: 800, quality: 90 },
  { suffix: '@1200w', width: 1200, quality: 90 },
  { suffix: '@1600w', width: 1600, quality: 90 }
];

// Images to process
const IMAGES = [
  {
    input: 'assets/images/nfts/miner/miner_1.webp',
    output: 'assets/images/nfts/miner/miner_1',
    description: 'Miner NFT 1'
  },
  {
    input: 'assets/images/nfts/miner/miner_2.webp',
    output: 'assets/images/nfts/miner/miner_2',
    description: 'Miner NFT 2'
  },
  {
    input: 'assets/images/nfts/miner/miner_3.webp',
    output: 'assets/images/nfts/miner/miner_3',
    description: 'Miner NFT 3'
  },
  {
    input: 'assets/images/nfts/social/social1.webp',
    output: 'assets/images/nfts/social/social1',
    description: 'Social Card 1'
  },
  {
    input: 'assets/images/nfts/social/social2.webp',
    output: 'assets/images/nfts/social/social2',
    description: 'Social Card 2'
  },
  {
    input: 'assets/images/nfts/social/social3.webp',
    output: 'assets/images/nfts/social/social3',
    description: 'Social Card 3'
  }
];

/**
 * Generate responsive variants for a single image
 */
async function generateVariants(imageConfig) {
  const { input, output, description } = imageConfig;

  console.log(`\n📸 Processing: ${description}`);
  console.log(`   Input: ${input}`);

  if (!fs.existsSync(input)) {
    console.error(`   ❌ File not found: ${input}`);
    return;
  }

  // Get original image metadata
  const metadata = await sharp(input).metadata();
  console.log(`   Original size: ${metadata.width}x${metadata.height} (${metadata.format})`);

  const results = [];

  for (const variant of VARIANTS) {
    const outputPath = `${output}${variant.suffix}.webp`;

    try {
      // Only generate if width is smaller than original
      if (variant.width >= metadata.width) {
        console.log(`   ⏭️  Skipping ${variant.suffix} (larger than original)`);
        continue;
      }

      await sharp(input)
        .resize({
          width: variant.width,
          fit: 'inside', // Maintain aspect ratio
          withoutEnlargement: true
        })
        .webp({
          quality: variant.quality,
          lossless: false, // High quality lossy for smaller files
          effort: 6 // Higher compression effort
        })
        .toFile(outputPath);

      const stats = fs.statSync(outputPath);
      const sizeKB = (stats.size / 1024).toFixed(1);

      results.push({
        variant: variant.suffix,
        path: outputPath,
        size: sizeKB
      });

      console.log(`   ✅ Created ${variant.suffix}: ${sizeKB}KB`);
    } catch (error) {
      console.error(`   ❌ Error creating ${variant.suffix}:`, error.message);
    }
  }

  // Calculate total savings
  if (results.length > 0) {
    const originalSize = fs.statSync(input).size / 1024;
    const smallestVariant = results[0];
    const savings = ((originalSize - parseFloat(smallestVariant.size)) / originalSize * 100).toFixed(1);

    console.log(`   💾 Original: ${originalSize.toFixed(1)}KB → Smallest variant: ${smallestVariant.size}KB (${savings}% reduction)`);
  }

  return results;
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting responsive image generation...\n');
  console.log('Configuration:');
  console.log(`  - Variants: ${VARIANTS.map(v => v.suffix).join(', ')}`);
  console.log(`  - Images to process: ${IMAGES.length}`);

  const startTime = Date.now();
  let totalGenerated = 0;

  for (const image of IMAGES) {
    const results = await generateVariants(image);
    if (results) {
      totalGenerated += results.length;
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log(`\n✨ Complete!`);
  console.log(`   Generated ${totalGenerated} responsive variants in ${duration}s`);
  console.log(`\n📝 Next steps:`);
  console.log(`   1. Update components/nfts/Nfts.html with srcset attributes`);
  console.log(`   2. Test image quality in browser (4K and mobile)`);
  console.log(`   3. Measure LCP improvement in PageSpeed Insights`);
}

// Run
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
