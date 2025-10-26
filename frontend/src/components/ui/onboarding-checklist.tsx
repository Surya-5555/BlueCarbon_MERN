"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ChecklistItem {
  id: number | string;
  text: string;
  helperText?: string;
  helperLink?: {
    href: string;
    text: string;
  };
}

export interface OnboardingChecklistProps {
  title: string;
  description: string;
  items: ChecklistItem[];
  videoThumbnailUrl: string;
  videoUrl: string;
  className?: string;
}

export const OnboardingChecklist = ({
  title,
  description,
  items,
  videoThumbnailUrl,
  videoUrl,
  className,
}: OnboardingChecklistProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "w-full max-w-4xl mx-auto bg-card text-card-foreground border rounded-2xl shadow-sm p-8 overflow-hidden",
        className
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="mt-2 text-muted-foreground">{description}</p>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {items.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col"
              >
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="ml-3 text-sm font-medium">{item.text}</span>
                </div>
                {item.helperText && item.helperLink && (
                  <div className="ml-8 mt-1 text-xs text-muted-foreground">
                    {item.helperText}{" "}
                    <a
                      href={item.helperLink.href}
                      className="text-primary underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
                    >
                      {item.helperLink.text}
                    </a>
                  </div>
                )}
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative group rounded-lg overflow-hidden cursor-pointer w-full aspect-video"
        >
          <Dialog>
            <DialogTrigger asChild>
              <div>
                <img
                  src={videoThumbnailUrl}
                  alt="Video guide thumbnail"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <PlayCircle className="h-16 w-16 text-white/80 transform transition-all duration-300 group-hover:scale-110 group-hover:text-white" />
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl p-0 border-0">
              <div className="aspect-video">
                <iframe
                  src={videoUrl}
                  title="Onboarding Video Guide"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </motion.div>
  );
};
