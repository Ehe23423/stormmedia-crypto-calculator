import type { DealParams } from '../model/DealModel';

interface Props {
    params: DealParams;
    updateParam: (key: keyof DealParams, val: any) => void;
}

export function DealSimulator({ params, updateParam }: Props) {
    onChange = { e => updateParam('R', Math.max(0, Number(e.target.value))) }
    className = "glass-input"
        />
                </div >
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
            </div >
        </div >
    );
}
