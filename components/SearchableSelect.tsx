'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { CaretDown, MagnifyingGlass, Check } from '@phosphor-icons/react';

interface SearchableSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  allowCustom?: boolean;
}

export default function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = 'Rechercher...',
  label,
  error,
  disabled = false,
  allowCustom = false,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = search
    ? options.filter(opt =>
        opt.toLowerCase().includes(search.toLowerCase())
      )
    : options;

  const handleSelect = useCallback((val: string) => {
    onChange(val);
    setSearch('');
    setIsOpen(false);
    setHighlightedIndex(-1);
  }, [onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setHighlightedIndex(-1);
    if (!isOpen) setIsOpen(true);
    if (allowCustom) {
      onChange(e.target.value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev =>
        prev < filtered.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev =>
        prev > 0 ? prev - 1 : filtered.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && filtered[highlightedIndex]) {
        handleSelect(filtered[highlightedIndex]);
      } else if (filtered.length === 1) {
        handleSelect(filtered[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSearch('');
    }
  };

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[data-option]');
      items[highlightedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const displayValue = value || '';

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div ref={containerRef} className="relative">
        {/* Trigger button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            if (!disabled) setIsOpen(!isOpen);
          }}
          className={`w-full h-12 px-4 rounded-xl border bg-white text-left flex items-center justify-between gap-2 transition-all outline-none ${
            isOpen
              ? 'border-brand-red/40 ring-2 ring-brand-red/10'
              : error
              ? 'border-red-300'
              : 'border-neutral-200 hover:border-neutral-300'
          } ${disabled ? 'opacity-50 cursor-not-allowed bg-neutral-50' : ''}`}
        >
          <span className={displayValue ? 'text-brand-navy font-medium' : 'text-neutral-400'}>
            {displayValue || placeholder}
          </span>
          <CaretDown
            size={16}
            weight="bold"
            className={`text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-xl shadow-xl z-50 overflow-hidden animate-fadeIn">
            {/* Search input */}
            <div className="p-2 border-b border-neutral-100">
              <div className="relative">
                <MagnifyingGlass
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                  className="w-full h-10 pl-9 pr-4 rounded-lg border border-neutral-100 bg-neutral-50 text-sm text-brand-navy focus:border-brand-red/30 focus:bg-white outline-none transition-all placeholder:text-neutral-400"
                />
              </div>
            </div>

            {/* Options list */}
            <div ref={listRef} className="max-h-48 overflow-y-auto overscroll-contain">
              {filtered.length === 0 ? (
                <div className="px-4 py-3 text-sm text-neutral-400 text-center">
                  Aucun résultat
                </div>
              ) : (
                filtered.map((opt, idx) => (
                  <button
                    key={opt}
                    type="button"
                    data-option
                    onClick={() => handleSelect(opt)}
                    className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors ${
                      idx === highlightedIndex
                        ? 'bg-brand-red/5 text-brand-red'
                        : opt === value
                        ? 'bg-neutral-50 text-brand-navy font-medium'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{opt}</span>
                    {opt === value && (
                      <Check size={16} weight="bold" className="text-brand-red" />
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-brand-red font-semibold">{error}</p>}
    </div>
  );
}
