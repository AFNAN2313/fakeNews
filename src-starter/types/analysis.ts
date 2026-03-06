export interface Profile {
    id: string;
    username: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface Analysis {
    id: string;
    user_id: string;
    article_text: string;
    article_title?: string;
    word_count: number;
    scan_mode: 'single' | 'all';
    selected_model?: string;
    primary_prediction: 'REAL' | 'FAKE';
    primary_confidence: number;
    majority_vote?: 'REAL' | 'FAKE';
    votes_real?: number;
    votes_fake?: number;
    bilstm_verdict?: 'REAL' | 'FAKE';
    response_ms: number;
    created_at: string;
}

export interface ModelResult {
    id: string;
    analysis_id: string;
    model_name: string;
    prediction: 'REAL' | 'FAKE';
    confidence: number;
}

export interface ExplanationFeature {
    word: string;
    weight: number;
    direction: 'REAL' | 'FAKE';
}

export interface Explanation {
    id: string;
    analysis_id: string;
    model_used: string; // always 'bilstm'
    features: ExplanationFeature[];
    num_features: number;
    response_ms: number;
}

export interface UserStats {
    user_id: string;
    total_analyses: number;
    fake_count: number;
    real_count: number;
    avg_confidence: number;
    full_scan_count: number;
    single_scan_count: number;
    last_analysis_at: string | null;
}
