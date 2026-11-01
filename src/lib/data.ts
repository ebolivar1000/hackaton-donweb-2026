export interface Doctor {
  id: string;
  name: string;
  specialtyId: string;
  specialtyName: string;
  matricula: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  avatar: string;
  bio: string;
  days: string[];
  hours: string;
  price: string;
}

export interface Specialty {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  color: string;
  popularSymptoms: string[];
}

export const SPECIALTIES: Specialty[] = [
  {
    id: "cardiologia",
    name: "Cardiología",
    shortDesc: "Prevención, diagnóstico y tratamiento de enfermedades cardiovasculares e hipertensión.",
    fullDesc: "Especialistas en salud del corazón, ecocardiogramas, ergometrías, control de arritmias e hipertensión arterial con tecnología de última generación.",
    iconName: "HeartPulse",
    color: "from-rose-500 to-red-600",
    popularSymptoms: ["Dolor en el pecho", "Palpitaciones", "Presión alta", "Falta de aire", "Mareos al esfuerzo"]
  },
  {
    id: "dermatologia",
    name: "Dermatología",
    shortDesc: "Cuidado integral de la piel, control de lunares, acné y patologías cutáneas.",
    fullDesc: "Dermatología clínica, quirúrgica y estética. Mapeo de lunares digitalizado, tratamientos para psoriasis, alopecia, dermatitis y acné juvenil/adulto.",
    iconName: "Sparkles",
    color: "from-amber-500 to-orange-600",
    popularSymptoms: ["Manchas o lunares que cambian", "Acné severo", "Picazón persistente", "Caída de cabello", "Erupciones cutáneas"]
  },
  {
    id: "pediatria",
    name: "Pediatría",
    shortDesc: "Atención médica preventiva y clínica desde recién nacidos hasta la adolescencia.",
    fullDesc: "Controles de niño sano, seguimiento de crecimiento y desarrollo, calendario nacional de vacunación y guardia pediátrica permanente.",
    iconName: "Baby",
    color: "from-sky-500 to-blue-600",
    popularSymptoms: ["Fiebre infantil", "Tos persistente", "Problemas de crecimiento", "Control preventivo de rutina", "Alergias en niños"]
  },
  {
    id: "traumatologia",
    name: "Traumatología y Ortopedia",
    shortDesc: "Lesiones osteoarticulares, columna, rodilla, hombro y medicina deportiva.",
    fullDesc: "Tratamiento de fracturas, esguinces, hernias discales, artrosis y lesiones ligamentosas. Rehabilitación funcional integral.",
    iconName: "Bone",
    color: "from-emerald-500 to-teal-600",
    popularSymptoms: ["Dolor articular o lumbar", "Esguince de tobillo", "Dolor de rodilla al caminar", "Lesión deportiva", "Tendinitis"]
  },
  {
    id: "ginecologia",
    name: "Ginecología y Obstetricia",
    shortDesc: "Salud integral de la mujer en todas las etapas, control prenatal y salud reproductiva.",
    fullDesc: "Papanicolau y colposcopía, ecografías ginecológicas y obstétricas 4D/5D, planificación familiar, climaterio y patología mamaria.",
    iconName: "UserCheck",
    color: "from-pink-500 to-rose-600",
    popularSymptoms: ["Control anual femenino", "Retraso menstrual / Embarazo", "Dolor pélvico", "Chequeo mamario", "Menopausia"]
  },
  {
    id: "neurologia",
    name: "Neurología",
    shortDesc: "Diagnóstico y tratamiento de cefaleas, migrañas, epilepsia y trastornos cognitivos.",
    fullDesc: "Abordaje integral de cefaleas crónicas, trastornos de memoria, temblores, insomnio patológico, ACV preventivo y electroencefalogramas.",
    iconName: "Brain",
    color: "from-violet-500 to-purple-600",
    popularSymptoms: ["Migrañas frecuentes", "Pérdida de memoria", "Mareos y vértigo", "Temblores o adormecimiento", "Trastornos del sueño"]
  },
  {
    id: "oftalmologia",
    name: "Oftalmología",
    shortDesc: "Control de agudeza visual, fondo de ojo, presión ocular y cirugía refractiva.",
    fullDesc: "Exámenes computarizados de visión, prescripción de lentes, detección de glaucoma, cataratas, ojo seco y retinopatías.",
    iconName: "Eye",
    color: "from-cyan-500 to-blue-500",
    popularSymptoms: ["Visión borrosa", "Ojos secos o enrojecidos", "Dificultad para leer de noche", "Presión ocular alta", "Destellos o manchas visuales"]
  },
  {
    id: "gastroenterologia",
    name: "Gastroenterología",
    shortDesc: "Patologías digestivas, reflujo, colon irritable, hígado y endoscopías.",
    fullDesc: "Diagnóstico de gastritis, reflujo gastroesofágico, celiaquía, esteatosis hepática y videocolonoscopía diagnóstica con sedación.",
    iconName: "Stethoscope",
    color: "from-teal-500 to-emerald-600",
    popularSymptoms: ["Acidez y reflujo frecuente", "Dolor abdominal recurrente", "Hinchazón o cólicos", "Problemas de digestión", "Sospecha de celiaquía"]
  },
  {
    id: "urologia",
    name: "Urología",
    shortDesc: "Salud del tracto urinario en hombres y mujeres, próstata y litiasis renal.",
    fullDesc: "Chequeos urológicos preventivos, control de próstata, tratamiento de cálculos renales, infecciones urinarias complejas y andrología.",
    iconName: "Activity",
    color: "from-indigo-500 to-blue-700",
    popularSymptoms: ["Dificultad o ardor al orinar", "Control prostático anual", "Dolor lumbar agudo (cólico renal)", "Infección urinaria recurrente"]
  },
  {
    id: "otorrino",
    name: "Otorrinolaringología",
    shortDesc: "Tratamiento de oído, nariz, senos paranasales, garganta y cuerdas vocales.",
    fullDesc: "Audiometrías, tratamiento de sinusitis crónica, desviación de tabique, ronquidos, apnea del sueño, vértigo periférico y laringitis.",
    iconName: "Headphones",
    color: "from-blue-500 to-cyan-600",
    popularSymptoms: ["Zumbidos o dolor de oído", "Congestión nasal crónica", "Ronquidos y apnea", "Disfonía o dolor de garganta", "Pérdida de audición"]
  },
  {
    id: "psiquiatria",
    name: "Psiquiatría y Salud Mental",
    shortDesc: "Atención médica para trastornos de ansiedad, depresión, estrés agudo e insomnio.",
    fullDesc: "Enfoque clínico interdisciplinario, psicofarmacología moderna personalizada, manejo de ataques de pánico y neurodivergencias.",
    iconName: "Smile",
    color: "from-purple-500 to-indigo-600",
    popularSymptoms: ["Ataques de pánico o ansiedad alta", "Insomnio severo", "Tristeza profunda o depresión", "Estrés laboral (burnout)", "Cambios drásticos de humor"]
  },
  {
    id: "endocrinologia",
    name: "Endocrinología y Metabolismo",
    shortDesc: "Control de tiroides, diabetes, metabolismo óseo y desórdenes hormonales.",
    fullDesc: "Manejo integral de hipo/hipertiroidismo, diabetes tipo 1 y 2, resistencia a la insulina, nódulos tiroideos y salud metabólica.",
    iconName: "ShieldAlert",
    color: "from-amber-600 to-yellow-600",
    popularSymptoms: ["Fatiga crónica", "Variaciones bruscas de peso", "Hipotiroidismo / Tiroides alterada", "Glucemia elevada / Sed excesiva"]
  }
];

