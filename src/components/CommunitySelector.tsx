import type { DealParams } from '../model/DealModel';

interface Props {
    applyParams: (newParams: Partial<DealParams>) => void;
}

export function CommunitySelector({ applyParams }: Props) {
    const applyType = (type: string) => {
        switch (type) {
            case 'SIGNAL_GROUP':
                applyParams({ V: 2_000_000, F: 0.0005, P: 0.40, S: 0, R: 200, useTiers: false, useMilestones: false });
                break;
            case 'TRADING_COMMUNITY':
                applyParams({ V: 10_000_000, F: 0.0005, P: 0.55, S: 0, R: 1000, useTiers: false, useMilestones: false });
                break;
            case 'WHALE':
                applyParams({ V: 50_000_000, F: 0.00028, P: 0.0, S: 0, R: 0, useTiers: false, useMilestones: false });
                break;
            case 'INFLUENCER':
                applyParams({ V: 5_000_000, F: 0.00035, P: 0.35, S: 0, R: 500, useTiers: true, tiers: [{ threshold: 15_000_000, s: 0.45 }], useMilestones: false });
                break;
            case 'STREAMER':
                applyParams({ V: 8_000_000, F: 0.00035, P: 0.40, S: 0, R: 0, bonusPer1M: 50, useTiers: false, useMilestones: false });
                break;
            case 'API_DESK':
                applyParams({ V: 20_000_000, F: 0.00020, P: 0.20, S: 0, R: 0, useTiers: false, useMilestones: false });
                break;
        }
    };

    return (
        <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-light)', marginBottom: '16px' }}>
            <h4 style={{ marginBottom: '12px', color: 'var(--text-primary)', fontSize: '0.9rem' }}>Community Type Selector</h4>
            <select onChange={(e) => applyType(e.target.value)} defaultValue="" style={{ marginBottom: '8px' }}>
                <option value="" disabled>Select Partner Type...</option>
                <option value="SIGNAL_GROUP">Signal Group (1M - 5M)</option>
                <option value="TRADING_COMMUNITY">Trading Community (5M - 20M)</option>
                <option value="WHALE">Whale Trader (20M - 100M+)</option>
                <option value="INFLUENCER">Influencer (Social Media)</option>
                <option value="STREAMER">Streamer (Twitch/Kick)</option>
                <option value="API_DESK">API Trading Desk</option>
            </select>
            <small style={{ color: 'var(--text-secondary)' }}>Auto-fills default optimal parameters for this partner profile.</small>
        </div>
    );
}
