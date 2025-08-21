import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { menuData, MenuItem, MenuSubcategory, MenuCategory } from '@/data/menu';
import { useCart } from '@/contexts/CartContext';
import { Plus, Search, Star, ArrowLeft, Filter } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Cart from './Cart';

interface MenuDisplayProps {
  tableNumber: string;
  customerName: string;
  onBack: () => void;
}

const MenuDisplay: React.FC<MenuDisplayProps> = ({ tableNumber, customerName, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem, addRodizioSystem, addRodizioItem, rodizioSystems } = useCart();

  const formatPrice = (price: number | null) => {
    if (!price || price <= 0) return '';
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  const isSpecialItem = (item: MenuItem) => {
    return item.descricao.toLowerCase().includes('limitado') || 
           item.descricao.toLowerCase().includes('consulte o garçom');
  };

  const isRodizioCategory = (categoryName: string) => {
    return categoryName.includes('Rodízio');
  };

  const isRodizioItem = (item: MenuItem, parentCategory: string) => {
    return (
      parentCategory.includes('Rodízio') && 
      item.nome !== 'Sistema Rodízio' && 
      item.nome !== 'Sistema Rodízio Almoço'
    );
  };

  const isRodizioSystemItem = (item: MenuItem) => {
    return item.nome === 'Sistema Rodízio' || item.nome === 'Sistema Rodízio Almoço';
  };

  const isPremiumCategory = (categoryName: string) => {
    return categoryName.includes('Especiais da Casa') || 
           categoryName.includes('Drinks') || 
           categoryName.includes('Aperitivos');
  };

  const handleAddToCart = (item: MenuItem, categoryName: string, parentCategory: string) => {
    // Handle Rodizio System items (the main rodizio package)
    if (isRodizioSystemItem(item)) {
      const rodizioType = parentCategory.includes('Jantar') ? 'jantar' : 'almoco';
      addRodizioSystem(rodizioType);
      
      toast({
        title: "Rodízio adicionado!",
        description: `${parentCategory} foi adicionado ao seu pedido`,
      });
      return;
    }

    // Handle Rodizio items (included in rodizio, need to select a system first)
    if (isRodizioItem(item, parentCategory)) {
      const rodizioType = parentCategory.includes('Jantar') ? 'jantar' : 'almoco';
      const existingSystem = rodizioSystems.find(system => system.type === rodizioType);
      
      if (!existingSystem) {
        toast({
          title: "Adicione o rodízio primeiro",
          description: `Para selecionar itens do ${parentCategory}, você precisa adicionar o sistema de rodízio primeiro.`,
          variant: "destructive"
        });
        return;
      }

      addRodizioItem(existingSystem.id, {
        name: item.nome,
        categoryName: categoryName,
        notes: item.descricao
      });

      toast({
        title: "Item selecionado!",
        description: `${item.nome} foi adicionado à sua seleção do rodízio`,
      });
      return;
    }

    // Handle regular items (beverages, etc.)
    if (item.preco && item.preco > 0) {
      addItem({
        name: item.nome,
        price: item.preco,
        categoryName: categoryName,
        notes: item.descricao,
        type: 'regular'
      });

      toast({
        title: "Item adicionado!",
        description: `${item.nome} foi adicionado ao seu pedido`,
      });
    } else {
      toast({
        title: "Consulte valores",
        description: "Por favor, consulte o garçom para este item",
        variant: "destructive"
      });
    }
  };

  const renderMenuItem = (item: MenuItem, categoryName: string, parentCategory: string) => {
    const isRodizioSys = isRodizioSystemItem(item);
    const isRodizioItm = isRodizioItem(item, parentCategory);
    const rodizioType = parentCategory.includes('Jantar') ? 'jantar' : 'almoco';
    const hasRodizioSystem = rodizioSystems.some(system => system.type === rodizioType);
    
    return (
      <Card key={item.nome} className="hover-lift transition-kiichi shadow-elegant">
        <CardContent className="p-4">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-sm">{item.nome}</h4>
                {isSpecialItem(item) && (
                  <Badge variant="secondary" className="bg-kiichi-gold text-kiichi-black text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    Especial
                  </Badge>
                )}
                {isPremiumCategory(categoryName) && (
                  <Badge className="bg-kiichi-red text-white text-xs">
                    Premium
                  </Badge>
                )}
                {isRodizioSys && (
                  <Badge className="bg-gradient-kiichi text-white text-xs">
                    Sistema
                  </Badge>
                )}
                {isRodizioItm && (
                  <Badge variant="outline" className="text-xs">
                    Incluso no Rodízio
                  </Badge>
                )}
              </div>
              {item.descricao && (
                <p className="text-xs text-muted-foreground mb-2">{item.descricao}</p>
              )}
              <div className="flex items-center justify-between">
                {item.preco && item.preco > 0 ? (
                  <p className="font-bold text-kiichi-red">{formatPrice(item.preco)}</p>
                ) : isRodizioItm ? (
                  <p className="text-sm text-muted-foreground">Incluso no rodízio</p>
                ) : (
                  <p className="text-sm text-muted-foreground">Consulte valores</p>
                )}
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => handleAddToCart(item, categoryName, parentCategory)}
              className={`transition-kiichi hover-scale shrink-0 ${
                isRodizioItm && !hasRodizioSystem 
                  ? 'bg-gray-400 hover:bg-gray-500' 
                  : 'bg-kiichi-red hover:bg-kiichi-red-dark'
              }`}
              disabled={isRodizioItm && !hasRodizioSystem}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderSubcategory = (subcategory: MenuSubcategory, parentCategory: string) => (
    <div key={subcategory.nome} className="mb-8">
      <div className="flex items-center gap-2 mb-4 p-3 bg-kiichi-gray/10 rounded-lg border-l-4 border-kiichi-red">
        <h3 className="text-lg font-semibold">{subcategory.nome}</h3>
        {isPremiumCategory(subcategory.nome) && (
          <Badge className="bg-gradient-gold text-kiichi-black">
            <Star className="h-3 w-3 mr-1" />
            Premium
          </Badge>
        )}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {subcategory.itens.map((item) => 
          renderMenuItem(item, subcategory.nome, parentCategory)
        )}
      </div>
    </div>
  );

  const renderMainCategory = (category: MenuCategory) => (
    <Card key={category.nome} className="mb-6 shadow-elegant">
      <CardHeader className="bg-gradient-kiichi-subtle text-white">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{category.nome}</CardTitle>
            {category.preco && (
              <CardDescription className="text-white/80 font-semibold text-lg mt-1">
                {formatPrice(category.preco)}
              </CardDescription>
            )}
          </div>
          {category.nome.includes('Rodízio') && (
            <Badge className="bg-kiichi-gold text-kiichi-black font-semibold">
              Destaque
            </Badge>
          )}
        </div>
        {category.descricao && (
          <CardDescription className="text-white/90 mt-2">
            {category.descricao}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-6">
        {category.itens.map((item) => {
          if ('itens' in item) {
            return renderSubcategory(item as MenuSubcategory, category.nome);
          } else {
            return renderMenuItem(item as MenuItem, category.nome, category.nome);
          }
        })}
      </CardContent>
    </Card>
  );

  const categories = menuData.categorias.map(cat => cat.nome);
  const filteredData = useMemo(() => {
    let data = menuData.categorias;
    
    if (selectedCategory) {
      data = data.filter(category => category.nome === selectedCategory);
    }
    
    if (searchQuery) {
      // Implement search logic across all items
      data = data.map(category => ({
        ...category,
        itens: category.itens.filter(item => {
          if ('itens' in item) {
            const subcategory = item as MenuSubcategory;
            return subcategory.itens.some(subItem =>
              subItem.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
              subItem.descricao.toLowerCase().includes(searchQuery.toLowerCase())
            );
          } else {
            const menuItem = item as MenuItem;
            return menuItem.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   menuItem.descricao.toLowerCase().includes(searchQuery.toLowerCase());
          }
        })
      })).filter(category => category.itens.length > 0);
    }
    
    return data;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gradient-kiichi text-white shadow-elegant">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold">Kiichi</h1>
              <p className="text-sm opacity-90">Mesa {tableNumber} • {customerName}</p>
            </div>
            <div className="w-20"> {/* Spacer for centering */}</div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar itens do cardápio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === '' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedCategory('')}
              className={`whitespace-nowrap ${
                selectedCategory === '' 
                  ? 'bg-white text-kiichi-red' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Filter className="h-4 w-4 mr-1" />
              Todos
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-white text-kiichi-red'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="container mx-auto px-4 py-6 pb-24">
        {filteredData.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              Nenhum item encontrado
            </h3>
            <p className="text-muted-foreground">
              Tente ajustar sua busca ou filtros
            </p>
          </div>
        ) : (
          <div className="animate-fade-in">
            {filteredData.map(renderMainCategory)}
          </div>
        )}
      </div>

      {/* Cart Component */}
      <Cart 
        tableNumber={tableNumber} 
        customerName={customerName} 
      />
    </div>
  );
};

export default MenuDisplay;