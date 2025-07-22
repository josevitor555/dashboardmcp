
import './App.css';
import './index.css';

// import { projetosMock } from './lib/projects-mock';
import { Edit, Copy, Trash2 } from 'lucide-react';

// Adicionar importação do Avatar
import * as React from 'react';
import { Badge } from './lib/Badge';
import type { Projeto } from './lib/projects-mock';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

// Componente Avatar simplificado (mock do ShadCN)
const Avatar = ({ src, alt, fallback }: { src?: string; alt?: string; fallback: string }) => (
  <button
    className="flex items-center gap-2 border border-border rounded-full px-2 py-1 bg-[#fafafa] text-primary-foreground"
    type="button"
    tabIndex={0}
    aria-label={`Cliente ${alt}`}
  >
    {/* <img
      src={src}
      alt={alt}
      className="w-6 h-6 rounded-full object-cover"
      width={24}
      height={24}
      aria-hidden="true"
    /> */}
    <span className="font-medium text-sm">{alt?.toLowerCase().replace(/ /g, '') || fallback}</span>
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

const categorias = [
  'Blog', 'E-commerce', 'Portfólio', 'Site institucional', 'Landing Page', 'Dashboard administrativo', 'Outros'
];
const statusDropdown = [
  { value: 'planejamento', label: 'Planejamento' },
  { value: 'iniciado', label: 'Iniciado' },
  { value: 'in_progress', label: 'Em Progresso' },
  { value: 'done', label: 'Finalizado' },
  { value: 'paused', label: 'Pausado' },
  { value: 'canceled', label: 'Cancelado' },
  { value: 'revisao', label: 'Revisão' },
];
const prioridadesDropdown = [
  { value: 'alta', label: 'Alta' },
  { value: 'media', label: 'Média' },
  { value: 'baixa', label: 'Baixa' },
];

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function ModalNovaTarefa({ open, onClose, onAdd }: { open: boolean; onClose: () => void; onAdd: (novoProjeto: any) => void }) {
  const [form, setForm] = React.useState({
    nome: '',
    cliente: '',
    descricao: '',
    categoria: categorias[0],
    prioridade: 'media',
    status: 'planejamento',
    dataCriacao: getToday(),
    dataEntrega: '',
    link: '',
    notas: '',
  });
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const novoProjeto = {
      id: `TASK-${Math.floor(Math.random() * 9000 + 1000)}`,
      nome: form.nome,
      cliente: form.cliente.startsWith('@') ? form.cliente : `@${form.cliente}`,
      avatarUrl: undefined,
      categoria: form.categoria,
      status: form.status,
      prioridade: form.prioridade,
      dataCriacao: form.dataCriacao,
      dataEntrega: form.dataEntrega,
      descricao: form.descricao,
      link: form.link,
      notas: form.notas,
    };
    onAdd(novoProjeto);
    onClose();
  }
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow-lg p-6 w-full max-w-lg flex flex-col gap-4">
        <h3 className="text-xl font-bold mb-2">Nova Tarefa</h3>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Nome do Projeto</label>
          <input name="nome" required value={form.nome} onChange={handleChange} className="border border-border rounded px-3 py-2 bg-background text-foreground" placeholder="Ex: Landing Page do Zé do Táxi" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Cliente</label>
          <input name="cliente" required value={form.cliente} onChange={handleChange} className="border border-border rounded px-3 py-2 bg-background text-foreground" placeholder="Pessoa ou empresa" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Descrição</label>
          <textarea name="descricao" required value={form.descricao} onChange={handleChange} className="border border-border rounded px-3 py-2 bg-background text-foreground" placeholder="Breve descrição do projeto" />
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-1/2">
            <label className="text-sm font-medium">Categoria</label>
            <select name="categoria" value={form.categoria} onChange={handleChange} className="border border-border rounded px-2 py-2 bg-background text-foreground">
              {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <label className="text-sm font-medium">Prioridade</label>
            <select name="prioridade" value={form.prioridade} onChange={handleChange} className="border border-border rounded px-2 py-2 bg-background text-foreground">
              {prioridadesDropdown.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-1/2">
            <label className="text-sm font-medium">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="border border-border rounded px-2 py-2 bg-background text-foreground">
              {statusDropdown.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <label className="text-sm font-medium">Previsão de Entrega</label>
            <input name="dataEntrega" type="date" value={form.dataEntrega} onChange={handleChange} className="border border-border rounded px-2 py-2 bg-background text-foreground" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Link do Projeto</label>
          <input name="link" type="url" value={form.link} onChange={handleChange} className="border border-border rounded px-3 py-2 bg-background text-foreground" placeholder="URL do Figma, deploy, repositório..." />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Observações/Notas</label>
          <textarea name="notas" value={form.notas} onChange={handleChange} className="border border-border rounded px-3 py-2 bg-background text-foreground" placeholder="Notas ou observações extras" />
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <button type="button" onClick={onClose} className="btn-primary bg-muted text-foreground border border-border">Cancelar</button>
          <button type="submit" className="btn-primary">Salvar</button>
        </div>
      </form>
    </div>
  );
}

const App = () => {
  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [prioridade, setPrioridade] = React.useState('');
  // const [projetos, setProjetos] = React.useState(projetosMock);
  const [projetos, setProjetos] = React.useState<Projeto[]>([]);

  const projetosFiltrados = filterProjetos(projetos, search, status, prioridade);

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

  const handleDeleteProjeto = (id: string) => {
    setProjetos((prev) => prev.filter((proj) => proj.id !== id));
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentProjetos = projetosFiltrados.slice(startIndex, endIndex);

  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <div className="app flex flex-col min-h-screen bg-background text-foreground p-8 dark">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className='flex flex-col'>
          <h1 className='text-3xl font-bold'>Bem vindo de volta!</h1>
          <p className='text-lg font-semibol'>Aqui está a lista de tarefas este mês.</p>
        </div>
        <button className="btn-primary whitespace-nowrap" onClick={() => setModalOpen(true)}>Nova Tarefa</button>
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
          <motion.table
            className="min-w-full text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
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
            <AnimatePresence initial={false}>
              <tbody>
                {currentProjetos.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center text-lg text-muted-foreground py-12">
                      Nenhuma tarefa encontrada. Crie uma nova tarefa para começar.
                    </td>
                  </tr>
                ) : (

                    currentProjetos.map((projeto) => (
                      <motion.tr
                        key={projeto.id}
                        className="border border-border hover:bg-muted"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
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
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-primary flex items-center gap-1 cursor-pointer"
                            title="Editar"
                          >
                            <Edit size={16} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-primary flex items-center gap-1 cursor-pointer"
                            title="Duplicar"
                          >
                            <Copy size={16} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-primary flex items-center gap-1 cursor-pointer"
                            title="Excluir"
                            onClick={() => handleDeleteProjeto(projeto.id)}
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))
                  )
                }
              </tbody>
            </AnimatePresence>
          </motion.table>
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
          {" "} de {" "}
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
      <ModalNovaTarefa open={modalOpen} onClose={() => setModalOpen(false)} onAdd={(novoProjeto) => setProjetos(prev => [novoProjeto, ...prev])} />
    </div>
  );
}

export default App;
