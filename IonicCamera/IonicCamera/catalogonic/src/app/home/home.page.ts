import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  chevronDownCircleOutline,
  listOutline,
  alertCircleOutline,
  pricetagOutline,
  chevronForwardOutline,
  radioButtonOnOutline,
  cardOutline,
  checkboxOutline,
  hardwareChipOutline,
  documentTextOutline,
  calendarOutline,
  addCircleOutline,
  gridOutline,
  shapesOutline,
  arrowDownCircleOutline,
  createOutline,
  menuOutline,
  reorderFourOutline,
  imageOutline,
  menuSharp,
  squareOutline,
  navigateOutline,
  chatboxEllipsesOutline,
  syncOutline,
  discOutline,
  optionsOutline,
  refreshCircleOutline,
  swapVerticalOutline,
  searchOutline,
  optionsSharp,
  caretDownCircleOutline,
  notificationsOutline,
  toggleOutline
} from 'ionicons/icons';

interface ComponenteUI {
  nombre: string;
  icono: string;
  ruta: string;
  descripcion: string;
  color: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  textoBusqueda: string = '';

  componentes: ComponenteUI[] = [
    { nombre: 'Accordion', icono: 'chevron-down-circle-outline', ruta: '/accordion', descripcion: 'Secciones colapsables de contenido', color: 'purple' },
    { nombre: 'Action Sheet', icono: 'list-outline', ruta: '/action-sheet', descripcion: 'Menú desplegable con opciones de acción', color: 'blue' },
    { nombre: 'Alert', icono: 'alert-circle-outline', ruta: '/alert', descripcion: 'Diálogos flotantes de aviso y confirmación', color: 'red' },
    { nombre: 'Badge', icono: 'pricetag-outline', ruta: '/badge', descripcion: 'Etiquetas de notificaciones y conteo', color: 'green' },
    { nombre: 'Breadcrumbs', icono: 'chevron-forward-outline', ruta: '/breadcrumbs', descripcion: 'Rutas de navegación secundarias', color: 'teal' },
    { nombre: 'Button', icono: 'radio-button-on-outline', ruta: '/button', descripcion: 'Botones interactivos con distintos colores', color: 'orange' },
    { nombre: 'Card', icono: 'card-outline', ruta: '/card', descripcion: 'Tarjetas contenedoras de texto e imágenes', color: 'blue' },
    { nombre: 'Checkbox', icono: 'checkbox-outline', ruta: '/checkbox', descripcion: 'Casillas para selección de opciones', color: 'green' },
    { nombre: 'Chip', icono: 'hardware-chip-outline', ruta: '/chip', descripcion: 'Etiquetas compactas de filtros o datos', color: 'purple' },
    { nombre: 'Content', icono: 'document-text-outline', ruta: '/content', descripcion: 'Área contenedora principal del visor', color: 'teal' },
    { nombre: 'Date & Time Pickers', icono: 'calendar-outline', ruta: '/datetime', descripcion: 'Selectores interactivos de fecha y hora', color: 'orange' },
    { nombre: 'Floating Action Button', icono: 'add-circle-outline', ruta: '/fab', descripcion: 'Boton flotante de acción principal', color: 'red' },
    { nombre: 'Grid', icono: 'grid-outline', ruta: '/grid', descripcion: 'Sistema de maquetación basado en rejilla', color: 'blue' },
    { nombre: 'Icons', icono: 'shapes-outline', ruta: '/icons', descripcion: 'Librería gráfica de íconos vectoriales', color: 'purple' },
    { nombre: 'Infinite Scroll', icono: 'arrow-down-circle-outline', ruta: '/infinite-scroll', descripcion: 'Carga infinita de contenido al desplazar', color: 'teal' },
    { nombre: 'Inputs', icono: 'create-outline', ruta: '/input', descripcion: 'Campos para escribir información', color: 'green' },
    { nombre: 'Item', icono: 'menu-outline', ruta: '/item', descripcion: 'Elemento contenedor para filas de lista', color: 'orange' },
    { nombre: 'List', icono: 'reorder-four-outline', ruta: '/list', descripcion: 'Agrupación estructurada de ítems', color: 'blue' },
    { nombre: 'Media', icono: 'image-outline', ruta: '/media', descripcion: 'Imágenes, avatares y miniaturas', color: 'red' },
    { nombre: 'Menu', icono: 'menu-sharp', ruta: '/menu', descripcion: 'Panel de navegación lateral deslizable', color: 'teal' },
    { nombre: 'Modal', icono: 'square-outline', ruta: '/modal', descripcion: 'Ventanas emergentes sobre la pantalla', color: 'purple' },
    { nombre: 'Navigation', icono: 'navigate-outline', ruta: '/navigation', descripcion: 'Patrones de movimiento entre pantallas', color: 'orange' },
    { nombre: 'Popover', icono: 'chatbox-ellipses-outline', ruta: '/popover', descripcion: 'Tarjeta emergente contextual', color: 'purple' },
    { nombre: 'Progress Indicators', icono: 'sync-outline', ruta: '/progress-indicators', descripcion: 'Barras y ruedas de carga de progreso', color: 'green' },
    { nombre: 'Radio', icono: 'disc-outline', ruta: '/radio', descripcion: 'Botones de opción de selección única', color: 'red' },
    { nombre: 'Range', icono: 'options-outline', ruta: '/range', descripcion: 'Deslizador de valores en rango numérico', color: 'orange' },
    { nombre: 'Refresher', icono: 'refresh-circle-outline', ruta: '/refresher', descripcion: 'Deslizar hacia abajo para actualizar', color: 'teal' },
    { nombre: 'Reorder', icono: 'swap-vertical-outline', ruta: '/reorder', descripcion: 'Reordenamiento arrastrable de elementos', color: 'blue' },
    { nombre: 'Searchbar', icono: 'search-outline', ruta: '/searchbar', descripcion: 'Campo de búsqueda de elementos', color: 'purple' },
    { nombre: 'Segment', icono: 'options-sharp', ruta: '/segment', descripcion: 'Conjunto de botones de pestaña superior', color: 'green' },
    { nombre: 'Select', icono: 'caret-down-circle-outline', ruta: '/select', descripcion: 'Selector desplegable de menú de opciones', color: 'orange' },
    { nombre: 'Toast', icono: 'notifications-outline', ruta: '/toast', descripcion: 'Mensajes informativos flotantes temporales', color: 'green' },
    { nombre: 'Toggle', icono: 'toggle-outline', ruta: '/toggle', descripcion: 'Interruptores de encendido y apagado', color: 'teal' }
  ];

