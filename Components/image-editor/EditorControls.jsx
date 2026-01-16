import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus, RotateCcw } from 'lucide-react';
import { cn } from "@/lib/utils";

const ControlGroup = ({ label, value, onChange, onReset, shortcuts }) => {
    const handleIncrement = (amount) => {
        onChange(Math.min(200, Math.max(-200, value + amount)));
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-300">{label}</label>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-mono min-w-[3rem] text-right">
                        {value > 0 ? '+' : ''}{value}%
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-slate-500 hover:text-white"
                        onClick={onReset}
                        title="Reset to 0"
                    >
                        <RotateCcw className="w-3 h-3" />
                    </Button>
                </div>
            </div>
            
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleIncrement(-5)}
                    className="flex-1 bg-slate-800 border-slate-700 hover:bg-slate-700 text-white"
                    title={shortcuts?.dec5 ? `Shortcut: ${shortcuts.dec5}` : ''}
                >
                    <Minus className="w-3 h-3 mr-1" />
                    5%
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleIncrement(-1)}
                    className="flex-1 bg-slate-800 border-slate-700 hover:bg-slate-700 text-white"
                    title={shortcuts?.dec1 ? `Shortcut: ${shortcuts.dec1}` : ''}
                >
                    <Minus className="w-3 h-3 mr-1" />
                    1%
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleIncrement(1)}
                    className="flex-1 bg-slate-800 border-slate-700 hover:bg-slate-700 text-white"
                    title={shortcuts?.inc1 ? `Shortcut: ${shortcuts.inc1}` : ''}
                >
                    <Plus className="w-3 h-3 mr-1" />
                    1%
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleIncrement(5)}
                    className="flex-1 bg-slate-800 border-slate-700 hover:bg-slate-700 text-white"
                    title={shortcuts?.inc5 ? `Shortcut: ${shortcuts.inc5}` : ''}
                >
                    <Plus className="w-3 h-3 mr-1" />
                    5%
                </Button>
            </div>
        </div>
    );
};

export default function EditorControls({ adjustments, onAdjustmentChange, shortcuts }) {
    const resetAll = () => {
        Object.keys(adjustments).forEach(key => {
            onAdjustmentChange(key, 0);
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">Manual Adjustments</h3>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetAll}
                    className="text-xs text-slate-500 hover:text-white"
                >
                    Reset All
                </Button>
            </div>

            <div className="space-y-6">
                {/* Tone Controls */}
                <Card className="bg-slate-900/50 border-slate-800 p-4 space-y-4">
                    <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wide">Tone</h4>
                    
                    <ControlGroup
                        label="Brightness"
                        value={adjustments.brightness}
                        onChange={(val) => onAdjustmentChange('brightness', val)}
                        onReset={() => onAdjustmentChange('brightness', 0)}
                        shortcuts={shortcuts?.brightness}
                    />
                    
                    <ControlGroup
                        label="Exposure"
                        value={adjustments.exposure}
                        onChange={(val) => onAdjustmentChange('exposure', val)}
                        onReset={() => onAdjustmentChange('exposure', 0)}
                        shortcuts={shortcuts?.exposure}
                    />
                    
                    <ControlGroup
                        label="Highlights"
                        value={adjustments.highlights}
                        onChange={(val) => onAdjustmentChange('highlights', val)}
                        onReset={() => onAdjustmentChange('highlights', 0)}
                        shortcuts={shortcuts?.highlights}
                    />
                    
                    <ControlGroup
                        label="Shadows"
                        value={adjustments.shadows}
                        onChange={(val) => onAdjustmentChange('shadows', val)}
                        onReset={() => onAdjustmentChange('shadows', 0)}
                        shortcuts={shortcuts?.shadows}
                    />
                </Card>

                {/* Color Balance */}
                <Card className="bg-slate-900/50 border-slate-800 p-4 space-y-4">
                    <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wide">Color Balance</h4>
                    
                    <ControlGroup
                        label="Red"
                        value={adjustments.red}
                        onChange={(val) => onAdjustmentChange('red', val)}
                        onReset={() => onAdjustmentChange('red', 0)}
                        shortcuts={shortcuts?.red}
                    />
                    
                    <ControlGroup
                        label="Green"
                        value={adjustments.green}
                        onChange={(val) => onAdjustmentChange('green', val)}
                        onReset={() => onAdjustmentChange('green', 0)}
                        shortcuts={shortcuts?.green}
                    />
                    
                    <ControlGroup
                        label="Blue"
                        value={adjustments.blue}
                        onChange={(val) => onAdjustmentChange('blue', val)}
                        onReset={() => onAdjustmentChange('blue', 0)}
                        shortcuts={shortcuts?.blue}
                    />
                </Card>
            </div>
        </div>
    );
}