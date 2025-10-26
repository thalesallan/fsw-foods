# 🍔 FSW Foods

Uma réplica moderna do iFood desenvolvida durante o bootcamp **Full Stack Week**, criada em Next.js 14 com foco em demonstrar práticas avançadas de desenvolvimento web em apenas uma semana de desenvolvimento intensivo.

## 🎯 Sobre o Projeto

O FSW Foods é um clone do iFood desenvolvido como projeto prático durante o bootcamp Full Stack Week. O objetivo foi recriar as principais funcionalidades de um app de delivery moderno, incluindo autenticação, carrinho de compras, sistema de favoritos e uma interface responsiva que replica a experiência do usuário do iFood.

### 🏆 Objetivos do Bootcamp
- Demonstrar o poder do Next.js 14 com App Router
- Implementar autenticação social completa
- Criar uma arquitetura escalável e maintível
- Aplicar práticas modernas de desenvolvimento React
- Integrar banco de dados com Prisma ORM
- Construir uma UI/UX profissional

## 🚀 Visão Geral

O projeto replica as principais funcionalidades do iFood, oferecendo uma experiência completa de pedidos online com autenticação, navegação por restaurantes, carrinho de compras inteligente e sistema de favoritos. Foi desenvolvido seguindo as melhores práticas do ecossistema React/Next.js.

## ✨ Funcionalidades

### 🔐 Autenticação
- Login social com Google (NextAuth.js)
- Sessões persistentes
- Proteção de rotas

### 🏪 Restaurantes
- Listagem de restaurantes
- Busca por nome
- Sistema de favoritos
- Informações de entrega e tempo
- Visualização de cardápio

### 🛒 Carrinho de Compras
- Adicionar/remover produtos
- Controle de quantidade
- Cálculo automático de totais
- Simulação de pedidos

### ❤️ Sistema de Favoritos
- Marcar/desmarcar restaurantes favoritos
- Página dedicada aos favoritos
- Sincronização em tempo real

### 📱 Interface Responsiva
- Design mobile-first
- Componentes acessíveis
- Animações suaves
- Dark/Light theme

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones
- **Sonner** - Notificações toast

### Backend
- **Next.js API Routes** - API serverless
- **Prisma** - ORM e migrations
- **NeonDB** - Banco PostgreSQL serverless
- **NextAuth.js** - Autenticação

### Ferramentas de Desenvolvimento
- **ESLint** - Linting
- **Prettier** - Formatação de código
- **Husky** - Git hooks
- **TypeScript** - Verificação de tipos

## 📁 Estrutura do Projeto

```
fsw-foods/
├── app/                    # App Router (Next.js 14)
│   ├── _actions/          # Server Actions
│   ├── _components/       # Componentes React
│   ├── _lib/             # Utilitários e configurações
│   ├── _providers/       # Context Providers
│   ├── api/              # API Routes
│   └── [pages]/          # Páginas da aplicação
├── prisma/               # Schema e migrações do banco
├── public/               # Arquivos estáticos
└── docs/                 # Documentação
```

## 🚀 Começando

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta no NeonDB (ou PostgreSQL local)
- Credenciais do Google OAuth

### Instalação

1. **Clone o repositório**
```bash
git clone <repository-url>
cd fsw-foods
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Preencha o arquivo `.env` com suas credenciais:
```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

4. **Execute as migrações do banco**
```bash
npx prisma migrate dev
```

5. **Gere o Prisma Client**
```bash
npx prisma generate
```

6. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 📖 Documentação Adicional

- [🏗️ Arquitetura](./docs/ARCHITECTURE.md)
- [💾 Banco de Dados](./docs/DATABASE.md)
- [🔐 Autenticação](./docs/AUTHENTICATION.md)
- [🎨 Componentes](./docs/COMPONENTS.md)
- [🚀 Deploy](./docs/DEPLOYMENT.md)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter
- `npm run prisma:studio` - Abre o Prisma Studio
- `npm run prisma:migrate` - Executa migrações

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedor

Desenvolvido por ThalesDev como parte do curso Full Stack Week.

---

⭐ Se este projeto te ajudou, deixe uma estrela!
