import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonText,
  IonCard,
  IonCardContent,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonChip,
  IonBackButton,
  IonButtons,
} from "@ionic/react";

import {
  bookOutline,
  sparklesOutline,
  bulbOutline,
  heartOutline,
  eyeOutline,
  bookmarkSharp,
  volumeHighOutline,
  playCircleOutline,
} from "ionicons/icons";

import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { quarter2LessonsById, QuarterLesson } from "../../data/quarter2Lessons";
import "./Quarter1Aralin1.css";

type LessonSection = Record<string, any> & {
  id?: string;
  title?: string;
  subtitle?: string;
  intro?: string;
  examples?: Array<{ id: number; label?: string; text?: string; answer?: string }>;
  bugtongCharacteristics?: Array<{ title?: string; description?: string }>;
  pabulaCharacteristics?: Array<{ title?: string; description?: string }>;
  komiksCharacteristics?: Array<{ title?: string; description?: string }>;
  bugtongImportance?: Array<{ title?: string; description?: string }>;
  alamatImportance?: Array<{ title?: string; description?: string }>;
  alamatElementsIntro?: string;
  alamatElements?: Array<{ title?: string; points?: string[] }>;
  pabulaElementsIntro?: string;
  pabulaElements?: Array<{ title?: string; points?: string[] }>;
  komiksTechnicalIntro?: string;
  komiksTechnicalAspects?: Array<{ title?: string; points?: string[] }>;
  komiksSteps?: Array<{ title?: string; points?: string[] }>;
  brochureDesignIntro?: string;
  brochureDesignAspects?: Array<{ title?: string; points?: string[] }>;
  brochureCoverIntro?: string;
  brochureCoverPoints?: string[];
  brochureCoverExample?: { title?: string; points?: string[] };
  brochureTypes?: Array<{ title?: string; points?: string[] }>;
  media?: { audioSrc?: string; videoSrc?: string };
  palaisipanCharacteristics?: Array<
    | { title?: string; description?: string }
    | { id?: number; question?: string; answer?: string }
  >;
};

const iconClassByIndex = (index: number): string => {
  const classes = ["bugtong-icon", "palaisipan-icon", "tanaga-icon", "salawikain-icon"];
  return classes[index % classes.length];
};

const iconByIndex = (index: number) => {
  const icons = [bulbOutline, sparklesOutline, bookOutline, heartOutline];
  return icons[index % icons.length];
};

