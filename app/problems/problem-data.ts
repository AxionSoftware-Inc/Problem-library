export type FormulaEntry = {
  label: string;
  expression: string;
  meaning: string;
  origin: string;
  units: string;
  interpretation: string;
  useCase: string;
};

export type CalculationEntry = {
  title: string;
  inputs: Record<string, string>;
  formula: string;
  result: string;
  note: string;
};

export type GraphPoint = {
  x: number;
  y: number;
};

export type GraphSeries = {
  name: string;
  color: string;
  points: GraphPoint[];
};

export type CodeSample = {
  language: string;
  filename: string;
  code: string;
  summary: string;
  output: string;
};

export type ProblemModule = {
  meta: {
    slug: string;
    title: string;
    subtitle: string;
    domain: string;
    difficulty: string;
    estimatedTime: string;
    audience: string;
    outcome: string;
  };
  story: {
    overview: string;
    origin: string;
    impact: string;
    whyItMatters: string;
  };
  provenance: {
    formulaSource: string;
    codePurpose: string;
    graphMeaning: string;
  };
  constraints: string[];
  formulas: FormulaEntry[];
  calculations: CalculationEntry[];
  graphs: {
    title: string;
    description: string;
    xLabel: string;
    yLabel: string;
    series: GraphSeries[];
  };
  codeSamples: CodeSample[];
  notes: string[];
};

