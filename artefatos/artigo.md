## Abstract

&emsp;Este artigo descreve o desenvolvimento e a implementação de uma IDE online para TOs da AACD. A IDE é intuitiva e não requer conhecimentos prévios em programação, permitindo aos TOs criar atividades lúdicas e educacionais adaptadas a crianças com paralisia cerebral. Utilizando um tapete sensorial e a linguagem de programação QAL, a IDE facilita a criação de jogos interativos que ajudam as crianças a superar barreiras motoras e cognitivas. O projeto representa um avanço significativo no uso de tecnologia assistiva, promovendo a inclusão e o desenvolvimento integral de crianças com necessidades especiais.

## Introdução

&emsp;A paralisia cerebral, definida pela primeira vez em 1843 por William Little como "encefalopatia crônica da infância", é uma patologia ligada a diferentes causas e caracterizada, principalmente, por rigidez muscular. Sigmund Freud, durante sua "fase neurológica" em 1897, sugeriu a expressão "paralisia cerebral" ao estudar o que é conhecido até os tempos atuais como "Síndrome ou Moléstia de Little" (VASCONCELLOS, Roseli; DEL RÉ, Alessandra, 2016).

&emsp;A paralisia cerebral é uma condição que afeta o desenvolvimento motor e cognitivo de crianças, geralmente causada por lesões no cérebro durante a gestação, o parto ou nos primeiros anos de vida. As crianças com paralisia cerebral podem enfrentar diversas barreiras no dia a dia, como dificuldades de mobilidade, comunicação e aprendizagem.

&emsp;A falta de tecnologias assistivas adequadas para esse público é um problema ainda presente. Essas tecnologias podem proporcionar maior autonomia, participação social e desenvolvimento integral para crianças com paralisia cerebral.

&emsp;A AACD, Associação de Assistência à Criança Deficiente, é uma instituição brasileira sem fins lucrativos fundada em 1950. Privada e dedicada ao bem-estar de pessoas com deficiência física, a instituição é uma referência nacional e internacional em tratamento, reabilitação, habilitação e inclusão social, com foco especial em deficiência motora. Com 9 unidades espalhadas pelo Brasil, a AACD realizou em 2022 um total de 760.040 atendimentos, contemplando 59.167 pessoas. Estes atendimentos foram realizados pelo SUS (Sistema Único de Saúde) e por convênios parceiros. Além disso, a instituição realizou quase 7 mil cirurgias no ano, segundo o Relatório Integrado (2022) da instituição (AACD, 2022).

&emsp;Embora tenha um histórico valioso, a AACD enfrenta um desafio relacionado à tecnologia: sua adaptação para pacientes com necessidades específicas, como crianças e adolescentes com dificuldades motoras e cognitivas. Seus equipamentos, tradicionalmente disponíveis no mercado, em alguns casos não possuem adaptações adequadas para pessoas com deficiências. Para auxiliar essas pessoas em suas atividades de vida diária (AVDs), existem recursos conhecidos como "tecnologia assistiva" - um conjunto de recursos e/ou serviços que proporcionam mais autonomia e acessibilidade. Segundo o The Assistive Technology Act de 1998, a tecnologia assistiva é descrita como qualquer item, peça de equipamento ou sistema de produtos, seja comercialmente adquirido, modificado ou personalizado, usado para manter ou melhorar as capacidades funcionais de indivíduos com deficiência (Estados Unidos, 1998).

&emsp;Identificando uma oportunidade, foi estabelecida uma parceria entre a AACD e o Instituto de Tecnologia e Liderança (Inteli), uma organização sem fins lucrativos focada no ensino baseado em projetos de tecnologia e inovação. O projeto desenvolvido nesta parceria visa criar um Ambiente de Desenvolvimento Integrado (IDE) de fácil entendimento e manipulação pelos Terapeutas Ocupacionais (TOs), que poderão desenvolver atividades e jogos lúdicos utilizando um tapete sensorial para pacientes com paralisia cerebral.

&emsp;O desenvolvimento de tecnologia assistiva para crianças com deficiências motoras e cognitivas é crucial segundo Vitomska (2023), pois oferece oportunidades de interação, aprendizado e expressão adaptadas às suas necessidades específicas. Essas tecnologias podem ajudar a superar barreiras impostas por limitações motoras e cognitivas, permitindo que as crianças participem mais ativamente de atividades educacionais e sociais. Durante a infância, um período essencial para o desenvolvimento de habilidades, a tecnologia assistiva facilita a inclusão, promovendo igualdade de oportunidades e crescimento integral. Além disso, este projeto é relevante pois fomenta o uso de tecnologias assistivas e contribui significativamente para a cultura tecnológica da AACD, incentivando a adoção de inovações que podem transformar a vida de muitas crianças na instituição.

