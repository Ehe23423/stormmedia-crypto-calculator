import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export function MyScenarios({ session, onLoadScenario }: { session: any, onLoadScenario: (params: any) => void }) {
    const [scenarios, setScenarios] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session?.user) {
            fetchScenarios();
        }
    }, [session]);

    const fetchScenarios = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('scenarios')
            .select('*')
            .eq('owner_user_id', session.user.id)
            .order('created_at', { ascending: false });

        if (!error && data) {
            setScenarios(data);
        }
        setLoading(false);
    };

    const deleteScenario = async (id: string) => {
        if (!confirm('Are you sure you want to delete this scenario?')) return;

        await supabase.from('scenarios').delete().eq('id', id);
        fetchScenarios();
    };

    if (!session) return <div style={{ padding: '24px', color: 'var(--text-secondary)' }}>Please sign in to view your saved scenarios.</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>My Saved Scenarios</h3>
                <button onClick={fetchScenarios} style={{ background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-light)', padding: '4px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>↻ Refresh</button>
            </div>

            {loading ? (
                <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading scenarios...</div>
            ) : scenarios.length === 0 ? (
                <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-secondary)', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                    No scenarios saved yet. Use the "Share Setup" button to save your current configuration.
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                    {scenarios.map((s) => (
                        <div key={s.id} className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <strong style={{ color: 'var(--text-primary)' }}>{s.name}</strong>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{new Date(s.created_at).toLocaleDateString()}</span>
                            </div>

                            <div style={{ display: 'flex', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>Vol: {(s.state_json.V / 1000000).toFixed(0)}M</span>
                                <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>Fee: {(s.state_json.F * 100).toFixed(3)}%</span>
                                <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>Rev: {(s.state_json.P * 100).toFixed(0)}%</span>
                            </div>

                            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                                <button onClick={() => onLoadScenario(s.state_json)} style={{ flex: 1, background: 'var(--accent-blue)', color: 'white', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' }}>Load Data</button>
                                <button onClick={() => deleteScenario(s.id)} style={{ padding: '8px 12px', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent-rose)', border: '1px solid var(--accent-rose)', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' }}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
