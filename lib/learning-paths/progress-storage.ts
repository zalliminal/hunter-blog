// lib/learning-paths/progress-storage.ts
export interface PathProgress {
  pathSlug: string;
  completedSteps: string[];
  totalSteps: number;
  lastUpdated: string;
}

const STORAGE_KEY = 'learning_paths_progress';

export function getPathProgress(pathSlug: string): PathProgress | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    
    const allProgress = JSON.parse(data);
    return allProgress[pathSlug] || null;
  } catch {
    return null;
  }
}

export function getAllProgress(): Record<string, PathProgress> {
  if (typeof window === 'undefined') return {};
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function markStepComplete(pathSlug: string, stepId: string, totalSteps: number): void {
  if (typeof window === 'undefined') return;
  
  try {
    const allProgress = getAllProgress();
    const pathProgress = allProgress[pathSlug] || {
      pathSlug,
      completedSteps: [],
      totalSteps,
      lastUpdated: new Date().toISOString(),
    };
    
    if (!pathProgress.completedSteps.includes(stepId)) {
      pathProgress.completedSteps.push(stepId);
    }
    
    pathProgress.lastUpdated = new Date().toISOString();
    pathProgress.totalSteps = totalSteps;
    
    allProgress[pathSlug] = pathProgress;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
    
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('progressUpdated', { detail: { pathSlug } }));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
}

export function markStepIncomplete(pathSlug: string, stepId: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const allProgress = getAllProgress();
    const pathProgress = allProgress[pathSlug];
    
    if (!pathProgress) return;
    
    pathProgress.completedSteps = pathProgress.completedSteps.filter(id => id !== stepId);
    pathProgress.lastUpdated = new Date().toISOString();
    
    allProgress[pathSlug] = pathProgress;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
    
    window.dispatchEvent(new CustomEvent('progressUpdated', { detail: { pathSlug } }));
  } catch (error) {
    console.error('Failed to update progress:', error);
  }
}

export function isStepCompleted(pathSlug: string, stepId: string): boolean {
  const progress = getPathProgress(pathSlug);
  return progress?.completedSteps.includes(stepId) || false;
}

export function getCompletionPercentage(pathSlug: string): number {
  const progress = getPathProgress(pathSlug);
  if (!progress || progress.totalSteps === 0) return 0;
  
  return Math.round((progress.completedSteps.length / progress.totalSteps) * 100);
}

export function isPathCompleted(pathSlug: string): boolean {
  const progress = getPathProgress(pathSlug);
  if (!progress) return false;
  
  return progress.completedSteps.length === progress.totalSteps && progress.totalSteps > 0;
}