  constructor() {
    addIcons({
      chevronDownCircleOutline,
      listOutline,
      alertCircleOutline,
      pricetagOutline,
      chevronForwardOutline,
      radioButtonOnOutline,
      cardOutline,
      checkboxOutline,
      hardwareChipOutline,
      documentTextOutline,
      calendarOutline,
      addCircleOutline,
      gridOutline,
      shapesOutline,
      arrowDownCircleOutline,
      createOutline,
      menuOutline,
      reorderFourOutline,
      imageOutline,
      menuSharp,
      squareOutline,
      navigateOutline,
      chatboxEllipsesOutline,
      syncOutline,
      discOutline,
      optionsOutline,
      refreshCircleOutline,
      swapVerticalOutline,
      searchOutline,
      optionsSharp,
      caretDownCircleOutline,
      notificationsOutline,
      toggleOutline
    });
  }

  get componentesFiltrados(): ComponenteUI[] {
    if (!this.textoBusqueda.trim()) {
      return this.componentes;
    }
    const query = this.textoBusqueda.toLowerCase().trim();
    return this.componentes.filter(item =>
      item.nombre.toLowerCase().includes(query) ||
      item.descripcion.toLowerCase().includes(query)
    );
  }

  onSearch(event: any) {
    this.textoBusqueda = event.target.value || '';
  }
}
