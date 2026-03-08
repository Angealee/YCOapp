import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonButtons,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonModal,
  IonInput,
  IonTextarea,
  IonText,
  IonIcon,
} from "@ionic/react";
import {
  addOutline,
  arrowBackOutline,
  chevronForwardOutline,
  createOutline,
  trashOutline,
  documentTextOutline,
  bookOutline,
  closeOutline,
} from "ionicons/icons";
import { useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { quarter1Aralin } from "../data/quarter1AralinCards";
import { quarter2Aralin } from "../data/quarter2AralinCards";
import { quarter3Aralin } from "../data/quarter3AralinCards";
import "./Pagsusulat.css";

type AralinNoteOption = { id: number; label: string };

const quarterAralinMap: Record<number, AralinNoteOption[]> = {
  1: quarter1Aralin.map((item) => ({ id: item.id, label: `${item.title}: ${item.subtitle}` })),
  2: quarter2Aralin.map((item) => ({ id: item.id, label: `${item.title}: ${item.subtitle}` })),
  3: quarter3Aralin.map((item) => ({ id: item.id, label: `${item.title}: ${item.subtitle}` })),
};

const quarterMeta: Record<number, { title: string; subtitle: string; emoji: string; gradient: string; color: string; dk: string }> = {
  1: { title: "Unang Markahan",       subtitle: "Panitikan at Wika",              emoji: "📖", gradient: "linear-gradient(145deg,#FF6B6B,#C0392B)", color: "#FF6B6B", dk: "#C0392B" },
  2: { title: "Pangalawang Markahan", subtitle: "Kuwentong Bayan at Pabula",      emoji: "🌿", gradient: "linear-gradient(145deg,#4D96FF,#1565C0)", color: "#4D96FF", dk: "#1565C0" },
  3: { title: "Pangatlong Markahan",  subtitle: "Panitikan at Pagsusuri",         emoji: "🎭", gradient: "linear-gradient(145deg,#C77DFF,#7B2CBF)", color: "#C77DFF", dk: "#7B2CBF" },
};

type Note = {
  id: string;
  quarter: number;
  aralin: number;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
};

const NOTES_KEY = "pagsusulat-notes";
const createNoteId = (): string => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

type PagsusulatRouteParams = { quarter?: string; aralin?: string };

const Pagsusulat: React.FC = () => {
  const history = useHistory();
  const { quarter, aralin } = useParams<PagsusulatRouteParams>();

  const currentQuarter = useMemo<number | null>(() => {
    const p = Number(quarter);
    return Number.isFinite(p) && quarterMeta[p] ? p : null;
  }, [quarter]);

  const currentAralin = useMemo<number | null>(() => {
    if (!currentQuarter) return null;
    const p = Number(aralin);
    if (!Number.isFinite(p)) return null;
    const exists = (quarterAralinMap[currentQuarter] ?? []).some((item) => item.id === p);
    return exists ? p : null;
  }, [aralin, currentQuarter]);

  const [notes, setNotes] = useState<Note[]>(() => {
    const raw = localStorage.getItem(NOTES_KEY);
    if (!raw) return [];
    try { const p = JSON.parse(raw) as Note[]; return Array.isArray(p) ? p : []; }
    catch { return []; }
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Note | null>(null);

  const [createQuarter, setCreateQuarter] = useState(1);
  const [createAralin,  setCreateAralin]  = useState(1);
  const [newTitle,      setNewTitle]      = useState("");
  const [newContent,    setNewContent]    = useState("");

  const [editId,      setEditId]      = useState("");
  const [editTitle,   setEditTitle]   = useState("");
  const [editContent, setEditContent] = useState("");

  const persistNotes = (next: Note[]) => {
    setNotes(next);
    localStorage.setItem(NOTES_KEY, JSON.stringify(next));
  };

  const selectedAralinOptions = useMemo<AralinNoteOption[]>(
    () => (!currentQuarter ? [] : quarterAralinMap[currentQuarter] ?? []),
    [currentQuarter]
  );

  const getAralinLabel = (q: number, aId: number) =>
    (quarterAralinMap[q] ?? []).find((i) => i.id === aId)?.label ?? `Aralin ${aId}`;

  const getNoteCount = (q: number, aId?: number) =>
    notes.filter((n) => (aId ? n.quarter === q && n.aralin === aId : n.quarter === q)).length;

  const filteredNotes = useMemo<Note[]>(() => {
    if (!currentQuarter || !currentAralin) return [];
    return notes
      .filter((n) => n.quarter === currentQuarter && n.aralin === currentAralin)
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }, [currentAralin, currentQuarter, notes]);

  const onOpenCreateModal = () => {
    if (!currentQuarter || !currentAralin) return;
    setCreateQuarter(currentQuarter);
    setCreateAralin(currentAralin);
    setNewTitle(""); setNewContent("");
    setIsCreateModalOpen(true);
  };

  const onCreateNote = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    const ts = Date.now();
    persistNotes([...notes, {
      id: createNoteId(), quarter: createQuarter, aralin: createAralin,
      title: newTitle.trim(), content: newContent.trim(), createdAt: ts, updatedAt: ts,
    }]);
    setIsCreateModalOpen(false);
  };

  const onOpenUpdateModal = (note: Note) => {
    setEditId(note.id); setEditTitle(note.title); setEditContent(note.content);
    setIsUpdateModalOpen(true);
  };

  const onUpdateNote = () => {
    if (!editId || !editTitle.trim() || !editContent.trim()) return;
    persistNotes(notes.map((n) =>
      n.id === editId ? { ...n, title: editTitle.trim(), content: editContent.trim(), updatedAt: Date.now() } : n
    ));
    setIsUpdateModalOpen(false);
  };

  const onConfirmDelete = () => {
    if (!deleteTarget) return;
    persistNotes(notes.filter((n) => n.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const formatDate = (v: number) => new Date(v).toLocaleString();

  const onSelectQuarter = (q: number) => history.push(`/pagsusulat/${q}`);
  const onSelectAralin  = (aId: number) => { if (!currentQuarter) return; history.push(`/pagsusulat/${currentQuarter}/${aId}`); };
  const onBackToQuarters = () => history.push("/pagsusulat");
  const onBackToAralin   = () => { if (!currentQuarter) return; history.push(`/pagsusulat/${currentQuarter}`); };

  // ── Modal toolbar helper ──
  const ModalToolbar = ({ title, onClose }: { title: string; onClose: () => void }) => (
    <IonHeader className="ion-no-border">
      <IonToolbar className="pag-modal-toolbar">
        <IonTitle className="pag-modal-title">{title}</IonTitle>
        <IonButtons slot="end">
          <IonButton fill="clear" className="pag-modal-close" onClick={onClose}>
            <IonIcon icon={closeOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="pag-toolbar">
          <IonTitle className="pag-toolbar-title">Pagsusulat</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="pag-content">

        {/* ── Hero ── */}
        <div className="pag-hero">
          <div className="pag-hero-blob pag-hero-blob--1" />
          <div className="pag-hero-blob pag-hero-blob--2" />
          <div className="pag-hero-inner">
            <div className="pag-hero-icon">
              <IonIcon icon={documentTextOutline} />
            </div>
            <h1 className="pag-hero-title">
              {currentQuarter
                ? currentAralin
                  ? "Mga Tala"
                  : quarterMeta[currentQuarter].title
                : "Pagsusulat"}
            </h1>
            <p className="pag-hero-subtitle">
              {!currentQuarter
                ? "Piliin ang markahan para magsimula"
                : !currentAralin
                  ? "Piliin ang aralin para makita ang mga tala"
                  : getAralinLabel(currentQuarter, currentAralin)}
            </p>
          </div>
        </div>

        <div className="pag-body">

          {/* ════ SCREEN 1: Quarter selection ════ */}
          {!currentQuarter && (
            <div className="pag-quarter-grid">
              {([1, 2, 3] as const).map((q, idx) => {
                const meta  = quarterMeta[q];
                const count = getNoteCount(q);
                return (
                  <IonCard
                    key={q}
                    className="pag-quarter-card"
                    style={{ animationDelay: `${idx * 90}ms`, "--pag-accent": meta.color, "--pag-dk": meta.dk } as React.CSSProperties}
                    button
                    onClick={() => onSelectQuarter(q)}
                  >
                    <div className="pag-card-accent-bar" style={{ background: meta.gradient }} />
                    <div className="pag-card-glow" />
                    <div className="pag-ghost-num">{q}</div>

                    <IonCardContent className="pag-quarter-body">
                      <div className="pag-quarter-top">
                        <div className="pag-emoji-bubble" style={{ background: meta.gradient }}>
                          {meta.emoji}
                        </div>
                        <div className="pag-markahan-badge">Markahan {q}</div>
                      </div>

                      <h3 className="pag-quarter-title">{meta.title}</h3>
                      <p className="pag-quarter-sub">{meta.subtitle}</p>

                      <div className="pag-quarter-footer">
                        <span className="pag-note-count" style={{ color: meta.color }}>
                          📝 {count} tala
                        </span>
                        <div className="pag-go-circle" style={{ background: meta.gradient }}>
                          <IonIcon icon={chevronForwardOutline} />
                        </div>
                      </div>
                    </IonCardContent>
                  </IonCard>
                );
              })}
            </div>
          )}

          {/* ════ SCREEN 2: Aralin selection ════ */}
          {currentQuarter && !currentAralin && (
            <div className="pag-aralin-stage">
              <button className="pag-back-btn" onClick={onBackToQuarters}>
                <IonIcon icon={arrowBackOutline} /> Ibalik
              </button>

              <div className="pag-aralin-grid">
                {selectedAralinOptions.map((ar, idx) => {
                  const meta  = quarterMeta[currentQuarter];
                  const count = getNoteCount(currentQuarter, ar.id);
                  return (
                    <IonCard
                      key={ar.id}
                      className="pag-aralin-card"
                      style={{ animationDelay: `${idx * 50}ms`, "--pag-accent": meta.color } as React.CSSProperties}
                      button
                      onClick={() => onSelectAralin(ar.id)}
                    >
                      <div className="pag-aralin-accent" style={{ background: meta.gradient }} />
                      <IonCardContent className="pag-aralin-body">
                        <div className="pag-aralin-row">
                          <div className="pag-aralin-num-bubble" style={{ background: meta.gradient }}>
                            {ar.id}
                          </div>
                          <p className="pag-aralin-label">{ar.label}</p>
                          <div className="pag-aralin-chevron" style={{ color: meta.color }}>
                            <IonIcon icon={chevronForwardOutline} />
                          </div>
                        </div>
                        {count > 0 && (
                          <span className="pag-aralin-count" style={{ color: meta.color }}>
                            📝 {count} tala
                          </span>
                        )}
                      </IonCardContent>
                    </IonCard>
                  );
                })}
              </div>
            </div>
          )}

          {/* ════ SCREEN 3: Notes list ════ */}
          {currentQuarter && currentAralin && (
            <div className="pag-notes-stage">
              <button className="pag-back-btn" onClick={onBackToAralin}>
                <IonIcon icon={arrowBackOutline} /> Ibalik
              </button>

              {/* Add note button */}
              <button
                className="pag-add-btn"
                style={{ background: quarterMeta[currentQuarter].gradient } as React.CSSProperties}
                onClick={onOpenCreateModal}
              >
                <IonIcon icon={addOutline} />
                <span>Magdagdag ng Tala</span>
              </button>

              {/* Empty state */}
              {filteredNotes.length === 0 && (
                <div className="pag-empty-state">
                  <div className="pag-empty-emoji">📝</div>
                  <p className="pag-empty-text">Walang tala pa sa aralin na ito.</p>
                  <p className="pag-empty-hint">I-tap ang button sa itaas para magsimulang magsulat!</p>
                </div>
              )}

              {/* Note cards */}
              <div className="pag-notes-list">
                {filteredNotes.map((note, idx) => {
                  const meta = quarterMeta[currentQuarter];
                  return (
                    <IonCard
                      key={note.id}
                      className="pag-note-card"
                      style={{ animationDelay: `${idx * 60}ms`, "--pag-accent": meta.color } as React.CSSProperties}
                    >
                      <div className="pag-note-accent-bar" style={{ background: meta.gradient }} />
                      <IonCardContent className="pag-note-body">
                        <div className="pag-note-header">
                          <div>
                            <h4 className="pag-note-title">{note.title}</h4>
                            <p className="pag-note-meta">
                              🕐 {formatDate(note.updatedAt)}
                            </p>
                          </div>
                          <div className="pag-note-actions">
                            <button
                              className="pag-action-btn pag-action-btn--edit"
                              style={{ "--action-color": meta.color, "--action-dk": meta.dk } as React.CSSProperties}
                              onClick={() => onOpenUpdateModal(note)}
                            >
                              <IonIcon icon={createOutline} />
                            </button>
                            <button
                              className="pag-action-btn pag-action-btn--delete"
                              onClick={() => setDeleteTarget(note)}
                            >
                              <IonIcon icon={trashOutline} />
                            </button>
                          </div>
                        </div>
                        <p className="pag-note-content">{note.content}</p>
                      </IonCardContent>
                    </IonCard>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="pag-bottom-space" />

        {/* ════ CREATE MODAL ════ */}
        <IonModal isOpen={isCreateModalOpen} onDidDismiss={() => setIsCreateModalOpen(false)}>
          <ModalToolbar title={`Bagong Tala — Markahan ${createQuarter}`} onClose={() => setIsCreateModalOpen(false)} />
          <IonContent className="pag-modal-content">
            <div className="pag-modal-body">
              <p className="pag-modal-aralin-label">
                <IonIcon icon={bookOutline} />
                {getAralinLabel(createQuarter, createAralin)}
              </p>

              <div className="pag-form-group">
                <label className="pag-form-label">Pamagat</label>
                <IonInput
                  className="pag-form-input"
                  value={newTitle}
                  placeholder="Ilagay ang pamagat..."
                  onIonInput={(e) => setNewTitle(e.detail.value ?? "")}
                />
              </div>

              <div className="pag-form-group">
                <label className="pag-form-label">Nilalaman</label>
                <IonTextarea
                  className="pag-form-textarea"
                  value={newContent}
                  placeholder="Isulat ang iyong tala dito..."
                  onIonInput={(e) => setNewContent(e.detail.value ?? "")}
                  rows={10}
                  autoGrow
                />
              </div>

              <button
                className="pag-save-btn"
                style={(!newTitle.trim() || !newContent.trim())
                  ? {}
                  : { background: quarterMeta[createQuarter].gradient } as React.CSSProperties}
                onClick={onCreateNote}
                disabled={!newTitle.trim() || !newContent.trim()}
              >
                <IonIcon icon={addOutline} />
                I-dagdag ang Tala
              </button>
            </div>
          </IonContent>
        </IonModal>

        {/* ════ UPDATE MODAL ════ */}
        <IonModal isOpen={isUpdateModalOpen} onDidDismiss={() => setIsUpdateModalOpen(false)}>
          <ModalToolbar title="I-edit ang Tala" onClose={() => setIsUpdateModalOpen(false)} />
          <IonContent className="pag-modal-content">
            <div className="pag-modal-body">
              <div className="pag-form-group">
                <label className="pag-form-label">Pamagat</label>
                <IonInput
                  className="pag-form-input"
                  value={editTitle}
                  placeholder="Ilagay ang pamagat..."
                  onIonInput={(e) => setEditTitle(e.detail.value ?? "")}
                />
              </div>

              <div className="pag-form-group">
                <label className="pag-form-label">Nilalaman</label>
                <IonTextarea
                  className="pag-form-textarea"
                  value={editContent}
                  placeholder="Isulat ang iyong tala dito..."
                  onIonInput={(e) => setEditContent(e.detail.value ?? "")}
                  rows={10}
                  autoGrow
                />
              </div>

              <button
                className="pag-save-btn"
                style={(!editTitle.trim() || !editContent.trim())
                  ? {}
                  : currentQuarter
                    ? { background: quarterMeta[currentQuarter].gradient } as React.CSSProperties
                    : {}}
                onClick={onUpdateNote}
                disabled={!editTitle.trim() || !editContent.trim()}
              >
                <IonIcon icon={createOutline} />
                I-save ang Pagbabago
              </button>
            </div>
          </IonContent>
        </IonModal>

        {/* ════ DELETE ALERT ════ */}
        <IonAlert
          isOpen={!!deleteTarget}
          header="Burahin ang Tala"
          message="Sigurado ka bang buburahin ang tala na ito?"
          onDidDismiss={() => setDeleteTarget(null)}
          buttons={[
            { text: "Kanselahin", role: "cancel" },
            { text: "Burahin", role: "destructive", handler: onConfirmDelete },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Pagsusulat;