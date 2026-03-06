/**
 * analysisService — all Supabase database operations for analyses, model_results, explanations
 */

import { supabase } from '../config/supabase';
import type { Analysis, ModelResult, Explanation, UserStats, ExplanationFeature } from '../types/analysis';

export const analysisService = {
  /** Insert a new analysis row and return it with the generated ID */
  async saveAnalysis(data: Omit<Analysis, 'id' | 'created_at'>): Promise<Analysis> {
    const id = crypto.randomUUID();

    // DIAGNOSTIC — open browser DevTools console to read these
    const { data: { session } } = await supabase.auth.getSession();
    console.log('[saveAnalysis] session user id :', session?.user?.id ?? 'NO SESSION');
    console.log('[saveAnalysis] inserting user_id:', data.user_id);
    console.log('[saveAnalysis] ids match        :', session?.user?.id === data.user_id);
    console.log('[saveAnalysis] sending insert...');

    const { error } = await supabase
      .from('analyses')
      .insert({ id, ...data });

    console.log('[saveAnalysis] insert returned  :', error ? `ERROR: ${error.message} (${error.code})` : 'OK');

    if (error) throw new Error(`${error.message} [code: ${error.code}]`);
    return { id, ...data, created_at: new Date().toISOString() } as Analysis;
  },

  /** Bulk insert model result rows (1 for single mode, up to 6 for all mode) */
  async saveModelResults(results: Omit<ModelResult, 'id' | 'created_at'>[]): Promise<void> {
    const { error } = await supabase.from('model_results').insert(results);
    if (error) throw error;
  },

  /** Insert a LIME explanation for a given analysis */
  async saveExplanation(data: {
    analysis_id: string;
    model_used: string;
    features: ExplanationFeature[];
    num_features: number;
    response_ms: number;
  }): Promise<void> {
    const { error } = await supabase.from('explanations').insert(data);
    if (error) throw error;
  },

  /** Fetch aggregated stats for a user from the user_stats view */
  async getUserStats(userId: string): Promise<UserStats | null> {
    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    if (error) return null;
    return data as UserStats | null;
  },

  /** Fetch N most recent analyses for a user */
  async getRecentAnalyses(userId: string, limit = 5): Promise<Analysis[]> {
    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return (data || []) as Analysis[];
  },

  /** Fetch a single analysis with its model results and explanation */
  async getAnalysisById(id: string): Promise<{
    analysis: Analysis;
    modelResults: ModelResult[];
    explanation: Explanation | null;
  } | null> {
    const { data: analysis, error: analysisError } = await supabase
      .from('analyses')
      .select('*')
      .eq('id', id)
      .single();

    if (analysisError || !analysis) return null;

    const { data: modelResults } = await supabase
      .from('model_results')
      .select('*')
      .eq('analysis_id', id)
      .order('confidence', { ascending: false });

    const { data: explanation } = await supabase
      .from('explanations')
      .select('*')
      .eq('analysis_id', id)
      .maybeSingle();

    return {
      analysis: analysis as Analysis,
      modelResults: (modelResults || []) as ModelResult[],
      explanation: explanation as Explanation | null,
    };
  },

  /** Fetch all analyses for a user with optional verdict filter */
  async getUserAnalyses(userId: string, filter?: 'REAL' | 'FAKE'): Promise<Analysis[]> {
    let query = supabase
      .from('analyses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (filter) {
      query = query.eq('primary_prediction', filter);
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data || []) as Analysis[];
  },
};
