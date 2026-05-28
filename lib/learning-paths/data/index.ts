// lib/learning-paths/data/index.ts
export { securityFundamentalsPath } from './security-fundamentals';
export { digitalLiteracyPath } from './digital-literacy';
export { professionalSecurityPath } from './professional-security';

import { securityFundamentalsPath } from './security-fundamentals';
import { digitalLiteracyPath } from './digital-literacy';
import { professionalSecurityPath } from './professional-security';
import type { LearningPath } from '../learning-path-types';

export const learningPaths: LearningPath[] = [
  securityFundamentalsPath,
  digitalLiteracyPath,
  professionalSecurityPath,
];
