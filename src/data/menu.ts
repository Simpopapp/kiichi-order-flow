export interface MenuItem {
  nome: string;
  preco?: number | null;
  descricao: string;
  metadados?: string[];
  customizacoes?: string[];
}

export interface MenuSubcategory {
  nome: string;
  itens: MenuItem[];
}

export interface MenuCategory {
  nome: string;
  preco?: number;
  descricao?: string;
  metadados?: string[];
  customizacoes?: string[];
  itens: (MenuItem | MenuSubcategory)[];
}

export interface MenuData {
  categorias: MenuCategory[];
}

export const menuData: MenuData = {
  "categorias": [
    {
      "nome": "Rodízio Jantar",
      "itens": [
        {
          "nome": "Sistema Rodízio",
          "preco": 189.00,
          "descricao": "Rodízio completo por pessoa, incluindo entradas, pratos quentes, temakis, sashimis, carpaccios, niguiris, gunkas, makimonos, especiais da casa e sobremesa. Consulte o garçom para opções adicionais.",
          "metadados": ["jantar"],
          "customizacoes": []
        },
        {
          "nome": "Entradas",
          "itens": [
            {"nome": "Guioza de Wagyu", "preco": null, "descricao": ""},
            {"nome": "Harumaki (queijo)", "preco": null, "descricao": ""},
            {"nome": "Pipoquinha de camarão", "preco": null, "descricao": ""},
            {"nome": "Bao recheado", "preco": null, "descricao": "Consulte o garçom"},
            {"nome": "Croquete de siri", "preco": null, "descricao": ""},
            {"nome": "Ebichin (camarão)", "preco": null, "descricao": ""},
            {"nome": "Mexilhão com vinagrete picante na colher", "preco": null, "descricao": ""},
            {"nome": "Edamame", "preco": null, "descricao": ""},
            {"nome": "Camarão empanado com molho especial", "preco": null, "descricao": ""},
            {"nome": "Lula à dorê", "preco": null, "descricao": ""},
            {"nome": "Shimeji", "preco": null, "descricao": ""},
            {"nome": "Missoshiro", "preco": null, "descricao": ""},
            {"nome": "Gohan", "preco": null, "descricao": ""}
          ]
        },
        {
          "nome": "Pratos Quentes",
          "itens": [
            {"nome": "Teppan (salmão ou anchova)", "preco": null, "descricao": ""},
            {"nome": "Yakissoba", "preco": null, "descricao": "Consulte o garçom"},
            {"nome": "Salmão ao molho de maracujá", "preco": null, "descricao": ""},
            {"nome": "Salmão marinado ao molho missô", "preco": null, "descricao": ""},
            {"nome": "Tempurá de legumes", "preco": null, "descricao": ""},
            {"nome": "Tempurá de milho doce", "preco": null, "descricao": ""},
            {"nome": "Soba de camarão", "preco": null, "descricao": ""},
            {"nome": "Lula na chapa", "preco": null, "descricao": ""},
            {"nome": "Camarão alho e óleo", "preco": null, "descricao": ""},
            {"nome": "Berinjela em cubos ao molho picante", "preco": null, "descricao": ""}
          ]
        },
        {
          "nome": "Temakis",
          "itens": [
            {"nome": "Consulte o garçom", "preco": null, "descricao": ""}
          ]
        },
        {
          "nome": "Sashimis",
          "itens": [
            {"nome": "Peixe da estação", "preco": null, "descricao": ""},
            {"nome": "Atum selado", "preco": null, "descricao": ""},
            {"nome": "Salmão", "preco": null, "descricao": ""},
            {"nome": "Polvo", "preco": null, "descricao": "Limitado"}
          ]
        },
        {
          "nome": "Carpaccios",
          "itens": [
            {"nome": "Peixe branco ao molho verde", "preco": null, "descricao": ""},
            {"nome": "Peixe branco ao molho de alcaparras", "preco": null, "descricao": ""},
            {"nome": "Salmão com azeite trufado e raspas de limão siciliano", "preco": null, "descricao": ""},
            {"nome": "Carpaccio na pedra de sal", "preco": null, "descricao": "Consulte o garçom"},
            {"nome": "Carpaccio ao molho de laranja e mel", "preco": null, "descricao": ""},
            {"nome": "Salmão no maçarico", "preco": null, "descricao": ""},
            {"nome": "Ceviche", "preco": null, "descricao": ""},
            {"nome": "Shisso empanado", "preco": null, "descricao": ""}
          ]
        },
        {
          "nome": "Niguiris",
          "itens": [
            {"nome": "Barriga de salmão trufada flor de sal", "preco": null, "descricao": ""},
            {"nome": "Atum com mel trufado", "preco": null, "descricao": ""},
            {"nome": "Peixe da estação com ampola, ao molho verde", "preco": null, "descricao": ""},
            {"nome": "Camarão com ovas", "preco": null, "descricao": ""}
          ]
        },
        {
          "nome": "Gunkas",
          "itens": [
            {"nome": "Tradicional", "preco": null, "descricao": ""},
            {"nome": "Shimeji, vieira e couve", "preco": null, "descricao": ""},
            {"nome": "Salmão com camarão", "preco": null, "descricao": ""},
            {"nome": "Ovo de codorna", "preco": null, "descricao": ""}
          ]
        },
        {
          "nome": "Makimonos",
          "itens": [
            {"nome": "Uramaki de salmão, Avocado e maionese spicy", "preco": null, "descricao": ""},
            {"nome": "Uramaki de salmão, camarão e cream cheese", "preco": null, "descricao": ""},
            {"nome": "Uramaki atum spicy", "preco": null, "descricao": ""},
            {"nome": "Hot roll", "preco": null, "descricao": ""}
          ]
        },
        {
          "nome": "Especiais da Casa",
          "itens": [
            {"nome": "Gunka de centolla", "preco": null, "descricao": "Limitado"},
            {"nome": "Gunka de ovas de ouriço", "preco": null, "descricao": "Limitado"},
            {"nome": "Gunka de unagui", "preco": null, "descricao": "Limitado"},
            {"nome": "Gunka de vieira com mel trufado", "preco": null, "descricao": "Limitado"},
            {"nome": "Ikura (ovas de salmão)", "preco": null, "descricao": "Limitado"},
            {"nome": "Niguiri de atum com foie gras", "preco": null, "descricao": "Limitado"},
            {"nome": "Vieira grelhada", "preco": null, "descricao": "Limitado"}
          ]
        },
        {
          "nome": "Sobremesa",
          "itens": [
            {"nome": "Brownie com sorvete finalizado com calda quente sorvete de castanha", "preco": null, "descricao": ""}
          ]
        }
      ]
    },
    {
      "nome": "Rodízio Almoço",
      "itens": [
        {
          "nome": "Sistema Rodízio Almoço",
          "preco": 119.99,
          "descricao": "Rodízio para almoço servido somente em dias úteis, incluindo entradas, temakis, pratos frios, pratos quentes e sobremesa.",
          "metadados": ["almoco"],
          "customizacoes": []
        },
        {
          "nome": "Entradas",
          "itens": [
            {"nome": "Missoshiro", "preco": null, "descricao": ""},
            {"nome": "Shimeji", "preco": null, "descricao": ""},
            {"nome": "Ebichin", "preco": null, "descricao": ""},
            {"nome": "Harumaki de queijo", "preco": null, "descricao": ""},
            {"nome": "Camarão empanado", "preco": null, "descricao": ""},
            {"nome": "Croquete de shimeji", "preco": null, "descricao": ""}
          ]
        },
        {
          "nome": "Temakis",
          "itens": [
            {"nome": "Califórnia - manga, kani, e pepino", "preco": null, "descricao": ""},
            {"nome": "Hot roll", "preco": null, "descricao": ""},
            {"nome": "Surpresa", "preco": null, "descricao": ""},
            {"nome": "Salmão skin", "preco": null, "descricao": ""},
            {"nome": "Salmão completo", "preco": null, "descricao": ""},
            {"nome": "Salmão, geleia, cebolinha e creme cheese", "preco": null, "descricao": ""},
            {"nome": "Salmão, shimeji, creme cheese, cebolinha e crispy", "preco": null, "descricao": ""},
            {"nome": "Especial - ovas, salmão e crispy", "preco": null, "descricao": ""}
          ]
        },
        {
          "nome": "Pratos Frios",
          "itens": [
            {"nome": "Sashimi", "preco": null, "descricao": ""},
            {"nome": "Sushi", "preco": null, "descricao": ""},
            {"nome": "Sushi de atum", "preco": null, "descricao": ""},
            {"nome": "Enrolados", "preco": null, "descricao": ""},
            {"nome": "Hot roll", "preco": null, "descricao": ""},
            {"nome": "Uramaki especial", "preco": null, "descricao": ""},
            {"nome": "Mini hot", "preco": null, "descricao": ""},
            {"nome": "Mini hot com molho especial", "preco": null, "descricao": ""},
            {"nome": "Romeu e Julieta", "preco": null, "descricao": ""},
            {"nome": "Jow com geleia", "preco": null, "descricao": ""},
            {"nome": "Maçarico", "preco": null, "descricao": ""},
            {"nome": "Ceviche", "preco": null, "descricao": ""}
          ]
        },
        {
          "nome": "Pratos Quentes",
          "itens": [
            {"nome": "Teppan de frango", "preco": null, "descricao": ""},
            {"nome": "Teppan de anchova", "preco": null, "descricao": ""},
            {"nome": "Teppan de legumes", "preco": null, "descricao": ""},
            {"nome": "Yakisoba vegetariano", "preco": null, "descricao": ""},
            {"nome": "Yakisoba de frango", "preco": null, "descricao": ""},
            {"nome": "Frango empanado", "preco": null, "descricao": ""},
            {"nome": "Tempurá de legumes", "preco": null, "descricao": ""},
            {"nome": "Soba de camarão", "preco": null, "descricao": ""},
            {"nome": "Salmão ao molho de maracujá", "preco": null, "descricao": ""}
          ]
        },
        {
          "nome": "Sobremesa",
          "itens": [
            {"nome": "Sorvete no copo", "preco": null, "descricao": "Um por pessoa"}
          ]
        }
      ]
    },
    {
      "nome": "Bebidas",
      "itens": [
        {
          "nome": "Básicos",
          "itens": [
            {"nome": "Água com e sem gás", "preco": 9.20, "descricao": ""},
            {"nome": "Refrigerante", "preco": 11.20, "descricao": ""},
            {"nome": "Chás gelado", "preco": 12.50, "descricao": ""},
            {"nome": "Suco natural", "preco": 16.00, "descricao": ""},
            {"nome": "Cerveja (long neck)", "preco": 17.00, "descricao": ""},
            {"nome": "Ban chá", "preco": 8.00, "descricao": ""},
            {"nome": "Café expresso", "preco": 7.50, "descricao": ""}
          ]
        },
        {
          "nome": "Doses",
          "itens": [
            {"nome": "Sake (nacional)", "preco": 31.00, "descricao": ""},
            {"nome": "Sake (importado)", "preco": 59.99, "descricao": ""},
            {"nome": "Vodka (nacional)", "preco": 31.00, "descricao": ""},
            {"nome": "Vodka (importada)", "preco": 59.00, "descricao": ""},
            {"nome": "Cachaça premium", "preco": 24.99, "descricao": ""},
            {"nome": "Whisky (8 anos)", "preco": 36.98, "descricao": ""},
            {"nome": "Whisky (12 anos)", "preco": 52.98, "descricao": ""},
            {"nome": "Whisky bourbon", "preco": 45.98, "descricao": ""}
          ]
        },
        {
          "nome": "Aperitivos",
          "itens": [
            {"nome": "Frangelico", "preco": 39.83, "descricao": ""},
            {"nome": "Licor 43", "preco": 43.99, "descricao": ""},
            {"nome": "Limoncello", "preco": 41.99, "descricao": ""},
            {"nome": "Peachtree", "preco": 43.99, "descricao": ""},
            {"nome": "Tia Maria", "preco": 42.99, "descricao": ""},
            {"nome": "Cointreau", "preco": 41.99, "descricao": ""},
            {"nome": "Umeshu", "preco": 39.99, "descricao": ""},
            {"nome": "Baileys", "preco": 39.83, "descricao": ""},
            {"nome": "Amarula", "preco": 39.99, "descricao": ""},
            {"nome": "Amaretto", "preco": 38.69, "descricao": ""},
            {"nome": "Vinho do Porto", "preco": 56.99, "descricao": ""}
          ]
        },
        {
          "nome": "Drinks",
          "itens": [
            {"nome": "NEGRONI", "preco": 41.99, "descricao": "Gin, Campari e vermute"},
            {"nome": "FITZGERALD", "preco": 39.97, "descricao": "Gin, limão, xarope de açúcar e angostura"},
            {"nome": "DRY MARTINI", "preco": 42.99, "descricao": "Gin, vermute branco"},
            {"nome": "APPLE MARTINI", "preco": 42.99, "descricao": "Xarope de maçã, Cointreau, vodka"},
            {"nome": "ESPRESSO MARTINI", "preco": 42.99, "descricao": "Vodka, licor de café e café expresso"},
            {"nome": "MARGARITA", "preco": 39.97, "descricao": "Tequila, Cointreau, suco de limão"},
            {"nome": "WHISKY SOUR", "preco": 44.99, "descricao": "Whisky, suco de limão, xarope de açúcar"},
            {"nome": "COSMOPOLITAN", "preco": 38.99, "descricao": "Vodka, suco de cranberry, Cointreau e limão"},
            {"nome": "MOJITO", "preco": 38.99, "descricao": "Rum, hortelã, xarope de açúcar e limão"},
            {"nome": "OLD FASHION", "preco": 45.99, "descricao": "Whisky bourbom, xarope de açúcar, angostura e água com gás"},
            {"nome": "BLOODY MARY", "preco": 39.99, "descricao": "Suco de tomate, vodka, molho inglês, pimenta e sal"},
            {"nome": "APEROL SPRITZ", "preco": 39.99, "descricao": "Aperol, espumante, água tônica"},
            {"nome": "GIN TÔNICA", "preco": 39.99, "descricao": "Gin, limão e água tônica e especiarias"},
            {"nome": "BASIL SMASH", "preco": 39.99, "descricao": "Gin, manjericão, limão e xarope de açúcar"},
            {"nome": "LYCHEE MARTINI", "preco": 42.99, "descricao": "Vodka, purê de lichia, mel de yuzu e limão"},
            {"nome": "GUEIXA", "preco": 41.99, "descricao": "Vodka, purê de lichia, xarope maracujá, limão, mel de yuzu"},
            {"nome": "GINGER KIICHI", "preco": 42.99, "descricao": "Black label, mel de uzzu, limão e gengibre"},
            {"nome": "SHISSÔ SMASH", "preco": 38.99, "descricao": "Gin, shissô, hortelã, mel yuzu e limão"},
            {"nome": "KIICHI SANGRIA", "preco": 42.99, "descricao": "Sake, espumante, morango, hibisco e espuma de gengibre"},
            {"nome": "GT HIBISCO", "preco": 41.99, "descricao": "Gin, hibisco, água tônica, framboesa e limão"},
            {"nome": "RAZU KIICHI", "preco": 41.99, "descricao": "Sake, vodka, mel de yuzu, limão, xarope de framboesa"},
            {"nome": "SAKERINHA (nacional)", "preco": 35.93, "descricao": "Fruta a escolha, sake Azuma"},
            {"nome": "SAKERINHA (importada)", "preco": 58.99, "descricao": "Fruta a escolha, sake Hakushika"},
            {"nome": "CAIPIROSKA (nacional)", "preco": 35.93, "descricao": "Fruta a escolha, Vodka Sminorf"},
            {"nome": "CAIPIRINHA TRADICIONAL", "preco": 27.74, "descricao": "Fruta e escolha e cachaça"},
            {"nome": "CAIPIRINHA PREMIUM", "preco": 33.99, "descricao": "Fruta a escolha, cachaça premium"},
            {"nome": "CAIPIRÍSSIMA", "preco": 35.93, "descricao": "Rum, fruta a escolha"},
            {"nome": "CAIPIRINHA 2 LIMÕES", "preco": 32.99, "descricao": "Limão siciliano e taiti, cachaça"}
          ]
        }
      ]
    }
  ]
};