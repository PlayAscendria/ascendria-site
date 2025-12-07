const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Lista de todos os arquivos PNG encontrados
const pngFiles = [
  'assets/images/ecosystem/championships.webp',
  'assets/images/ecosystem/custom.webp',
  'assets/images/ecosystem/future.webp',
  'assets/images/nfts/ascender/back_share.webp',
  'assets/images/nfts/ascender/common/common_border.webp',
  'assets/images/nfts/ascender/common/common_eyes/1.webp',
  'assets/images/nfts/ascender/common/common_eyes/10.webp',
  'assets/images/nfts/ascender/common/common_eyes/11.webp',
  'assets/images/nfts/ascender/common/common_eyes/12.webp',
  'assets/images/nfts/ascender/common/common_eyes/2.webp',
  'assets/images/nfts/ascender/common/common_eyes/3.webp',
  'assets/images/nfts/ascender/common/common_eyes/4.webp',
  'assets/images/nfts/ascender/common/common_eyes/5.webp',
  'assets/images/nfts/ascender/common/common_eyes/6.webp',
  'assets/images/nfts/ascender/common/common_eyes/7.webp',
  'assets/images/nfts/ascender/common/common_eyes/8.webp',
  'assets/images/nfts/ascender/common/common_eyes/9.webp',
  'assets/images/nfts/ascender/common/common_hair/1.webp',
  'assets/images/nfts/ascender/common/common_hair/10.webp',
  'assets/images/nfts/ascender/common/common_hair/11.webp',
  'assets/images/nfts/ascender/common/common_hair/12.webp',
  'assets/images/nfts/ascender/common/common_hair/13.webp',
  'assets/images/nfts/ascender/common/common_hair/14.webp',
  'assets/images/nfts/ascender/common/common_hair/15.webp',
  'assets/images/nfts/ascender/common/common_hair/2.webp',
  'assets/images/nfts/ascender/common/common_hair/3.webp',
  'assets/images/nfts/ascender/common/common_hair/4.webp',
  'assets/images/nfts/ascender/common/common_hair/5.webp',
  'assets/images/nfts/ascender/common/common_hair/6.webp',
  'assets/images/nfts/ascender/common/common_hair/7.webp',
  'assets/images/nfts/ascender/common/common_hair/8.webp',
  'assets/images/nfts/ascender/common/common_hair/9.webp',
  'assets/images/nfts/ascender/epic/epic_border.webp',
  'assets/images/nfts/ascender/epic/epic_eyes/1.webp',
  'assets/images/nfts/ascender/epic/epic_eyes/10.webp',
  'assets/images/nfts/ascender/epic/epic_eyes/11.webp',
  'assets/images/nfts/ascender/epic/epic_eyes/12.webp',
  'assets/images/nfts/ascender/epic/epic_eyes/2.webp',
  'assets/images/nfts/ascender/epic/epic_eyes/3.webp',
  'assets/images/nfts/ascender/epic/epic_eyes/4.webp',
  'assets/images/nfts/ascender/epic/epic_eyes/5.webp',
  'assets/images/nfts/ascender/epic/epic_eyes/6.webp',
  'assets/images/nfts/ascender/epic/epic_eyes/7.webp',
  'assets/images/nfts/ascender/epic/epic_eyes/8.webp',
  'assets/images/nfts/ascender/epic/epic_eyes/9.webp',
  'assets/images/nfts/ascender/epic/epic_hair/1.webp',
  'assets/images/nfts/ascender/epic/epic_hair/10.webp',
  'assets/images/nfts/ascender/epic/epic_hair/11.webp',
  'assets/images/nfts/ascender/epic/epic_hair/12.webp',
  'assets/images/nfts/ascender/epic/epic_hair/13.webp',
  'assets/images/nfts/ascender/epic/epic_hair/14.webp',
  'assets/images/nfts/ascender/epic/epic_hair/15.webp',
  'assets/images/nfts/ascender/epic/epic_hair/2.webp',
  'assets/images/nfts/ascender/epic/epic_hair/3.webp',
  'assets/images/nfts/ascender/epic/epic_hair/4.webp',
  'assets/images/nfts/ascender/epic/epic_hair/5.webp',
  'assets/images/nfts/ascender/epic/epic_hair/6.webp',
  'assets/images/nfts/ascender/epic/epic_hair/7.webp',
  'assets/images/nfts/ascender/epic/epic_hair/8.webp',
  'assets/images/nfts/ascender/epic/epic_hair/9.webp',
  'assets/images/nfts/ascender/legendary/legendary_border.webp',
  'assets/images/nfts/ascender/legendary/legendary_eyes/1.webp',
  'assets/images/nfts/ascender/legendary/legendary_eyes/2.webp',
  'assets/images/nfts/ascender/legendary/legendary_eyes/3.webp',
  'assets/images/nfts/ascender/legendary/legendary_eyes/4.webp',
  'assets/images/nfts/ascender/legendary/legendary_eyes/5.webp',
  'assets/images/nfts/ascender/legendary/legendary_eyes/6.webp',
  'assets/images/nfts/ascender/legendary/legendary_eyes/7.webp',
  'assets/images/nfts/ascender/legendary/legendary_eyes/8.webp',
  'assets/images/nfts/ascender/legendary/legendary_eyes/9.webp',
  'assets/images/nfts/ascender/legendary/legendary_hair/1.webp',
  'assets/images/nfts/ascender/legendary/legendary_hair/2.webp',
  'assets/images/nfts/ascender/legendary/legendary_hair/3.webp',
  'assets/images/nfts/ascender/legendary/legendary_hair/4.webp',
  'assets/images/nfts/ascender/legendary/legendary_hair/5.webp',
  'assets/images/nfts/ascender/legendary/legendary_hair/6.webp',
  'assets/images/nfts/ascender/legendary/legendary_hair/7.webp',
  'assets/images/nfts/ascender/legendary/legendary_hair/8.webp',
  'assets/images/nfts/ascender/legendary/legendary_hair/9.webp',
  'assets/images/nfts/ascender/mouth/1.webp',
  'assets/images/nfts/ascender/mouth/2.webp',
  'assets/images/nfts/ascender/mouth/3.webp',
  'assets/images/nfts/ascender/mouth/4.webp',
  'assets/images/nfts/ascender/mouth/5.webp',
  'assets/images/nfts/ascender/mouth/6.webp',
  'assets/images/nfts/ascender/mouth/7.webp',
  'assets/images/nfts/ascender/mouth/8.webp',
  'assets/images/nfts/ascender/mythic/mithyc_hair/1.webp',
  'assets/images/nfts/ascender/mythic/mithyc_hair/2.webp',
  'assets/images/nfts/ascender/mythic/mithyc_hair/3.webp',
  'assets/images/nfts/ascender/mythic/mithyc_hair/4.webp',
  'assets/images/nfts/ascender/mythic/mithyc_hair/5.webp',
  'assets/images/nfts/ascender/mythic/mithyc_hair/6.webp',
  'assets/images/nfts/ascender/mythic/mithyc_hair/7.webp',
  'assets/images/nfts/ascender/mythic/mythic_border.webp',
  'assets/images/nfts/ascender/mythic/mythic_eyes/1.webp',
  'assets/images/nfts/ascender/mythic/mythic_eyes/2.webp',
  'assets/images/nfts/ascender/mythic/mythic_eyes/3.webp',
  'assets/images/nfts/ascender/mythic/mythic_eyes/4.webp',
  'assets/images/nfts/ascender/mythic/mythic_eyes/5.webp',
  'assets/images/nfts/ascender/mythic/mythic_eyes/6.webp',
  'assets/images/nfts/ascender/mythic/mythic_eyes/7.webp',
  'assets/images/nfts/ascender/naked_base.webp',
  'assets/images/nfts/ascender/nose/1.webp',
  'assets/images/nfts/ascender/nose/2.webp',
  'assets/images/nfts/ascender/nose/3.webp',
  'assets/images/nfts/ascender/nose/4.webp',
  'assets/images/nfts/ascender/rare/rare_border.webp',
  'assets/images/nfts/ascender/rare/rare_eyes/1.webp',
  'assets/images/nfts/ascender/rare/rare_eyes/10.webp',
  'assets/images/nfts/ascender/rare/rare_eyes/11.webp',
  'assets/images/nfts/ascender/rare/rare_eyes/12.webp',
  'assets/images/nfts/ascender/rare/rare_eyes/2.webp',
  'assets/images/nfts/ascender/rare/rare_eyes/3.webp',
  'assets/images/nfts/ascender/rare/rare_eyes/4.webp',
  'assets/images/nfts/ascender/rare/rare_eyes/5.webp',
  'assets/images/nfts/ascender/rare/rare_eyes/6.webp',
  'assets/images/nfts/ascender/rare/rare_eyes/7.webp',
  'assets/images/nfts/ascender/rare/rare_eyes/8.webp',
  'assets/images/nfts/ascender/rare/rare_eyes/9.webp',
  'assets/images/nfts/ascender/rare/rare_hair/1.webp',
  'assets/images/nfts/ascender/rare/rare_hair/10.webp',
  'assets/images/nfts/ascender/rare/rare_hair/11.webp',
  'assets/images/nfts/ascender/rare/rare_hair/12.webp',
  'assets/images/nfts/ascender/rare/rare_hair/13.webp',
  'assets/images/nfts/ascender/rare/rare_hair/14.webp',
  'assets/images/nfts/ascender/rare/rare_hair/15.webp',
  'assets/images/nfts/ascender/rare/rare_hair/2.webp',
  'assets/images/nfts/ascender/rare/rare_hair/3.webp',
  'assets/images/nfts/ascender/rare/rare_hair/4.webp',
  'assets/images/nfts/ascender/rare/rare_hair/5.webp',
  'assets/images/nfts/ascender/rare/rare_hair/6.webp',
  'assets/images/nfts/ascender/rare/rare_hair/7.webp',
  'assets/images/nfts/ascender/rare/rare_hair/8.webp',
  'assets/images/nfts/ascender/rare/rare_hair/9.webp',
  'assets/images/nfts/miner/miner_1.webp',
  'assets/images/nfts/miner/miner_2.webp',
  'assets/images/nfts/miner/miner_3.webp',
  'assets/images/nfts/social/social1.webp',
  'assets/images/nfts/social/social2.webp',
  'assets/images/nfts/social/social3.webp',
  'assets/images/ui/footer.webp'
];

async function convertToWebP() {
  let converted = 0;
  let errors = 0;

  console.log(`Starting conversion of ${pngFiles.length} PNG files to WebP...\\n`);

  for (const pngPath of pngFiles) {
    const webpPath = pngPath.replace('.webp', '.webp');

    try {
      await sharp(pngPath)
        .webp({ quality: 90, effort: 6 })
        .toFile(webpPath);

      converted++;
      if (converted % 10 === 0) {
        console.log(`Converted ${converted}/${pngFiles.length} files...`);
      }
    } catch (error) {
      console.error(`Error converting ${pngPath}:`, error.message);
      errors++;
    }
  }

  console.log(`\\nConversion complete!`);
  console.log(`✅ Converted: ${converted} files`);
  console.log(`❌ Errors: ${errors} files`);
}

convertToWebP().then(() => {
  console.log('\\nAll done! Ready to update references.');
}).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

