import sharp from "sharp";
import path from "path";
import { existsSync, unlinkSync } from "fs";

const ARTIFACT_DIR = "C:/Users/DineshNikam/.gemini/antigravity-ide/brain/d2f00ab4-24b7-4c2a-9bbd-1706a068bdd1";
const PUB = path.join(process.cwd(), "public");
const CERTS = path.join(PUB, "certifications");

const assets = [
  // Certifications (4:3 aspect ratio, ~1200x900)
  {
    src: path.join(ARTIFACT_DIR, "aws_cert_real_1790266501417.jpg"),
    destPng: path.join(CERTS, "aws-sa.png"),
    destWebp: path.join(CERTS, "aws-sa.webp"),
    name: "AWS Solutions Architect Associate",
    width: 1200,
  },
  {
    src: path.join(ARTIFACT_DIR, "gcp_cert_real_1790266557982.jpg"),
    destPng: path.join(CERTS, "gcp-ace.png"),
    destWebp: path.join(CERTS, "gcp-ace.webp"),
    name: "Google Cloud Associate Cloud Engineer",
    width: 1200,
  },
  {
    src: path.join(ARTIFACT_DIR, "cka_cert_real_1790266589140.jpg"),
    destPng: path.join(CERTS, "cncf-cka.png"),
    destWebp: path.join(CERTS, "cncf-cka.webp"),
    name: "CNCF Certified Kubernetes Administrator (CKA)",
    width: 1200,
  },
  {
    src: path.join(ARTIFACT_DIR, "meta_fe_dinesh_1790268466074.jpg"),
    destPng: path.join(CERTS, "meta-fe.png"),
    destWebp: path.join(CERTS, "meta-fe.webp"),
    name: "Meta Front-End Developer Professional Certificate",
    width: 1200,
  },

  // Project Showcases (16:9 aspect ratio, 1600x900)
  {
    src: path.join(ARTIFACT_DIR, "cybersherlock_real_1790266707360.jpg"),
    destPng: path.join(PUB, "cybersherlock.png"),
    destWebp: path.join(PUB, "cybersherlock.webp"),
    name: "Cybersherlock IP Intelligence Dashboard",
    width: 1600,
  },
  {
    src: path.join(ARTIFACT_DIR, "hpconnect_real_1790266739086.jpg"),
    destPng: path.join(PUB, "hpconnect.png"),
    destWebp: path.join(PUB, "hpconnect.webp"),
    name: "HP Connect Visitor Management System",
    width: 1600,
  },
  {
    src: path.join(ARTIFACT_DIR, "ithpl_platform_real_1790266846496.jpg"),
    destPng: path.join(PUB, "ithplwebsite.png"),
    destWebp: path.join(PUB, "ithplwebsite.webp"),
    name: "ITHPL Corporate Platform",
    width: 1600,
  },
];

async function deployAssets() {
  console.log("🚀 Deploying real portfolio assets (PNG + WebP)...");

  for (const asset of assets) {
    if (!existsSync(asset.src)) {
      console.error(`❌ Source missing: ${asset.src}`);
      continue;
    }

    // Generate high-resolution PNG
    await sharp(asset.src)
      .resize({ width: asset.width, withoutEnlargement: true })
      .png({ quality: 95, compressionLevel: 8 })
      .toFile(asset.destPng);

    // Generate high-performance WebP
    await sharp(asset.src)
      .resize({ width: asset.width, withoutEnlargement: true })
      .webp({ quality: 88, effort: 6 })
      .toFile(asset.destWebp);

    console.log(`✅ Deployed ${asset.name}:`);
    console.log(`   PNG:  ${path.relative(process.cwd(), asset.destPng)}`);
    console.log(`   WebP: ${path.relative(process.cwd(), asset.destWebp)}`);
  }

  // Cleanup test files if they exist
  const cleanup = [
    path.join(CERTS, "meta_test.png"),
    path.join(CERTS, "test_slice.png"),
    path.join(process.cwd(), "scripts", "patch-meta.mjs"),
  ];
  for (const f of cleanup) {
    if (existsSync(f)) {
      unlinkSync(f);
      console.log(`🧹 Cleaned up temporary file: ${path.basename(f)}`);
    }
  }

  console.log("✨ All real portfolio assets successfully deployed!");
}

deployAssets().catch(console.error);
