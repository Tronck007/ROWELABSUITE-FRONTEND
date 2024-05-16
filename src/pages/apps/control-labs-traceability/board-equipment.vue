<!-- eslint-disable vue/prefer-true-attribute-shorthand -->
<template>
  <Carousel
    :items-to-show="3.95"
    :autoplay="2000"
    :wrap-around="true"
  >
    <Slide
      v-for="equipo in equipos"
      :key="equipo.id"
    >
      <VCard class="mi-tarjeta-personalizada rounded-lg elevation-1">
        <VCardText>
          <div class="d-flex justify-center align-start pb-0 px-3 pt-3 mb-4 bg-light-primary rounded">
            <!-- Utiliza la propiedad imagen del equipo, o una predeterminada si no existe -->
            <VImg
              :src="`/images/equipos/${equipo.id}.png` || 'default-image.jpg'"
              class="imagen-equipo mt-10"
              :alt="equipo.nombre"
            />
          </div>
          <div>
            <h4 class="text-h4 mb-1">
              {{ equipo.nombre }}
            </h4>
            <span class="text-body-2">{{ equipo.descripcion }}</span>
            <div
              v-if="equipo.ocupado"
              class="d-flex justify-space-between my-4 flex-wrap"
            >
              <div class="d-flex gap-x-3 align-center">
                <h6 class="text-h6 text-high-emphasis">
                  {{ equipo.metodo }}
                </h6>
                <div class="text-sm">
                  En proceso - {{ equipo.tiempoRestante }}
                </div>
              </div>
            </div>
          </div>
        </VCardText>
      </VCard>
    </Slide>
  </Carousel>
</template>


<script setup>
import { ref } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

const settings = ref({
  itemsToShow: 1,
  snapAlign: 'center',

})

const equipos = ref([
  {
    id: 1,
    nombre: "Agitador",
    descripcion: "Equipo para agitar muestras",
    ocupado: true,
    tiempoRestante: "20 min",
    metodo: "Método A",
  },
  {
    id: 2,
    nombre: "Balanza",
    descripcion: "Equipo para agitar muestras",
    ocupado: false,
    tiempoRestante: "0 min",
    metodo: "N/A",
  },
  {
    id: 3,
    nombre: "Baño María",
    descripcion: "Equipo para agitar muestras",
    ocupado: true,
    tiempoRestante: "10 min",
    metodo: "Método B",
  },
  {
    id: 4,
    nombre: "Disolutor",
    descripcion: "Equipo para agitar muestras",
    ocupado: false,
    tiempoRestante: "0 min",
    metodo: "N/A",
  },
  {
    id: 5,
    nombre: "HPLC",
    descripcion: "Equipo para agitar muestras",
    ocupado: true,
    tiempoRestante: "5 min",
    metodo: "Método C",
  },
  {
    id: 6,
    nombre: "Agitador 1",
    descripcion: "Equipo para agitar muestras",
    ocupado: true,
    tiempoRestante: "20 min",
    metodo: "Método A",
  },
  {
    id: 7,
    nombre: "Balanza 1",
    descripcion: "Equipo para agitar muestras",
    ocupado: false,
    tiempoRestante: "0 min",
    metodo: "N/A",
  },
  {
    id: 8,
    nombre: "Baño María 1",
    descripcion: "Equipo para agitar muestras",
    ocupado: true,
    tiempoRestante: "10 min",
    metodo: "Método B",
  },
  {
    id: 5,
    nombre: "Disolutor 1",
    descripcion: "Equipo para agitar muestras",
    ocupado: false,
    tiempoRestante: "0 min",
    metodo: "N/A",
  },
  {
    id: 4,
    nombre: "HPLC 1",
    descripcion: "",
    ocupado: true,
    tiempoRestante: "5 min",
    metodo: "Método C",
  },

  // Supón que continúa para más equipos
])

const obtenerUrlImagen = idEquipo => {
  const imagenesDisponibles = [1, 2, 3, 4, 5] // Ajusta según tus necesidades
  if (imagenesDisponibles.includes(idEquipo)) {
    return `/images/equipos/${idEquipo}.png`
  }
  
  return "/images/equipos/0.png" // Imagen para equipos no disponibles
}


const breakpoints = ref({
  // 700px y arriba
  700: {
    itemsToShow: 3.5,
    snapAlign: 'center',
  },

  // 1024px y arriba
  1024: {
    itemsToShow: 5,
    snapAlign: 'start',
  },
})
</script>

<style scoped>
/* .carousel__slide {
  padding: 5px;
} */

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}

@media (max-width: 768px) {
  .mi-tarjeta-personalizada {
    block-size: 50vh; /* Altura más pequeña para pantallas pequeñas */
    inline-size: calc(50vw - 20px); /* Ancho más grande para mostrar menos tarjetas en la pantalla */
  }
}

.mi-tarjeta-personalizada {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px; /* Ajusta el margen alrededor de la tarjeta */
  block-size: 80vh; /* Mantiene la altura de la tarjeta */
  inline-size: calc(25vw - 20px); /* Ajusta el ancho de la tarjeta restando el margen */
  margin-block: 10px;
  margin-inline: 15px;
  padding-block-start: 20px;
}


/* Asegúrate de que la imagen dentro de la tarjeta se ajuste bien */
.VImg {
  block-size: 150px; /* Establece la altura deseada */
  inline-size: 200px; /* Establece el ancho deseado */
  object-fit: cover; /* Asegura que la imagen cubra completamente el espacio sin distorsionarse */
}

.VCard, .VCardText {
  padding-block-start: 20px; /* Ajusta este valor según necesites */
}
</style>

