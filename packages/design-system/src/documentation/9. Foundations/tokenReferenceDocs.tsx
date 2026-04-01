export const TokenReferenceStyles = () => (
  <style>{`
    .token-ref-doc { color: #0e0c11; }
    .token-ref-section { margin: 1.25rem 0 1.75rem; }
    .token-ref-section h3 { margin: 0; font-size: 1rem; }
    .token-ref-section p { margin: .35rem 0 0; color: #6d6f79; font-size: .88rem; line-height: 1.55; }
    .token-ref-callout {
      margin: .8rem 0 1rem;
      padding: .7rem .85rem;
      border-radius: 8px;
      border: 1px solid #cff0f7;
      background: #e7f7fb;
      color: #094b54;
      font-size: .82rem;
      line-height: 1.55;
    }
    .token-ref-summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: .5rem;
      margin: .8rem 0;
    }
    .token-ref-summary-item {
      border: 1px solid #e9ecf4;
      border-radius: 8px;
      background: #fff;
      padding: .6rem .7rem;
    }
    .token-ref-summary-item dt {
      margin: 0;
      font-size: .66rem;
      letter-spacing: .08em;
      color: #969498;
      text-transform: uppercase;
    }
    .token-ref-summary-item dd {
      margin: .35rem 0 0;
      font-size: .95rem;
      font-weight: 600;
      color: #0e0c11;
    }
    .token-ref-swatch-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: .4rem;
      margin-top: .55rem;
    }
    .token-ref-swatch {
      border: 1px solid #e9ecf4;
      border-radius: 8px;
      background: #fff;
      padding: .45rem;
    }
    .token-ref-swatch-block {
      height: 34px;
      border: 1px solid rgba(0, 0, 0, .08);
      border-radius: 6px;
    }
    .token-ref-swatch-token {
      margin-top: .35rem;
      font-size: .66rem;
      color: #6d6f79;
      line-height: 1.3;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }
    .token-ref-swatch-value {
      font-size: .74rem;
      color: #0e0c11;
      margin-top: .2rem;
      font-variant-numeric: tabular-nums;
    }
    .token-ref-chip-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: .35rem;
      margin-top: .55rem;
    }
    .token-ref-chip {
      display: flex;
      align-items: center;
      gap: .55rem;
      border: 1px solid #e9ecf4;
      border-radius: 8px;
      background: #fff;
      padding: .45rem .55rem;
    }
    .token-ref-chip-dot {
      width: 22px;
      height: 22px;
      border-radius: 999px;
      border: 1px solid rgba(0, 0, 0, .1);
      flex-shrink: 0;
    }
    .token-ref-chip-name {
      margin: 0;
      font-size: .74rem;
      color: #0e0c11;
      font-weight: 600;
      line-height: 1.25;
    }
    .token-ref-chip-value {
      margin: .2rem 0 0;
      font-size: .7rem;
      color: #6d6f79;
      line-height: 1.2;
      font-variant-numeric: tabular-nums;
    }
    .token-ref-type-row {
      display: grid;
      grid-template-columns: 170px 1fr 90px;
      gap: .7rem;
      align-items: center;
      border-bottom: 1px solid #e9ecf4;
      padding: .52rem 0;
    }
    .token-ref-type-row:last-child { border-bottom: none; }
    .token-ref-type-token {
      color: #969498;
      font-size: .7rem;
      font-weight: 600;
      line-height: 1.2;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }
    .token-ref-type-value {
      color: #6d6f79;
      font-size: .78rem;
      text-align: right;
      font-weight: 600;
    }
    .token-ref-scale-list { margin-top: .6rem; }
    .token-ref-scale-row {
      display: grid;
      grid-template-columns: 220px 1fr 70px;
      gap: .7rem;
      align-items: center;
      border-bottom: 1px solid #e9ecf4;
      padding: .55rem 0;
    }
    .token-ref-scale-row:last-child { border-bottom: none; }
    .token-ref-scale-track {
      height: 9px;
      border-radius: 999px;
      border: 1px solid #d7dae3;
      background: #f8f9fc;
      display: flex;
      align-items: center;
      padding: 0 2px;
    }
    .token-ref-scale-fill {
      min-width: 2px;
      height: 7px;
      border-radius: 999px;
      background: #15808c;
    }
    @media (max-width: 800px) {
      .token-ref-type-row, .token-ref-scale-row { grid-template-columns: 1fr; }
      .token-ref-type-value { text-align: left; }
    }
  `}</style>
);