export const DOCTORS: Doctor[] = [
  // Cardiología
  {
    id: "doc-1",
    name: "Dr. Martín Álvarez",
    specialtyId: "cardiologia",
    specialtyName: "Cardiología",
    matricula: "MN 142.890",
    rating: 4.9,
    reviewsCount: 128,
    experienceYears: 16,
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80",
    bio: "Especialista en cardiología clínica y prevención coronaria. Ex Jefe de Residentes del Hospital Italiano.",
    days: ["Lunes", "Miércoles", "Viernes"],
    hours: "09:00 a 14:00 hs",
    price: "$ 18.000"
  },
  {
    id: "doc-2",
    name: "Dra. Lucía Fernández",
    specialtyId: "cardiologia",
    specialtyName: "Cardiología",
    matricula: "MN 158.420",
    rating: 5.0,
    reviewsCount: 94,
    experienceYears: 12,
    avatar: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&auto=format&fit=crop&q=80",
    bio: "Cardióloga ecocardiografista. Miembro titular de la Sociedad Argentina de Cardiología.",
    days: ["Martes", "Jueves", "Sábados"],
    hours: "14:00 a 19:00 hs",
    price: "$ 19.500"
  },

  // Dermatología
  {
    id: "doc-3",
    name: "Dra. Valentina Ruiz",
    specialtyId: "dermatologia",
    specialtyName: "Dermatología",
    matricula: "MN 165.731",
    rating: 4.9,
    reviewsCount: 210,
    experienceYears: 10,
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80",
    bio: "Dermatología integral, mapeo corporal digital de lunares y tratamiento avanzado del acné.",
    days: ["Lunes", "Martes", "Jueves"],
    hours: "10:00 a 16:00 hs",
    price: "$ 16.000"
  },
  {
    id: "doc-4",
    name: "Dr. Tomás Herrera",
    specialtyId: "dermatologia",
    specialtyName: "Dermatología",
    matricula: "MN 139.112",
    rating: 4.8,
    reviewsCount: 88,
    experienceYears: 14,
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80",
    bio: "Dermatocirugía y patología cutánea. Especializado en control de manchas y biopsias de piel.",
    days: ["Miércoles", "Viernes"],
    hours: "13:00 a 18:30 hs",
    price: "$ 17.500"
  },

  // Pediatría
  {
    id: "doc-5",
    name: "Dra. Laura Castro",
    specialtyId: "pediatria",
    specialtyName: "Pediatría",
    matricula: "MN 147.602",
    rating: 5.0,
    reviewsCount: 312,
    experienceYears: 18,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    bio: "Pediatra de cabecera con amplia trayectoria en el Hospital de Niños Dr. Ricardo Gutiérrez.",
    days: ["Lunes", "Martes", "Miércoles", "Viernes"],
    hours: "08:30 a 13:30 hs",
    price: "$ 15.000"
  },
  {
    id: "doc-6",
    name: "Dr. Andrés Romero",
    specialtyId: "pediatria",
    specialtyName: "Pediatría",
    matricula: "MN 161.409",
    rating: 4.9,
    reviewsCount: 145,
    experienceYears: 9,
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80",
    bio: "Pediatra neonatólogo. Seguimiento del recién nacido prematuro y lactancia materna.",
    days: ["Martes", "Jueves", "Sábados"],
    hours: "14:00 a 19:30 hs",
    price: "$ 15.500"
  },

  // Traumatología
  {
    id: "doc-7",
    name: "Dr. Ricardo Moreno",
    specialtyId: "traumatologia",
    specialtyName: "Traumatología y Ortopedia",
    matricula: "MN 132.880",
    rating: 4.8,
    reviewsCount: 167,
    experienceYears: 20,
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&auto=format&fit=crop&q=80",
    bio: "Especialista en cirugía artroscópica de rodilla y medicina de deportistas de alto rendimiento.",
    days: ["Lunes", "Miércoles", "Jueves"],
    hours: "11:00 a 17:00 hs",
    price: "$ 19.000"
  },
  {
    id: "doc-8",
    name: "Dr. Pablo Suárez",
    specialtyId: "traumatologia",
    specialtyName: "Traumatología y Ortopedia",
    matricula: "MN 153.210",
    rating: 4.9,
    reviewsCount: 104,
    experienceYears: 11,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    bio: "Traumatólogo de columna vertebral y cadera. Abordaje mínimamente invasivo del dolor lumbar.",
    days: ["Martes", "Viernes"],
    hours: "09:00 a 15:00 hs",
    price: "$ 18.500"
  },

  // Ginecología
  {
    id: "doc-9",
    name: "Dra. Carolina Méndez",
    specialtyId: "ginecologia",
    specialtyName: "Ginecología y Obstetricia",
    matricula: "MN 149.882",
    rating: 5.0,
    reviewsCount: 280,
    experienceYears: 15,
    avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&auto=format&fit=crop&q=80",
    bio: "Obstetra y ginecóloga. Acompañamiento respetuoso del parto, ecografías morfológicas.",
    days: ["Lunes", "Miércoles", "Viernes"],
    hours: "09:00 a 14:00 hs",
    price: "$ 17.000"
  },
  {
    id: "doc-10",
    name: "Dra. Ana Gutiérrez",
    specialtyId: "ginecologia",
    specialtyName: "Ginecología y Obstetricia",
    matricula: "MN 166.501",
    rating: 4.9,
    reviewsCount: 119,
    experienceYears: 8,
    avatar: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400&auto=format&fit=crop&q=80",
    bio: "Ginecología infanto-juvenil, anticoncepción de larga duración (DIU/implantes) y salud reproductiva.",
    days: ["Martes", "Jueves", "Sábados"],
    hours: "13:30 a 18:30 hs",
    price: "$ 16.500"
  },

  // Neurología
  {
    id: "doc-11",
    name: "Dr. Federico Ramos",
    specialtyId: "neurologia",
    specialtyName: "Neurología",
    matricula: "MN 138.994",
    rating: 4.9,
    reviewsCount: 133,
    experienceYears: 17,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    bio: "Neurólogo clínico. Centro de referencia en cefaleas, migraña crónica y neuropatías periféricas.",
    days: ["Lunes", "Jueves"],
    hours: "10:00 a 16:00 hs",
    price: "$ 21.000"
  },
  {
    id: "doc-12",
    name: "Dr. Ignacio Torres",
    specialtyId: "neurologia",
    specialtyName: "Neurología",
    matricula: "MN 155.430",
    rating: 4.8,
    reviewsCount: 82,
    experienceYears: 12,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    bio: "Especialista en trastornos del sueño, polisomnografías y deterioro cognitivo del adulto mayor.",
    days: ["Martes", "Miércoles", "Viernes"],
    hours: "14:00 a 19:00 hs",
    price: "$ 20.000"
  },

  // Oftalmología
  {
    id: "doc-13",
    name: "Dra. María López",
    specialtyId: "oftalmologia",
    specialtyName: "Oftalmología",
    matricula: "MN 144.120",
    rating: 4.9,
    reviewsCount: 198,
    experienceYears: 14,
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80",
    bio: "Cirujana oftalmológica especializada en catarata, refractiva láser y síndrome de ojo seco severo.",
    days: ["Lunes", "Martes", "Jueves"],
    hours: "09:00 a 15:00 hs",
    price: "$ 16.000"
  },
  {
    id: "doc-14",
    name: "Dr. Santiago Díaz",
    specialtyId: "oftalmologia",
    specialtyName: "Oftalmología",
    matricula: "MN 160.890",
    rating: 4.8,
    reviewsCount: 76,
    experienceYears: 10,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    bio: "Control visual infantil, estrabismo y retinopatía diabética con tecnología OCT de retina.",
    days: ["Miércoles", "Viernes"],
    hours: "12:00 a 18:00 hs",
    price: "$ 16.500"
  },

  // Gastroenterología
  {
    id: "doc-15",
    name: "Dr. Gabriel Pérez",
    specialtyId: "gastroenterologia",
    specialtyName: "Gastroenterología",
    matricula: "MN 136.782",
    rating: 4.9,
    reviewsCount: 154,
    experienceYears: 19,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
    bio: "Endoscopista digestivo. Especialista en colon irritable, reflujo severo y enfermedad celíaca.",
    days: ["Lunes", "Miércoles"],
    hours: "08:30 a 14:00 hs",
    price: "$ 18.000"
  },
  {
    id: "doc-16",
    name: "Dra. Florencia Navarro",
    specialtyId: "gastroenterologia",
    specialtyName: "Gastroenterología",
    matricula: "MN 159.330",
    rating: 5.0,
    reviewsCount: 112,
    experienceYears: 11,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    bio: "Hepatóloga y gastroenteróloga clínica. Control de hígado graso y microbioma intestinal.",
    days: ["Martes", "Jueves", "Viernes"],
    hours: "13:00 a 18:30 hs",
    price: "$ 18.500"
  },

  // Urología
  {
    id: "doc-17",
    name: "Dr. Diego Acosta",
    specialtyId: "urologia",
    specialtyName: "Urología",
    matricula: "MN 141.229",
    rating: 4.9,
    reviewsCount: 130,
    experienceYears: 15,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    bio: "Especialista en litiasis renal láser y chequeos preventivos de próstata con PSA y eco.",
    days: ["Lunes", "Jueves"],
    hours: "10:00 a 16:00 hs",
    price: "$ 19.000"
  },
  {
    id: "doc-18",
    name: "Dr. Matías Silva",
    specialtyId: "urologia",
    specialtyName: "Urología",
    matricula: "MN 163.774",
    rating: 4.8,
    reviewsCount: 65,
    experienceYears: 8,
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80",
    bio: "Urología general y andrología. Tratamiento de infecciones urinarias complejas.",
    days: ["Martes", "Miércoles", "Viernes"],
    hours: "14:00 a 19:30 hs",
    price: "$ 18.000"
  },

  // Otorrino
  {
    id: "doc-19",
    name: "Dra. Camila Ríos",
    specialtyId: "otorrino",
    specialtyName: "Otorrinolaringología",
    matricula: "MN 152.019",
    rating: 4.9,
    reviewsCount: 187,
    experienceYears: 13,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    bio: "Cirugía de tabique nasal, tratamiento de sinusitis y pérdida del olfato/gusto.",
    days: ["Lunes", "Martes", "Viernes"],
    hours: "09:30 a 14:30 hs",
    price: "$ 16.500"
  },
  {
    id: "doc-20",
    name: "Dr. Nicolás Vargas",
    specialtyId: "otorrino",
    specialtyName: "Otorrinolaringología",
    matricula: "MN 167.881",
    rating: 4.8,
    reviewsCount: 93,
    experienceYears: 9,
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&auto=format&fit=crop&q=80",
    bio: "Estudios audiológicos completos, vértigo posicional y patologías de la voz en profesionales.",
    days: ["Miércoles", "Jueves", "Sábados"],
    hours: "13:00 a 18:00 hs",
    price: "$ 16.000"
  },

  // Psiquiatría
  {
    id: "doc-21",
    name: "Dra. Sofía Ortiz",
    specialtyId: "psiquiatria",
    specialtyName: "Psiquiatría y Salud Mental",
    matricula: "MN 145.312",
    rating: 5.0,
    reviewsCount: 220,
    experienceYears: 16,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    bio: "Psiquiatra de adultos. Abordaje moderno y empático de crisis de pánico, ansiedad y burnout.",
    days: ["Lunes", "Miércoles", "Jueves"],
    hours: "11:00 a 18:00 hs",
    price: "$ 22.000"
  },
  {
    id: "doc-22",
    name: "Dr. Emilio Cardozo",
    specialtyId: "psiquiatria",
    specialtyName: "Psiquiatría y Salud Mental",
    matricula: "MN 157.098",
    rating: 4.9,
    reviewsCount: 140,
    experienceYears: 12,
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&auto=format&fit=crop&q=80",
    bio: "Especialista en trastornos del ánimo, insomnio y neuropsicofarmacología.",
    days: ["Martes", "Viernes"],
    hours: "13:00 a 19:30 hs",
    price: "$ 21.000"
  },

  // Endocrinología
  {
    id: "doc-23",
    name: "Dra. Isabel Medina",
    specialtyId: "endocrinologia",
    specialtyName: "Endocrinología y Metabolismo",
    matricula: "MN 148.901",
    rating: 4.9,
    reviewsCount: 175,
    experienceYears: 15,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80",
    bio: "Tiroides, nódulos tiroideos y punción eco-guiada. Manejo integral de la resistencia a la insulina.",
    days: ["Lunes", "Martes", "Jueves"],
    hours: "09:00 a 14:00 hs",
    price: "$ 17.500"
  },
  {
    id: "doc-24",
    name: "Dr. Joaquín Aguilar",
    specialtyId: "endocrinologia",
    specialtyName: "Endocrinología y Metabolismo",
    matricula: "MN 164.215",
    rating: 4.8,
    reviewsCount: 91,
    experienceYears: 10,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
    bio: "Diabetes mellitus, monitores continuos de glucosa y metabolismo del calcio y osteoporosis.",
    days: ["Miércoles", "Viernes", "Sábados"],
    hours: "13:30 a 18:30 hs",
    price: "$ 18.000"
  }
];

export const CLINIC_INFO = {
  name: "MediConnect",
  tagline: "Tu salud, a un clic con atención médica de vanguardia e IA integrada",
  phone: "+54 11 4567-8900",
  whatsapp: "+54 9 11 2345-6789",
  whatsappUrl: "https://wa.me/5491123456789?text=Hola%2C%20quisiera%20consultar%20por%20un%20turno%20en%20MediConnect",
  email: "contacto@mediconnect.com.ar",
  address: "Av. Santa Fe 2450, Barrio Norte, Ciudad Autónoma de Buenos Aires",
  hours: "Lunes a Viernes: 08:00 a 20:00 hs | Sábados: 09:00 a 14:00 hs | Guardia 24hs",
  emergencyPhone: "0800-444-MEDI (6334)"
};
