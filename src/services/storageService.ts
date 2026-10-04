import { SavedProblemRecord, SavedApplicationRecord } from '../types';

const PROBLEMS_KEY = 'alps_problems_v1';
const APPLICATIONS_KEY = 'alps_applications_v1';
const SAVED_SOLUTIONS_KEY = 'alps_saved_solutions_v1';
const PREFERENCES_KEY = 'alps_user_preferences_v1';

export function getSavedProblems(): SavedProblemRecord[] {
  try {
    const raw = localStorage.getItem(PROBLEMS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveProblem(problem: SavedProblemRecord): void {
  try {
    const list = getSavedProblems();
    const existingIndex = list.findIndex(p => p.id === problem.id);
    if (existingIndex >= 0) {
      list[existingIndex] = problem;
    } else {
      list.unshift(problem);
    }
    localStorage.setItem(PROBLEMS_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save problem:', e);
  }
}

export function updateProblemStep(problemId: string, stepNumber: number, completed: boolean): void {
  const list = getSavedProblems();
  const problem = list.find(p => p.id === problemId);
  if (!problem) return;

  const stepsSet = new Set(problem.completedSteps || []);
  if (completed) {
    stepsSet.add(stepNumber);
  } else {
    stepsSet.delete(stepNumber);
  }
  problem.completedSteps = Array.from(stepsSet);

  const totalSteps = problem.analysis?.recommended_steps?.length || 1;
  if (problem.completedSteps.length === totalSteps) {
    problem.status = 'Completed';
  } else if (problem.completedSteps.length > 0) {
    problem.status = 'In Progress';
  }

  saveProblem(problem);
}

export function updateProblemDoc(problemId: string, docName: string, completed: boolean): void {
  const list = getSavedProblems();
  const problem = list.find(p => p.id === problemId);
  if (!problem) return;

  const docsSet = new Set(problem.completedDocs || []);
  if (completed) {
    docsSet.add(docName);
  } else {
    docsSet.delete(docName);
  }
  problem.completedDocs = Array.from(docsSet);
  saveProblem(problem);
}

export function deleteProblem(problemId: string): void {
  const list = getSavedProblems().filter(p => p.id !== problemId);
  localStorage.setItem(PROBLEMS_KEY, JSON.stringify(list));
}

// Applications
export function getSavedApplications(): SavedApplicationRecord[] {
  try {
    const raw = localStorage.getItem(APPLICATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveApplication(app: SavedApplicationRecord): void {
  try {
    const list = getSavedApplications();
    const idx = list.findIndex(a => a.id === app.id);
    if (idx >= 0) {
      list[idx] = app;
    } else {
      list.unshift(app);
    }
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save application:', e);
  }
}

export function deleteApplication(appId: string): void {
  const list = getSavedApplications().filter(a => a.id !== appId);
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(list));
}

// Bookmarked Solutions
export function getBookmarkedSolutionIds(): string[] {
  try {
    const raw = localStorage.getItem(SAVED_SOLUTIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function toggleBookmarkSolution(problemId: string): boolean {
  const list = getBookmarkedSolutionIds();
  const idx = list.indexOf(problemId);
  let isBookmarked = false;
  if (idx >= 0) {
    list.splice(idx, 1);
    isBookmarked = false;
  } else {
    list.push(problemId);
    isBookmarked = true;
  }
  localStorage.setItem(SAVED_SOLUTIONS_KEY, JSON.stringify(list));
  return isBookmarked;
}

// User Preferences (e.g. demo mode preference)
export function getUserPreferences(): { demoMode: boolean } {
  try {
    const raw = localStorage.getItem(PREFERENCES_KEY);
    return raw ? JSON.parse(raw) : { demoMode: false };
  } catch (e) {
    return { demoMode: false };
  }
}

export function setUserPreferences(prefs: { demoMode: boolean }): void {
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
  } catch (e) {
    // ignore
  }
}