&emsp;As tecnologias assistivas podem ajudar as crianças com paralisia cerebral a superar barreiras impostas por limitações motoras e cognitivas. Elas podem proporcionar oportunidades de interação, aprendizado e expressão adaptadas às suas necessidades específicas. Além disso, as tecnologias assistivas também podem contribuir para a inclusão social das crianças com paralisia cerebral, promovendo igualdade de oportunidades e crescimento integral.

## Materiais e Métodos

### Sprint 1: Entendimento do problema e definição do escopo
&emsp;O objetivo principal desta etapa foi obter um entendimento do problema apresentado pela empresa parceira, fazer uma análise de mercado, de público alvo a ser direcionada a solução que será desenvolvida e definir o escopo do projeto.

&emsp;Para isso, foi realizado um workshop com a representante da empresa parceira e identificados os requisitos necessários para a realização do projeto e as restrições que deveriam ser consideradas.

&emsp;Após as informações coletadas, foi feita uma análise de mercado para identificar as soluções existentes e as tecnologias utilizadas. A partir disso, foi possível definir o escopo do projeto e as tecnologias que seriam utilizadas e apresentadas à representante da empresa parceira.

### Sprint 2: Desenvolvimento da aplicação e documentação incial

&emsp;O objetivo principal desta etapa foi desenvolver a aplicação e documentar o processo de desenvolvimento. Para isso, foi feito um planejamento de desenvolvimento, com a definição das tarefas a serem realizadas e a divisão de tarefas entre os integrantes do grupo.

&emsp;Após a definição das tarefas, foi iniciado o desenvolvimento de uma aplicação web, utilizando a linguagem html, css e javascript para sua construção como frontend da solução e iniciados os analisadores responsáveis (léxico e sintático) pelas primeiras etapas do processamento do código que será gerado pela aplicação web.

&emsp;Além do desenvolvimento técnico, iniciou-se também a escrita do artigo científico relacionado ao projeto. Em sua primeira versão, foi apresentada a introdução ao problema e as referências a qual o documento se baseia.


### Sprint 3: Aprimoramento da aplicação, desenvolvimento do compilador e documentação

&emsp;Na terceira etapa do projeto, o objetivo principal foi aprimorar a aplicação desenvolvida na etapa anterior, desenvolver o compilador (aprimoramento do léxico e do sintático e início do semântico) e documentar o processo de desenvolvimento.

&emsp;O analisador léxico foi melhorado em sua última versão e testado, o analisador sintático teve aprimoramentos e foi desenvolvida a árvore sintática abstrata, que é a estrutura de dados que representa o código fonte do programa. Além disso, foi iniciado o desenvolvimento do analisador semântico, que é responsável por verificar se o código fonte do programa está de acordo com as regras da linguagem de programação QAL, linguagem de programação baseada em Python que foi desenvolvida para o projeto.

&emsp;A segunda versão do artigo contou com melhorias na introdução e adição da seçaõ trabalhos relacionados, que apresenta os estudos que foram utilizados como base para o desenvolvimento do projeto e adicionadas as referências relevantes para a criação da nova seção.


### Sprint 4: Finalização dos analisadores, desenvolvimento do compilador e documentação

&emsp;Na quarta etapa do projeto, o objetivo principal foi finalizar o desenvolvimento dos analisadores e do compilador, atribuir features de acessibilidade pertinentes ao IDE e documentar o processo de desenvolvimento.

&emsp;O analisador e a árvore sintática abstrata foram testados, o analisador foi desenvolvido, testado e finalizado e foi feito o gerador de código, que será a parte responsável por receber a informação da atividade criada pelo TO e gerar o código fonte do programa em QAL. Além disso, foi feita a integração do compilador com o Pygame, biblioteca de jogos em Python, que será responsável por executar o jogo (atividade) criado pelo TO.

&emsp;Na documentação, foi feita a revisão das seções já criadas do artigo e adicionada a seção de resultados, que apresenta o produto final do projeto e os resultados obtidos com o desenvolvimento do projeto.


### Sprint 5: Finalização do projeto e documentação

&emsp;Na quinta e última etapa do projeto, o objetivo principal foi finalizar o desenvolvimento do projeto e documentar o processo de desenvolvimento.

