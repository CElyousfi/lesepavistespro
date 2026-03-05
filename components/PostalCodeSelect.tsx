'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MapPin, MagnifyingGlass, Check } from '@phosphor-icons/react';

interface PostalCodeEntry {
  code: string;
  city: string;
  department: string;
}

interface PostalCodeSelectProps {
  value: string;
  cityValue: string;
  onSelect: (code: string, city: string) => void;
  error?: string;
}

export default function PostalCodeSelect({
  value,
  cityValue,
  onSelect,
  error,
}: PostalCodeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<PostalCodeEntry[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Debounced search via API route
  useEffect(() => {
    if (!search || search.length < 2) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetch(`/api/postal-codes?q=${encodeURIComponent(search)}&limit=40`, { signal: controller.signal })
        .then(res => res.json())
        .then((found: PostalCodeEntry[]) => {
          setResults(found);
          setHighlightedIndex(-1);
        })
        .catch(() => {});
    }, 200);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search]);

  const handleSelect = useCallback((entry: PostalCodeEntry) => {
    onSelect(entry.code, entry.city);
    setSearch('');
    setResults([]);
    setIsOpen(false);
    setHighlightedIndex(-1);
  }, [onSelect]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev =>
        prev < results.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev =>
        prev > 0 ? prev - 1 : results.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && results[highlightedIndex]) {
        handleSelect(results[highlightedIndex]);
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

  const hasSelection = value && cityValue;

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
        Code Postal & Ville
      </label>
      <div ref={containerRef} className="relative">
        {/* Selected value display / trigger */}
        {hasSelection && !isOpen ? (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-full h-12 px-4 rounded-xl border border-green-200 bg-green-50 text-left flex items-center gap-3 transition-all hover:border-green-300"
          >
            <MapPin size={18} weight="fill" className="text-green-600 shrink-0" />
            <span className="text-brand-navy font-medium truncate">
              {value} — {cityValue}
            </span>
          </button>
        ) : (
          <div className="relative">
            <MagnifyingGlass
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsOpen(true)}
              placeholder="Tapez un code postal ou nom de ville..."
              className={`w-full h-12 pl-10 pr-4 rounded-xl border bg-white text-brand-navy outline-none transition-all placeholder:text-neutral-400 ${
                isOpen
                  ? 'border-brand-red/40 ring-2 ring-brand-red/10'
                  : error
                  ? 'border-red-300'
                  : 'border-neutral-200'
              }`}
            />
          </div>
        )}

        {/* Dropdown results */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-xl shadow-xl z-50 overflow-hidden animate-fadeIn">
            {!search || search.length < 2 ? (
              <div className="px-4 py-4 text-sm text-neutral-400 text-center">
                <MagnifyingGlass size={20} className="mx-auto mb-2 text-neutral-300" />
                Tapez au moins 2 caractères
              </div>
            ) : results.length === 0 ? (
              <div className="px-4 py-4 text-sm text-neutral-400 text-center">
                Aucun résultat pour &quot;{search}&quot;
              </div>
            ) : (
              <div ref={listRef} className="max-h-52 overflow-y-auto overscroll-contain">
                {results.map((entry, idx) => {
                  const isSelected = entry.code === value && entry.city === cityValue;
                  return (
                    <button
                      key={`${entry.code}-${entry.city}-${idx}`}
                      type="button"
                      data-option
                      onClick={() => handleSelect(entry)}
                      className={`w-full px-4 py-2.5 text-left flex items-center gap-3 transition-colors ${
                        idx === highlightedIndex
                          ? 'bg-brand-red/5'
                          : isSelected
                          ? 'bg-green-50'
                          : 'hover:bg-neutral-50'
                      }`}
                    >
                      <MapPin
                        size={16}
                        weight={isSelected ? 'fill' : 'regular'}
                        className={isSelected ? 'text-green-600 shrink-0' : 'text-neutral-400 shrink-0'}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className={`font-mono font-bold text-sm ${
                            idx === highlightedIndex ? 'text-brand-red' : 'text-brand-navy'
                          }`}>
                            {entry.code}
                          </span>
                          <span className={`text-sm truncate ${
                            idx === highlightedIndex ? 'text-brand-red' : 'text-neutral-700'
                          }`}>
                            {entry.city}
                          </span>
                        </div>
                        <span className="text-xs text-neutral-400">{entry.department}</span>
                      </div>
                      {isSelected && (
                        <Check size={16} weight="bold" className="text-green-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-brand-red font-semibold">{error}</p>}
    </div>
  );
}
