
export interface AuthState {
    token: string | null;
}

export interface GlobalStore {
    auth: AuthState;
}

// Re-export types from store for convenience
export type { RootState, AppDispatch } from './store';