&emsp;O analisador semântico foi testado, o gerador de código foi finalizado e foi feita a integração do compilador com o Pygame, biblioteca de jogos em Python, que será responsável por executar o jogo (atividade) criado pelo TO.

&emsp;Na documentação, foi feita a revisão de todas as seções do artigo e adicionada a seção de materiais e métodos, que apresenta as etapas do projeto e as tecnologias utilizadas em cada uma delas.

&emsp;Após todos os ajustes na documentação e no projeto, foi feita a organização do repositório para uma boa compreensão e facilidade de acesso aos conteúdos pelo parceiros atuantes da empresa parceira de projeto.

## Trabalhos relacionados

&emsp;A partir de uma revisão bibliográfica aprofundada dos trabalhos com temas relacionados ao contexto em questão é possível extrair informações importantes e reforçar a relevância e a aplicabilidade dos conceitos abordados neste trabalho. Além disso, ao examinar estudos anteriores consegue-se garantir que será desenvolvido um projeto de fato relevante e inovador para o campo da tecnologia assistiva no Brasil.

&emsp;Dentre os trabalhos revisados, dois destaques são particularmente relevantes. O primeiro é o artigo de Souza, P. G. F., Jurdi, A. P. S., & Silva, C. C. B. (2011), que se concentra em compreender como tem sido o uso da terapia ocupacional, apoiada por tecnologias assistivas, no contexto da educação brasileira. Isso é relevante pois o artigo enfatiza a importância da tecnologia assistiva no processo de educação de uma criança e em sua inclusão no contexto escolar, o que traz mais relevância para o desenvolvimento da IDE para programação de tapetes sensoriais. Além disso, ele traz um ponto de atenção, no que se refere a importância de capacitar os profissionais que farão uso dessa tecnologia para que utilizem-a de maneira eficaz, pois de nada adianta a produção desses recursos se os profissionais que irão aplicá-los não estiverem devidamente preparados. Por fim, o estudo também cita a necessidade de maior pesquisa e desenvolvimento no campo da tecnologia assistiva, sugerindo espaço para a inovação e aprimoramento das ferramentas já existentes, o que reforça a importância de projetos como esse sejam executados. Desse modo, o estudo Souza, P. G. F., Jurdi, A. P. S., & Silva, C. C. B. (2011) validam o escopo do projeto de IDE para tapetes sensoriais, evidenciando sua contribuição tanto para o desenvolvimento motor e cognitivo de crianças com deficiências, promovendo autonomia, independência e inclusão quanto para a inovação tecnológica.

&emsp;Soltyk e Bazylchuk (2019) realizaram uma pesquisa, unindo os estudos da professora Inna Soltyk, associada do Departamento de Fisioterapia e Terapia Ocupacional na Universidade Nacional de Khmelnytskyi, e Oleg Bazylchuk, Doutor em Ciências Pedagógicas e chefe do Departamento de Fisioterapia e Terapia Ocupacional na mesma universidade, que fica na Ucrânia.

&emsp;Esse trabalho aborda o uso da terapia ocupacional com elementos de integração sensorial para melhorar a capacidade funcional e a qualidade de vida de crianças com deficiência motora, cognitiva ou até com hipersensibilidade ou hipossensibilidade a certos estímulos. É importante destacar o fato evidenciado no estudo de que esse método terapêutico é eficiente para crianças com uma variadade de condições, incluindo paralisia cerebral, atraso no desenvolvimento mental e até mesmo autismo e Síndrome de Down, fazendo com que projetos nesse sentido possuam um potencial de impacto abrangente. Outro ponto importante levantado por Soltyk e Bazylchuk é que o sucesso dessa metodologia depende do nível de personalização que ela é aplicada. Ou seja, os exercícios sensoriais devem ser escolhidos de maneira adequada para cada criança, considerando sua idade, nível de desenvolvimento, características específicas da deficiência em questão e outras necessidades individuais. Sendo assim, a capacidade de personalização é um fator chave e que deve ser considerado na IDE para programação dos tapetes sensoriais. Além disso, é importante que essa terapia seja realizada de maneira lúdica e engajante, para que a criança de fato se envolva com a atividade e possua ganhos maiores, o que se traduz na criação de funcionalidades mais interativas na IDE, como estímulos sonoros e visuais. Dessa maneira, este estudo traz aspectos importantes a serem considerados em projetos desse campo e também reforça o potencial que essa abordagem terapêutica tem de causa impactos positivos na vida de crianças com deficiência, como as da AACD.

