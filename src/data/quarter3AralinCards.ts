export interface Aralin {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  progress: number; // 0 → 1
}

export const quarter3Aralin: Aralin[] = [
  {
    id: 1,
    title: "Aralin 1",
    subtitle: "Panitikang Pilipino sa Pananakop ng Espanyol",
    description:
      "Pagkilala sa mga anyo ng panitikan at konteksto ng pananakop ng mga Espanyol sa Pilipinas.",
    progress: 0,
  },
  {
    id: 2,
    title: "Aralin 2",
    subtitle: "Senakulo at Pasyon",
    description:
      "Pag-unawa sa mga dula at akdang panrelihiyon na umusbong sa panahon ng kolonyalismo.",
    progress: 0,
  },
  {
    id: 3,
    title: "Aralin 3",
    subtitle: "Duplo",
    description:
      "Pag-aaral sa anyong patulang pagtatalo at aliwang pangkultura sa pamayanang Pilipino.",
    progress: 0,
  },
  {
    id: 4,
    title: "Aralin 4",
    subtitle: "Awit at Korido",
    description:
      "Paghahambing ng awit at korido batay sa paksa, anyo, at himig ng salaysay.",
    progress: 0,
  },
  {
    id: 5,
    title: "Aralin 5",
    subtitle: "Balita",
    description:
      "Pagkilala sa balita, mga elemento nito, at paggamit ng multimodal sa pag-uulat at pag-unawa.",
    progress: 0,
  },
];

