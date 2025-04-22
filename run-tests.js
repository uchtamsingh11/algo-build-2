const { execSync } = require('child_process');

console.log('🧪 Running tests for Next.js Authentication App...\n');

try {
  // Run Jest tests with coverage
  console.log('📊 Running tests with coverage report...');
  execSync('npm run test:coverage', { stdio: 'inherit' });
  
  console.log('\n✅ All tests passed successfully!');
  console.log('\n📝 Test Summary:');
  console.log('- Authentication pages (signup, login, error) tested');
  console.log('- UI components (AnimatedGroup) tested');
  console.log('- CSS animations validated');
  console.log('- Suspense boundaries confirmed');
  console.log('- Error handling verified');
  
  console.log('\n📋 See TEST-COVERAGE.md for detailed test coverage information');
} catch (error) {
  console.error('\n❌ Tests failed!');
  console.error('Please check the error messages above and fix the failing tests.');
  process.exit(1);
} 