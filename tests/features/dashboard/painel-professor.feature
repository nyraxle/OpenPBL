Feature: Painel de usuário - professor
	Como um professor
	Eu quero acessar a tela de painel de usuário
	Para isso eu logo no sistema
	
	Scenario: Login no sistema após novo cadastro
		Given que eu tenho uma conta válida e logo no sistema
		And eu estou na tela de painel de usuário
		And eu não tenho atividades cadastradas
		When o painel de usuário abre
		Then a tela não retorna nenhuma atividade
		And a tela exibe a figura animada "dashboard-empty.svg"
		And a figura animada exibe dicas gerais sobre as atividades e o OpenPBL ao passar o mouse sobre a figura (específicas para o professor)
		And a tela exibe a mensagem "Bem vindo ao OpenPBL, que tal começar criando uma atividade?"
		And uma seta aponta para o botão de criar atividade

	Scenario: Acesso ao painel de usuário após ter criado atividades
		Given que eu estou logado
		And eu acesso a tela de painel de usuário a partir de outra tela
		And eu tenho atividades cadastradas
		When o painel de usuário abre
		Then a barra lateral carrega todas as atividades cadastras por mim
		And a tela exibe um cabeçalho com o nome da atividade e o botão "Abrir" e um ícone para exclusão da atividade
		And exibe o painel "Problema" com o resumo da atividade limitado a "300" caracteres finalizando o texto com "..."
		And exibe o painel "Participantes" com uma lista de participantes da atividade com barra de rolagem ao exceder "10" usuários
		And o painel participantes exibe uma lista com Nome, Participações e Opções para Excluir e Adicionar alunos
		And a tela exibe o painel de "Participações recentes" exibindo as ultimas postagens e a barra de rolagem ao exceder
		"6" postagens
		And widgets com Numero de participantes, Estado da atividade, Progresso da atividade, Data de criação da atividade
