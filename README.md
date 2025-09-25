# 🏠 Casa de Jairo - Frontend Web

> Plataforma web oficial da ONG Casa de Jairo desenvolvida em Angular

[![Angular](https://img.shields.io/badge/Angular-17-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18-green.svg)](https://nodejs.org/)
[![HostGator](https://img.shields.io/badge/Hospedagem-HostGator-orange.svg)](https://www.hostgator.com.br/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Live Site](https://img.shields.io/badge/Site-casadejairo.online-brightgreen.svg)](https://casadejairo.online/)

## 📖 Sobre o Projeto

Este é o frontend do projeto da ONG *Casa de Jairo*, uma organização sem fins lucrativos que acolhe e cuida de crianças em situação de vulnerabilidade. Este site tem como objetivo divulgar a causa, incentivar doações e conectar apoiadores com o projeto social.

### 🎯 Objetivos

- Apresentar a missão e valores da ONG
- Divulgar projetos e atividades em andamento
- Facilitar doações e contribuições
- Conectar voluntários à organização
- Promover transparência nas ações da ONG

### 🌐 Site Oficial
**[casadejairo.online](https://casadejairo.online/)**

## 📸 Capturas de Tela

### Página Inicial

<img width="1878" height="911" alt="Captura de tela 2025-09-18 214755" src="https://github.com/user-attachments/assets/3b149b5e-495f-4061-a7f2-39933f147c65" />


### Sobre Nós

<img width="1889" height="750" alt="Captura de tela 2025-09-18 214814" src="https://github.com/user-attachments/assets/bee92ac1-88f5-409a-80a3-26700c79f433" />

### Nossa Missão

<img width="1877" height="915" alt="Captura de tela 2025-09-18 214938" src="https://github.com/user-attachments/assets/717d7965-f164-44d7-ae4d-5a15729b404d" />

### Nova Sede

<img width="1876" height="905" alt="Captura de tela 2025-09-18 215003" src="https://github.com/user-attachments/assets/cfa95856-6ea2-4b82-bf26-80171a865d5a" />

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Angular 17** 
- **TypeScript 5.0** 
- **HTML5** 
- **CSS3** 

### Desenvolvimento
- **Node.js 18**
- **npm/yarn** 
- **Angular CLI** 

### Integração
- **Angular HttpClient** - Comunicação com API
- **Angular Router** - Roteamento SPA
- **Angular Animations** - Animações e transições

### Hospedagem
- **HostGator** - Servidor de hospedagem
- **Git** - Controle de versão

## 🚀 Funcionalidades

### 📋 Páginas Principais
- **Home**: Apresentação da ONG e destaques
- **Notícias & Eventos**: Atividades e programas em andamento
- **Transparência**: Transparência de gastos e recebimentos
- **Voluntário**: Como se tornar voluntário
- **Empresa Parceira**: Como se tornar uma empresa parceira
- **Nova Sede**: Novo local em construção
- **Doação**: Formas de contribuir financeiramente

### ✨ Recursos Especiais
- **Design Responsivo**: Adaptado para todos os dispositivos
- **Animações Suaves**: Transições e efeitos visuais
- **Formulários Interativos**: Validação em tempo real
- **Galeria de Imagens**: Showcase dos projetos
- **Integração com API**: Dados dinâmicos do backend

### 📱 Compatibilidade
- Dispositivos móveis (iOS/Android)
- Tablets
- Desktops 

## 📋 Pré-requisitos

- Node.js 18 ou superior
- npm 9+ ou yarn
- Angular CLI 17+
- Git

## 🔧 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/BrendoAL/Front_SiteCasaDeJairo.git
cd Front_SiteCasaDeJairo
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  siteUrl: 'http://localhost:4200',
  organizationName: 'Casa de Jairo',
  organizationEmail: 'contato.casadejairo@gmail.com',
  organizationPhone: '(47) 99181-0946'
};
```

### 4. Execute a aplicação
```bash
# Desenvolvimento
ng serve
# ou
npm start

# Aplicação estará disponível em http://localhost:4200
```

### 5. Build para produção
```bash
ng build --configuration production
# ou
npm run build
```

## 🎨 Guia de Estilos

### Paleta de Cores
```scss
// Cores principais
$primary-color: #2E7D32;      // Verde principal
$secondary-color: #FFC107;     // Amarelo destaque  
$accent-color: #FF5722;        // Laranja CTAs

// Cores neutras
$text-dark: #212121;
$text-light: #757575;
$background: #FAFAFA;
$white: #FFFFFF;
```

## 📚 Scripts Disponíveis

```bash
# Desenvolvimento
npm start                    # Inicia servidor de desenvolvimento
npm run build               # Build para produção

# Utilitários
ng generate component nome  # Cria novo componente
ng generate service nome    # Cria novo serviço
ng generate module nome     # Cria novo módulo
```

## 🤝 Contribuição

Estamos sempre abertos a sugestões e contribuições!

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 👥 Equipe de Desenvolvimento

**Brendo AL** - [GitHub](https://github.com/BrendoAL)  

**Rafael** - [GitHub](https://github.com/rafael2297)

**João Crispim** - [GitHub](https://github.com/Joaowc)  

**Laney** - [GitHub](https://github.com/laneyaviz)  

**Fabian Castelo** - [GitHub](https://github.com/FabianCastelo)  

**Larissa Alves** - [GitHub](https://github.com/LariiAlves)    

**Julia Lima** - [GitHub](https://github.com/JuliaLimaB007)  

**Gabriel** - [GitHub](https://github.com/Gabriel-Sperber-Rodrigues)  


## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- Casa de Jairo pela oportunidade de contribuir
- Todos os voluntários que dedicam seu tempo ao projeto

## 📞 Contato

### 🏠 ONG Casa de Jairo
- **Site**: [casadejairo.online](https://casadejairo.online/)
- **Email**: contato.casadejairo@gmail.com
- **Telefone**: (47) 99181-0946

### 📍 Localização
Blumenau, Santa Catarina, Brasil

---

## ⚖️ Direitos de Imagem

**Importante**: Todas as crianças que aparecem no site possuem direito de imagem liberado para uso da ONG Casa de Jairo, conforme documentação em arquivo.

---

<div align="center">
  <p>Feito com ❤️ para a Casa de Jairo</p>
  <p>Ajudando a transformar vidas através da tecnologia</p>
  
</div>
