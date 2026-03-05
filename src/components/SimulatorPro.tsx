import { DealParams } from '../model/DealModel';

interface Props {
    params: DealParams;
    updateParam: (key: keyof DealParams, val: any) => void;
}

export function DealSimulator({ params, updateParam }: Props) {
    return (
        <div className="variables-grid" style={{ gap: '20px' }}>
            <div className="var-block">
                <label className="input-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Monthly Volume (USD)</span>
                    <span style={{ color: 'var(--accent-blue)', fontWeight: 800 }}>${(params.V).toLocaleString()}</span>
                </label>
                <input
                    type="number"
                    value={params.V}
                    onChange={e => updateParam('V', Math.max(0, Number(e.target.value)))}
                    className="glass-input"
                    style={{ marginBottom: '8px' }}
                />
                <input
                    className="styled-range range-blue"
                    type="range"
                    min={0}
                    max={100000000}
                    step={1000000}
                    value={params.V}
                    onChange={e => updateParam('V', Number(e.target.value))}
                />
            </div>

            <div className="var-block">
                <label className="input-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Blended Fee (%)</span>
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>{params.F}%</span>
                </label>
                <input
                    className="styled-range range-cyan"
                    type="range"
                    min={0.01}
                    max={0.10}
                    step={0.001}
                    value={params.F}
                    onChange={e => updateParam('F', Number(e.target.value))}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="var-block">
                    <label className="input-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Partner Share (%)</span>
                        <span style={{ color: 'var(--accent-emerald)', fontWeight: 800 }}>{params.P}%</span>
                    </label>
                    <input
                        className="styled-range range-emerald"
                        type="range"
                        min={0}
                        max={80}
                        step={1}
                        value={params.P}
                        onChange={e => updateParam('P', Number(e.target.value))}
                    />
                </div>
                <div className="var-block">
                    <label className="input-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Sub Split (%)</span>
                        <span style={{ color: 'var(--accent-purple)', fontWeight: 800 }}>{params.S}%</span>
                    </label>
                    <input
                        className="styled-range range-purple"
                        type="range"
                        min={0}
                        max={50}
                        step={1}
                        value={params.S}
                        onChange={e => updateParam('S', Number(e.target.value))}
                    />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <div className="var-block">
                    <label className="input-label">Retainer</label>
                    <input
                        type="number"
                        value={params.R}
                        onChange={e => updateParam('R', Math.max(0, Number(e.target.value)))}
                        className="glass-input"
                    />
                </div>
                <div className="var-block">
                    <label className="input-label">Op Cost</label>
                    <input
                        type="number"
                        value={params.I}
                        onChange={e => updateParam('I', Math.max(0, Number(e.target.value)))}
                        className="glass-input"
                    />
                </div>
                <div className="var-block">
                    <label className="input-label">Bonus/1M</label>
                    <input
                        type="number"
                        value={params.B}
                        onChange={e => updateParam('B', Math.max(0, Number(e.target.value)))}
                        className="glass-input"
                    />
                </div>
            </div>
        </div>
    );
}
