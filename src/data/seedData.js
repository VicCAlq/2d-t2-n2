import { FonteDeNoticias } from '../models/FonteDeNoticias'
import { Noticia } from '../models/Noticia'

export const fontesIniciais = [
  new FonteDeNoticias(
    'Borner News',
    'BornerNews.com',
    'Bíblia do hip-hop desde 1988, cobrindo música, cultura e política.',
    'Revista',
  ),
  new FonteDeNoticias(
    ' MTV Raps',
    'mtv.com/yo-raps',
    'Programa que levou o rap para a TV a cabo em 1988.',
    'TV',
  ),
  new FonteDeNoticias(
    'Right On! Magazine',
    'rightonmag.com',
    'Zine de fofocas e bastidores das estrelas da era dourada.',
    'Zine',
  ),
  new FonteDeNoticias(
    'Rap Pages',
    'rappages.com',
    'Cobertura underground do West Coast e do gangsta rap.',
    'Revista',
  ),
]

export const noticiasIniciais = [
  new Noticia(
    'Run-D.M.C. e Aerosmith gravam "Walk This Way"',
    'thesource.com/walk-this-way',
    'A parceria inesperada derruba a barreira entre rap e rock e leva o hip-hop ao rádio mainstream.',
    '1986-07-04',
    'Era de Ouro',
    'The Source',
  ),
  new Noticia(
    'Public Enemy lança "It Takes a Nation of Millions to Hold Us Back"',
    'thesource.com/public-enemy-nation',
    'Disco político e denso é aclamado como um dos discos mais importantes da década.',
    '1988-06-28',
    'Era de Ouro',
    'The Source',
  ),
  new Noticia(
    'Yo! MTV Raps estreia na MTV',
    'mtv.com/yo-raps/estreia',
    'Pela primeira vez, videoclipes de rap ganham espaço fixo na TV nacional.',
    '1988-08-06',
    'TV & Cultura',
    'Yo! MTV Raps',
  ),
  new Noticia(
    'N.W.A lança "Straight Outta Compton"',
    'rappages.com/nwa-compton',
    'O grupo de Compton redefine o gangsta rap e provoca reação do FBI.',
    '1988-08-08',
    'West Coast',
    'Rap Pages',
  ),
  new Noticia(
    'MC Hammer estoura com "U Can\'t Touch This"',
    'rightonmag.com/mc-hammer',
    'A calça larga e o refrão viram febre mundial, levando o rap às paradas pop.',
    '1990-02-13',
    'Mainstream',
    'Right On! Magazine',
  ),
  new Noticia(
    '2Pac lança "All Eyez on Me"',
    'rappages.com/2pac-all-eyez',
    'Álbum duplo consolida 2Pac como um dos maiores nomes do West Coast.',
    '1996-02-13',
    'West Coast',
    'Rap Pages',
  ),
  new Noticia(
    'The Notorious B.I.G. lança "Ready to Die"',
    'thesource.com/biggie-ready-to-die',
    'Disco de estreia de Biggie é aclamado como obra-prima do East Coast.',
    '1994-09-13',
    'East Coast',
    'The Source',
  ),
  new Noticia(
    'Wu-Tang Clan lança "Enter the Wu-Tang (36 Chambers)"',
    'rappages.com/wu-tang-36-chambers',
    'Coletivo de Staten Island traz sonoridade crua e referências a filmes de kung fu.',
    '1993-11-09',
    'East Coast',
    'Rap Pages',
  ),
]