export const ledDesignProblem: ProblemModule = {
  meta: {
    slug: "led-design",
    title: "LED Design",
    subtitle:
      "Barqaror LED yoritish sxemasini kuchlanish, tok cheklash, issiqlik va samaradorlik muvozanati bilan quramiz.",
    domain: "Elektronika / Quvvat dizayni",
    difficulty: "Medium",
    estimatedTime: "28 daqiqalik o‘qish",
    audience: "Talaba, junior engineer, maker",
    outcome: "Rezistorli LED dizaynini hisoblash va tanlash",
  },
  story: {
    overview:
      "LED oddiy rezistor kabi quvvatlanmaydi. Unga boshqarilgan tok yo‘li kerak, aks holda yorqinlik, xizmat muddati va samaradorlik o‘zgarib ketadi.",
    origin:
      "Muammo takrorlanadigan yorug‘lik manbasi kerak bo‘lganda paydo bo‘ladi: batareya kuchlanishi o‘zgaradi, LED’lar partiya bo‘yicha farq qiladi, sxema esa xavfsiz tok chegarasida ishlashi kerak.",
    impact:
      "Yaxshi LED dizayn kichik, arzon va ishonchli bo‘ladi. Yomon dizayn demo’da yaxshi ko‘rinadi, lekin keyin qiziydi, xiralashadi yoki tez ishdan chiqadi.",
    whyItMatters:
      "Bu case orqali talabalar formulani yodlash emas, balki real mahsulot talabi bilan bog‘lashni o‘rganadi.",
  },
  provenance: {
    formulaSource:
      "Formulalar Ohm qonuni va quvvat tenglamalaridan keladi; LED uchun esa manba kuchlanishi va oldinga kuchlanish farqi rezistor orqali tushiriladi.",
    codePurpose:
      "Kod bloklari bitta design qarorini avtomatlashtirish va parametrlar o‘zgarsa natija qanday siljishini tez ko‘rsatish uchun berilgan.",
    graphMeaning:
      "Grafik manba kuchlanishi oshganda tok qanday o‘zgarishini va rezistor qiymati dizaynni qanday yumshatishini ko‘rsatadi.",
  },
  constraints: [
    "LED toki maksimal ruxsat etilgan qiymatdan oshmasin.",
    "Batareya yoki manba kuchlanishidagi o‘zgarishlar hisobga olinsin.",
    "Rezistor quvvati va LED ichki harorati xavfsiz chegarada tursin.",
    "Sxema ishlab chiqarish va tekshirish uchun sodda bo‘lsin.",
  ],
  formulas: [
    {
      label: "Om qonuni",
      expression: "V = I × R",
      meaning: "Ortiqcha kuchlanishni yutadigan ketma-ket rezistorni tanlashda ishlatiladi.",
      origin:
        "Bu tenglama elektr zanjiridagi kuchlanish, tok va qarshilik orasidagi asosiy bog‘lanishni ifodalaydi.",
      units: "V volt, I amper, R ohm",
      interpretation:
        "Agar tokni bilsak va ma’lum kuchlanish tushishini xohlasak, kerakli qarshilikni topa olamiz.",
      useCase:
        "LED atrofidagi ortiqcha kuchlanishni rezistor orqali qanday so‘ndirish kerakligini tushuntirishda ishlatiladi.",
    },
    {
      label: "LED rezistori",
      expression: "R = (V_s - V_f) / I_f",
      meaning: "Manba kuchlanishi, LED oldinga kuchlanishi va kerakli tokdan rezistor hisoblanadi.",
      origin:
        "Bu formula Ohm qonunining amaliy LED dizaynidagi ko‘rinishi bo‘lib, manba va LED orasidagi farqni hisobga oladi.",
      units: "V_s va V_f volt, I_f amper, R ohm",
      interpretation:
        "Manba kuchlanishi bilan LED oldinga kuchlanishi orasidagi farq rezistor zimmasiga tushadi.",
      useCase:
        "Bitta LED, bir nechta LED ketma-ket ulanishi yoki rang bo‘yicha forward voltage farqini hisoblashda ishlatiladi.",
    },
    {
      label: "Rezistor quvvati",
      expression: "P_R = I_f^2 × R",
      meaning: "Rezistor korpusi issiqlikni xavfsiz tarqata olishini tekshiradi.",
      origin:
        "Elektr quvvati tok va qarshilik orqali issiqlikka aylanishini ifodalaydi.",
      units: "P_R watt, I_f amper, R ohm",
      interpretation:
        "Tok qanchalik katta bo‘lsa, rezistordagi yo‘qotishlar kvadrat bo‘yicha oshadi.",
      useCase:
        "Rezistor qizib ketmasligi va nominal quvvat zaxirasi yetarliligini tekshirishda kerak bo‘ladi.",
    },
    {
      label: "LED quvvati",
      expression: "P_LED = V_f × I_f",
      meaning: "Diode ichida elektr quvvatining qancha qismi yorug‘lik va issiqlikka ketishini taxmin qiladi.",
      origin:
        "Har bir elektr komponent ichida quvvatning bir qismi foydali chiqishga, bir qismi esa issiqlikka aylanadi.",
      units: "P_LED watt, V_f volt, I_f amper",
      interpretation:
        "LED ning o‘zi ham energiya iste’mol qiladi; u qancha quvvat yeyayotganini bilish termal baholash uchun muhim.",
      useCase:
        "Yorqinlik, termal yuk va umumiy samaradorlikni baholashda ishlatiladi.",
    },
  ],
  calculations: [
    {
      title: "5 V shinaldan bitta qizil LED",
      inputs: {
        "Manba kuchlanishi": "5.0 V",
        "LED oldinga kuchlanishi": "2.0 V",
        "Maqsad tok": "20 mA",
      },
      formula: "R = (5.0 - 2.0) / 0.020",
      result: "150 Ω",
      note: "150 Ω rezistor nominal sharoitda taxminan 20 mA tok beradi.",
    },
    {
      title: "Rezistor qizishini tekshirish",
      inputs: {
        "Tok": "20 mA",
        "Qarshilik": "150 Ω",
      },
      formula: "P_R = I^2 × R = 0.020^2 × 150",
      result: "0.06 W",
      note: "Oddiy 1/4 W rezistor bu misolda yetarli zaxiraga ega.",
    },
    {
      title: "Samaradorlik ko‘rinishi",
      inputs: {
        "LED quvvati": "0.040 W",
        "Rezistor quvvati": "0.060 W",
      },
      formula: "η = P_LED / (P_LED + P_R)",
      result: "40%",
      note: "Rezistorli boshqaruv sodda, lekin quvvatning katta qismi issiqlikka ketadi.",
    },
  ],
  graphs: {
    title: "Tok va manba kuchlanishi",
    description:
      "Bu egri chiziq ketma-ket rezistor LED’ni qanday himoya qilishini ko‘rsatadi. Manba kuchlanishi oshsa, tok oldindan aniq bashorat qilinadigan tarzda ko‘tariladi.",
    xLabel: "Manba kuchlanishi (V)",
    yLabel: "LED toki (mA)",
    series: [
      {
        name: "150 Ω yechim",
        color: "#c5762d",
        points: [
          { x: 2.2, y: 1.3 },
          { x: 3.0, y: 6.7 },
          { x: 4.0, y: 13.3 },
          { x: 5.0, y: 20.0 },
          { x: 6.0, y: 26.7 },
        ],
      },
      {
        name: "220 Ω yechim",
        color: "#173228",
        points: [
          { x: 2.2, y: 0.9 },
          { x: 3.0, y: 4.5 },
          { x: 4.0, y: 9.1 },
          { x: 5.0, y: 13.6 },
          { x: 6.0, y: 18.2 },
        ],
      },
    ],
  },
  codeSamples: [
    {
      language: "TypeScript",
      filename: "ledCalculator.ts",
      summary: "Ketma-ket rezistor va issiqlik yuklamasini hisoblaydigan qayta ishlatiladigan funksiya.",
      code: `export function ledSeriesResistor(
  supplyVoltage: number,
  forwardVoltage: number,
  targetCurrentMa: number,
) {
  const current = targetCurrentMa / 1000;
  const resistance = (supplyVoltage - forwardVoltage) / current;
  const resistorPower = current * current * resistance;

  return {
    resistanceOhms: Math.round(resistance),
    resistorPowerWatts: Number(resistorPower.toFixed(3)),
  };
}

const design = ledSeriesResistor(5.0, 2.0, 20);
console.log(design);`,
      output: `{
  resistanceOhms: 150,
  resistorPowerWatts: 0.06
}`,
    },
    {
      language: "Python",
      filename: "thermal_check.py",
      summary: "Quvvat va zaxira hisobini tez tekshiradigan notebook uslubidagi kod.",
      code: `def led_margin(supply_v, forward_v, current_ma, resistor_watt_rating):
    current_a = current_ma / 1000.0
    resistor = (supply_v - forward_v) / current_a
    power = current_a ** 2 * resistor
    margin = resistor_watt_rating / power
    return round(resistor), round(power, 3), round(margin, 1)

print(led_margin(5.0, 2.0, 20, 0.25))`,
      output: `(150, 0.06, 4.2)`,
    },
  ],
  notes: [
    "Haqiqiy mahsulotlarda LED binning va harorat drift’i alohida hisobga olinadi.",
    "Agar samaradorlik yoki aniqlik muhim bo‘lsa, rezistor o‘rniga constant-current driver ishlatiladi.",
    "Hozirgi data ataylab modul-modul ajratilgan, keyin grafik, kod va formulalar alohida almashtirilishi oson bo‘ladi.",
  ],
};
