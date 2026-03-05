import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { DealPitchMode } from './DealPitchMode';
import { calculateDealMetrics } from '../model/DealModel';

export function ShareLinkView() {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [scenarioData, setScenarioData] = useState<any>(null);
    const [metrics, setMetrics] = useState<any>(null);

    useEffect(() => {
        if (!token) {
            setError('Invalid share link.');
            setLoading(false);
            return;
        }

        const fetchScenario = async () => {
            try {
                // Fetch the share link metadata
                const { data: linkData, error: linkError } = await supabase
                    .from('share_links')
                    .select('*, scenarios(*)')
                    .eq('token', token)
                    .single();

                if (linkError || !linkData) {
                    throw new Error('Share link not found or expired.');
                }

                if (linkData.expires_at && new Date(linkData.expires_at) < new Date()) {
                    throw new Error('This share link has expired.');
                }

                // For this implementation, we are focusing on read-only Pitch Mode access
                const stateJson = linkData.scenarios.state_json;
                setScenarioData(stateJson);

                // Recalculate metrics on the client for the Pitch Mode view
                const calculatedMetrics = calculateDealMetrics({ ...stateJson });
                setMetrics(calculatedMetrics);

            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchScenario();
    }, [token]);

    if (loading) return <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading scenario...</div>;

    if (error) return (
        <div style={{ padding: '48px', textAlign: 'center' }}>
            <div style={{ display: 'inline-block', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent-rose)', padding: '24px', borderRadius: '12px', border: '1px solid var(--accent-rose)' }}>
                <h2 style={{ margin: '0 0 12px 0' }}>Access Denied</h2>
                <p style={{ margin: 0 }}>{error}</p>
                <button onClick={() => navigate('/')} style={{ marginTop: '24px', background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-light)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>Return Home</button>
            </div>
        </div>
    );

    if (!scenarioData || !metrics) return null;

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <span style={{ background: 'var(--accent-blue)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '12px' }}>Partner Pitch View</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Read-Only Mode</span>
                </div>
                <button onClick={() => navigate('/')} style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-light)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>Open Builder</button>
            </div>

            {/* The Pitch Mode component inherently hides the internal margin/risk metrics */}
            <DealPitchMode params={scenarioData} metrics={metrics} />
        </div>
    );
}
