# Atividade

Sua atividade é reproduzir em React a página de um carrinho de compras, como ilustrado a seguir.

![Tela](./tela.png)

### Comportamento

O carrinho de compras deve ser um componente que recebe (como propriedade) uma lista de itens escolhidos pelo usuário para comprar. Cada item contém o identificador do produto, seu nome, sua descrição, o valor unitário e uma referência para sua imagem. A lista pode também estar vazia. Nesse caso, a interface deve informar que "O carrinho de compras está vazio".

Por padrão, todos os itens terão apenas uma unidade no carrinho de compras. Porém, o usuário poderá aumentar essa quantidade usando botões para aumentar ou diminuir a quantidade. Os produtos listados no carrinho de compras devem ter pelo menos um item. Caso o usuário não queira o produto, ele deve removê-lo usando o botão com o ícone de cesta de lixo.

A quantidade todal de itens deve ser atualizada tanto no cabeçalho do carrinho ("Você tem X itens") quanto no quadro de Resumo ("Itens (X):"). Atente para a frase porque ela poderá estar no plural ("Você tem X itens") ou no singular ("Você tem 1 item").

O usuário deverá informar um CEP para que o frete seja calculado. A cidade e o estado do CEP informado devem ser consultados usando alguma API (por exemplo: https://viacep.com.br/). Caso o CEP não esteja no formato correto, uma mensagem de CEP inválido deve ser informada antes da chamada a API. Se o CEP estiver no formato correto, mas não houver uma localidade reconhecida, deve ser solicitado ao usuário para verificar o CEP informado (pode ter ocorrido um erro de digitação).

O valor total deve ser atualizado em função do total dos itens e do frete. Somente quando essas informações estiverem completas, o botão "Fechar pedido" deverá estar habilitado. Ao clicar o botão, o componente enviará um evento passando um objeto com:
* uma lista com os itens a comprar, contendo em cada elemento: o identificador do item e a quantidade escolhida.
* o cep digitado para o frete
* o valor do frete

### Avaliação

A avaliação será feita sob os seguintes critérios:
* Foram criados diferentes componentes em função de suas responsabilidades?
* Os componentes são normalmente parametrizáveis através de propriedades?
* Há componentes que passam informações para quem os usa (eventos)?
* Há componentes ou elementos que são renderizados condicionalmente?
* Há componentes ou elementos repetidos em laços?
* Há componentes que guardam informações internas (estados)?
* Há componentes que compartilham informações com descendentes na sua hierarquia (contexto)?
* Há validação de dados em campos de formulário?
* Há acesso a uma API externa?

Obs: Não serão avaliados aspectos visuais dos componentes, apenas os funcionais (ou seja, não se preocupe se estiver "feio"... só precisa funcionar 😉).
