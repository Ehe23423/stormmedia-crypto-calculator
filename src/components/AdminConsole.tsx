import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export function AdminConsole({ session, role }: { session: any, role: string }) {
    const [profiles, setProfiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (role === 'admin') {
            fetchProfiles();
        }
    }, [role]);

    const fetchProfiles = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
        if (!error && data) {
            setProfiles(data);
        }
        setLoading(false);
    };

    const updateRole = async (userId: string, newRole: string) => {
        const { error } = await supabase.from('profiles').update({ role: newRole }).eq('user_id', userId);
        if (!error) {
            setProfiles(profiles.map(p => p.user_id === userId ? { ...p, role: newRole } : p));
            alert('Role updated successfully.');
        } else {
            alert('Error updating role: ' + error.message);
        }
    };

    if (role !== 'admin') {
        return (
            <div style={{ padding: '48px', textAlign: 'center', color: 'var(--accent-rose)', border: '1px solid var(--accent-rose)', borderRadius: '12px', background: 'rgba(244, 63, 94, 0.1)' }}>
                <h3>Access Denied</h3>
                <p>This console is strictly limited to Szymon & Platform Administrators.</p>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-panel" style={{ borderTop: '4px solid var(--accent-blue)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ margin: 0 }}>🛡️ Admin Control Center</h3>
                    <button onClick={fetchProfiles} style={{ background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-light)', padding: '6px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>↻ Refresh Data</button>
                </div>

                {loading ? (
                    <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading platform identities...</div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 'normal' }}>Email</th>
                                    <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 'normal' }}>Joined</th>
                                    <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 'normal' }}>Role Assignment</th>
                                    <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 'normal', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {profiles.map(p => (
                                    <tr key={p.user_id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '12px', color: 'var(--text-primary)' }}>{p.email}</td>
                                        <td style={{ padding: '12px', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{new Date(p.created_at).toLocaleDateString()}</td>
                                        <td style={{ padding: '12px' }}>
                                            <select
                                                value={p.role}
                                                onChange={(e) => updateRole(p.user_id, e.target.value)}
                                                style={{ background: 'var(--bg-dark)', color: 'var(--text-primary)', border: '1px solid var(--border-light)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}
                                            >
                                                <option value="admin">Administrator (Szymon)</option>
                                                <option value="agency">Agency (Batch View)</option>
                                                <option value="hunter">Hunter (Ladder View)</option>
                                                <option value="partner">Partner (Pitch View)</option>
                                            </select>
                                        </td>
                                        <td style={{ padding: '12px', textAlign: 'right' }}>
                                            {/* Future Expansion: Suspend / Delete / Force Logout */}
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{p.user_id === session?.user?.id ? '(You)' : ''}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="glass-panel" style={{ opacity: 0.5 }}>
                <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-secondary)' }}>✉️ Invite Protocol (Coming Soon)</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Automated Supabase Email Invitations will be wired to this module via Edge Functions.</p>
            </div>
        </div>
    );
}
