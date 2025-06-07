"use client";
import { useEffect, useState } from "react";
import { closestCenter, CollisionDetection } from "@dnd-kit/core";
import { TYPE_COLUMN } from "@/LandingPages/dashboardPage/components/dashboard/kanbanBoard/utils";

export const useResponsiveCollisionDetection = () => {
  const [collisionDetection, setCollisionDetection] =
    useState<CollisionDetection>(() => closestCenter);

  useEffect(() => {
    const customCollision: CollisionDetection = ({
      active,
      collisionRect,
      droppableRects,
      droppableContainers,
      pointerCoordinates, // Add this parameter
    }) => {
      // Only use custom detection for columns on mobile
      if (
        window.innerWidth <= 600 &&
        active.data.current?.type === TYPE_COLUMN
      ) {
        const centerX = collisionRect.left + collisionRect.width / 2;

        return droppableContainers
          .filter((container) => {
            const rect = droppableRects.get(container.id);
            if (!rect) return false;

            return (
              centerX > rect.left + rect.width * 0.3 &&
              centerX < rect.left + rect.width * 0.7
            );
          })
          .map((container) => ({
            id: container.id,
            data: {
              droppableContainer: container,
              value: 0,
            },
          }));
      }

      // Use default closestCenter for desktop or tasks
      return closestCenter({
        active,
        collisionRect,
        droppableRects,
        droppableContainers,
        pointerCoordinates, // Pass it through
      });
    };

    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setCollisionDetection(() => customCollision);
      } else {
        setCollisionDetection(() => closestCenter);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return collisionDetection;
};
