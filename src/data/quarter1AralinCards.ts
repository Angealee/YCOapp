export interface Aralin {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  progress: number; // 0 → 1
}

export const quarter1Aralin: Aralin[] = [
  {
    id: 1,
    title: "Aralin 1",
    subtitle: "Bugtong",
    description:
      "Pagkilala sa bugtong bilang palaisipang panitikan, kasama ang mga halimbawa at puzzle game.",
    progress: 1,
  },
  {
    id: 2,
    title: "Aralin 2",
    subtitle: "Pala-isipan",
    description:
      "Mga lohikal na tanong na humahamon sa isipan at pagpapalawak ng pag-aanalisa.",
    progress: 0.2,
  },
  {
    id: 3,
    title: "Aralin 3",
    subtitle: "Tanaga",
    description:
      "Pagkilala sa tanaga bilang maikling tulang Pilipino na may sukat at tugma.",
    progress: 0.3,
  },
  {
    id: 4,
    title: "Aralin 4",
    subtitle: "Salawikain",
    description:
      "Pag-unawa sa salawikain at pagkuha ng aral mula sa mga kasabihan.",
    progress: 0.1,
  },
  {
    id: 5,
    title: "Aralin 5",
    subtitle: "Pagsusuring Biswal",
    description: "Pagkilala sa komiks at pagsusuri ng biswal.",
    progress: 0,
  },

  {
    id: 6,
    title: "Aralin 6",
    subtitle: "Hudhud",
    description: "Epiko ng Ifugao at tradisyong Pilipino.",
    progress: 0,
  },

  {
    id: 7,
    title: "Aralin 7",
    subtitle: "Tekstong Ekspositori",
    description: "Pagkakatulad at pagkakaiba.",
    progress: 0,
  },

  {
    id: 8,
    title: "Aralin 8",
    subtitle: "Sanhi at Bunga",
    description: "Pagpapasya at pananagutan.",
    progress: 0,
  },
  
];
