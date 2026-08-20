"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
interface Capture {
  image: string;
  /** Légende déjà traduite, fournie par la couche de données. */
  legende: string;
}

interface Props {
  captures: Capture[];
  /** Nom du projet, utilisé dans les libellés d'accessibilité. */
  titre: string;
}

/**
 * Aperçu des captures d'un projet, sous forme de pile qui s'écarte au survol,
 * et visionneuse plein écran au clic.
 *
 * La visionneuse est écrite à la main plutôt qu'avec le JavaScript de Bootstrap :
 * cela évite d'embarquer son bundle entier et permet de gérer correctement
 * le clavier, le focus et le verrouillage du défilement.
 */
export default function ProjectGallery({ captures, titre }: Props) {
  const t = useTranslations("projects");
  const [openAt, setOpenAt] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  const isOpen = openAt !== null;
  const total = captures.length;

  /**
   * La visionneuse est rendue dans <body> via un portail, jamais dans la carte
   * du projet. Sans cela, le `transform` appliqué à la carte au survol
   * deviendrait le référentiel de `position: fixed` : la visionneuse serait
   * repositionnée à l'intérieur de la carte, puis rognée par son
   * `overflow: hidden`. Le portail la place hors de portée de ces règles.
   * `mounted` évite d'appeler createPortal pendant le rendu serveur.
   */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const caption = (i: number) => captures[i].legende || titre;

  const close = useCallback(() => {
    setOpenAt(null);
    // Rend le focus au bouton qui a ouvert la visionneuse.
    openerRef.current?.focus();
  }, []);

  const go = useCallback(
    (delta: number) => {
      setOpenAt((current) => {
        if (current === null) return current;
        // Parcours circulaire : après la dernière image on revient à la première.
        return (current + delta + total) % total;
      });
    },
    [total],
  );

  // Clavier : Échap ferme, flèches naviguent.
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    }

    document.addEventListener("keydown", onKeyDown);
    // Empêche la page de défiler derrière la visionneuse.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close, go]);

  if (total === 0) return null;

  return (
    <>
      <h4 className="text-uppercase small fw-semibold text-muted-ald mb-2">
        {t("gallery")}
      </h4>

      <button
        ref={openerRef}
        type="button"
        className="gallery-stack"
        onClick={() => setOpenAt(0)}
        aria-label={`${t("openGallery")} — ${titre} (${total})`}
      >
        {/* Trois vignettes superposées : elles s'écartent en éventail au survol
            pour signaler qu'il y a plusieurs captures derrière la première. */}
        {captures.slice(0, 3).map((capture, i) => (
          <span
            key={capture.image}
            className={`gallery-stack__item gallery-stack__item--${i}`}
          >
            <Image
              src={capture.image}
              alt=""
              width={337}
              height={750}
              aria-hidden="true"
              className="gallery-stack__img"
            />
          </span>
        ))}

        <span className="gallery-stack__count">{total}</span>
      </button>

      {isOpen &&
        mounted &&
        createPortal(
          <div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={t("gallery")}
            tabIndex={-1}
            ref={dialogRef}
            onClick={(e) => {
              // Un clic sur le fond ferme ; un clic sur l'image ne fait rien.
              if (e.target === e.currentTarget) close();
            }}
          >
            <button
              type="button"
              className="lightbox__close"
              onClick={close}
              aria-label={t("close")}
            >
              ✕
            </button>

            {total > 1 && (
              <button
                type="button"
                className="lightbox__nav lightbox__nav--prev"
                onClick={() => go(-1)}
                aria-label={t("previous")}
              >
                ‹
              </button>
            )}

            <figure className="lightbox__figure">
              <Image
                src={captures[openAt].image}
                alt={caption(openAt)}
                width={1200}
                height={2000}
                className="lightbox__img"
                priority
              />
              {/* Placée hors du flux pour laisser l'image occuper tout l'écran. */}
              <figcaption className="lightbox__caption">
                <span>{caption(openAt)}</span>
                <span className="lightbox__counter">
                  {t("counter", { current: openAt + 1, total })}
                </span>
              </figcaption>
            </figure>

            {total > 1 && (
              <button
                type="button"
                className="lightbox__nav lightbox__nav--next"
                onClick={() => go(1)}
                aria-label={t("next")}
              >
                ›
              </button>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
