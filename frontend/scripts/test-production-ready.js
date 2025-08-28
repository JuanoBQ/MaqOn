#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧪 TESTING PRODUCTION READINESS - MaqOn');
console.log('=====================================\n');

let passed = 0;
let failed = 0;

function test(name, condition, message) {
  if (condition) {
    console.log(`✅ ${name}`);
    passed++;
  } else {
    console.log(`❌ ${name} - ${message}`);
    failed++;
  }
}

// Test 1: Verificar archivos críticos
console.log('📁 Verificando archivos críticos...');
const criticalFiles = [
  'next.config.js',
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/app/sitemap.ts',
  'src/app/robots.ts',
  'src/components/GoogleAnalytics.tsx',
  'src/app/api/hubspot-submit/route.ts'
];

criticalFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  test(
    `Archivo ${file}`,
    fs.existsSync(filePath),
    'Archivo no encontrado'
  );
});

// Test 2: Verificar variables de entorno
console.log('\n🔧 Verificando variables de entorno...');
const envExample = path.join(__dirname, '..', 'env.example');
if (fs.existsSync(envExample)) {
  const envContent = fs.readFileSync(envExample, 'utf8');
  test(
    'HUBSPOT_PORTAL_ID definido',
    envContent.includes('NEXT_PUBLIC_HUBSPOT_PORTAL_ID'),
    'Variable de HubSpot Portal ID no definida'
  );
  test(
    'HUBSPOT_FORM_ID definido',
    envContent.includes('NEXT_PUBLIC_HUBSPOT_FORM_ID'),
    'Variable de HubSpot Form ID no definida'
  );
  test(
    'Google Analytics definido',
    envContent.includes('NEXT_PUBLIC_GA_MEASUREMENT_ID'),
    'Variable de Google Analytics no definida'
  );
}

// Test 3: Verificar componentes críticos
console.log('\n🧩 Verificando componentes críticos...');
const components = [
  'src/components/Header.tsx',
  'src/components/Footer.tsx',
  'src/components/products/ProductDetail.tsx',
  'src/components/QuoteForm.tsx'
];

components.forEach(component => {
  const componentPath = path.join(__dirname, '..', component);
  test(
    `Componente ${path.basename(component)}`,
    fs.existsSync(componentPath),
    'Componente no encontrado'
  );
});

// Resumen final
console.log('\n📊 RESUMEN DE TESTING');
console.log('====================');
console.log(`✅ Tests pasados: ${passed}`);
console.log(`❌ Tests fallados: ${failed}`);
console.log(`📈 Porcentaje de éxito: ${Math.round((passed / (passed + failed)) * 100)}%`);

if (failed === 0) {
  console.log('\n🎉 ¡Excelente! El proyecto está listo para producción.');
} else {
  console.log(`\n⚠️ Se encontraron ${failed} problemas que necesitan atención.`);
}

process.exit(failed > 0 ? 1 : 0);
