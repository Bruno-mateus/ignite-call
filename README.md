🚀 Tecnologias
Esse projeto foi desenvolvido com as seguintes tecnologias:

React
Next.js
Typescript
Node.js
Prisma.io
Google APIs
Google Cloud Platform
Docker
Axios
Next Seo
Nookies
React Hook Form
Design System
Stitches (CSS-in-JS)
Phosphor icons
ESLint
Date-fns
Zod

🔖 Projeto
O projeto Ignite Call foi construído para agendamentos de compromissos a partir de um calendário com integração com o Google Agenda. O usuário pode se cadastrar no app a partir de sua conta do Google e indicar seus dias da semana e horários em que estará disponível para agendar compromissos. Todo agendamento cadastrado na aplicação tem integração com o Google Agenda, o que possibilita ao usuário verificar seus novos compromissos direto na plataforma do Google.

💻 Testando a aplicação localmente

Para rodar a aplicação será necessária a conexão com um banco de dados local ou container Docker e integrado com a ferramenta Prisma.io. Além da criação do projeto no Google Cloud Platform para coletar as credenciais necessárias para login e integração com a plataforma Google que constam em um arquivo .env na raiz do projeto Este arquivo também deverá conter a URL de conexão que deverá ser utilizada para a conexão do Prisma com o banco de dados.

exemplo do arquivo .env:
DATABASE_URL=

# Google oAuth

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXTAUTH_SECRET=



# Clone this project
$ git clone git@github.com:diegoalmda/nextjs-ignite-call.git
# Install dependencies
$ npm install
# Run the project
$ npm run dev
# The server will initialize in the <http://localhost:3000>
Testar o projeto em funcionamento -> Ignite Call