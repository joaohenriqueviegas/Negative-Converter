import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Settings, Keyboard, X } from 'lucide-react';

const DEFAULT_SHORTCUTS = {
    brightness: { inc1: 'b', inc5: 'B', dec1: 'v', dec5: 'V' },
    exposure: { inc1: 'e', inc5: 'E', dec1: 'd', dec5: 'D' },
    highlights: { inc1: 'h', inc5: 'H', dec1: 'g', dec5: 'G' },
    shadows: { inc1: 's', inc5: 'S', dec1: 'a', dec5: 'A' },
    red: { inc1: 'r', inc5: 'R', dec1: 'f', dec5: 'F' },
    green: { inc1: 't', inc5: 'T', dec1: 'y', dec5: 'Y' },
    blue: { inc1: 'u', inc5: 'U', dec1: 'j', dec5: 'J' },
    navigation: { prev: 'ArrowLeft', next: 'ArrowRight' },
};

const ShortcutRow = ({ label, shortcuts, onShortcutChange, controlKey }) => {
    const [editing, setEditing] = useState(null);

    const handleKeyDown = (e, type) => {
        e.preventDefault();
        const key = e.key;
        if (key === 'Escape') {
            setEditing(null);
            return;
        }
        if (key === 'Backspace' || key === 'Delete') {
            onShortcutChange(controlKey, type, '');
            setEditing(null);
            return;
        }
        if (key.length === 1) {
            onShortcutChange(controlKey, type, key);
            setEditing(null);
        }
    };

    return (
        <div className="grid grid-cols-5 gap-3 items-center py-2">
            <div className="text-sm text-slate-300 font-medium">{label}</div>
            {['dec5', 'dec1', 'inc1', 'inc5'].map((type) => (
                <div key={type} className="relative">
                    {editing === type ? (
                        <Input
                            autoFocus
                            value=""
                            placeholder="Press key..."
                            onKeyDown={(e) => handleKeyDown(e, type)}
                            onBlur={() => setEditing(null)}
                            className="h-8 bg-slate-800 border-blue-500 text-center font-mono"
                        />
                    ) : (
                        <button
                            onClick={() => setEditing(type)}
                            className="w-full h-8 px-2 rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors"
                        >
                            {shortcuts[type] || '—'}
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default function KeyboardSettings({ open, onClose, shortcuts, onShortcutsChange }) {
    const [localShortcuts, setLocalShortcuts] = useState(shortcuts || DEFAULT_SHORTCUTS);

    useEffect(() => {
        if (open) {
            setLocalShortcuts(shortcuts || DEFAULT_SHORTCUTS);
        }
    }, [open, shortcuts]);

    const handleShortcutChange = (control, type, key) => {
        setLocalShortcuts(prev => ({
            ...prev,
            [control]: {
                ...prev[control],
                [type]: key
            }
        }));
    };

    const handleSave = () => {
        onShortcutsChange(localShortcuts);
        onClose();
    };

    const handleReset = () => {
        setLocalShortcuts(DEFAULT_SHORTCUTS);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl bg-slate-900 border-slate-800 text-white max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Keyboard className="w-5 h-5" />
                        Keyboard Shortcuts
                    </DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Click on any shortcut to change it. Press the key you want to assign.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-5 gap-3 px-2 pb-2 border-b border-slate-800">
                        <div className="text-xs text-slate-500 font-medium">Control</div>
                        <div className="text-xs text-slate-500 font-medium text-center">-5%</div>
                        <div className="text-xs text-slate-500 font-medium text-center">-1%</div>
                        <div className="text-xs text-slate-500 font-medium text-center">+1%</div>
                        <div className="text-xs text-slate-500 font-medium text-center">+5%</div>
                    </div>

                    <div className="space-y-1">
                        <div className="text-xs text-slate-500 uppercase tracking-wide px-2 py-1">Tone</div>
                        <ShortcutRow
                            label="Brightness"
                            shortcuts={localShortcuts.brightness}
                            onShortcutChange={handleShortcutChange}
                            controlKey="brightness"
                        />
                        <ShortcutRow
                            label="Exposure"
                            shortcuts={localShortcuts.exposure}
                            onShortcutChange={handleShortcutChange}
                            controlKey="exposure"
                        />
                        <ShortcutRow
                            label="Highlights"
                            shortcuts={localShortcuts.highlights}
                            onShortcutChange={handleShortcutChange}
                            controlKey="highlights"
                        />
                        <ShortcutRow
                            label="Shadows"
                            shortcuts={localShortcuts.shadows}
                            onShortcutChange={handleShortcutChange}
                            controlKey="shadows"
                        />
                    </div>

                    <div className="space-y-1">
                        <div className="text-xs text-slate-500 uppercase tracking-wide px-2 py-1">Color Balance</div>
                        <ShortcutRow
                            label="Red"
                            shortcuts={localShortcuts.red}
                            onShortcutChange={handleShortcutChange}
                            controlKey="red"
                        />
                        <ShortcutRow
                            label="Green"
                            shortcuts={localShortcuts.green}
                            onShortcutChange={handleShortcutChange}
                            controlKey="green"
                        />
                        <ShortcutRow
                            label="Blue"
                            shortcuts={localShortcuts.blue}
                            onShortcutChange={handleShortcutChange}
                            controlKey="blue"
                        />
                    </div>

                    <div className="space-y-1">
                        <div className="text-xs text-slate-500 uppercase tracking-wide px-2 py-1">Navigation</div>
                        <div className="grid grid-cols-3 gap-3 items-center py-2">
                            <div className="text-sm text-slate-300 font-medium">Previous/Next Image</div>
                            <div className="relative">
                                {localShortcuts.navigation?.prev && (
                                    <div className="h-8 px-2 rounded border border-slate-700 bg-slate-800 text-xs font-mono text-slate-300 flex items-center justify-center">
                                        {localShortcuts.navigation.prev}
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                {localShortcuts.navigation?.next && (
                                    <div className="h-8 px-2 rounded border border-slate-700 bg-slate-800 text-xs font-mono text-slate-300 flex items-center justify-center">
                                        {localShortcuts.navigation.next}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex items-center justify-between">
                    <Button
                        variant="ghost"
                        onClick={handleReset}
                        className="text-slate-400 hover:text-white"
                    >
                        Reset to Defaults
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={onClose} className="bg-slate-800 border-slate-700">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                            Save Shortcuts
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}