const Quarter2Aralin1: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const aralinId = Number(id);

  const lesson: QuarterLesson | undefined = useMemo(() => {
    if (!Number.isFinite(aralinId)) return undefined;
    return quarter2LessonsById[aralinId];
  }, [aralinId]);

  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});
  const [modeBySection, setModeBySection] = useState<Record<string, "read" | "listen" | "watch">>(
    {}
  );

  const toggleAnswer = (key: string) => {
    setShowAnswers((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getSectionMode = (sectionKey: string): "read" | "listen" | "watch" => {
    return modeBySection[sectionKey] ?? "read";
  };

  const sections = (lesson?.sections ?? []) as LessonSection[];

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="modern-aralin-toolbar">
          <IonButtons slot="start">
            <IonBackButton text="Ibalik" className="modern-back-btn" />
          </IonButtons>
          <IonTitle className="modern-aralin-title">
            <div className="title-content">
              <span className="quarter-badge">Q2</span>
              <span className="separator">•</span>
              <span className="aralin-badge">
                Aralin {Number.isFinite(aralinId) ? aralinId : "—"}
              </span>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="modern-aralin-content">
        {/* Hero Section */}
        <div className="aralin-hero">
          <div className="hero-bg-gradient" />
          <div className="hero-content-wrapper">
            <div className="hero-icon-badge">
              <IonIcon icon={bookOutline} />
            </div>
            <h1 className="hero-main-title">{lesson?.meta.title ?? "Hindi nakita ang aralin"}</h1>
            <p className="hero-description">
              {lesson?.meta.description ?? "Walang datos para sa araling ito."}
            </p>
            {lesson?.meta.stats ? (
              <div className="hero-stats">
                <div className="stat-item">
                  <IonIcon icon={sparklesOutline} />
                  <span>{lesson.meta.stats.topics} Paksa</span>
                </div>
                <div className="stat-item">
                  <IonIcon icon={bulbOutline} />
                  <span>{lesson.meta.stats.interactive ? "Interactive" : "Reading"}</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Main Content */}
        {sections.length ? (
          <div className="content-wrapper">
            <IonAccordionGroup className="modern-accordion-group">
              {sections.map((section, index) => {
                const sectionKey = section.id ?? `section-${index + 1}`;
                const headerIcon = iconByIndex(index);
                const headerClass = iconClassByIndex(index);

                const questionsFromPalaisipan = (section.palaisipanCharacteristics ?? []).filter(
                  (x: any) => typeof x?.question === "string"
                ) as Array<{ id?: number; question?: string; answer?: string }>;

                const textItemsFromPalaisipan = (section.palaisipanCharacteristics ?? []).filter(
                  (x: any) => typeof x?.description === "string"
                ) as Array<{ title?: string; description?: string }>;

                const primaryListTitle =
                  section.alamatImportance?.length ? "Katangian ng Alamat" : "Kahalagahan";
                const primaryList =
                  section.alamatImportance?.length ? section.alamatImportance : section.bugtongImportance;

                const characteristicsItems = (section.komiksCharacteristics ??
                  section.pabulaCharacteristics ??
                  section.bugtongCharacteristics ??
                  []) as Array<{ title?: string; description?: string }>;
                const characteristicsTitle = section.komiksCharacteristics?.length
                  ? "Katangian ng Komiks"
                  : section.pabulaCharacteristics?.length
                    ? "Katangian ng Pabula"
                    : "Katangian";

                return (
                  <IonAccordion key={sectionKey} value={sectionKey} className="modern-accordion">
                    <IonItem slot="header" className="accordion-header" lines="none">
                      <div className="header-content">
                        <div className={`header-icon ${headerClass}`}>
                          <IonIcon icon={headerIcon} />
                        </div>
                        <div className="header-text">
                          <IonLabel className="accordion-title">
                            {section.title ?? `Seksyon ${index + 1}`}
                          </IonLabel>
                          {section.subtitle ? (
                            <p className="accordion-subtitle">{section.subtitle}</p>
                          ) : null}
                        </div>
                      </div>
                    </IonItem>

                    <div className="accordion-content" slot="content">
                      {section.intro ? (
                        <div className="content-intro">
                          <IonText className="intro-text">{section.intro}</IonText>
                        </div>
                      ) : null}

                      {/* Characteristics + Importance cards (same visual style as Q1) */}
                      {characteristicsItems.length || primaryList?.length ? (
                        <div className="info-cards-grid">
                          {characteristicsItems.length ? (
                            <IonCard className="info-card gradient-purple">
                              <IonCardContent>
                                <div className="card-icon">
                                  <IonIcon icon={sparklesOutline} />
                                </div>
                                <h1 className="card-title">
                                  <strong>{characteristicsTitle}</strong>
                                </h1>
                                <div className="card-list">
                                  {characteristicsItems.map((item, itemIndex) => (
                                    <div className="list-item" key={`${sectionKey}-c-${itemIndex}`}>
                                      <span className="item-number">{itemIndex + 1}</span>
                                      <div>
                                        {item.title ? <strong>{item.title}</strong> : null}
                                        {item.description ? <p>{item.description}</p> : null}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </IonCardContent>
                            </IonCard>
                          ) : null}

                          {primaryList?.length ? (
                            <IonCard className="info-card gradient-pink">
                              <IonCardContent>
                                <div className="card-icon">
                                  <IonIcon icon={heartOutline} />
                                </div>
                                <h1 className="card-title">
                                  <strong>{primaryListTitle}</strong>
                                </h1>
                                <div className="card-list">
                                  {primaryList.map((item: any, itemIndex: number) => (
                                    <div className="list-item" key={`${sectionKey}-i-${itemIndex}`}>
                                      <span className="item-number">{itemIndex + 1}</span>
                                      <div>
                                        {item.title ? <strong>{item.title}</strong> : null}
                                        {item.description ? <p>{item.description}</p> : null}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </IonCardContent>
                            </IonCard>
                          ) : null}
                        </div>
                      ) : null}

                      {section.pabulaElements?.length ? (
                        <>
                          {section.pabulaElementsIntro ? (
                            <div className="content-intro">
                              <IonText className="intro-text">{section.pabulaElementsIntro}</IonText>
                            </div>
                          ) : null}

                          <IonCard className="info-card gradient-purple">
                            <IonCardContent>
                              <div className="card-icon">
                                <IonIcon icon={sparklesOutline} />
                              </div>
                              <h1 className="card-title">
                                <strong>Mga Elemento ng Pabula</strong>
                              </h1>
                              <div className="card-list">
                                {section.pabulaElements.map((item, itemIndex) => (
                                  <div className="list-item" key={`${sectionKey}-pel-${itemIndex}`}>
                                    <span className="item-number">{itemIndex + 1}</span>
                                    <div>
                                      {item.title ? <strong>{item.title}</strong> : null}
                                      {item.points?.length
                                        ? item.points.map((point, pointIndex) => (
                                            <p key={`${sectionKey}-pel-${itemIndex}-p-${pointIndex}`}>
                                              {point}
                                            </p>
                                          ))
                                        : null}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </IonCardContent>
                          </IonCard>
                        </>
                      ) : null}

                      {section.komiksTechnicalAspects?.length ? (
                        <>
                          {section.komiksTechnicalIntro ? (
                            <div className="content-intro">
                              <IonText className="intro-text">{section.komiksTechnicalIntro}</IonText>
                            </div>
                          ) : null}

                          <IonCard className="info-card gradient-purple">
                            <IonCardContent>
                              <div className="card-icon">
                                <IonIcon icon={sparklesOutline} />
                              </div>
                              <h1 className="card-title">
                                <strong>Mga Teknikal na Aspeto ng Komiks</strong>
                              </h1>
                              <div className="card-list">
                                {section.komiksTechnicalAspects.map((item, itemIndex) => (
                                  <div className="list-item" key={`${sectionKey}-kta-${itemIndex}`}>
                                    <span className="item-number">{itemIndex + 1}</span>
                                    <div>
                                      {item.title ? <strong>{item.title}</strong> : null}
                                      {item.points?.length
                                        ? item.points.map((point, pointIndex) => (
                                            <p key={`${sectionKey}-kta-${itemIndex}-p-${pointIndex}`}>
                                              {point}
                                            </p>
                                          ))
                                        : null}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </IonCardContent>
                          </IonCard>
                        </>
                      ) : null}

                      {section.komiksSteps?.length ? (
                        <IonCard className="info-card gradient-green">
                          <IonCardContent>
                            <div className="card-icon">
                              <IonIcon icon={sparklesOutline} />
                            </div>
                            <h1 className="card-title">
                              <strong>Mga Hakbang sa Paggawa ng Komiks</strong>
                            </h1>
                            <div className="card-list">
                              {section.komiksSteps.map((item, itemIndex) => (
                                <div className="list-item" key={`${sectionKey}-ks-${itemIndex}`}>
                                  <span className="item-number">{itemIndex + 1}</span>
                                  <div>
                                    {item.title ? <strong>{item.title}</strong> : null}
                                    {item.points?.length
                                      ? item.points.map((point, pointIndex) => (
                                          <p key={`${sectionKey}-ks-${itemIndex}-p-${pointIndex}`}>
                                            {point}
                                          </p>
                                        ))
                                      : null}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </IonCardContent>
                        </IonCard>
                      ) : null}

                      {section.brochureDesignAspects?.length ? (
                        <>
                          {section.brochureDesignIntro ? (
                            <div className="content-intro">
                              <IonText className="intro-text">{section.brochureDesignIntro}</IonText>
                            </div>
                          ) : null}

                          <IonCard className="info-card gradient-purple">
                            <IonCardContent>
                              <div className="card-icon">
                                <IonIcon icon={sparklesOutline} />
                              </div>
                              <h1 className="card-title">
                                <strong>Disenyo ng Brochure</strong>
                              </h1>
                              <div className="card-list">
                                {section.brochureDesignAspects.map((item, itemIndex) => (
                                  <div className="list-item" key={`${sectionKey}-bda-${itemIndex}`}>
                                    <span className="item-number">{itemIndex + 1}</span>
                                    <div>
                                      {item.title ? <strong>{item.title}</strong> : null}
                                      {item.points?.length
                                        ? item.points.map((point, pointIndex) => (
                                            <p key={`${sectionKey}-bda-${itemIndex}-p-${pointIndex}`}>
                                              {point}
                                            </p>
                                          ))
                                        : null}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </IonCardContent>
                          </IonCard>
                        </>
                      ) : null}

                      {section.brochureCoverPoints?.length ? (
                        <>
                          {section.brochureCoverIntro ? (
                            <div className="content-intro">
                              <IonText className="intro-text">{section.brochureCoverIntro}</IonText>
                            </div>
                          ) : null}

                          <IonCard className="info-card gradient-green">
                            <IonCardContent>
                              <div className="card-icon">
                                <IonIcon icon={sparklesOutline} />
                              </div>
                              <h1 className="card-title">
                                <strong>Pabalat ng Brochure</strong>
                              </h1>
                              <div className="card-list">
                                {section.brochureCoverPoints.map((point, pointIndex) => (
                                  <div className="list-item" key={`${sectionKey}-bcp-${pointIndex}`}>
                                    <span className="item-number">{pointIndex + 1}</span>
                                    <div>
                                      <p>{point}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {section.brochureCoverExample?.points?.length ? (
                                <>
                                  {section.brochureCoverExample.title ? (
                                    <IonText className="intro-text">
                                      <strong>{section.brochureCoverExample.title}</strong>
                                    </IonText>
                                  ) : null}
                                  <div className="card-list">
                                    {section.brochureCoverExample.points.map((point, pointIndex) => (
                                      <div className="list-item" key={`${sectionKey}-bce-${pointIndex}`}>
                                        <span className="item-number">{pointIndex + 1}</span>
                                        <div>
                                          <p>{point}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </>
                              ) : null}
                            </IonCardContent>
                          </IonCard>
                        </>
                      ) : null}

                      {section.brochureTypes?.length ? (
                        <IonCard className="info-card gradient-purple">
                          <IonCardContent>
                            <div className="card-icon">
                              <IonIcon icon={sparklesOutline} />
                            </div>
                            <h1 className="card-title">
                              <strong>Mga Uri ng Brochure</strong>
                            </h1>
                            <div className="card-list">
                              {section.brochureTypes.map((item, itemIndex) => (
                                <div className="list-item" key={`${sectionKey}-bt-${itemIndex}`}>
                                  <span className="item-number">{itemIndex + 1}</span>
                                  <div>
                                    {item.title ? <strong>{item.title}</strong> : null}
                                    {item.points?.length
                                      ? item.points.map((point, pointIndex) => (
                                          <p key={`${sectionKey}-bt-${itemIndex}-p-${pointIndex}`}>
                                            {point}
                                          </p>
                                        ))
                                      : null}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </IonCardContent>
                        </IonCard>
                      ) : null}

                      {section.alamatElements?.length ? (
                        <>
                          {section.alamatElementsIntro ? (
                            <div className="content-intro">
                              <IonText className="intro-text">{section.alamatElementsIntro}</IonText>
                            </div>
                          ) : null}

                          <IonCard className="info-card gradient-purple">
                            <IonCardContent>
                              <div className="card-icon">
                                <IonIcon icon={sparklesOutline} />
                              </div>
                              <h1 className="card-title">
                                <strong>Mga Elemento ng Alamat</strong>
                              </h1>
                              <div className="card-list">
                                {section.alamatElements.map((item, itemIndex) => (
                                  <div className="list-item" key={`${sectionKey}-el-${itemIndex}`}>
                                    <span className="item-number">{itemIndex + 1}</span>
                                    <div>
                                      {item.title ? <strong>{item.title}</strong> : null}
                                      {item.points?.length
                                        ? item.points.map((point, pointIndex) => (
                                            <p key={`${sectionKey}-el-${itemIndex}-p-${pointIndex}`}>
                                              {point}
                                            </p>
                                          ))
                                        : null}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </IonCardContent>
                          </IonCard>
                        </>
                      ) : null}

                      {(section.examples?.length || section.media?.audioSrc || section.media?.videoSrc) ? (
                        <div className="action-chips">
                          <IonChip
                            className={`modern-chip ${getSectionMode(sectionKey) === "read" ? "active" : ""}`}
                            onClick={() =>
                              setModeBySection((prev) => ({ ...prev, [sectionKey]: "read" }))
                            }
                          >
                            <IonIcon icon={bookOutline} />
                            <IonLabel>Pagbasa</IonLabel>
                          </IonChip>
                          <IonChip
                            className={`modern-chip ${getSectionMode(sectionKey) === "listen" ? "active" : ""}`}
                            onClick={() =>
                              setModeBySection((prev) => ({ ...prev, [sectionKey]: "listen" }))
                            }
                          >
                            <IonIcon icon={volumeHighOutline} />
                            <IonLabel>Pakikinig</IonLabel>
                          </IonChip>
                          <IonChip
                            className={`modern-chip ${getSectionMode(sectionKey) === "watch" ? "active" : ""}`}
                            onClick={() =>
                              setModeBySection((prev) => ({ ...prev, [sectionKey]: "watch" }))
                            }
                          >
                            <IonIcon icon={playCircleOutline} />
                            <IonLabel>Panonood</IonLabel>
                          </IonChip>
                        </div>
                      ) : null}

                      {/* Palaisipan block (if present) */}
                      {textItemsFromPalaisipan.length ? (
                        <IonCard className="info-card gradient-pink">
                          <IonCardContent>
                            <div className="card-icon">
                              <IonIcon icon={sparklesOutline} />
                            </div>
                            <h1 className="card-title">
                              <strong>Katangian</strong>
                            </h1>
                            <div className="card-list">
                              {textItemsFromPalaisipan.map((item, itemIndex) => (
                                <div className="list-item" key={`${sectionKey}-p-${itemIndex}`}>
                                  <span className="item-number">{itemIndex + 1}</span>
                                  <div>
                                    {item.title ? <strong>{item.title}</strong> : null}
                                    {item.description ? <p>{item.description}</p> : null}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </IonCardContent>
                        </IonCard>
                      ) : null}

                      {questionsFromPalaisipan.length ? (
                        <div className="palaisipan-examples">
                          {questionsFromPalaisipan.map((q, qIndex) => {
                            const answerKey = `${sectionKey}-q-${q.id ?? qIndex}`;
                            const visible = !!showAnswers[answerKey];

                            return (
                              <IonCard key={answerKey} className="example-card gradient-blue">
                                <IonCardContent>
                                  <div className="example-text">
                                    <div className="example-label">
                                      <IonIcon icon={bulbOutline} />
                                      <span>Tanong {qIndex + 1}</span>
                                    </div>
                                    <p className="riddle-text">{q.question}</p>
                                    <div className="answer-toggle">
                                      <IonButton
                                        fill="clear"
                                        size="small"
                                        onClick={() => toggleAnswer(answerKey)}
                                      >
                                        <IonIcon icon={eyeOutline} slot="start" />
                                        {visible ? "Itago ang Sagot" : "Ipakita ang Sagot"}
                                      </IonButton>
                                    </div>
                                    {visible ? (
                                      <div className="answer-reveal animated">
                                        <IonIcon icon={sparklesOutline} />
                                        <span>Sagot: {q.answer}</span>
                                      </div>
                                    ) : null}
                                  </div>
                                </IonCardContent>
                              </IonCard>
                            );
                          })}
                        </div>
                      ) : null}

                      {/* Examples (if present) */}
                      {getSectionMode(sectionKey) === "read" && section.examples?.length ? (
                        <div className="bugtong-examples">
                          {section.examples.map((example, exampleIndex) => {
                            const answerKey = `${sectionKey}-e-${example.id ?? exampleIndex}`;
                            const visible = !!showAnswers[answerKey];

                            return (
                              <IonCard key={answerKey} className="example-card">
                                <IonCardContent>
                                  <div className="example-text">
                                    <div className="example-label">
                                      <IonIcon icon={bookmarkSharp} />
                                      <span>{example.label ?? `Halimbawa ${exampleIndex + 1}`}</span>
                                    </div>

                                    {example.text ? (
                                      <p className="riddle-text q2-example-text">{example.text.trim()}</p>
                                    ) : null}

                                    {example.answer ? (
                                      <>
                                        <div className="answer-toggle">
                                          <IonButton
                                            fill="clear"
                                            size="small"
                                            onClick={() => toggleAnswer(answerKey)}
                                          >
                                            <IonIcon icon={eyeOutline} slot="start" />
                                            {visible ? "Itago ang Sagot" : "Ipakita ang Sagot"}
                                          </IonButton>
                                        </div>

                                        {visible ? (
                                          <div className="answer-reveal animated">
                                            <IonIcon icon={bulbOutline} />
                                            <span>Sagot: {example.answer}</span>
                                          </div>
                                        ) : null}
                                      </>
                                    ) : null}
                                  </div>
                                </IonCardContent>
                              </IonCard>
                            );
                          })}
                        </div>
                      ) : null}

                      {getSectionMode(sectionKey) === "listen" ? (
                        <IonCard className="info-card gradient-blue">
                          <IonCardContent>
                            <div className="card-icon">
                              <IonIcon icon={volumeHighOutline} />
                            </div>
                            <h1 className="card-title">
                              <strong>Pakikinig</strong>
                            </h1>
                            {section.media?.audioSrc ? (
                              <audio controls style={{ width: "100%" }} src={section.media.audioSrc} />
                            ) : (
                              <IonText className="intro-text">Wala pang audio para sa bahaging ito.</IonText>
                            )}
                          </IonCardContent>
                        </IonCard>
                      ) : null}

                      {getSectionMode(sectionKey) === "watch" ? (
                        <IonCard className="info-card gradient-green">
                          <IonCardContent>
                            <div className="card-icon">
                              <IonIcon icon={playCircleOutline} />
                            </div>
                            <h1 className="card-title">
                              <strong>Panonood</strong>
                            </h1>
                            {section.media?.videoSrc ? (
                              <video controls style={{ width: "100%" }} src={section.media.videoSrc} />
                            ) : (
                              <IonText className="intro-text">Wala pang video para sa bahaging ito.</IonText>
                            )}
                          </IonCardContent>
                        </IonCard>
                      ) : null}
                    </div>
                  </IonAccordion>
                );
              })}
            </IonAccordionGroup>
          </div>
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default Quarter2Aralin1;
