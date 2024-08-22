import { DragEvent } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { IoTrashSharp } from "react-icons/io5";

interface TodoCardProps {
  task: string;
  index: number;
  isCompleted: boolean;
  onDragStart: (e: DragEvent<HTMLDivElement>, index: number) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>, index: number) => void;
  onMarkComplete: (index: number) => void;
  onRemove: (index: number) => void;
}

const cardDivStyles =
  "p-3 mb-4 bg-transparent backdrop-blur-lg rounded border border-gray-100/30 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md cursor-pointer";

export default function TodoCard({
  task,
  index,
  isCompleted,
  onDragStart,
  onDragOver,
  onDrop,
  onMarkComplete,
  onRemove,
}: TodoCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
      className={`${cardDivStyles} ${
        isCompleted ? "line-through text-green-500" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-x-2">
        <p
          className="truncate"
          title={task} // Tooltip mostra o texto completo
        >
          {task}
        </p>
        <div className="flex gap-x-2">
          <div
            onClick={() => onMarkComplete(index)}
            className="grid place-content-center"
          >
            {isCompleted ? (
              <FaCheck className="text-2xl text-green-500 hover:scale-105 transition-all duration-300" />
            ) : (
              <IoIosRemoveCircleOutline className="text-2xl text-yellow-400 hover:scale-105 transition-all duration-300" />
            )}
          </div>

          <div onClick={() => onRemove(index)}>
            <IoTrashSharp className="text-2xl text-red-500 hover:scale-105 transition-all duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
