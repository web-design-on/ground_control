# 🌔 Ground Control

> O Ground Control, desenvolvido para o desafio do Global Solution de 2026 da FIAP, consiste em um aplicativo de saúde mental e bem-estar voltado para astronautas em missões espaciais de longa duração. A solução foi criada para auxiliar usuários que enfrentam situações de
isolamento prolongado, rotina intensa e desafios emocionais, oferecendo ferramentas para acompanhamento do humor, práticas de relaxamento,
desenvolvimento de hábitos saudáveis e incentivo ao autocuidado.

---

## 🚀 Tecnologias Utilizadas
- **React Native** – Framework para desenvolvimento de aplicativos móveis multiplataforma.
- **Expo** – Ferramenta que simplifica o desenvolvimento, build e testes de apps React Native.
- **TypeScript** – Superset do JavaScript que adiciona tipagem estática, aumentando a segurança e manutenção do código.

---

## 🎨 Decisões de Interface e Organização do App

O design do aplicativo foi desenvolvido com foco em transmitir acolhimento, tranquilidade e segurança. Para isso, utilizamos uma identidade visual inspirada no universo espacial, combinando elementos lúdicos, ilustrações amigáveis e uma paleta de cores suaves composta principalmente por tons de azul, roxo e bege, que são associadas a calma, estabilidade emocional e confiança.

Também incorporamos elementos de gamificação, como rankings e recompensas, com o objetivo de incentivar o engajamento contínuo e a criaçãode hábitos saudáveis. Além disso, recursos visuais como gráficos de humor, indicadores de progresso e atividades guiadas ajudam o usuário a compreender sua evolução emocional de maneira clara e motivadora.

---

## 🗂️ Estrutura do Projeto
```
app/
├── (auth) / # Telas relacionadas a autenticação
├── (tabs) / # Telas principais e menu de navegação
├── Telas que compõem fluxos mais específicos
│
assets/ # Imagens e ícones
│
components/ # Componentes reutilizáveis
│
constants/
└── theme.ts # Definição de cores e configurações de tema
│
hooks/ # Hooks personalizados
```
---

## ⚙️ Como Rodar o Projeto Localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/web-design-on/ground_control/
   ```

2. Acesse a pasta do projeto

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor:

   ```bash
   npx expo start
   ```
---
