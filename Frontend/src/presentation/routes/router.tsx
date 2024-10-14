import { createBrowserRouter, Navigate } from "react-router-dom";
import { AssistantPage, AudioToTextPage, ImageGenerationPage, ImageTunningPage, OrthographyPage, ProsConsStreamPage, ProsConsPage, TextToAudioPage, TranslatePage } from "../pages";
import { DashboardLayout } from "../layouts/DashboardLayout";

export const menuRoutes = [
  {
    to: "/orthography",
    title: "Ortografía",
    description: "Corregir ortografía",
    component: <OrthographyPage />
  },
  {
    to: "/pros-cons",
    title: "Pros & Cons",
    description: "Comparar pros y contras",
    component: <ProsConsPage />
  },
  {
    to: "/pros-cons-stream",
    title: "Como stream",
    description: "Con stream de mensajes",
    component: <ProsConsStreamPage />
  },
  {
    to: "/translate",
    title: "Traducir",
    description: "Textos a otros idiomas",
    component: <TranslatePage />
  },
  {
    to: "/text-to-audio",
    title: "Texto a audio",
    description: "Convertir texto a audio",
    component: <TextToAudioPage />
  },
  {
    to: "/audio-to-text",
    title: "Audio a texto",
    description: "Convertir audio a texto",
    component: <AudioToTextPage />
  },
  {
    to: "/image-generation",
    title: "Imágenes",
    description: "Generar imágenes",
    component: <ImageGenerationPage />
  },
  {
    to: "/image-tunning",
    title: "Editar imagen",
    description: "Generación continua",
    component: <ImageTunningPage />
  },
  {
    to: "/assistant",
    title: "Asistente",
    description: "Información del asistente",
    component: <AssistantPage />
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      ...menuRoutes.map( route => ({
        path: route.to,
        element: route.component
      })),
      {
        path: '',
        element: <Navigate to={ menuRoutes[0].to } />
      }
    ],
  }
]);