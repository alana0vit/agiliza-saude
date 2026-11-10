# Agiliza Saúde — protótipo de agendamento em UBS

Site estático (um único `index.html`, sem backend) que simula o agendamento de consultas nas
unidades de saúde de Jaboatão dos Guararapes. Feito para testes de usabilidade e acessibilidade.

## O que é real e o que é simulado

| Real | Simulado |
|---|---|
| Nome, bairro e endereço das 110 unidades (fonte: meupostinho.com.br) | Serviços de cada unidade, horários de funcionamento, vagas |
| Link "Como chegar" (abre o Google Maps no endereço real) | Distâncias (calculadas a partir do centro aproximado do bairro) |
| Arquivo de agenda (.ics) e mensagem de WhatsApp | Lembrete por SMS/WhatsApp, protocolo |

As vagas são geradas por uma fórmula fixa: todo participante vê as mesmas vagas no mesmo dia,
incluindo dias "sem vagas" e algumas agendas lotadas, de propósito.

## Publicar no Render

1. Crie uma conta em https://github.com e um repositório novo (pode ser público), ex.: `agiliza-saude`.
2. No repositório: **Add file → Upload files**, arraste todos os arquivos desta pasta e clique em **Commit changes**.
3. Em https://dashboard.render.com: **New → Static Site** e conecte o repositório.
4. Preencha:
   - **Build Command:** deixe vazio
   - **Publish Directory:** `.`
5. **Create Static Site**. Em cerca de um minuto o site fica em `https://<nome>.onrender.com`.

Cada novo commit no GitHub republica o site sozinho. O endereço usa HTTPS, o que é necessário
para o botão "Usar minha localização" funcionar.

## Onde ficam as respostas

- **No aparelho do participante (sempre):** perfil, consultas e registros de uso ficam no
  `localStorage` do navegador. Por isso "Minhas consultas" continua lá quando a pessoa volta.
- **Página da equipe:** abra `https://<seu-site>/#/dados` para ver os registros daquele aparelho,
  baixar em CSV e zerar o aparelho antes do próximo participante.
- **Numa planilha (opcional, recomendado):** veja abaixo.

O que é registrado: início do agendamento, agendou/remarcou/cancelou (serviço, unidade, data,
hora, para quem), **tempo até concluir** (`duracao_s`), quantas vezes voltou (`voltas`), uso de
localização e de acessibilidade, nota de 1 a 5 e comentário. **Nome, CPF/CNS e telefone não são
enviados nem registrados no log.**

## Receber as respostas numa planilha (sem backend)

1. Crie uma planilha em https://sheets.new.
2. **Extensões → Apps Script**. Apague o que estiver lá e cole o conteúdo de `apps-script.gs`.
3. **Implantar → Nova implantação → tipo "App da Web"**.
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
4. Autorize e copie a URL que termina em `/exec`.
5. No `index.html`, procure `const CONFIG = { ENDPOINT: "" };` e cole a URL entre as aspas.
6. Faça o commit. Pronto: cada ação dos participantes vira uma linha na planilha.

Se alterar o script depois, use **Implantar → Gerenciar implantações → Editar → Nova versão**.

## Dicas para a sessão de teste

- Tarefas sugeridas: (1) marcar dentista perto de casa; (2) marcar para a mãe/avó numa unidade
  que abra à noite; (3) remarcar para outro dia; (4) cancelar.
- Avise que os dados podem ser fictícios (o campo aceita qualquer CPF de 11 dígitos).
- A faixa amarela no topo avisa que o agendamento não vale na UBS. Mantenha-a: evita que alguém
  apareça na unidade achando que tem consulta.