&emsp;Além dos estudos mencionados, outros dois trabalhos relevantes são os de M. V. Vitomska (2023), que examina a influência da terapia ocupacional e integração sensorial no autocuidado em crianças com autismo, destacando a eficácia da integração sensorial em contextos terapêuticos específicos; e o de Evelin Naiara Garcia e Alboni Marisa Dudeque Pianovski Vieira (2018), que aborda a importância da tecnologia assistiva na educação inclusiva, ressaltando seu papel crucial na aprendizagem e inclusão de pessoas com deficiência. Ambos também são estudos importantes e, de certa maneira, se alinham com a proposta do projeto em questão.

&emsp; Sendo assim, esses estudos enfatizam a importância crescente da terapia ocupacional, integração sensorial e tecnologia assistiva na melhoria da qualidade de vida e inclusão educacional de indivíduos com necessidades especiais, evidenciando a relevância e o potencial de inovação da criação de um ambiente de desenvolvimento integrado que permite que, em alto nível, TOs personalizem atividades lúdicas em um tapete sensorial. 

## Resultados

&emsp; Ao término do período de desenvolvimento, o objetivo foi fornecer uma ferramenta de tecnologia assistiva para facilitar a integração e interação entre TOs e pacientes. Com esse propósito, o produto final consistiu em uma Interface de Desenvolvimento Integrada (IDE) totalmente online, destinada a auxiliar na criação de atividades a serem utilizadas nos tratamentos.

&emsp; A plataforma foi projetada para ser acessível a pessoas sem conhecimento prévio em programação, sendo completamente "no-code", ou seja, para utilizar as funcionalidades disponíveis, não é necessário interagir diretamente com nenhum código. O processo de desenvolvimento de atividades baseia-se na criação de perguntas relacionadas a imagens, como por exemplo, "Qual é a cor do objeto?". A resposta é inserida pelo paciente e analisada pelo programa durante a dinâmica.

&emsp; Para atingir esse objetivo, a aplicação incorpora uma funcionalidade de "montagem de código", permitindo ao usuário estruturar o programa final por meio de blocos com funções objetivas e pré-definidas. Esses blocos são arrastáveis e conectáveis, dessa forma, o TO organiza as funções de acordo com suas preferências para o funcionamento do programa, incluindo a definição da resposta correta e o feedback associado.

&emsp; Com o intuito de assegurar a funcionalidade estruturada do programa, desenvolveu-se uma linguagem de programação denominada QAL (Quick Assistive Language), utilizada para representar o algoritmo criado pelo usuário através dos blocos interativos. É essencial para que a estrutura no-code montada possa ser interpretada e, por meio de um compilador integrado desenvolvido durante o projeto, convertida em uma linguagem de programação mais convencional, como o Python. Isso permite uma maior escalabilidade da solução e o uso de bibliotecas externas prontas para essa linguagem, como o PyGame, responsável por executar o jogo durante a atividade.

&emsp; Além do software desenvolvido, foi elaborado um tapete integrado com um GregMaker, um dispositivo utilizado para ler impulsos elétricos e convertê-los em comandos do teclado. O tapete possui o objetivo de servir como dispositivo de entrada para as alternativas escolhidas pelo paciente, uma vez que o objeto é dividido em quadrantes, os quais representam as alternativas possiveis, sendo interpretadas como comandos que serão lidos pelo GregMaker, inseridos no computador e comparados com a resposta esperada pelo programa montado pela TO.

&emsp; Em resumo, o processo para a criação e utilização de uma atividade envolve a elaboração de um enunciado com imagem, a estruturação dos blocos que compõem o programa e a definição da resposta correta (transformada em comandos únicos do teclado que são lidos pelo GregMaker). Posteriormente, ocorre a execução da atividade, a inserção da resposta do paciente pelo tapete e a coleta de feedback. Assim, o desenvolvimento de jogos interativos foi viabilizado integralmente para usuários sem conhecimento técnico em programação, permitindo uma maior personalização das atividades e, consequentemente, melhores resultados nas dinâmicas realizadas com os pacientes.

# Conclusões

&emsp;Este artigo detalhou o desenvolvimento de uma Interface de Desenvolvimento Integrada (IDE) online para Terapeutas Ocupacionais (TOs) na AACD, com o objetivo de auxiliar na reabilitação de crianças com paralisia cerebral. A IDE, projetada para ser acessível a usuários sem conhecimentos prévios em programação, permite aos TOs criar atividades lúdicas e educacionais personalizadas, utilizando um tapete sensorial e a linguagem de programação QAL. Com o projeto agora concluído, ele apresenta um potencial significativo para influenciar positivamente a inclusão e o desenvolvimento integral de crianças com necessidades especiais, embora os testes práticos com pacientes ainda estejam pendentes.

