"use client";

import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export interface DropdownOption {
  value: string;
  label: string;
}

interface StyledDropdownProps {
  id: string;
  value: string;
  options: DropdownOption[];
  onChange?: (value: string) => void;
  disabled?: boolean;
  widthClass?: string;
  ariaLabelledBy?: string;
}

export function StyledDropdown({ id, value, options, onChange, disabled = false, widthClass = "w-full", ariaLabelledBy }: StyledDropdownProps) {
  const [open, setOpen] = useState(false);
  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === value));
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (open) optionRefs.current[activeIndex]?.focus();
  }, [open, activeIndex]);

  function closeAndRestoreFocus() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function moveHighlight(index: number) {
    const nextIndex = Math.min(Math.max(index, 0), options.length - 1);
    setActiveIndex(nextIndex);
    optionRefs.current[nextIndex]?.focus();
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if ((event.key === "ArrowDown" || event.key === "ArrowUp") && !open) {
      event.preventDefault();
      setActiveIndex(selectedIndex);
      setOpen(true);
    }
  }

  function handleOptionKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowDown") { event.preventDefault(); moveHighlight(index + 1); }
    else if (event.key === "ArrowUp") { event.preventDefault(); moveHighlight(index - 1); }
    else if (event.key === "Home") { event.preventDefault(); moveHighlight(0); }
    else if (event.key === "End") { event.preventDefault(); moveHighlight(options.length - 1); }
    else if (event.key === "Escape") { event.preventDefault(); closeAndRestoreFocus(); }
    else if (event.key === "Tab") setOpen(false);
  }

  return (
    <div className={`relative ${widthClass}`} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
    }}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? `${id}-options` : undefined}
        aria-labelledby={ariaLabelledBy}
        onKeyDown={handleTriggerKeyDown}
        onClick={() => {
          if (disabled) return;
          if (!open) setActiveIndex(selectedIndex);
          setOpen((current) => !current);
        }}
        className="flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-left text-sm font-medium text-slate-900 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-500 disabled:shadow-none"
      >
        <span className="truncate">{selected?.label ?? "Choose an option"}</span>
        <ChevronDown aria-hidden="true" className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && !disabled && (
        <div id={`${id}-options`} role="listbox" aria-labelledby={id} className="absolute left-0 right-0 top-full z-50 mt-2 max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/15 ring-1 ring-black/5">
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;
            return (
              <button
                ref={(element) => { optionRefs.current[index] = element; }}
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                tabIndex={-1}
                onKeyDown={(event) => handleOptionKeyDown(event, index)}
                onClick={() => { onChange?.(option.value); setOpen(false); triggerRef.current?.focus(); }}
                className={`flex min-h-9 w-full items-center justify-between gap-2 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors ${isSelected ? "bg-teal-50 font-semibold text-teal-900" : isActive ? "bg-slate-100 text-slate-950" : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"}`}
              >
                <span>{option.label}</span>
                {isSelected && <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-teal-800" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

