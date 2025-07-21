
import './App.css';
import './index.css';

import { projetosMock } from './lib/projects-mock';
import { Edit, Copy, Trash2 } from 'lucide-react';
// Adicionar importação do Avatar
import * as React from 'react';
import { Badge } from './lib/Badge';
import type { Projeto } from './lib/projects-mock';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";

// Componente Avatar simplificado (mock do ShadCN)
const Avatar = ({ src, alt, fallback }: { src?: string; alt?: string; fallback: string }) => (
  <button
    className="flex items-center gap-2 border border-border rounded-full px-2 py-1 bg-[#fafafa] text-primary-foreground"
    type="button"
    tabIndex={0}
    aria-label={`Cliente ${alt}`}
  >
    <img
      src={src}
      alt={alt}
      className="w-6 h-6 rounded-full object-cover"
      width={24}
      height={24}
      aria-hidden="true"
    />
    <span className="font-medium text-sm">@{alt?.toLowerCase().replace(/ /g, '') || fallback}</span>
  </button>
);

function getStatusVariant(status: string) {
  switch (status) {
    case 'done':
      return 'success';
    case 'in_progress':
      return 'warning';
    case 'canceled':
      return 'danger';
    default:
      return 'default';
  }
}

const statusOptions = [
  { value: '', label: 'Todos' },
  { value: 'done', label: 'Concluído' },
  { value: 'in_progress', label: 'Em andamento' },
  { value: 'canceled', label: 'Cancelado' },
  { value: 'backlog', label: 'Backlog' },
  { value: 'todo', label: 'A Fazer' },
];
const prioridadeOptions = [
  { value: '', label: 'Todas' },
  { value: 'alta', label: 'Alta' },
  { value: 'media', label: 'Média' },
  { value: 'baixa', label: 'Baixa' },
];

function filterProjetos(projetos: Projeto[], search: string, status: string, prioridade: string) {
  return projetos.filter((p) => {
    const matchSearch =
      p.nome.toLowerCase().includes(search.toLowerCase()) ||
      p.cliente.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status ? p.status === status : true;
    const matchPrioridade = prioridade ? p.prioridade === prioridade : true;
    return matchSearch && matchStatus && matchPrioridade;
  });
}

const App = () => {
  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [prioridade, setPrioridade] = React.useState('');
  const projetosFiltrados = filterProjetos(projetosMock, search, status, prioridade);

  // Pagination state
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const totalRows = projetosFiltrados.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleNextPage = () => {
    setPage(prevPage => Math.min(prevPage + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 0));
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0); // Reset to first page when rows per page changes
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentProjetos = projetosFiltrados.slice(startIndex, endIndex);

  return (
    <div className="app flex flex-col min-h-screen bg-background text-foreground p-8 dark">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className='text-3xl font-bold'>Bem vindo de volta! Mr.José Vitor</h1>
        <button className="btn-primary whitespace-nowrap">+ Nova Tarefa</button>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar tarefa ou cliente..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-border rounded px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring w-full md:w-72"
        />
        <div className="flex gap-2 items-center">
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="border border-border rounded px-2 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <select
            value={prioridade}
            onChange={e => setPrioridade(e.target.value)}
            className="border border-border rounded px-2 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {prioridadeOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="bg-card rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Projetos dos Clientes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Nome</th>
                <th className="px-4 py-2 text-left">Cliente</th>
                <th className="px-4 py-2 text-left">Categoria</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Prioridade</th>
                <th className="px-4 py-2 text-left">Data Criação</th>
                <th className="px-4 py-2 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentProjetos.map((projeto) => (
                <tr key={projeto.id} className="border border-border hover:bg-muted">
                  <td className="px-4 py-2">{projeto.id}</td>
                  <td className="px-4 py-2">{projeto.nome}</td>
                  <td className="px-4 py-2">
                    <Avatar
                      src={projeto.avatarUrl}
                      alt={projeto.cliente}
                      fallback={projeto.cliente.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                    />
                  </td>
                  <td className="px-4 py-2">{projeto.categoria}</td>
                  <td className="px-4 py-2 capitalize">
                    <Badge variant={getStatusVariant(projeto.status)}>
                      {projeto.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="px-4 py-2 capitalize">{projeto.prioridade}</td>
                  <td className="px-4 py-2">{projeto.dataCriacao}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="btn-primary flex items-center gap-1 cursor-pointer" title="Editar">
                      <Edit size={16} />
                    </button>
                    <button className="btn-primary flex items-center gap-1 cursor-pointer" title="Duplicar">
                      <Copy size={16} />
                    </button>
                    <button className="btn-primary flex items-center gap-1 cursor-pointer" title="Excluir">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-between gap-8 mt-4">
        {/* Results per page */}
        <div className="flex items-center gap-3">
          <label htmlFor="rowsPerPage" className="text-sm text-muted-foreground">
            Linhas por página
          </label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="border border-border bg-card text-foreground rounded focus:outline-none focus:ring-2 focus:ring-primary px-2 py-1"
          >
            {[5, 10, 25, 50].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        {/* Page number information */}
        <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
          <span className="text-foreground">
            {page * rowsPerPage + 1} - {Math.min((page + 1) * rowsPerPage, totalRows)}
          </span>
          {" "}de{" "}
          <span className="text-foreground">{totalRows}</span>
        </div>
        {/* Pagination buttons */}
        <div className="flex gap-1">
          <button
            onClick={() => setPage(0)}
            disabled={page === 0}
            className="btn-primary px-2 py-1 disabled:opacity-50"
            aria-label="Primeira página"
          >
            <ChevronFirst size={16} />
          </button>
          <button
            onClick={handlePrevPage}
            disabled={page === 0}
            className="btn-primary px-2 py-1 disabled:opacity-50"
            aria-label="Página anterior"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleNextPage}
            disabled={page >= totalPages - 1}
            className="btn-primary px-2 py-1 disabled:opacity-50"
            aria-label="Próxima página"
          >
            <ChevronRight size={16} />
          </button>
          <button
            onClick={() => setPage(totalPages - 1)}
            disabled={page >= totalPages - 1}
            className="btn-primary px-2 py-1 disabled:opacity-50"
            aria-label="Última página"
          >
            <ChevronLast size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