### Avaliação dos Objetivos e Desenvolvimento Atual

&emsp;O projeto alcançou seu objetivo principal de desenvolver uma ferramenta que capacita os terapeutas ocupacionais a criar atividades terapêuticas de forma autônoma e inovadora, sem necessidade de conhecimento técnico em programação. A funcionalidade e a usabilidade da IDE foram alcançadas conforme planejado. No entanto, a eficácia real da IDE em ambientes clínicos com pacientes ainda será avaliada. Espera-se que, uma vez implementada, a ferramenta permita maior engajamento e interação das crianças nas atividades, potencialmente melhorando suas habilidades motoras e cognitivas.

## Sugestões para Trabalhos Futuros

1. *Expansão da Linguagem de Programação QAL*: Refinar e expandir a QAL para incluir mais funcionalidades interativas, permitindo a criação de atividades ainda mais adaptáveis e diversificadas.

2. *Estudo de Impacto a Longo Prazo*: Planejar estudos longitudinais para avaliar o impacto das atividades desenvolvidas na IDE no desenvolvimento cognitivo e motor das crianças, assim que a plataforma estiver em uso regular.

3. *Integração com Outras Tecnologias*: Investigar a integração da IDE com outras ferramentas de reabilitação para ampliar sua aplicabilidade em diferentes contextos terapêuticos.

4. *Sistema de Feedback dos Usuários*: Implementar um mecanismo de feedback contínuo para adaptar a plataforma às necessidades e feedbacks dos usuários (TOs e pacientes).

5. *Extensão para Outras Condições de Deficiência*: Explorar a aplicabilidade da IDE em outras condições além da paralisia cerebral, como autismo ou atrasos no desenvolvimento.

&emsp;Estas sugestões visam não apenas a continuidade do trabalho iniciado, mas também sua expansão de maneira a maximizar o impacto positivo da IDE na vida de crianças com necessidades especiais e no campo da terapia ocupacional.


## Referências
VASCONCELLOS R.; DEL RÉ, **A. Cerebral Palsy: effects of writing on a child’s writing**. Alfa, São Paulo, v.61, n.2, p.319-349, 2017

AACD. **Relatório Integrado (2022)**. Disponível em: https://aacd.org.br/wp-content/uploads/2023/07/Relatorio-Integrado-AACD-2022.pdf. Acesso em: 06 de novembro de 2023.

Estados Unidos (1998). **The assistive technology Act of 1998. Lei nº 105-394, de 13 de novembro de 1998**. Disponível em: https://www.govinfo.gov/content/pkg/PLAW-105publ394/pdf/PLAW-105publ394.pdf. Acesso em: 13 de novembro de 2023.

SOUSA, P. G. F. et al. **O uso da tecnologia assistiva por terapeutas ocupacionais no contexto educacional brasileiro: uma revisão da literatura**. Cadernos Brasileiros de Terapia Ocupacional, [S.l.], v. 19, n. 2, p. 177-187, 2011. Disponível em: https://www.cadernosdeterapiaocupacional.ufscar.br/index.php/cadernos/article/view/1123. Acesso em: 24 de novembro de 2023.

Vitomska, M. V. **The Effect of Occupational Therapy and Sensory Integration on the Level of Self-Care of Children with Autistic Spectrum Disorders.** Art of Medicine, [S.l.], 2023. Disponível em: https://art-of-medicine.ifnmu.edu.ua/index.php/aom/article/view/865. Acesso em: 24 de novembro de 2023.

SOLTYK, I.; BAZYLCHUK, O. **Occupational therapy using a sensory integration**. Dragomanov. Série 15, [S.l.], v. 24, n. 10, p. 1254-1262, 2019. Disponível em: https://spppc.com.ua/index.php/journal/article/view/1254. Acesso em: 25 de novembro de 2023.

Garcia, E. N.; Vieira, A. M. D. P. **Desafios Contemporâneos: O Uso da Tecnologia Assistiva como Instrumento Facilitador da Aprendizagem.** Linguagens, Educação e Sociedade, Teresina, Ano 23, n. 40, set./dez. 2018. Revista do Programa de Pós-Graduação em Educação da UFPI. ISSN 2526-8449 (Eletrônico), 1518-0743 (Impresso). Disponível em: https://revistas.ufpi.br/index.php/lingedusoc/article/download/7654/pdf_1. Acesso em: 26 de novembro de 2023.
