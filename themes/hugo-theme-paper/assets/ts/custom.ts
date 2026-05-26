function initCodeCopy() {
    const blocks = document.querySelectorAll<HTMLDivElement>('.code-block');
    const COPY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
    const CHECK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

    blocks.forEach((block) => {
        const header = block.querySelector<HTMLDivElement>('.code-block__header');
        const code = block.querySelector('code');
        if (!header || !code) return;

        const btn = document.createElement('button');
        btn.className = 'code-block__copy';
        btn.innerHTML = COPY_ICON;
        btn.title = 'Copy';
        header.appendChild(btn);

        btn.addEventListener('click', () => {
            navigator.clipboard.writeText(code.textContent ?? '').then(() => {
                btn.innerHTML = CHECK_ICON;
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.innerHTML = COPY_ICON;
                    btn.classList.remove('copied');
                }, 2000);
            });
        });
    });
}

function initImageZoom() {
    if (typeof (window as any).mediumZoom === 'function') {
        (window as any).mediumZoom('.article-content img', {
            background: 'var(--body-background)',
            margin: 24,
        });
    }
}

/* ====================
   Search Modal
   ==================== */

interface SearchItem {
    title: string;
    date: string;
    permalink: string;
    content: string;
    image?: string;
}

function escapeHtml(str: string): string {
    return str.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] || c));
}

function escapeRegExp(s: string): string {
    return s.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}

function highlightMatches(text: string, keywords: string[]): string {
    if (!keywords.length) return escapeHtml(text);

    const regex = new RegExp(`(${keywords.map(escapeRegExp).join('|')})`, 'gi');
    return escapeHtml(text).replace(regex, '<mark>$1</mark>');
}

function truncatePreview(text: string, maxLen = 120): string {
    if (text.length <= maxLen) return escapeHtml(text);
    return escapeHtml(text.slice(0, maxLen)) + '...';
}

function formatDate(dateStr: string): string {
    try {
        const d = new Date(dateStr);
        return d.toISOString().slice(0, 10);
    } catch {
        return dateStr;
    }
}

function debounce(fn: () => void, ms: number): () => void {
    let timer: ReturnType<typeof setTimeout>;
    return () => { clearTimeout(timer); timer = setTimeout(fn, ms); };
}

function initSearchModal() {
    const overlay = document.getElementById('search-modal-overlay') as HTMLDivElement | null;
    const input = document.getElementById('search-modal-input') as HTMLInputElement | null;
    const resultsContainer = document.getElementById('search-modal-results') as HTMLDivElement | null;
    const trigger = document.getElementById('search-trigger') as HTMLButtonElement | null;

    if (!overlay || !input || !resultsContainer) return;

    let searchData: SearchItem[] | null = null;
    let selectedIndex = -1;
    let currentResults: SearchItem[] = [];

    const jsonUrl = overlay.dataset.json;
    if (!jsonUrl) return;

    async function fetchData(): Promise<SearchItem[]> {
        if (!searchData) {
            const res = await fetch(jsonUrl);
            searchData = await res.json();
            const parser = new DOMParser();
            for (const item of searchData!) {
                item.content = parser.parseFromString(item.content, 'text/html').body.innerText;
            }
        }
        return searchData!;
    }

    function open() {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        input.value = '';
        resultsContainer.innerHTML = '';
        selectedIndex = -1;
        currentResults = [];
        setTimeout(() => input.focus(), 50);
    }

    function close() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateSelection() {
        const items = resultsContainer.querySelectorAll<HTMLElement>('.search-modal-result-item');
        items.forEach((el, i) => {
            el.classList.toggle('selected', i === selectedIndex);
        });
        if (selectedIndex >= 0 && items[selectedIndex]) {
            items[selectedIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    function renderResults(results: SearchItem[], keywords: string[]) {
        currentResults = results;
        selectedIndex = -1;

        if (!results.length) {
            resultsContainer.innerHTML = '<div class="search-modal-empty">没有找到相关结果</div>';
            return;
        }

        resultsContainer.innerHTML = results.map((item) => {
            const title = highlightMatches(item.title, keywords);
            const preview = truncatePreview(item.content);
            const date = formatDate(item.date);
            return `<a href="${item.permalink}" class="search-modal-result-item">
                <div class="search-modal-result-row">
                    <svg class="search-modal-result-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                    <span class="search-modal-result-title">${title}</span>
                </div>
                <div class="search-modal-result-meta">
                    <span class="search-modal-result-date">${date}</span>
                    <span class="search-modal-result-preview">${preview}</span>
                </div>
            </a>`;
        }).join('');
    }

    async function doSearch(query: string) {
        const trimmed = query.trim();
        if (!trimmed) {
            resultsContainer.innerHTML = '';
            currentResults = [];
            selectedIndex = -1;
            return;
        }

        const keywords = trimmed.split(/\s+/).filter(Boolean);
        const data = await fetchData();

        const results: SearchItem[] = [];
        for (const item of data) {
            const lowerTitle = item.title.toLowerCase();
            const lowerContent = item.content.toLowerCase();
            let matchCount = 0;
            for (const kw of keywords) {
                const lk = kw.toLowerCase();
                if (lowerTitle.includes(lk)) matchCount += 2;
                if (lowerContent.includes(lk)) matchCount += 1;
            }
            if (matchCount > 0) {
                results.push({ ...item, _matchCount: matchCount } as SearchItem & { _matchCount: number });
            }
        }

        results.sort((a: any, b: any) => (b._matchCount ?? 0) - (a._matchCount ?? 0));
        renderResults(results, keywords);
    }

    const debouncedSearch = debounce(() => doSearch(input.value), 200);

    // Trigger button
    trigger?.addEventListener('click', open);

    // Click overlay to close
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
    });

    // Input events
    let composing = false;
    input.addEventListener('compositionstart', () => { composing = true; });
    input.addEventListener('compositionend', () => { composing = false; debouncedSearch(); });
    input.addEventListener('input', () => { if (!composing) debouncedSearch(); });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Cmd/Ctrl+K to open
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            if (overlay.classList.contains('active')) {
                close();
            } else {
                open();
            }
            return;
        }

        if (!overlay.classList.contains('active')) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            close();
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (currentResults.length) {
                selectedIndex = (selectedIndex + 1) % currentResults.length;
                updateSelection();
            }
            return;
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (currentResults.length) {
                selectedIndex = selectedIndex <= 0 ? currentResults.length - 1 : selectedIndex - 1;
                updateSelection();
            }
            return;
        }

        if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0 && currentResults[selectedIndex]) {
                window.location.href = currentResults[selectedIndex].permalink;
            }
            return;
        }
    });

    // Close on result click
    resultsContainer.addEventListener('click', (e) => {
        const target = (e.target as HTMLElement).closest<HTMLElement>('.search-modal-result-item');
        if (target) close();
    });
}

window.addEventListener('load', () => {
    initCodeCopy();
    initImageZoom();
    initSearchModal();
});
