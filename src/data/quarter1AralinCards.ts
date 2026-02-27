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
];
