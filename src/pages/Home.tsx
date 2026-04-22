import DashboardLayout from "@/layouts/DashboardLayout";
import ProjectCard from "@/features/projects/components/ProjectCard";
import ProjectSearchInput from "@/features/projects/components/ProjectSearchInput";

const projects = [
  { name: "Projeto Alpha", manager: "Maria Silva", lastRequest: "31/03/2026" },
  { name: "Projeto Beta", manager: "João Santos", lastRequest: "30/03/2026" },
  { name: "Projeto Gamma", manager: "Ana Costa", lastRequest: "29/03/2026" },
  { name: "Projeto Gamma", manager: "Ana Costa", lastRequest: "29/03/2026" },
  { name: "Projeto Beta", manager: "João Santos", lastRequest: "30/03/2026" },
];

const Home = () => {
  return (
    <DashboardLayout>
      <ProjectSearchInput />
      <div className="grid grid-cols-3 gap-6 w-244">
        {projects.map((p, i) => (
          <ProjectCard
            key={i}
            name={p.name}
            manager={p.manager}
            lastRequest={p.lastRequest}
            highlight={i === 0}
          />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Home;
