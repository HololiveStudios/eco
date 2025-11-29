// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer class="bg-secondary text-white mt-16">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="font-bold text-lg mb-4">Sobre</h3>
            <p class="text-gray-300 text-sm">Sua loja online de confiança.</p>
          </div>
          
          <div>
            <h3 class="font-bold text-lg mb-4">Links</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="/produtos" class="text-gray-300 hover:text-white">Produtos</a></li>
              <li><a href="/categorias" class="text-gray-300 hover:text-white">Categorias</a></li>
              <li><a href="/sobre" class="text-gray-300 hover:text-white">Sobre Nós</a></li>
              <li><a href="/contato" class="text-gray-300 hover:text-white">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-bold text-lg mb-4">Suporte</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="/ajuda" class="text-gray-300 hover:text-white">Central de Ajuda</a></li>
              <li><a href="/devolucoes" class="text-gray-300 hover:text-white">Devoluções</a></li>
              <li><a href="/envio" class="text-gray-300 hover:text-white">Envio</a></li>
              <li><a href="/termos" class="text-gray-300 hover:text-white">Termos</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-bold text-lg mb-4">Newsletter</h3>
            <form class="flex gap-2">
              <input type="email" placeholder="Seu e-mail" class="flex-1 px-3 py-2 rounded text-gray-900" />
              <button class="bg-primary px-4 py-2 rounded hover:bg-primary/90">OK</button>
            </form>
          </div>
        </div>
        
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}