import type { AccountType } from "@/domain";

export interface PostTemplate {
  title: string;
  description: string;
  // Fixed price drawn between min and max, or a range starting around min.
  price?: { kind: "fixed" | "range"; min: number; max: number };
  // Services and jobs often cover several communes.
  multiCommune?: boolean;
  accountType?: AccountType;
}

// Sample content per category slug. Only used to generate mock data.
export const templatesByCategory: Record<string, PostTemplate[]> = {
  marketplace: [
    {
      title: "Bicicleta aro 29 casi nueva",
      description: "Bicicleta de montaña, frenos de disco, muy poco uso. Entrego con casco.",
      price: { kind: "fixed", min: 120000, max: 250000 },
    },
    {
      title: "Vendo refrigerador No Frost",
      description: "Refrigerador de 300 litros funcionando perfecto. Se vende por cambio de casa.",
      price: { kind: "fixed", min: 90000, max: 180000 },
    },
    {
      title: "Coche y silla de auto para bebé",
      description: "Set completo en buen estado, lavado y listo para usar.",
      price: { kind: "fixed", min: 50000, max: 110000 },
    },
    {
      title: "Leña seca de eucaliptus por metro",
      description: "Leña seca, entrega a domicilio. Consulta por pedidos grandes.",
      price: { kind: "fixed", min: 35000, max: 55000 },
    },
    {
      title: "Notebook i5 con cargador",
      description: "Notebook 8 GB RAM, disco SSD, batería en buen estado. Ideal para estudiar.",
      price: { kind: "fixed", min: 180000, max: 320000 },
    },
    {
      title: "Juego de comedor de 6 sillas",
      description: "Mesa de madera nativa con 6 sillas tapizadas. Algunos detalles de uso.",
      price: { kind: "fixed", min: 120000, max: 220000 },
    },
    {
      title: "Lavadora automática 9 kg",
      description:
        "Funciona perfecto, se vende por viaje. Puedo probarla al momento de la entrega.",
      price: { kind: "fixed", min: 80000, max: 150000 },
    },
    {
      title: "Plantas de interior y suculentas",
      description: "Variedad de plantas en macetero. Precios desde lo indicado.",
      price: { kind: "fixed", min: 2000, max: 8000 },
    },
    {
      title: "Uniformes escolares tallas 10 a 14",
      description: "Poleras, polerones y buzos en buen estado. Se venden por separado.",
      price: { kind: "fixed", min: 3000, max: 10000 },
    },
    {
      title: "Herramientas de construcción",
      description: "Taladro, esmeril angular y caja de herramientas. Todo funcionando.",
      price: { kind: "fixed", min: 40000, max: 120000 },
    },
  ],
  "real-estate": [
    {
      title: "Arriendo casa 3 dormitorios con patio",
      description:
        "Casa amplia en villa tranquila, cerca de colegios y supermercado. Estacionamiento para dos autos.",
      price: { kind: "fixed", min: 380000, max: 550000 },
    },
    {
      title: "Arriendo pieza amoblada para estudiante",
      description:
        "Pieza con baño compartido, internet incluido. Cerca de la locomoción a Santiago.",
      price: { kind: "fixed", min: 160000, max: 250000 },
    },
    {
      title: "Vendo parcela de agrado 5.000 m²",
      description:
        "Parcela con factibilidad de luz y agua, rol propio. Hermosa vista a los cerros.",
      price: { kind: "fixed", min: 35000000, max: 70000000 },
    },
    {
      title: "Arriendo departamento 2D 1B",
      description:
        "Departamento en segundo piso, con estacionamiento y bodega. Gastos comunes bajos.",
      price: { kind: "fixed", min: 320000, max: 450000 },
    },
    {
      title: "Arriendo local comercial en avenida principal",
      description: "Local de 40 m² con baño, ideal para almacén, peluquería u oficina.",
      price: { kind: "fixed", min: 300000, max: 600000 },
    },
    {
      title: "Cabaña por temporada cerca de la playa",
      description:
        "Cabaña para 5 personas, totalmente equipada. Arriendo por semana o fin de semana.",
      price: { kind: "fixed", min: 45000, max: 90000 },
    },
    {
      title: "Vendo casa pareada con ampliación",
      description: "Casa de 3 dormitorios con ampliación regularizada. Acepto crédito hipotecario.",
      price: { kind: "fixed", min: 65000000, max: 95000000 },
    },
  ],
  vehicles: [
    {
      title: "Toyota Yaris 2017, papeles al día",
      description: "Mantenciones en concesionario, único dueño. Revisión técnica vigente.",
      price: { kind: "fixed", min: 6500000, max: 8500000 },
    },
    {
      title: "Camioneta Nissan Navara 4x4",
      description: "Camioneta de trabajo en muy buen estado, neumáticos nuevos.",
      price: { kind: "fixed", min: 11000000, max: 16000000 },
    },
    {
      title: "Moto Honda 150 cc",
      description: "Moto ideal para la ciudad, económica. Papeles al día.",
      price: { kind: "fixed", min: 900000, max: 1600000 },
    },
    {
      title: "Chevrolet Spark GT 2015",
      description: "Auto económico, aire acondicionado, cierre centralizado.",
      price: { kind: "fixed", min: 3800000, max: 5200000 },
    },
    {
      title: "Vendo carro de arrastre",
      description: "Carro de arrastre con papeles, ideal para fletes pequeños.",
      price: { kind: "fixed", min: 450000, max: 900000 },
    },
    {
      title: "Repuestos usados para Suzuki",
      description: "Puertas, focos y llantas en buen estado. Consulta por la pieza que necesitas.",
      price: { kind: "fixed", min: 15000, max: 80000 },
    },
  ],
  jobs: [
    {
      title: "Se busca maestro gasfíter con experiencia",
      description:
        "Empresa constructora busca gasfíter para obra. Jornada completa, contrato a plazo fijo.",
      price: { kind: "range", min: 700000, max: 950000 },
      multiCommune: true,
      accountType: "business",
    },
    {
      title: "Vendedora para local de ropa",
      description: "Se necesita vendedora part-time con experiencia en atención al público.",
      price: { kind: "range", min: 350000, max: 500000 },
      accountType: "business",
    },
    {
      title: "Temporeros para cosecha de fruta",
      description: "Se necesitan temporeros para la temporada. Transporte desde la plaza.",
      price: { kind: "range", min: 550000, max: 750000 },
      multiCommune: true,
      accountType: "business",
    },
    {
      title: "Ayudante de cocina para restaurante",
      description: "Turnos rotativos, buen ambiente laboral. Se valora experiencia.",
      price: { kind: "range", min: 520000, max: 650000 },
      accountType: "business",
    },
    {
      title: "Conductor con licencia A2",
      description: "Se busca conductor para reparto local de lunes a sábado.",
      price: { kind: "range", min: 650000, max: 850000 },
      multiCommune: true,
      accountType: "business",
    },
    {
      title: "Asistente administrativa contable",
      description: "Manejo de Excel y facturación electrónica. Media jornada.",
      price: { kind: "range", min: 450000, max: 600000 },
      accountType: "business",
    },
    {
      title: "Busco trabajo como cuidadora de adulto mayor",
      description: "Tengo experiencia y referencias. Disponibilidad de lunes a viernes.",
      price: { kind: "range", min: 400000, max: 550000 },
    },
  ],
  services: [
    {
      title: "Electricista a domicilio, certificado SEC",
      description: "Instalaciones, reparaciones y certificaciones. Atiendo urgencias.",
      price: { kind: "range", min: 25000, max: 120000 },
      multiCommune: true,
    },
    {
      title: "Fletes y mudanzas",
      description: "Camión cerrado, fletes dentro y fuera de la región. Ayudante incluido.",
      price: { kind: "range", min: 30000, max: 150000 },
      multiCommune: true,
    },
    {
      title: "Peluquería y manicure a domicilio",
      description: "Cortes, tinturas y uñas acrílicas. Agenda tu hora por WhatsApp.",
      price: { kind: "range", min: 8000, max: 35000 },
    },
    {
      title: "Jardinería y mantención de piscinas",
      description: "Corte de pasto, poda y limpieza de piscinas. Planes mensuales.",
      price: { kind: "range", min: 20000, max: 80000 },
      multiCommune: true,
    },
    {
      title: "Reparación de celulares y computadores",
      description: "Cambio de pantalla, batería y formateo. Diagnóstico gratis.",
      price: { kind: "range", min: 10000, max: 90000 },
    },
    {
      title: "Maestro pintor y carpintero",
      description: "Pintura interior y exterior, cerámica y reparaciones en general.",
      price: { kind: "range", min: 30000, max: 300000 },
      multiCommune: true,
    },
    {
      title: "Veterinario a domicilio",
      description: "Vacunas, desparasitación y consultas en tu casa.",
      price: { kind: "range", min: 15000, max: 45000 },
      multiCommune: true,
    },
    {
      title: "Instalación de cámaras de seguridad",
      description: "Kits completos con app para el celular. Garantía de 1 año.",
      price: { kind: "range", min: 120000, max: 400000 },
      multiCommune: true,
      accountType: "business",
    },
  ],
  events: [
    {
      title: "Feria costumbrista de fin de año",
      description:
        "Comida típica, artesanía local y música en vivo. Entrada liberada para toda la familia.",
      accountType: "organization",
    },
    {
      title: "Corrida familiar 5K",
      description: "Inscripciones abiertas para todas las edades. Habrá premiación por categoría.",
      accountType: "organization",
    },
    {
      title: "Bingo solidario en la sede vecinal",
      description: "A beneficio de un vecino. Habrá completos y bebidas.",
      price: { kind: "fixed", min: 2000, max: 5000 },
      accountType: "organization",
    },
    {
      title: "Taller gratuito de huerto urbano",
      description: "Aprende a hacer tu propio huerto en casa. Cupos limitados.",
      accountType: "organization",
    },
    {
      title: "Show de talentos en la plaza",
      description: "Música, baile y comedia. Trae tu silla.",
      accountType: "organization",
    },
    {
      title: "Fonda dieciochera",
      description: "Ramadas, juegos típicos y música en vivo durante todo el fin de semana.",
      price: { kind: "fixed", min: 2000, max: 4000 },
      accountType: "organization",
    },
  ],
  pets: [
    {
      title: "Perrita perdida cerca de la plaza",
      description:
        "Se perdió nuestra perrita, mestiza color café, collar rojo. Se ofrece recompensa.",
    },
    {
      title: "Gatitos en adopción responsable",
      description: "Tres gatitos de 2 meses, desparasitados. Solo adopción responsable.",
    },
    {
      title: "Se encontró perro labrador",
      description:
        "Perro labrador color miel, muy dócil. Lo tenemos resguardado mientras aparece su familia.",
    },
    {
      title: "Perro adulto busca hogar",
      description: "Perro mestizo de 4 años, esterilizado y vacunado. Muy cariñoso con niños.",
    },
    {
      title: "Gata perdida, color gris",
      description:
        "Se perdió nuestra gata gris de ojos verdes. Es asustadiza, por favor avisar si la ven.",
    },
  ],
  "lost-found": [
    {
      title: "Se encontró billetera en el terminal de buses",
      description:
        "Billetera negra con documentos. Contactar para describirla y coordinar entrega.",
    },
    {
      title: "Perdí llaves con llavero azul",
      description: "Se me cayeron cerca del supermercado. Agradezco si alguien las encontró.",
    },
    {
      title: "Encontré celular en la micro",
      description:
        "Celular encontrado en la micro. Describir el modelo y fondo de pantalla para devolverlo.",
    },
    {
      title: "Se perdió mochila escolar",
      description: "Mochila roja con cuadernos y estuche. Tiene el nombre de mi hijo.",
    },
  ],
  "local-business": [
    {
      title: "Panadería con 20% de descuento los lunes",
      description: "Pan amasado, hallullas y kuchenes caseros. Descuento todos los lunes.",
      accountType: "business",
    },
    {
      title: "Almacén con despacho a domicilio",
      description: "Abarrotes, frutas y verduras. Despacho gratis sobre $15.000.",
      accountType: "business",
    },
    {
      title: "Empanadas de horno los fines de semana",
      description: "Empanadas de pino y queso. Pedidos con anticipación.",
      price: { kind: "fixed", min: 1500, max: 2500 },
      accountType: "business",
    },
    {
      title: "Ferretería con nuevos horarios",
      description: "Ahora abrimos los domingos de 10:00 a 14:00. Te esperamos.",
      accountType: "business",
    },
    {
      title: "Sushi y comida a domicilio",
      description: "Promociones de martes a jueves. Revisa nuestra carta por WhatsApp.",
      price: { kind: "fixed", min: 8000, max: 22000 },
      accountType: "business",
    },
    {
      title: "Botillería con promoción de fin de mes",
      description: "Descuentos en packs y despacho rápido en el sector.",
      accountType: "business",
    },
  ],
  community: [
    {
      title: "Corte de agua programado",
      description:
        "Habrá corte de agua de 9:00 a 15:00 por mantención de matriz. Habrá camión aljibe.",
      accountType: "organization",
    },
    {
      title: "Operativo de vacunación en el CESFAM",
      description: "Vacunación contra la influenza para grupos de riesgo, sin hora previa.",
      accountType: "organization",
    },
    {
      title: "Reunión de la junta de vecinos",
      description:
        "Se tratarán temas de seguridad y alumbrado público. Se invita a todos los vecinos.",
      accountType: "organization",
    },
    {
      title: "Retiro de cachureos casa a casa",
      description:
        "El municipio pasará retirando muebles y voluminosos. Sacarlos la noche anterior.",
      accountType: "organization",
    },
    {
      title: "Campaña de esterilización de mascotas",
      description: "Cupos gratuitos para perros y gatos. Inscripción en la municipalidad.",
      accountType: "organization",
    },
  ],
  news: [
    {
      title: "Nuevo horario del transporte rural",
      description:
        "A partir del lunes cambian los horarios de los buses rurales. Revisa los detalles.",
      accountType: "organization",
    },
    {
      title: "Inauguran nueva plaza activa",
      description:
        "La plaza cuenta con máquinas de ejercicio, juegos infantiles y nueva iluminación.",
      accountType: "organization",
    },
    {
      title: "Avanzan obras de pavimentación",
      description: "Se informa el desvío de tránsito mientras duren los trabajos.",
      accountType: "organization",
    },
  ],
  classes: [
    {
      title: "Clases de matemáticas para enseñanza media",
      description: "Profesora titulada, clases presenciales u online. Preparación PAES.",
      price: { kind: "fixed", min: 12000, max: 20000 },
    },
    {
      title: "Clases de guitarra para principiantes",
      description: "Aprende tus canciones favoritas desde cero. Clases a domicilio.",
      price: { kind: "fixed", min: 10000, max: 18000 },
    },
    {
      title: "Reforzamiento escolar básica",
      description: "Apoyo en tareas y lectura para niños de 1° a 6° básico.",
      price: { kind: "fixed", min: 8000, max: 14000 },
    },
    {
      title: "Clases de inglés conversacional",
      description: "Clases online o presenciales para adultos y jóvenes.",
      price: { kind: "fixed", min: 12000, max: 22000 },
    },
  ],
  handmade: [
    {
      title: "Cerámica artesanal hecha a mano",
      description: "Tazas, platos y maceteros de greda. Hacemos pedidos personalizados.",
      price: { kind: "fixed", min: 5000, max: 30000 },
    },
    {
      title: "Tortas y cupcakes por encargo",
      description:
        "Tortas personalizadas para cumpleaños y eventos. Pedidos con 3 días de anticipación.",
      price: { kind: "fixed", min: 15000, max: 45000 },
    },
    {
      title: "Velas aromáticas de soya",
      description: "Velas naturales en frasco de vidrio, varios aromas.",
      price: { kind: "fixed", min: 4000, max: 9000 },
    },
  ],
};

export const authorNames: Record<AccountType, string[]> = {
  person: [
    "Carolina M.",
    "Diego P.",
    "Marcela T.",
    "Ignacio V.",
    "Sra. Gloria",
    "Pedro A.",
    "Valentina R.",
    "Camila S.",
    "Felipe G.",
    "Javiera C.",
    "Tomás L.",
    "Francisca O.",
    "Don Luis",
    "Constanza B.",
    "Matías H.",
    "Familia Rojas",
  ],
  business: [
    "Constructora Valle Sur",
    "Electro Andrés",
    "Panadería Don Lucho",
    "Ferretería El Maestro",
    "Almacén La Esquina",
    "Fletes Rápidos",
    "Agrícola Los Olivos",
    "Sushi Melipilla",
    "Peluquería Estilo",
    "Tecno Fix",
  ],
  organization: [
    "Junta de Vecinos Villa Esperanza",
    "Municipalidad",
    "CESFAM",
    "Club Deportivo Unión",
    "Centro Cultural",
    "Biblioteca Municipal",
  ],
};
