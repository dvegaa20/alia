"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Leaf, HeartPulse, GraduationCap, PawPrint, Scale } from "lucide-react";
import { Feature, type CampaignItem } from "@/components/ui/feature-with-image-carousel";

const categories = [
  { label: "Medio ambiente", icon: Leaf },
  { label: "Salud", icon: HeartPulse },
  { label: "Educación", icon: GraduationCap },
  { label: "Animales", icon: PawPrint },
  { label: "Justicia social", icon: Scale },
];

interface CategoryData {
  badge: string;
  title: string;
  description: string;
  items: CampaignItem[];
}

const campaignsByCategory: Record<string, CategoryData> = {
  "Medio ambiente": {
    badge: "Eco",
    title: "Campañas que cuidan nuestro planeta",
    description:
      "Desde reforestación hasta limpieza de ríos, estas organizaciones luchan cada día por un futuro más verde y sostenible para todos.",
    items: [
      {
        name: "Fundación Planeta Vivo",
        description:
          "Reforestación nativa y educación ambiental para frenar el impacto del cambio climático.",
        location: "Cali, Colombia",
        tag: "Planet",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDXheFEFBqfIMbKQ4_1JRkkAecNmQqsd0OD54BoxI47xQ3dE22tXflT9jSEC58LD-qx6bi4cR21Jic5bf4-2jk7y9ELMkYmceNOm5q5_TGeoagmvvcgjsnRNJB_aA6DMlQyiJz_9yA5-vgj-a6DEj-wLYDPNvdSEsFzk0L1oX386-zSWGNTq8irTaFd7IJFP8ZqqnHHQkj2PP1jpgsRdrQ0ytyCbOR3xDwNrVn9SHoEVURpdqB4b8cGL96X_Luuu-j1VM_gGZ8A58E",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpqOnn4OZIwo8Lrw105tw-zWjS4ocbPXyYB2m3icoTMSSCV3x_uuPnNM3CFIslTyOV837ca41I2gD8M60vjbuTZ7ojGPvvVHqjnokX0WMIUXsumubG8256OyXPXCt6C3HjZVLQ5PLquJ1pMm8sCuT45oJ6aryFnmQ03WadpsDyEXlSOul3hgLQRT3GgbMEYdtMcERnrE5y1BUbwKQY20McRoH9uQHJEAmB23MZX6z6r4mDBe4LPpEghx_pEuhnkylL6EuiwVSNDSU",
      },
      {
        name: "Guardianes del Agua",
        description:
          "Protección de cuencas hídricas y acceso a agua potable en comunidades rurales vulnerables.",
        location: "Manizales, Colombia",
        tag: "Water",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDXheFEFBqfIMbKQ4_1JRkkAecNmQqsd0OD54BoxI47xQ3dE22tXflT9jSEC58LD-qx6bi4cR21Jic5bf4-2jk7y9ELMkYmceNOm5q5_TGeoagmvvcgjsnRNJB_aA6DMlQyiJz_9yA5-vgj-a6DEj-wLYDPNvdSEsFzk0L1oX386-zSWGNTq8irTaFd7IJFP8ZqqnHHQkj2PP1jpgsRdrQ0ytyCbOR3xDwNrVn9SHoEVURpdqB4b8cGL96X_Luuu-j1VM_gGZ8A58E",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpqOnn4OZIwo8Lrw105tw-zWjS4ocbPXyYB2m3icoTMSSCV3x_uuPnNM3CFIslTyOV837ca41I2gD8M60vjbuTZ7ojGPvvVHqjnokX0WMIUXsumubG8256OyXPXCt6C3HjZVLQ5PLquJ1pMm8sCuT45oJ6aryFnmQ03WadpsDyEXlSOul3hgLQRT3GgbMEYdtMcERnrE5y1BUbwKQY20McRoH9uQHJEAmB23MZX6z6r4mDBe4LPpEghx_pEuhnkylL6EuiwVSNDSU",
      },
      {
        name: "Semilleros Verdes",
        description:
          "Programa de huertos urbanos comunitarios para fomentar la seguridad alimentaria y el cuidado del medio ambiente.",
        location: "Bogotá, Colombia",
        tag: "Urban",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDXheFEFBqfIMbKQ4_1JRkkAecNmQqsd0OD54BoxI47xQ3dE22tXflT9jSEC58LD-qx6bi4cR21Jic5bf4-2jk7y9ELMkYmceNOm5q5_TGeoagmvvcgjsnRNJB_aA6DMlQyiJz_9yA5-vgj-a6DEj-wLYDPNvdSEsFzk0L1oX386-zSWGNTq8irTaFd7IJFP8ZqqnHHQkj2PP1jpgsRdrQ0ytyCbOR3xDwNrVn9SHoEVURpdqB4b8cGL96X_Luuu-j1VM_gGZ8A58E",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpqOnn4OZIwo8Lrw105tw-zWjS4ocbPXyYB2m3icoTMSSCV3x_uuPnNM3CFIslTyOV837ca41I2gD8M60vjbuTZ7ojGPvvVHqjnokX0WMIUXsumubG8256OyXPXCt6C3HjZVLQ5PLquJ1pMm8sCuT45oJ6aryFnmQ03WadpsDyEXlSOul3hgLQRT3GgbMEYdtMcERnrE5y1BUbwKQY20McRoH9uQHJEAmB23MZX6z6r4mDBe4LPpEghx_pEuhnkylL6EuiwVSNDSU",
      },
    ],
  },
  Salud: {
    badge: "Salud",
    title: "Cuidamos la salud de quien más lo necesita",
    description:
      "Descubre campañas de salud comunitaria, acceso a medicina y bienestar integral en poblaciones vulnerables.",
    items: [
      {
        name: "Salud Sin Fronteras",
        description:
          "Brigadas médicas itinerantes que llevan atención primaria a comunidades remotas sin acceso a centros de salud.",
        location: "Chocó, Colombia",
        tag: "Health",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuA52AHrbZj9BazPQmeg3xiMjxYAjXgFaIWq8U3qmKNu5i2RpYhoF4E1O8h20H6G_xlcs5DJKhVA0ahOFePEsJiTwmN5fv2CdeuwKQU5L5evlwJLdSXAYMIFtGRUG4H_UTtTtYuuvM4w7Wos8Ex2r7RVCOZRkbYfQ-lsbh3r61WrhRc044QwmGxDlF6YHp8WVkbFqKj4WHFd3huuYToDh-S2h7LpPIhDgE8il25KneDaTulCE5C3Mzj58LXWsbpUYFT_UlqwBjhCeO0",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuARppnct6HKt5WSAwtczBBH9g89DH7zKWMByEHLtPBsl0FSD9r9mxpoNYhpc7C1vOfOhWrL_c3bAhj42QQ3Z659S3KcPBt6HbRGa-AXMu4l_i13QGNYh-8zn4NYLOeb2vhv9JG9oy3elIiPwRmDnX_8Zcwg4jpDkh_J5ihJHoC_ci3SY3YFiZydl7wufSpJ3EwiSPUKKnUc3EFsnfN_hPrAJDyxUQBIL7Vys1Da-wqbon3bQV6uoduUr5gYn8smZAuuFTuqhxPeI0k",
      },
      {
        name: "Sonrisas Sanas",
        description:
          "Programa de prevención dental infantil que atiende a más de 3.000 niños en zonas marginadas cada año.",
        location: "Barranquilla, Colombia",
        tag: "Dental",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuA52AHrbZj9BazPQmeg3xiMjxYAjXgFaIWq8U3qmKNu5i2RpYhoF4E1O8h20H6G_xlcs5DJKhVA0ahOFePEsJiTwmN5fv2CdeuwKQU5L5evlwJLdSXAYMIFtGRUG4H_UTtTtYuuvM4w7Wos8Ex2r7RVCOZRkbYfQ-lsbh3r61WrhRc044QwmGxDlF6YHp8WVkbFqKj4WHFd3huuYToDh-S2h7LpPIhDgE8il25KneDaTulCE5C3Mzj58LXWsbpUYFT_UlqwBjhCeO0",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuARppnct6HKt5WSAwtczBBH9g89DH7zKWMByEHLtPBsl0FSD9r9mxpoNYhpc7C1vOfOhWrL_c3bAhj42QQ3Z659S3KcPBt6HbRGa-AXMu4l_i13QGNYh-8zn4NYLOeb2vhv9JG9oy3elIiPwRmDnX_8Zcwg4jpDkh_J5ihJHoC_ci3SY3YFiZydl7wufSpJ3EwiSPUKKnUc3EFsnfN_hPrAJDyxUQBIL7Vys1Da-wqbon3bQV6uoduUr5gYn8smZAuuFTuqhxPeI0k",
      },
      {
        name: "Mente Abierta",
        description:
          "Red de acompañamiento en salud mental gratuita para jóvenes en situación de riesgo social.",
        location: "Medellín, Colombia",
        tag: "Mental",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuA52AHrbZj9BazPQmeg3xiMjxYAjXgFaIWq8U3qmKNu5i2RpYhoF4E1O8h20H6G_xlcs5DJKhVA0ahOFePEsJiTwmN5fv2CdeuwKQU5L5evlwJLdSXAYMIFtGRUG4H_UTtTtYuuvM4w7Wos8Ex2r7RVCOZRkbYfQ-lsbh3r61WrhRc044QwmGxDlF6YHp8WVkbFqKj4WHFd3huuYToDh-S2h7LpPIhDgE8il25KneDaTulCE5C3Mzj58LXWsbpUYFT_UlqwBjhCeO0",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuARppnct6HKt5WSAwtczBBH9g89DH7zKWMByEHLtPBsl0FSD9r9mxpoNYhpc7C1vOfOhWrL_c3bAhj42QQ3Z659S3KcPBt6HbRGa-AXMu4l_i13QGNYh-8zn4NYLOeb2vhv9JG9oy3elIiPwRmDnX_8Zcwg4jpDkh_J5ihJHoC_ci3SY3YFiZydl7wufSpJ3EwiSPUKKnUc3EFsnfN_hPrAJDyxUQBIL7Vys1Da-wqbon3bQV6uoduUr5gYn8smZAuuFTuqhxPeI0k",
      },
    ],
  },
  Educación: {
    badge: "Educación",
    title: "El conocimiento transforma comunidades",
    description:
      "Programas educativos que abren puertas: refuerzo escolar, becas, alfabetización digital y formación para el empleo.",
    items: [
      {
        name: "Red de Apoyo Escolar",
        description:
          "Brindamos refuerzo educativo y nutricional a niños en zonas vulnerables de la periferia.",
        location: "Bogotá, Colombia",
        tag: "Impact",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuA52AHrbZj9BazPQmeg3xiMjxYAjXgFaIWq8U3qmKNu5i2RpYhoF4E1O8h20H6G_xlcs5DJKhVA0ahOFePEsJiTwmN5fv2CdeuwKQU5L5evlwJLdSXAYMIFtGRUG4H_UTtTtYuuvM4w7Wos8Ex2r7RVCOZRkbYfQ-lsbh3r61WrhRc044QwmGxDlF6YHp8WVkbFqKj4WHFd3huuYToDh-S2h7LpPIhDgE8il25KneDaTulCE5C3Mzj58LXWsbpUYFT_UlqwBjhCeO0",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuARppnct6HKt5WSAwtczBBH9g89DH7zKWMByEHLtPBsl0FSD9r9mxpoNYhpc7C1vOfOhWrL_c3bAhj42QQ3Z659S3KcPBt6HbRGa-AXMu4l_i13QGNYh-8zn4NYLOeb2vhv9JG9oy3elIiPwRmDnX_8Zcwg4jpDkh_J5ihJHoC_ci3SY3YFiZydl7wufSpJ3EwiSPUKKnUc3EFsnfN_hPrAJDyxUQBIL7Vys1Da-wqbon3bQV6uoduUr5gYn8smZAuuFTuqhxPeI0k",
      },
      {
        name: "Código Futuro",
        description:
          "Talleres de programación y robótica para jóvenes de estratos bajos, abriendo puertas al mundo tech.",
        location: "Bucaramanga, Colombia",
        tag: "Tech",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuA52AHrbZj9BazPQmeg3xiMjxYAjXgFaIWq8U3qmKNu5i2RpYhoF4E1O8h20H6G_xlcs5DJKhVA0ahOFePEsJiTwmN5fv2CdeuwKQU5L5evlwJLdSXAYMIFtGRUG4H_UTtTtYuuvM4w7Wos8Ex2r7RVCOZRkbYfQ-lsbh3r61WrhRc044QwmGxDlF6YHp8WVkbFqKj4WHFd3huuYToDh-S2h7LpPIhDgE8il25KneDaTulCE5C3Mzj58LXWsbpUYFT_UlqwBjhCeO0",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuARppnct6HKt5WSAwtczBBH9g89DH7zKWMByEHLtPBsl0FSD9r9mxpoNYhpc7C1vOfOhWrL_c3bAhj42QQ3Z659S3KcPBt6HbRGa-AXMu4l_i13QGNYh-8zn4NYLOeb2vhv9JG9oy3elIiPwRmDnX_8Zcwg4jpDkh_J5ihJHoC_ci3SY3YFiZydl7wufSpJ3EwiSPUKKnUc3EFsnfN_hPrAJDyxUQBIL7Vys1Da-wqbon3bQV6uoduUr5gYn8smZAuuFTuqhxPeI0k",
      },
      {
        name: "Letras Libres",
        description:
          "Bibliotecas comunitarias itinerantes que llevan lectura y cultura a barrios alejados de los centros urbanos.",
        location: "Pereira, Colombia",
        tag: "Culture",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuA52AHrbZj9BazPQmeg3xiMjxYAjXgFaIWq8U3qmKNu5i2RpYhoF4E1O8h20H6G_xlcs5DJKhVA0ahOFePEsJiTwmN5fv2CdeuwKQU5L5evlwJLdSXAYMIFtGRUG4H_UTtTtYuuvM4w7Wos8Ex2r7RVCOZRkbYfQ-lsbh3r61WrhRc044QwmGxDlF6YHp8WVkbFqKj4WHFd3huuYToDh-S2h7LpPIhDgE8il25KneDaTulCE5C3Mzj58LXWsbpUYFT_UlqwBjhCeO0",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuARppnct6HKt5WSAwtczBBH9g89DH7zKWMByEHLtPBsl0FSD9r9mxpoNYhpc7C1vOfOhWrL_c3bAhj42QQ3Z659S3KcPBt6HbRGa-AXMu4l_i13QGNYh-8zn4NYLOeb2vhv9JG9oy3elIiPwRmDnX_8Zcwg4jpDkh_J5ihJHoC_ci3SY3YFiZydl7wufSpJ3EwiSPUKKnUc3EFsnfN_hPrAJDyxUQBIL7Vys1Da-wqbon3bQV6uoduUr5gYn8smZAuuFTuqhxPeI0k",
      },
    ],
  },
  Animales: {
    badge: "Animales",
    title: "Protegemos a quienes no tienen voz",
    description:
      "Refugios, rescate animal y campañas de esterilización para construir una sociedad más compasiva con todas las especies.",
    items: [
      {
        name: "Huellas de Libertad",
        description:
          "Refugio dedicado al rescate, rehabilitación y adopción responsable de animales domésticos.",
        location: "Medellín, Colombia",
        tag: "Local",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDdlmeDvcYwDW-9Zd4NbHOwOYRIfeihBEcBWHyhveBiTVKhzE1O7Jr-_hkxQ_dG01m336uR56P_fU7nSpip_KL14zOEqlmLsezE1NuMsYGe5FcyEp7-0E6q6vdjIfr5Gankmc5S001VjJRP_Q_SCc38Zj8yPKiBJRhHtstTTvheM-fN8_BZUwpBXZ1Duj8boh3ID9ezzSS7P2TuuJajgQ1MWfxcoUG9WsbpHIzbQnDw6eX3SGwgw60CAYj3tgoM_JAd3oKO006X4Ho",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpvGmZUa68qKUKC-FmqImP4Wl6FcCjaGHgrSknQQIZ9mJyxjVy9N5UYRzxaonQwUPYveVS68qcs58BSwzdWafICvmkFo8TJcHzG7-QJduGFPxVhgw9nKoU46F0SRUvw28CkpNw2v9_Nd8tLX5YxcydRf62lAsRMyhm92uSrS7sTuOT14FUlLRCaQdbVGlBUDdznCnEmjnBv0hTaDiglU5RpBHqXb_T_ZXXNDGynvH1evUK6O1chw4rKajdVS-IqTylmLSwFk7jpNI",
      },
      {
        name: "Patitas Felices",
        description:
          "Campañas de esterilización masiva y educación sobre tenencia responsable de mascotas en barrios populares.",
        location: "Cartagena, Colombia",
        tag: "Campaign",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDdlmeDvcYwDW-9Zd4NbHOwOYRIfeihBEcBWHyhveBiTVKhzE1O7Jr-_hkxQ_dG01m336uR56P_fU7nSpip_KL14zOEqlmLsezE1NuMsYGe5FcyEp7-0E6q6vdjIfr5Gankmc5S001VjJRP_Q_SCc38Zj8yPKiBJRhHtstTTvheM-fN8_BZUwpBXZ1Duj8boh3ID9ezzSS7P2TuuJajgQ1MWfxcoUG9WsbpHIzbQnDw6eX3SGwgw60CAYj3tgoM_JAd3oKO006X4Ho",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpvGmZUa68qKUKC-FmqImP4Wl6FcCjaGHgrSknQQIZ9mJyxjVy9N5UYRzxaonQwUPYveVS68qcs58BSwzdWafICvmkFo8TJcHzG7-QJduGFPxVhgw9nKoU46F0SRUvw28CkpNw2v9_Nd8tLX5YxcydRf62lAsRMyhm92uSrS7sTuOT14FUlLRCaQdbVGlBUDdznCnEmjnBv0hTaDiglU5RpBHqXb_T_ZXXNDGynvH1evUK6O1chw4rKajdVS-IqTylmLSwFk7jpNI",
      },
      {
        name: "Alas y Raíces",
        description:
          "Conservación de fauna silvestre endémica y restauración de hábitats naturales en la región andina.",
        location: "Manizales, Colombia",
        tag: "Wildlife",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDdlmeDvcYwDW-9Zd4NbHOwOYRIfeihBEcBWHyhveBiTVKhzE1O7Jr-_hkxQ_dG01m336uR56P_fU7nSpip_KL14zOEqlmLsezE1NuMsYGe5FcyEp7-0E6q6vdjIfr5Gankmc5S001VjJRP_Q_SCc38Zj8yPKiBJRhHtstTTvheM-fN8_BZUwpBXZ1Duj8boh3ID9ezzSS7P2TuuJajgQ1MWfxcoUG9WsbpHIzbQnDw6eX3SGwgw60CAYj3tgoM_JAd3oKO006X4Ho",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpvGmZUa68qKUKC-FmqImP4Wl6FcCjaGHgrSknQQIZ9mJyxjVy9N5UYRzxaonQwUPYveVS68qcs58BSwzdWafICvmkFo8TJcHzG7-QJduGFPxVhgw9nKoU46F0SRUvw28CkpNw2v9_Nd8tLX5YxcydRf62lAsRMyhm92uSrS7sTuOT14FUlLRCaQdbVGlBUDdznCnEmjnBv0hTaDiglU5RpBHqXb_T_ZXXNDGynvH1evUK6O1chw4rKajdVS-IqTylmLSwFk7jpNI",
      },
    ],
  },
  "Justicia social": {
    badge: "Justicia",
    title: "Construyendo equidad desde la base",
    description:
      "Organizaciones dedicadas a los derechos humanos, igualdad de género y acceso a justicia para las comunidades más vulnerables.",
    items: [
      {
        name: "Voces de Igualdad",
        description:
          "Defensoría legal gratuita y acompañamiento a víctimas de violencia de género y discriminación.",
        location: "Bogotá, Colombia",
        tag: "Rights",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDXheFEFBqfIMbKQ4_1JRkkAecNmQqsd0OD54BoxI47xQ3dE22tXflT9jSEC58LD-qx6bi4cR21Jic5bf4-2jk7y9ELMkYmceNOm5q5_TGeoagmvvcgjsnRNJB_aA6DMlQyiJz_9yA5-vgj-a6DEj-wLYDPNvdSEsFzk0L1oX386-zSWGNTq8irTaFd7IJFP8ZqqnHHQkj2PP1jpgsRdrQ0ytyCbOR3xDwNrVn9SHoEVURpdqB4b8cGL96X_Luuu-j1VM_gGZ8A58E",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpqOnn4OZIwo8Lrw105tw-zWjS4ocbPXyYB2m3icoTMSSCV3x_uuPnNM3CFIslTyOV837ca41I2gD8M60vjbuTZ7ojGPvvVHqjnokX0WMIUXsumubG8256OyXPXCt6C3HjZVLQ5PLquJ1pMm8sCuT45oJ6aryFnmQ03WadpsDyEXlSOul3hgLQRT3GgbMEYdtMcERnrE5y1BUbwKQY20McRoH9uQHJEAmB23MZX6z6r4mDBe4LPpEghx_pEuhnkylL6EuiwVSNDSU",
      },
      {
        name: "Raíces Dignas",
        description:
          "Apoyo integral a comunidades indígenas y afrodescendientes en la defensa de sus territorios y derechos ancestrales.",
        location: "Cauca, Colombia",
        tag: "Ethnic",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDXheFEFBqfIMbKQ4_1JRkkAecNmQqsd0OD54BoxI47xQ3dE22tXflT9jSEC58LD-qx6bi4cR21Jic5bf4-2jk7y9ELMkYmceNOm5q5_TGeoagmvvcgjsnRNJB_aA6DMlQyiJz_9yA5-vgj-a6DEj-wLYDPNvdSEsFzk0L1oX386-zSWGNTq8irTaFd7IJFP8ZqqnHHQkj2PP1jpgsRdrQ0ytyCbOR3xDwNrVn9SHoEVURpdqB4b8cGL96X_Luuu-j1VM_gGZ8A58E",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpqOnn4OZIwo8Lrw105tw-zWjS4ocbPXyYB2m3icoTMSSCV3x_uuPnNM3CFIslTyOV837ca41I2gD8M60vjbuTZ7ojGPvvVHqjnokX0WMIUXsumubG8256OyXPXCt6C3HjZVLQ5PLquJ1pMm8sCuT45oJ6aryFnmQ03WadpsDyEXlSOul3hgLQRT3GgbMEYdtMcERnrE5y1BUbwKQY20McRoH9uQHJEAmB23MZX6z6r4mDBe4LPpEghx_pEuhnkylL6EuiwVSNDSU",
      },
      {
        name: "Futuro en Paz",
        description:
          "Reintegración social de jóvenes en conflicto con la ley a través de formación técnica y mentoría.",
        location: "Cali, Colombia",
        tag: "Peace",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDXheFEFBqfIMbKQ4_1JRkkAecNmQqsd0OD54BoxI47xQ3dE22tXflT9jSEC58LD-qx6bi4cR21Jic5bf4-2jk7y9ELMkYmceNOm5q5_TGeoagmvvcgjsnRNJB_aA6DMlQyiJz_9yA5-vgj-a6DEj-wLYDPNvdSEsFzk0L1oX386-zSWGNTq8irTaFd7IJFP8ZqqnHHQkj2PP1jpgsRdrQ0ytyCbOR3xDwNrVn9SHoEVURpdqB4b8cGL96X_Luuu-j1VM_gGZ8A58E",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpqOnn4OZIwo8Lrw105tw-zWjS4ocbPXyYB2m3icoTMSSCV3x_uuPnNM3CFIslTyOV837ca41I2gD8M60vjbuTZ7ojGPvvVHqjnokX0WMIUXsumubG8256OyXPXCt6C3HjZVLQ5PLquJ1pMm8sCuT45oJ6aryFnmQ03WadpsDyEXlSOul3hgLQRT3GgbMEYdtMcERnrE5y1BUbwKQY20McRoH9uQHJEAmB23MZX6z6r4mDBe4LPpEghx_pEuhnkylL6EuiwVSNDSU",
      },
    ],
  },
};

export function CategoriesSection() {
  const [activeCategory, setActiveCategory] = useState(categories[0].label);
  const activeCategoryData = campaignsByCategory[activeCategory];

  return (
    <section className="px-8 py-10 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Category Buttons */}
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Button
              key={cat.label}
              variant="ghost"
              onClick={() => setActiveCategory(cat.label)}
              className={`px-6 py-3 h-auto rounded-full font-label font-medium flex items-center gap-2 transition-colors ${
                cat.label === activeCategory
                  ? "bg-ds-primary-fixed text-ds-on-primary-fixed dark:bg-ds-primary-container dark:text-ds-on-primary hover:bg-ds-primary-fixed/80 dark:hover:bg-ds-primary-container/80"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              <cat.icon className="size-4" />
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Campaign Carousel for Active Category */}
        <Feature
          badge={activeCategoryData.badge}
          title={activeCategoryData.title}
          description={activeCategoryData.description}
          items={activeCategoryData.items}
        />
      </div>
    </section>
  );
}
