import { useState, useEffect, useRef } from "react";
import { FiX, FiChevronRight } from "react-icons/fi";
import { FaTasks, FaBook, FaBug, FaStar } from "react-icons/fa";
import viewImg from "../../assets/view.png";
import imageImg from "../../assets/image.png";
import projectBgImg from "../../assets/project-background.jpg";
import { TfiHandPointRight } from "react-icons/tfi";
import { LuUserRoundCheck } from "react-icons/lu";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { IoArrowDownOutline } from "react-icons/io5";

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
}

const testimonials: TestimonialItem[] = [
  {
    quote:
      "Switching to Rookwork cut our planning meetings by half. The calendar and automated status updates keep our remote developers synced without constant pinging.",
    name: "Sarah Jenkins",
    role: "VP of Product, TechCorp",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    quote:
      "We needed something fast and simple. Other platforms felt like database builders, whereas Rookwork feels like a calm, fluid canvas. The design makes work a joy.",
    name: "Alex Rivera",
    role: "Creative Director, StudioFlow",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    quote:
      "The Slack and GitHub integrations are flawless. When a branch merges, Rookwork updates the task card and informs the channel automatically. It's magic.",
    name: "David Chen",
    role: "Engineering Lead, SaaSify",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
];

interface KanbanTask {
  id: number;
  title: string;
  type: "task" | "story" | "bug";
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "to_do" | "in_progress" | "done";
  assignee: string;
  assigneeAvt: string;
}

interface ActivityItem {
  id: number;
  actorName: string;
  actorPicture: string;
  action: string;
  time: string;
}

interface GanttTask {
  id: number;
  title: string;
  start: number; // day index 0-6
  duration: number; // in days
  colorClass: string;
}

interface SubtaskItem {
  id: number;
  title: string;
  done: boolean;
}

export default function FeaturesSection() {
  // ==========================================
  // STATE DEFINITIONS
  // ==========================================

  // 1. Kanban Tasks State
  const [kanbanTasks, setKanbanTasks] = useState<KanbanTask[]>([
    {
      id: 1,
      title: "Refactor core router",
      type: "task",
      priority: "High",
      status: "to_do",
      assignee: "Leo",
      assigneeAvt:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 2,
      title: "Write API specs",
      type: "story",
      priority: "Medium",
      status: "in_progress",
      assignee: "Emma",
      assigneeAvt:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 3,
      title: "Fix auth flow crash",
      type: "bug",
      priority: "Urgent",
      status: "done",
      assignee: "Alex",
      assigneeAvt:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
  ]);

  // 2. Recent Activities State
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: 1,
      actorName: "Alex Rivera",
      actorPicture:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      action: 'resolved bug "Fix auth flow crash"',
      time: "10m ago",
    },
    {
      id: 2,
      actorName: "Emma Jenkins",
      actorPicture:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      action: 'moved "Write API specs" to In Progress',
      time: "25m ago",
    },
    {
      id: 3,
      actorName: "Sarah Jenkins",
      actorPicture:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      action: 'created task "Refactor core router"',
      time: "1h ago",
    },
  ]);

  // 3. Gantt Tasks State
  const [ganttTasks, setGanttTasks] = useState<GanttTask[]>([
    {
      id: 1,
      title: "Design UI Layouts",
      start: 0,
      duration: 2,
      colorClass: "bg-[#FF6B4A]",
    },
    {
      id: 2,
      title: "Develop Core APIs",
      start: 2,
      duration: 3,
      colorClass: "bg-[#500088]",
    },
    {
      id: 3,
      title: "QA & Bug Fixes",
      start: 5,
      duration: 2,
      colorClass: "bg-emerald-500",
    },
  ]);

  // 4. Issue Details & Subtasks State
  const [detailStatus, setDetailStatus] = useState<
    "to_do" | "in_progress" | "done"
  >("in_progress");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [subtasks, setSubtasks] = useState<SubtaskItem[]>([
    { id: 1, title: "Check contrast on tags", done: true },
    { id: 2, title: "Implement Gantt drag handlers", done: false },
    { id: 3, title: "Verify compiler builds", done: false },
  ]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");

  // ==========================================
  // INTERACTIVE ACTIONS & RECENT ACTIVITY LOGGING
  // ==========================================

  // Log user activity
  const logActivity = (actionText: string) => {
    const newItem: ActivityItem = {
      id: Date.now(),
      actorName: "You",
      actorPicture:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
      action: actionText,
      time: "Just now",
    };
    setActivities((prev) => [newItem, ...prev]);
  };

  // Kanban: Move Task status
  const moveKanbanTask = (
    taskId: number,
    newStatus: "to_do" | "in_progress" | "done",
  ) => {
    const task = kanbanTasks.find((t) => t.id === taskId);
    if (!task) return;
    if (task.status === newStatus) return;

    setKanbanTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    );

    const statusNames = {
      to_do: "To Do",
      in_progress: "In Progress",
      done: "Done",
    };
    logActivity(`moved "${task.title}" to ${statusNames[newStatus]}`);
  };

  // HTML5 Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData("text/plain", String(taskId));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent,
    colStatus: "to_do" | "in_progress" | "done",
  ) => {
    const idStr = e.dataTransfer.getData("text/plain");
    const taskId = Number(idStr);
    if (!isNaN(taskId)) {
      moveKanbanTask(taskId, colStatus);
    }
  };

  // Gantt Chart: Drag timelines
  const ganttGridRef = useRef<HTMLDivElement>(null);
  const [draggingGanttId, setDraggingGanttId] = useState<number | null>(null);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartCol, setDragStartCol] = useState(0);

  const startGanttDrag = (
    e: React.MouseEvent,
    taskId: number,
    currentStart: number,
  ) => {
    e.preventDefault();
    setDraggingGanttId(taskId);
    setDragStartX(e.clientX);
    setDragStartCol(currentStart);
  };

  useEffect(() => {
    if (draggingGanttId === null) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ganttGridRef.current) return;
      const rect = ganttGridRef.current.getBoundingClientRect();
      const colWidth = rect.width / 7;
      const deltaX = e.clientX - dragStartX;
      const colDelta = Math.round(deltaX / colWidth);

      let newStart = dragStartCol + colDelta;
      const task = ganttTasks.find((t) => t.id === draggingGanttId);
      if (task) {
        newStart = Math.max(0, Math.min(7 - task.duration, newStart));
        setGanttTasks((prev) =>
          prev.map((t) =>
            t.id === draggingGanttId ? { ...t, start: newStart } : t,
          ),
        );
      }
    };

    const handleMouseUp = () => {
      const task = ganttTasks.find((t) => t.id === draggingGanttId);
      if (task) {
        const days = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ];
        logActivity(
          `rescheduled "${task.title}" to start on ${days[task.start]}`,
        );
      }
      setDraggingGanttId(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingGanttId, dragStartX, dragStartCol, ganttTasks]);

  // Subtasks actions
  const toggleSubtask = (id: number) => {
    const task = subtasks.find((s) => s.id === id);
    if (!task) return;
    setSubtasks((prev) =>
      prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s)),
    );
    logActivity(
      `${task.done ? "reopened" : "completed"} subtask "${task.title}"`,
    );
  };

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    const title = newSubtaskTitle.trim();
    if (!title) return;
    const newSub: SubtaskItem = {
      id: Date.now(),
      title,
      done: false,
    };
    setSubtasks((prev) => [...prev, newSub]);
    logActivity(`created subtask "${title}"`);
    setNewSubtaskTitle("");
  };

  const deleteSubtask = (id: number) => {
    const task = subtasks.find((s) => s.id === id);
    if (!task) return;
    setSubtasks((prev) => prev.filter((s) => s.id !== id));
    logActivity(`deleted subtask "${task.title}"`);
  };

  const handleStatusChange = (newStatus: "to_do" | "in_progress" | "done") => {
    setDetailStatus(newStatus);
    setShowStatusDropdown(false);
    const labels = { to_do: "To Do", in_progress: "In Progress", done: "Done" };
    logActivity(
      `changed status of "UI polish (Bento grid)" to ${labels[newStatus]}`,
    );
  };

  // Render variables
  const subtasksDoneCount = subtasks.filter((s) => s.done).length;

  return (
    <>
      {/* Bento Grid Features Section */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28 relative z-10"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-7xl font-medium tracking-tight font-heading mb-4 ">
            Everything you need
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            Say goodbye to scattered tools. Rookwork unites your workspace with
            intuitive, fast modules.
          </p>
        </div>

        {/* Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px]">
          {/* Card 1: Interactive Kanban (md:col-span-8) */}
          <div className="md:col-span-8 row-span-1 rounded-md p-6 flex flex-col md:flex-row justify-between items-stretch gap-6 overflow-hidden transition-all duration-300 bg-white ">
            <div className="flex-1 flex flex-col justify-between max-w-xs shrink-0">
              <div>
                <h3 className="text-xl text-gray-800 font-semibold font-heading mb-2">
                  Interactive Kanban
                </h3>
                <p className="text-xs leading-relaxed text-gray-550">
                  Drag and drop issues to adjust workflow columns. Try dragging
                  the cards inside!
                </p>
              </div>
            </div>

            {/* Real Mock Kanban Board UI */}
            <div className="flex-1 grid grid-cols-3 gap-2 text-[10px] text-left justify-center bg-gray-55 p-2.5 rounded-md border border-gray-200/50 h-full overflow-y-auto">
              {(["to_do", "in_progress", "done"] as const).map((colStatus) => {
                const colTitle =
                  colStatus === "to_do"
                    ? "To Do"
                    : colStatus === "in_progress"
                      ? "In Progress"
                      : "Done";
                const dotColor =
                  colStatus === "to_do"
                    ? "bg-gray-400"
                    : colStatus === "in_progress"
                      ? "bg-blue-500"
                      : "bg-emerald-500";
                const colTasks = kanbanTasks.filter(
                  (t) => t.status === colStatus,
                );

                return (
                  <div
                    key={colStatus}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, colStatus)}
                    className="flex flex-col gap-2 rounded bg-gray-100 p-1.5 min-h-40 h-full"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-1.5 pb-1 border-b border-gray-200">
                      <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                      <span className="font-bold text-gray-700 uppercase tracking-wide truncate">
                        {colTitle}
                      </span>
                      <span className="ml-auto font-mono text-[8px] bg-white px-1 rounded text-gray-400 font-bold">
                        {colTasks.length}
                      </span>
                    </div>

                    {/* Cards */}
                    <div className="flex flex-col gap-1.5 overflow-y-auto flex-1 pb-4">
                      {colTasks.map((task) => {
                        const Icon =
                          task.type === "task"
                            ? FaTasks
                            : task.type === "story"
                              ? FaBook
                              : FaBug;
                        const iconColor =
                          task.type === "task"
                            ? "text-blue-500"
                            : task.type === "story"
                              ? "text-emerald-500"
                              : "text-red-500";
                        const priorityBg =
                          task.priority === "Urgent"
                            ? "bg-red-100 text-red-700"
                            : task.priority === "High"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-yellow-100 text-yellow-700";

                        return (
                          <div
                            key={task.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, task.id)}
                            className="bg-white p-2 rounded hover:border-gray-350 transition-all cursor-grab active:cursor-grabbing flex flex-col gap-1.5 border-2 border-gray-100"
                          >
                            <div className="flex items-start gap-1">
                              <Icon
                                className={`mt-0.5 shrink-0 ${iconColor}`}
                                size={10}
                              />
                              <span className="font-semibold text-gray-800 leading-tight">
                                {task.title}
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span
                                className={`text-[8px] font-bold px-1 rounded ${priorityBg}`}
                              >
                                {task.priority}
                              </span>
                              <img
                                src={task.assigneeAvt}
                                alt={task.assignee}
                                className="w-4.5 h-4.5 rounded-full object-cover shrink-0 border border-white "
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 2: Recent Activities (md:col-span-4) */}
          <div className="md:col-span-4 row-span-1 rounded-md p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 bg-white ">
            <div className="flex-1 flex flex-col overflow-hidden h-full">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 select-none">
                Recent Activity
              </h3>
              <div className="flex flex-col divide-y divide-gray-50 overflow-y-auto flex-1 pr-1">
                {activities.map((a) => (
                  <div key={a.id} className="flex gap-2.5 py-2">
                    {/* Circle Avatar */}
                    <img
                      src={a.actorPicture}
                      alt={a.actorName}
                      className="w-6 h-6 rounded-full object-cover shrink-0 ring-1 ring-purple-100 "
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11.5px] text-gray-650 leading-snug">
                        <span className="font-semibold text-gray-800">
                          {a.actorName}
                        </span>{" "}
                        {a.action}
                      </p>
                      <p className="text-[9px] text-gray-400 mt-0.5">
                        {a.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Issue Details with Subtasks (md:col-span-4) */}
          <div className="md:col-span-4 row-span-1 rounded-md p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 bg-white ">
            <div className="flex flex-col h-full justify-between">
              {/* Header Info */}
              <div className="flex items-start justify-between border-b pb-2 mb-2 border-gray-100 text-left">
                <div>
                  <h4 className="font-semibold text-gray-800 text-xl truncate max-w-52">
                    UI polish (Bento grid)
                  </h4>
                  <span className="inline-block text-[10px] bg-orange-100 text-orange-600 px-1.5 rounded font-medium mt-0.5">
                    Medium
                  </span>
                </div>

                {/* Status Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                    className={`text-[9px] font-bold px-2 py-1 rounded transition-colors ${
                      detailStatus === "done"
                        ? "bg-emerald-100 text-emerald-800"
                        : detailStatus === "in_progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {detailStatus === "done"
                      ? "Done"
                      : detailStatus === "in_progress"
                        ? "In Progress"
                        : "To Do"}
                  </button>
                  {showStatusDropdown && (
                    <div className="absolute top-full right-0 mt-1 bg-white rounded border-2 border-gray-100 py-1 z-35 flex flex-col w-24">
                      {(["to_do", "in_progress", "done"] as const).map(
                        (statusVal) => (
                          <button
                            key={statusVal}
                            onClick={() => handleStatusChange(statusVal)}
                            className="text-left px-2 py-1 hover:bg-gray-55 text-[9px] text-gray-700"
                          >
                            {statusVal === "to_do"
                              ? "To Do"
                              : statusVal === "in_progress"
                                ? "In Progress"
                                : "Done"}
                          </button>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Add Subtask form */}
              <form
                onSubmit={handleAddSubtask}
                className="flex gap-1 mb-4 shrink-0"
              >
                <input
                  type="text"
                  required
                  placeholder="New subtask..."
                  value={newSubtaskTitle}
                  onChange={(e) => setNewSubtaskTitle(e.target.value)}
                  className="flex-1 px-2 py-1 rounded bg-gray-50 border border-gray-200 text-[10px] focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                />
                <button
                  type="submit"
                  className="bg-purple-900 hover:bg-purple-800 text-gray-200 text-[9px] px-2.5 py-1 rounded transition-colors flex items-center justify-center"
                >
                  Add
                </button>
              </form>
              {/* Subtasks Section */}
              <div className="flex-1 flex flex-col justify-between text-left overflow-y-auto">
                <div className="flex items-center justify-between mb-1.5 text-[10px]">
                  <span className="font-bold text-gray-450 uppercase tracking-wide">
                    Subtasks ({subtasksDoneCount}/{subtasks.length})
                  </span>
                </div>

                {/* Progress bar */}
                {subtasks.length > 0 && (
                  <div className="w-full h-1 bg-gray-200 rounded-full mb-2">
                    <div
                      className="h-1 bg-purple-500 rounded-full transition-all duration-300"
                      style={{
                        width: `${(subtasksDoneCount / subtasks.length) * 100}%`,
                      }}
                    />
                  </div>
                )}

                {/* Subtask list */}
                <div className="space-y-1 overflow-y-auto flex-1 pr-1 max-h-22 text-[11px]">
                  {subtasks.map((sub) => (
                    <div
                      key={sub.id}
                      className="flex items-center gap-2 group/sub py-0.5"
                    >
                      <input
                        type="checkbox"
                        checked={sub.done}
                        onChange={() => toggleSubtask(sub.id)}
                        className="accent-purple-800 w-3 h-3 cursor-pointer shrink-0"
                      />
                      <span
                        className={`flex-1 truncate ${sub.done ? "line-through text-gray-400" : "text-gray-700"}`}
                      >
                        {sub.title}
                      </span>
                      <button
                        onClick={() => deleteSubtask(sub.id)}
                        className="text-gray-300 hover:text-red-500 opacity-0 group-hover/sub:opacity-100 transition-opacity"
                      >
                        <FiX size={10} />
                      </button>
                    </div>
                  ))}
                  {subtasks.length === 0 && (
                    <p className="text-gray-400 italic text-[10px] py-1 text-center">
                      No subtasks yet
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Timeline (Gantt View - md:col-span-8) */}
          <div className="md:col-span-8 row-span-1 rounded-md p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 bg-white ">
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Project Timelines
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Drag and align task schedules. Click and drag the bars!
                </p>
              </div>

              {/* Gantt Interactive Chart Container */}
              <div className="flex flex-col gap-2 bg-gray-50 p-2.5 rounded-md text-[9px] border border-gray-200/50 select-none">
                {/* Header days */}
                <div className="grid grid-cols-7 gap-1 font-bold text-gray-400 text-center font-mono text-[8px] border-b pb-1">
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
                  <span>S</span>
                  <span>S</span>
                </div>

                {/* Rows */}
                <div
                  ref={ganttGridRef}
                  className="flex flex-col gap-2.5 relative py-1"
                >
                  {/* Grid lines helper */}
                  <div className="absolute inset-0 grid grid-cols-7 gap-1 pointer-events-none">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className="border-r border-dashed border-gray-200/80 last:border-none h-full"
                      />
                    ))}
                  </div>

                  {ganttTasks.map((task) => {
                    const leftPct = (task.start / 7) * 100;
                    const widthPct = (task.duration / 7) * 100;

                    return (
                      <div
                        key={task.id}
                        className="flex flex-col gap-0.5 relative z-10"
                      >
                        <span className="text-[8px] font-bold text-gray-500 truncate block text-left mb-0.5">
                          {task.title}
                        </span>
                        <div className="h-4.5 w-full bg-gray-200/50 rounded-sm relative overflow-hidden">
                          <div
                            onMouseDown={(e) =>
                              startGanttDrag(e, task.id, task.start)
                            }
                            className={`absolute h-full rounded-sm cursor-grab active:cursor-grabbing text-[8px] font-bold text-white flex items-center justify-center ${task.colorClass}`}
                            style={{
                              left: `${leftPct}%`,
                              width: `${widthPct}%`,
                            }}
                          >
                            {task.duration}d
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 transition-colors duration-300 bg-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-7xl font-medium tracking-tight font-heading mb-4">
              How Rookwork Works
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Three simple steps to calm, organized productivity.
            </p>
          </div>

          <div className="space-y-24 md:space-y-12">
            {/* Step 1 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center min-h-75">
              {/* Text & Watermark */}
              <div className="md:col-span-6 space-y-4 relative text-left">
                {/* Large Watermark */}
                <div className="absolute -top-14 -left-4 text-9xl font-black text-gray-200/50 select-none -z-10 font-heading tracking-tighter">
                  01
                </div>
                <div className="relative z-10">
                  <span className="text-[#500088] font-bold text-xs uppercase tracking-wider mb-2 block font-mono">
                    Step 01
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold font-heading mb-4 text-gray-900">
                    Create Tasks
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-gray-650">
                    Quickly capture ideas and log tasks in a few keystrokes.
                    Organize your thoughts immediately with tag annotations,
                    priority levels, and instant list tracking.
                  </p>
                </div>
              </div>

              {/* UI Screenshot */}
              <div className="md:col-span-6 flex justify-center">
                <div className="rounded-lg overflow-hidden border-2 border-gray-100 bg-white p-2 w-full max-w-md">
                  <img
                    src={imageImg}
                    alt="Create Tasks UI"
                    className="w-full h-auto max-h-64 object-cover rounded"
                  />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center min-h-[300px]">
              {/* UI Screenshot - Left on Desktop */}
              <div className="md:col-span-6 flex justify-center order-2 md:order-1">
                <div className="rounded-lg overflow-hidden border-2 border-gray-100 bg-white p-2 w-full max-w-md">
                  <img
                    src={viewImg}
                    alt="Assign & Schedule UI"
                    className="w-full h-auto max-h-64 object-cover rounded"
                  />
                </div>
              </div>

              {/* Text & Watermark - Right on Desktop */}
              <div className="md:col-span-6 space-y-4 relative text-left order-1 md:order-2">
                {/* Large Watermark */}
                <div className="absolute -top-14 -left-4 text-9xl font-black text-gray-200/50 select-none -z-10 font-heading tracking-tighter">
                  02
                </div>
                <div className="relative z-10">
                  <span className="text-[#FF6B4A] font-bold text-xs uppercase tracking-wider mb-2 block font-mono">
                    Step 02
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold font-heading mb-4 text-gray-900">
                    Assign & Schedule
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-gray-650">
                    Delegate owners, set priorities, and map timelines clearly.
                    Keep everyone aligned with accurate estimations and active
                    due dates that keep tasks moving toward completion.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center min-h-[300px]">
              {/* Text & Watermark */}
              <div className="md:col-span-6 space-y-4 relative text-left">
                {/* Large Watermark */}
                <div className="absolute -top-14 -left-4 text-9xl font-black text-gray-200/50 select-none -z-10 font-heading tracking-tighter">
                  03
                </div>
                <div className="relative z-10">
                  <span className="text-emerald-500 font-bold text-xs uppercase tracking-wider mb-2 block font-mono">
                    Step 03
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold font-heading mb-4 text-gray-900">
                    Track & Automate
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-gray-650">
                    Watch cards flow, monitor charts, and automate busywork.
                    Create custom triggers that sync with Slack and GitHub to
                    eliminate repetitive status checks and manual handoffs.
                  </p>
                </div>
              </div>

              {/* UI Screenshot */}
              <div className="md:col-span-6 flex justify-center">
                <div className="rounded-lg overflow-hidden border-2 border-gray-100 bg-white p-2 w-full max-w-md">
                  <img
                    src={projectBgImg}
                    alt="Track & Automate UI"
                    className="w-full h-auto max-h-64 object-cover rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Deep-Dives Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28 relative z-10 flex flex-col gap-24 md:gap-32">
        {/* Deep Dive 1: Automations builder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Left */}
          <div className="lg:col-span-5 text-left order-2 lg:order-1">
            <span className="text-[#500088] font-bold text-xs uppercase tracking-wider mb-3 block font-mono">
              No More Drudgery
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading mb-6 tracking-tight text-gray-900">
              Automate your workflows in seconds
            </h2>
            <p className="text-sm md:text-base leading-relaxed mb-8 text-gray-600">
              Tired of manual updates? Build simple, visual 'If-Then' rules to
              change statuses, assign reviewers, or notify Slack channels. Save
              your team hours of chore work every single week.
            </p>
            <a
              href="#pricing"
              className="text-[#500088] hover:text-[#FF6B4A] transition-colors duration-200 font-semibold flex items-center gap-1 group text-sm"
            >
              Learn more
              <FiChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          {/* Interactive Preview Right */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="rounded-md p-6 text-left relative overflow-hidden bg-white border-2 border-gray-100">
              <div className="text-[11px] font-bold uppercase text-gray-400 tracking-wider mb-4 font-mono select-none">
                Automation Builder
              </div>

              {/* Node 1: Trigger */}
              <div className="p-4 bg-neutral-100 rounded-md border border-gray-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 ">
                  <TfiHandPointRight
                    size={18}
                    className="text-gray-400 shrink-0"
                  />
                  <div className="notranslate" translate="no">
                    <div className="text-[10px] text-gray-400  font-bold uppercase tracking-wider font-mono">
                      Trigger
                    </div>
                    <div className="text-xs md:text-sm font-bold text-gray-800 mt-0.5">
                      Task status is moved to "Ready for QA"
                    </div>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded  uppercase tracking-wider select-none">
                  Live
                </span>
              </div>

              {/* Connector 1 */}
              <div className="flex items-center gap-3 ml-6 my-2 select-none">
                <IoArrowDownOutline size={14} className="text-gray-300" />
                <span className="text-[10px] text-gray-400 font-bold font-mono tracking-wider">
                  then
                </span>
              </div>

              {/* Node 2: Action 1 */}
              <div className="p-4 rounded-md bg-neutral-100 border border-gray-200  flex items-center gap-4">
                <LuUserRoundCheck
                  size={18}
                  className="text-gray-400 shrink-0"
                />
                <div className="notranslate" translate="no">
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider font-mono">
                    Action
                  </div>
                  <div className="text-xs md:text-sm font-bold text-gray-800 mt-0.5">
                    Assign developer Alex Rivera as reviewer
                  </div>
                </div>
              </div>

              {/* Connector 2 */}
              <div className="flex items-center gap-3 ml-6 my-2 select-none">
                <IoArrowDownOutline size={14} className="text-gray-300" />
                <span className="text-[10px] text-gray-400 font-bold font-mono tracking-wider">
                  and
                </span>
              </div>

              {/* Node 3: Action 2 */}
              <div className="p-4 rounded-md bg-neutral-100 border border-gray-200  flex items-center gap-4">
                <HiOutlineBellAlert
                  size={18}
                  className="text-gray-400 shrink-0"
                />
                <div className="notranslate" translate="no">
                  <div className="text-xs md:text-sm font-bold text-gray-800">
                    Notify the QA team channel
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deep Dive 2: Chat & context */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Left */}
          <div className="lg:col-span-7">
            <div className="rounded-md p-6 text-left relative overflow-hidden bg-white ">
              <div className="flex items-center gap-2 border-b pb-4 mb-4 border-gray-200">
                <span className="flex items-center text-blue-700">
                  <FaTasks size={12} />
                </span>
                <span className="text-xs font-bold font-heading text-gray-900">
                  Task: UI Polish (Bento Grid)
                </span>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                  alt="Sarah"
                  className="w-8 h-8 rounded-md object-cover bg-gray-100"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-heading text-gray-900">
                      Sarah Jenkins
                    </span>
                    <span className="text-[9px] text-gray-400">10m ago</span>
                  </div>
                  <p className="text-xs mt-1 leading-relaxed text-gray-650">
                    Hey team, the border glows on the Pro pricing card look
                    gorgeous in dark mode. Let's make sure the accent color
                    matches `#FF6B4A`.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-gray-100 text-gray-605">
                      👍 4
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-gray-100 text-gray-605">
                      🎉 2
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t pt-4 border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                  alt="Alex"
                  className="w-8 h-8 rounded-md object-cover bg-gray-100"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-heading text-gray-900">
                      Alex Rivera
                    </span>
                    <span className="text-[9px] text-gray-400">Just now</span>
                  </div>
                  <p className="text-xs mt-1 leading-relaxed text-gray-655">
                    Got it, updating the CSS token right away. Should be merged
                    in 5 mins!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Right */}
          <div className="lg:col-span-5 text-left">
            <span className="text-[#FF6B4A] font-bold text-xs uppercase tracking-wider mb-3 block font-mono">
              Real Collaboration
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading mb-6 tracking-tight text-gray-900">
              Context-rich conversations
            </h2>
            <p className="text-sm md:text-base leading-relaxed mb-8 text-gray-600">
              Stop jumping between Slack and your project board. Mention
              colleagues, upload design files, and link documents directly on
              the task cards where they belong.
            </p>
            <a
              href="#pricing"
              className="text-[#FF6B4A] hover:text-[#500088] transition-colors duration-200 font-semibold flex items-center gap-1 group text-sm"
            >
              Learn more
              <FiChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 transition-colors duration-300 bg-gray-105">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-7xl font-medium tracking-tight font-heading mb-4">
              Loved by teams who build the future
            </h2>
            <p className="text-base md:text-lg text-gray-600">
              Hear from product managers, engineers, and creatives who
              simplified their daily workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-md text-left flex flex-col justify-between transition-all duration-300 bg-white border border-gray-200"
              >
                <div>
                  <div className="flex gap-1 mb-5">
                    {[...Array(item.rating)].map((_, i) => (
                      <span
                        key={i}
                        className="text-amber-405 text-sm text-amber-400"
                      >
                        <FaStar size={10} />
                      </span>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-6 font-medium text-gray-600">
                    “{item.quote}”
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-4 border-t pt-4 border-gray-100">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 object-cover bg-gray-100 rounded-md"
                  />
                  <div>
                    <h4 className="text-xs md:text-sm font-bold font-heading text-gray-900">
                      {item.name}
                    </h4>
                    <p className="text-[10px] md:text-xs text-gray-400">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
