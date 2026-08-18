// ==========================================================
// web/index.js
//
// Indice manual do entry-point.
//
// Sem este arquivo, o Web Bundler gera um indice automatico
// importando TODOS os arquivos de web/ - incluindo o
// LICENSE.txt e os .woff2 do Font Awesome, que viravam
// entrypoints indevidos.
//
// Aqui declaramos explicitamente o que entra no bundle.
// Os arquivos de web/vendor/ continuam sendo resolvidos
// normalmente pelo Sass, atraves dos @import do app.scss.
// ==========================================================

import './app.js';
import './app.scss';