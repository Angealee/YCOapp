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
import { addOutline, arrowBackOutline, chevronForwardOutline, createOutline, trashOutline } from "ionicons/icons";
import { useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { quarter1Aralin } from "../data/quarter1AralinCards";
import { quarter2Aralin } from "../data/quarter2AralinCards";
import { quarter3Aralin } from "../data/quarter3AralinCards";
import "./Pagsusulat.css";

type AralinNoteOption = {
  id: number;
  label: string;
};

const quarterAralinMap: Record<number, AralinNoteOption[]> = {
  1: quarter1Aralin.map((item) => ({ id: item.id, label: `${item.title}: ${item.subtitle}` })),
  2: quarter2Aralin.map((item) => ({ id: item.id, label: `${item.title}: ${item.subtitle}` })),
  3: quarter3Aralin.map((item) => ({ id: item.id, label: `${item.title}: ${item.subtitle}` })),
};

const quarterMeta: Record<number, { title: string; subtitle: string }> = {
  1: { title: "Unang Markahan", subtitle: "Panitikan at Wika" },
  2: { title: "Pangalawang Markahan", subtitle: "Kuwentong Bayan at Pabula" },
  3: { title: "Pangatlong Markahan", subtitle: "Panitikan at Pagsusuri" },
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

const createNoteId = (): string =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

type PagsusulatRouteParams = {
  quarter?: string;
  aralin?: string;
};

const Pagsusulat: React.FC = () => {
  const history = useHistory();
  const { quarter, aralin } = useParams<PagsusulatRouteParams>();

  const currentQuarter = useMemo<number | null>(() => {
    const parsedQuarter = Number(quarter);
    return Number.isFinite(parsedQuarter) && quarterMeta[parsedQuarter] ? parsedQuarter : null;
  }, [quarter]);

  const currentAralin = useMemo<number | null>(() => {
    if (!currentQuarter) return null;
    const parsedAralin = Number(aralin);
    if (!Number.isFinite(parsedAralin)) return null;
    const exists = (quarterAralinMap[currentQuarter] ?? []).some((item) => item.id === parsedAralin);
    return exists ? parsedAralin : null;
  }, [aralin, currentQuarter]);

  const [notes, setNotes] = useState<Note[]>(() => {
    const rawNotes = localStorage.getItem(NOTES_KEY);
    if (!rawNotes) return [];
    try {
      const parsed = JSON.parse(rawNotes) as Note[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [deleteTarget, setDeleteTarget] = useState<Note | null>(null);

  const [createQuarter, setCreateQuarter] = useState<number>(1);
  const [createAralin, setCreateAralin] = useState<number>(1);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");

  const [editId, setEditId] = useState<string>("");
  const [editTitle, setEditTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");

  const persistNotes = (nextNotes: Note[]) => {
    setNotes(nextNotes);
    localStorage.setItem(NOTES_KEY, JSON.stringify(nextNotes));
  };

  const selectedAralinOptions = useMemo<AralinNoteOption[]>(() => {
    if (!currentQuarter) return [];
    return quarterAralinMap[currentQuarter] ?? [];
  }, [currentQuarter]);

  const getAralinLabel = (quarter: number, aralinId: number): string => {
    const aralin = (quarterAralinMap[quarter] ?? []).find((item) => item.id === aralinId);
    return aralin ? aralin.label : `Aralin ${aralinId}`;
  };

  const getNoteCount = (quarter: number, aralinId?: number): number => {
    return notes.filter((note) =>
      aralinId ? note.quarter === quarter && note.aralin === aralinId : note.quarter === quarter
    ).length;
  };

  const filteredNotes = useMemo<Note[]>(() => {
    if (!currentQuarter || !currentAralin) return [];
    return notes
      .filter((note) => note.quarter === currentQuarter && note.aralin === currentAralin)
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }, [currentAralin, currentQuarter, notes]);

  const onOpenCreateModal = () => {
    if (!currentQuarter || !currentAralin) return;
    setCreateQuarter(currentQuarter);
    setCreateAralin(currentAralin);
    setNewTitle("");
    setNewContent("");
    setIsCreateModalOpen(true);
  };

  const onCreateNote = () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    const timestamp = Date.now();
    const nextNotes: Note[] = [
      ...notes,
      {
        id: createNoteId(),
        quarter: createQuarter,
        aralin: createAralin,
        title: newTitle.trim(),
        content: newContent.trim(),
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ];

    persistNotes(nextNotes);
    setIsCreateModalOpen(false);
  };

  const onOpenUpdateModal = (note: Note) => {
    setEditId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
    setIsUpdateModalOpen(true);
  };

  const onUpdateNote = () => {
    if (!editId || !editTitle.trim() || !editContent.trim()) return;

    const nextNotes = notes.map((note) =>
      note.id === editId
        ? {
            ...note,
            title: editTitle.trim(),
            content: editContent.trim(),
            updatedAt: Date.now(),
          }
        : note
    );

    persistNotes(nextNotes);
    setIsUpdateModalOpen(false);
  };

  const onConfirmDelete = () => {
    if (!deleteTarget) return;

    const nextNotes = notes.filter((note) => note.id !== deleteTarget.id);
    persistNotes(nextNotes);
    setDeleteTarget(null);
  };

  const formatDate = (value: number): string => {
    return new Date(value).toLocaleString();
  };

  const onSelectQuarter = (quarterValue: number) => {
    history.push(`/pagsusulat/${quarterValue}`);
  };

  const onSelectAralin = (aralinId: number) => {
    if (!currentQuarter) return;
    history.push(`/pagsusulat/${currentQuarter}/${aralinId}`);
  };

  const onBackToQuarters = () => {
    history.push("/pagsusulat");
  };

  const onBackToAralin = () => {
    if (!currentQuarter) return;
    history.push(`/pagsusulat/${currentQuarter}`);
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="pagsusulat-toolbar">
          <IonTitle className="pagsusulat-title">Pagsusulat</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding pagsusulat-content">
        <div className="notes-page">
          <h2 className="notes-title">
            {currentQuarter ? `Mga Tala - ${quarterMeta[currentQuarter].title}` : "Mga Tala"}
          </h2>
          <IonText color="medium">
            <p className="notes-subtitle">
              {!currentQuarter
                ? "Piliin muna ang quarter."
                : !currentAralin
                  ? "Piliin ang aralin para makita ang notes."
                  : "Narito ang buong notes para sa napiling aralin."}
            </p>
          </IonText>

          {!currentQuarter ? (
            <div className="quarter-cards">
              {[1, 2, 3].map((quarter) => (
                <IonCard
                  className="notes-card quarter-note-card quarter-select-card"
                  key={quarter}
                  button
                  onClick={() => onSelectQuarter(quarter)}
                >
                  <IonCardContent>
                    <div className="quarter-card-header">
                      <div>
                        <h3 className="quarter-card-title">{quarterMeta[quarter].title}</h3>
                        <p className="quarter-card-subtitle">{quarterMeta[quarter].subtitle}</p>
                      </div>
                      <div className="quarter-go">
                        <IonIcon icon={chevronForwardOutline} />
                      </div>
                    </div>
                    <p className="quarter-card-info">{getNoteCount(quarter)} tala sa quarter na ito</p>
                  </IonCardContent>
                </IonCard>
              ))}
            </div>
          ) : !currentAralin ? (
            <div className="aralin-stage">
              <div className="aralin-stage-top">
                <IonButton fill="clear" className="back-quarter-btn" onClick={onBackToQuarters}>
                  <IonIcon slot="start" icon={arrowBackOutline} />
                  Ibalik
                </IonButton>
              </div>

              <div className="aralin-cards">
                {selectedAralinOptions.map((aralin) => (
                  <IonCard
                    key={aralin.id}
                    className="notes-card aralin-select-card"
                    button
                    onClick={() => onSelectAralin(aralin.id)}
                  >
                    <IonCardContent>
                      <div className="aralin-select-header">
                        <p className="note-aralin-label">{aralin.label}</p>
                      </div>
                    </IonCardContent>
                  </IonCard>
                ))}
              </div>
            </div>
          ) : (
            <IonCard className="notes-card quarter-note-card">
              <IonCardContent>
                <div className="aralin-stage-top">
                  <IonButton fill="clear" className="back-quarter-btn" onClick={onBackToAralin}>
                    <IonIcon slot="start" icon={arrowBackOutline} />
                    Ibalik
                  </IonButton>
                </div>

                <div className="quarter-card-header">
                  <h3 className="quarter-card-title">{getAralinLabel(currentQuarter, currentAralin)}</h3>
                  <IonButton size="small" className="add-note-btn" onClick={onOpenCreateModal}>
                    <IonIcon slot="start" icon={addOutline} />
                    I-dagdag
                  </IonButton>
                </div>

                <div className="notes-list">
                  {filteredNotes.length === 0 ? (
                    <IonText color="medium">
                      <p className="notes-empty">Walang tala sa napiling aralin.</p>
                    </IonText>
                  ) : (
                    filteredNotes.map((note) => (
                      <IonCard key={note.id} className="note-item-card">
                        <IonCardContent>
                          <h4 className="note-title">Tala: {note.title}</h4>
                          <p className="note-meta">Na-update: {formatDate(note.updatedAt)}</p>
                          <p className="note-content">{note.content}</p>
                          <div className="note-actions">
                            <IonButton
                              fill="outline"
                              size="small"
                              className="update-note-btn"
                              onClick={() => onOpenUpdateModal(note)}
                            >
                              <IonIcon slot="start" icon={createOutline} />
                              I-edit
                            </IonButton>
                            <IonButton
                              color="danger"
                              fill="outline"
                              size="small"
                              className="delete-note-btn"
                              onClick={() => setDeleteTarget(note)}
                            >
                              <IonIcon slot="start" icon={trashOutline} />
                              Burahin
                            </IonButton>
                          </div>
                        </IonCardContent>
                      </IonCard>
                    ))
                  )}
                </div>
              </IonCardContent>
            </IonCard>
          )}
        </div>

        <IonModal isOpen={isCreateModalOpen} onDidDismiss={() => setIsCreateModalOpen(false)}>
          <IonHeader className="ion-no-border">
            <IonToolbar className="pagsusulat-toolbar">
              <IonTitle className="pagsusulat-title">Dagdagan ang Tala - Quarter {createQuarter}</IonTitle>
              <IonButtons slot="end">
                <IonButton className="modal-close-btn" onClick={() => setIsCreateModalOpen(false)}>
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding pagsusulat-content modal-form-content">
            <IonCard className="notes-card form-notes-card">
              <IonCardContent>
                <p className="note-aralin-label">{getAralinLabel(createQuarter, createAralin)}</p>
                <div className="notes-input-item">
                  <p className="note-aralin-label">Pamagat</p>
                  <IonInput value={newTitle} onIonInput={(e) => setNewTitle(e.detail.value ?? "")} />
                </div>
                <div className="notes-input-item">
                  <p className="note-aralin-label">Nilalaman</p>
                  <IonTextarea
                    value={newContent}
                    onIonInput={(e) => setNewContent(e.detail.value ?? "")}
                    rows={10}
                    autoGrow
                  />
                </div>
                <div className="notes-actions">
                  <IonButton
                    className="save-note-btn"
                    onClick={onCreateNote}
                    disabled={!newTitle.trim() || !newContent.trim()}
                  >
                    I-dagdag
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonModal>

        <IonModal isOpen={isUpdateModalOpen} onDidDismiss={() => setIsUpdateModalOpen(false)}>
          <IonHeader className="ion-no-border">
            <IonToolbar className="pagsusulat-toolbar">
              <IonTitle className="pagsusulat-title">I-edit ang Tala</IonTitle>
              <IonButtons slot="end">
                <IonButton className="modal-close-btn" onClick={() => setIsUpdateModalOpen(false)}>
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding pagsusulat-content modal-form-content">
            <IonCard className="notes-card form-notes-card">
              <IonCardContent>
                <div className="notes-input-item">
                  <p className="note-aralin-label">Pamagat</p>
                  <IonInput value={editTitle} onIonInput={(e) => setEditTitle(e.detail.value ?? "")} />
                </div>
                <div className="notes-input-item">
                  <p className="note-aralin-label">Nilalaman</p>
                  <IonTextarea
                    value={editContent}
                    onIonInput={(e) => setEditContent(e.detail.value ?? "")}
                    rows={10}
                    autoGrow
                  />
                </div>
                <div className="notes-actions">
                  <IonButton
                    className="save-note-btn"
                    onClick={onUpdateNote}
                    disabled={!editTitle.trim() || !editContent.trim()}
                  >
                    I-edit
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonModal>

        <IonAlert
          isOpen={!!deleteTarget}
          header="Burahin ang Tala"
          message="Sigurado ka bang buburahin ang note na ito?"
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
