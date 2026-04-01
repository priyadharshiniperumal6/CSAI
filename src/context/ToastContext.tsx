import { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircleFilled, CloseCircleFilled, InfoCircleFilled, CloseOutlined } from '@ant-design/icons';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextValue {
  showToast: (title: string, message?: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

let nextId = 1;

const ICON_MAP = {
  success: <CheckCircleFilled style={{ color: '#22c55e', fontSize: 20 }} />,
  error:   <CloseCircleFilled  style={{ color: '#ef4444', fontSize: 20 }} />,
  info:    <InfoCircleFilled   style={{ color: '#3b82f6', fontSize: 20 }} />,
};

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 12,
      background: '#ffffff', borderRadius: 10,
      padding: '14px 16px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)',
      border: '1px solid #e2e5ea',
      minWidth: 280, maxWidth: 360,
      animation: 'toast-in 0.2s ease',
    }}>
      <div style={{ flexShrink: 0, marginTop: 1 }}>{ICON_MAP[toast.type]}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1d23', lineHeight: 1.4 }}>{toast.title}</div>
        {toast.message && (
          <div style={{ fontSize: 12, color: '#6b7280', marginTop: 3, lineHeight: 1.4 }}>{toast.message}</div>
        )}
      </div>
      <button onClick={onClose} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: '#9ca3af', padding: 2, flexShrink: 0, lineHeight: 1,
      }}>
        <CloseOutlined style={{ fontSize: 12 }} />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((title: string, message?: string, type: ToastType = 'success') => {
    const id = nextId++;
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {createPortal(
        <div style={{
          position: 'fixed', bottom: 32, right: 32,
          display: 'flex', flexDirection: 'column', gap: 10,
          zIndex: 9999, pointerEvents: 'none',
        }}>
          {toasts.map(t => (
            <div key={t.id} style={{ pointerEvents: 'auto' }}>
              <ToastItem toast={t} onClose={() => removeToast(t.id)} />
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
